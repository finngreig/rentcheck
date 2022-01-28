const axios = require("axios");

const ADDRESS_FINDER_KEY = "MFQ93YPXGETJ7DKWLN48";
const CENSUS_YEAR = "2018";

const addressAutocomplete = async (address) => {
    const url = `https://api.addressfinder.io/api/nz/address/autocomplete?q=${address}&key=${ADDRESS_FINDER_KEY}&format=json&max=10&highlight=1`;
    const response = await axios.get(url, {
        headers: {
            "Origin": "https://addressfinder.nz",
            "Referer": "https://addressfinder.nz/"
        }
    });
    return response.data.completions;
}

const addressMetadata = async (pxid) => {
    const url = `https://api.addressfinder.io/api/nz/address/metadata?format=json&key=${ADDRESS_FINDER_KEY}&pxid=${pxid}&census=${CENSUS_YEAR}`;
    const response = await axios.get(url, {
        headers: {
            "Origin": "https://addressfinder.nz",
            "Referer": "https://addressfinder.nz/"
        }
    });
    return response.data;
}

exports.addressAutocomplete = addressAutocomplete;
exports.addressMetadata = addressMetadata;
