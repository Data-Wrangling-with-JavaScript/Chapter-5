"use strict";

const assert = require('assert');
const importCsvFile = require('./toolkit/importCsvFile.js');

importCsvFile("./data/monthly_crashes-cut-down.csv")
    .then(data => {
        data.forEach(row => {
            assert(typeof(row.Year) === "number");
            assert(typeof(row.Month) === "string");
            assert(typeof(row.Crashes) === "number");
            assert(typeof(row.Fatalities) === "number");
        });
    })
    .catch(err => {
        console.error(err && err.stack || err);
    });
