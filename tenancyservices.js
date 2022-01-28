const axios = require("axios");

const getAverageRent = async (statisticalArea, numBedrooms) => {
    const url = "https://api.business.govt.nz/services/v1/tenancy-services/market-rent/statistics" + 
        "?period-ending=2021-11&num-months=3&area-definition=TA2019&include-aggregates=true&statistics=med&num-bedrooms=2&area-codes=1";
};

exports.getAverageRent = getAverageRent;