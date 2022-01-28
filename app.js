const express = require("express");
const path = require("path");

const app = express();

const {addressAutocomplete, addressMetadata} = require("./addressfinder.js");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/address/autocomplete", async (req, res) => {
    const address = req.query.term;
    const results = await addressAutocomplete(address);
    res.send(results.map(item => ({id: item.pxid, label: item.a, value: item.a})));
});

app.get("/compareRent", async (req, res) => {
    const pxid = req.query.pxid;
    const rent = req.query.rent;

    

    res.send(await addressMetadata(req.params.pxid));
});

module.exports = app;
