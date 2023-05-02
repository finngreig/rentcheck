const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

let morgan_format = "combined";
if (process.env.ENVIRONMENT === "development") {
    morgan_format = "dev";
}
app.use(morgan(morgan_format));

app.use(express.urlencoded({extended: true}));

const {getAddressAutocomplete, getAddressMetadata} = require("../external_services/addressfinder.js");
const {getRentStatistics, calculateSummaryStatistics} = require("../external_services/tenancyservices.js");

if (process.env.ENVIRONMENT === "development") {
    app.use(express.static(path.join(__dirname, "..", "public")));
}

app.get("/api/address/autocomplete", async (req, res) => {
    const address = req.query.term;
    const results = await getAddressAutocomplete(address);
    res.send(results.map(item => ({id: item.pxid, label: item.a, value: item.a})));
});

app.post("/api/compareRent", async (req, res) => {
    const pxid = req.body.pxid;
    const rent = parseFloat(req.body.rent);
    const bedrooms = req.body.bedrooms;

    const addressMetadata = await getAddressMetadata(pxid);
    const saId = addressMetadata.sa2_id;

    const rentStatistics = await getRentStatistics(saId, bedrooms);

    res.json({
        area: addressMetadata.sa2,
        ...calculateSummaryStatistics(rentStatistics, rent)
    });
});

module.exports = app;
