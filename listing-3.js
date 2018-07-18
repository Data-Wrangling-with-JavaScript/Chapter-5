"use strict";

const importCsvFile = require('./toolkit/importCsvFile.js');

importCsvFile("./data/monthly_crashes-cut-down.csv")
    .then(data => {
        const sample = data.slice(0, 3);
        console.log(sample);
    })
    .catch(err => {
        console.error(err && err.stack || err);
    });
