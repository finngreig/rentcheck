const axios = require("axios");
const dayjs = require("dayjs");

const CONSUMER_KEY = process.env.MBIE_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.MBIE_CONSUMER_SECRET;

const NUM_MONTHS = 3;
const AREA_DEFINITION = "SAU2019";
const STATISTICS = "med,lq,uq";

let apiKey = null;
let apiKeyExpiryMs = null;

class NotFoundError extends Error {
    constructor (message) {
        super(message);
        this.name = "NotFoundError";
    }
}

const setApiKey = async () => {
    const bearer = new Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");

    const url = "https://api.business.govt.nz/services/token?grant_type=client_credentials&validity_period=3600";
    const response = await axios.post(url, null, {
        headers: {
            Authorization: `Basic ${bearer}`
        }
    });
    
    apiKey = response.data;
    apiKeyExpiryMs = Date.now() + (apiKey.expires_in * 1000);
}

const getApiKey = async () => {
    if (apiKey === null) {
        console.log("No MBIE token currently set. Setting one now...");
        await setApiKey();
    }

    if (Date.now() > apiKeyExpiryMs) {
        console.log("MBIE token has expired. Setting a new one now...");
        await setApiKey();
    }

    return apiKey.access_token;
}

const getRentStatistics = async (statisticalAreaId, numBedrooms) => {
    const periodEndingDateString = dayjs().subtract(2, "month").format("YYYY-MM");
    const url = "https://api.business.govt.nz/services/v1/tenancy-services/market-rent/statistics";

    const response = await axios.get(url, {
        params: {
            "period-ending": periodEndingDateString,
            "num-months": NUM_MONTHS,
            "area-definition": AREA_DEFINITION,
            "include-aggregates": true,
            "statistics": STATISTICS,
            "num-bedrooms": numBedrooms,
            "area-codes": statisticalAreaId
        },
        headers: {
            Authorization: `Bearer ${await getApiKey()}`
        }
    });

    return response.data;
};

const calculateSummaryStatistics = (marketRentResponse, userRent) => {
    const aggregateStatistics = marketRentResponse.items.find(item => item.dwell === "ALL" && item.area === "ALL");

    if (aggregateStatistics === undefined) throw new NotFoundError("Could not find any statistics for this address");

    return {
        lq: aggregateStatistics.lq,
        med: aggregateStatistics.med,
        uq: aggregateStatistics.uq,
        iqr: aggregateStatistics.uq - aggregateStatistics.lq,
        diff: {
            lq: userRent - aggregateStatistics.lq,
            med: userRent - aggregateStatistics.med,
            uq: userRent - aggregateStatistics.uq,
            iqrAboveUq: parseFloat(((userRent - aggregateStatistics.uq) / (aggregateStatistics.uq - aggregateStatistics.lq)).toFixed(2))
        }
    }
};

exports.getRentStatistics = getRentStatistics;
exports.calculateSummaryStatistics = calculateSummaryStatistics;
exports.NotFoundError = NotFoundError;