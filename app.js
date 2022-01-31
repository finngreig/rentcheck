require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();

const {getAddressAutocomplete, getAddressMetadata} = require("./addressfinder.js");
const {getRentStatistics} = require("./tenancyservices.js");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/address/autocomplete", async (req, res) => {
    const address = req.query.term;
    const results = await getAddressAutocomplete(address);
    res.send(results.map(item => ({id: item.pxid, label: item.a, value: item.a})));
});

app.get("/compareRent", async (req, res) => {
    const pxid = req.query.pxid;
    // const rent = req.query.rent;
    const bedrooms = req.query.bedrooms;

    const addressMetadata = await getAddressMetadata(pxid);
    const saId = addressMetadata.sa2_id;

    const rentStatistics = await getRentStatistics(saId, bedrooms);
    const aggregateStatistics = rentStatistics.items.find(item => item.dwell === "ALL" && item.area === "ALL");

    res.json(aggregateStatistics);
});

module.exports = app;
