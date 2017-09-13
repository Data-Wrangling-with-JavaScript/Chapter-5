'use strict';

var dataForge = require('data-forge');
var formulajs = require('formulajs');

dataForge.readFile('../data/monthly_crashes-cut-down.csv')
    .parseCSV()
    .then(dataFrame => {
        dataFrame = dataFrame.parseFloats([
            "Month#", "Year", "Crashes", "Fatalities", 
            "Hospitalized"
        ]);
        var monthNoSeries = dataFrame.getSeries("Month#");
        var xValues = monthNoSeries.take(6).toArray();
        var fatalitiesSeries = dataFrame.getSeries("Fatalities");
        var yValues = fatalitiesSeries.take(6).toArray();
        var nextMonthNo = monthNoSeries.skip(6).first();
        var nextMonthFatalitiesForecast = formulajs.FORECAST(nextMonthNo, yValues, xValues);
        console.log('Forecasted fatalities: ' + nextMonthFatalitiesForecast);
    })
    .catch(err => {
        console.error(err && err.stack || err);
    });
