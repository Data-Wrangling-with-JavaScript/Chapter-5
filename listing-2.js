"use strict";

const importCsvFile = require('./toolkit/importCsvFile.js');

importCsvFile("./data/monthly_crashes-cut-down.csv")
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.error(err && err.stack || err);
    });
