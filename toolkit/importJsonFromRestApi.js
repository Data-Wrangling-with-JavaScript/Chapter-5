'use strict';

const request = require('request-promise');

function importJsonFromRestApi (url) {
    return request.get({
            uri: url,
            json: true
        });
};

module.exports = importJsonFromRestApi;