'use strict';

var dataForge = require('data-forge');
var formulajs = require('formulajs');

dataForge.readFile('../data/monthly_crashes-cut-down.csv')
    .parseCSV()
    .then(dataFrame => {
        dataFrame = dataFrame
            .parseFloats([
                 "Month#", "Year", "Crashes",
                "Fatalities", "Hospitalized"
            ])
            .setIndex("Month#");
        var fatalitiesSeries = dataFrame.getSeries("Fatalities");
        var fatalitiesSeriesWithForecast = fatalitiesSeries.rollingWindow(6)
            .asPairs()
            .select(pair => {
                var window = pair[1];
                var fatalitiesValues = window.toArray();
                var monthNoValues = window.getIndex().toArray();
                var nextMonthNo = monthNoValues[monthNoValues.length-1] + 1;
                return [
                    nextMonthNo,
                    formulajs.FORECAST(nextMonthNo, fatalitiesValues, monthNoValues)
                ];
            })
            .asValues();
        var dataFrameWithForecast = dataFrame.withSeries({ Trend: fatalitiesSeriesWithForecast });
        console.log(dataFrameWithForecast.toString());
    })
    .catch(err => {
        console.error(err && err.stack || err);
    });
