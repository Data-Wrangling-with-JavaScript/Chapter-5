"use strict";

const dataForge = require('data-forge');

dataForge.readFile("./data/monthly_crashes-cut-down.csv")
    .parseCSV()
    .then(dataFrame => {
        dataFrame = dataFrame.parseFloats([
            "Month#", 
            "Year", 
            "Crashes", 
            "Fatalities", 
            "Hospitalized"
        ]);
        console.log(dataFrame
            .getSeries("Fatalities")
            .head(3)
            .toString()
        );
    })
    .catch(err => {
        console.error(err && err.stack || err);
    });
