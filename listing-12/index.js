'use strict';

var dataForge = require('data-forge');
var formulajs = require('formulajs');

dataForge.readFile('../data/monthly_crashes-cut-down.csv')
    .parseCSV()
    .then(dataFrame => {
        dataFrame = dataFrame
            .parseFloats(["Month#", "Year", "Crashes", "Fatalities", "Hospitalized"])
            .setIndex("Month#");
        var fatalitiesSeries = dataFrame.getSeries("Fatalities");
        var fatalitiesSeriesWithForecast = fatalitiesSeries.rollingWindow(6) // Returns a series of windows.
            .asPairs() // Deal with index/value pairs.
            .select(pair => { // Transform each window into a forecast indexed by month#.
                var window = pair[1];
                var fatalitiesValues = window.toArray();
                var monthNoValues = window.getIndex().toArray();
                var nextMonthNo = monthNoValues[monthNoValues.length-1] + 1;
                return [
                    nextMonthNo,
                    formulajs.FORECAST(nextMonthNo, fatalitiesValues, monthNoValues)
                ];
            })
            .asValues(); // Convert back to series of values.
        var dataFrameWithForecast = dataFrame.withSeries({ 
            Trend: fatalitiesSeriesWithForecast 
        });
        return dataFrameWithForecast
            .asCSV()
            .writeFile("../output/trend_output.csv");
    })
    .catch(err => {
        console.error(err && err.stack || err);
    });
