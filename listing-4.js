"use strict";

const importCsvFile = require('./toolkit/importCsvFile.js');

importCsvFile("./data/monthly_crashes-cut-down.csv")
    .then(data => {
        const sample = data[0];
        console.log("Year: " + typeof(sample.Year));
        console.log("Month: " + typeof(sample.Month));
        console.log("Crashes: " + typeof(sample.Crashes));
        console.log("Fatalities: " + typeof(sample.Fatalities));
    })
    .catch(err => {
        console.error(err && err.stack || err);
    });
