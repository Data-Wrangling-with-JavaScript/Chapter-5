"use strict";

const dataForge = require('data-forge');
const formulajs = require('formulajs');

dataForge.readFile("./data/monthly_crashes-cut-down.csv")
    .parseCSV()
    .then(dataFrame => {
        dataFrame = dataFrame
            .parseFloats([
                 "Month#", "Year", "Crashes",
                "Fatalities", "Hospitalized"
            ])
            .setIndex("Month#");
        const fatalitiesSeries = dataFrame.getSeries("Fatalities");
        const fatalitiesSeriesWithForecast = fatalitiesSeries.rollingWindow(6)
            .select(window => {
                const fatalitiesValues = window.toArray();
                const monthNoValues = window.getIndex().toArray();
                const nextMonthNo = monthNoValues[monthNoValues.length-1] + 1;
                return [
                    nextMonthNo,
                    formulajs.FORECAST(nextMonthNo, fatalitiesValues, monthNoValues)
                ];
            })
            .withIndex(pair => pair[0])
            .select(pair => pair[1]);
        const dataFrameWithForecast = dataFrame.withSeries({ Trend: fatalitiesSeriesWithForecast });
        console.log(dataFrameWithForecast.toString());
    })
    .catch(err => {
        console.error(err && err.stack || err);
    });
