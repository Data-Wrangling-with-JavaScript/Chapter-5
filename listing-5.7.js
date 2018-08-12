"use strict";

const dataForge = require('data-forge');

dataForge.readFile("./data/monthly_crashes-cut-down.csv")
    .parseCSV()
    .then(dataFrame => {
        console.log("=== Head ===");
        console.log(dataFrame.head(2).toString());

        console.log("=== Tail ===");
        console.log(dataFrame.tail(2).toString());
    })
    .catch(err => {
        console.error(err && err.stack || err);
    });
