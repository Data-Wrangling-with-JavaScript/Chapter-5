"use strict";

const dataForge = require('data-forge');

dataForge.readFile("./data/monthly_crashes-cut-down.csv")
    .parseCSV()
    .then(dataFrame => {
        console.log(dataFrame.getColumnNames());
    })
    .catch(err => {
        console.error(err && err.stack || err);
    });
