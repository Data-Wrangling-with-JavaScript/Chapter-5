'use strict';

const dataForge = require('data-forge');
const formulajs = require('formulajs');

dataForge.readFile('../data/monthly_crashes-cut-down.csv')
    .parseCSV()
    .then(dataFrame => {
        dataFrame = dataFrame
            .parseFloats(["Month#", "Year", "Crashes", "Fatalities", "Hospitalized"])
            .setIndex("Month#");
        const fatalitiesSeries = dataFrame.getSeries("Fatalities");
        const fatalitiesSeriesWithForecast = fatalitiesSeries.rollingWindow(6) // Returns a series of windows.
            .asPairs() // Deal with index/value pairs.
            .select(pair => { // Transform each window into a forecast indexed by month#.
                const window = pair[1];
                const fatalitiesValues = window.toArray();
                const monthNoValues = window.getIndex().toArray();
                const nextMonthNo = monthNoValues[monthNoValues.length-1] + 1;
                return [
                    nextMonthNo,
                    formulajs.FORECAST(nextMonthNo, fatalitiesValues, monthNoValues)
                ];
            })
            .asValues(); // Convert back to series of values.
        const dataFrameWithForecast = dataFrame.withSeries({ 
            Trend: fatalitiesSeriesWithForecast 
        });
        return dataFrameWithForecast
            .asCSV()
            .writeFile("../output/trend_output.csv");
    })
    .catch(err => {
        console.error(err && err.stack || err);
    });
