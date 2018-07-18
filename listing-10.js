"use strict";

const dataForge = require('data-forge');
const formulajs = require('formulajs');

dataForge.readFile("./data/monthly_crashes-cut-down.csv")
    .parseCSV()
    .then(dataFrame => {
        dataFrame = dataFrame.parseFloats([
            "Month#", "Year", "Crashes", "Fatalities", 
            "Hospitalized"
        ]);
        const monthNoSeries = dataFrame.getSeries("Month#");
        const xValues = monthNoSeries.head(6).toArray();
        const fatalitiesSeries = dataFrame.getSeries("Fatalities");
        const yValues = fatalitiesSeries.head(6).toArray();
        const nextMonthNo = monthNoSeries.skip(6).first();
        const nextMonthFatalitiesForecast = formulajs.FORECAST(nextMonthNo, yValues, xValues);
        console.log('Forecasted fatalities: ' + nextMonthFatalitiesForecast);
    })
    .catch(err => {
        console.error(err && err.stack || err);
    });
