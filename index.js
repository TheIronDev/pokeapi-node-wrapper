'use strict';

var request = require('request'),
	serviceLayout = require('./serviceLayout');

var apiUrl = serviceLayout.apiUrl,
	serviceEndpoints = serviceLayout.endpoints,
	endpoints = Object.keys(serviceEndpoints),
	idRegEx = new RegExp(/\:id/);

/**
 * We are returning an object literal that exposes each of the service endpoints as functions.
 *
 * Each of these endpoints expects 2 arguments:
 *  id - the id we want to tack onto the endpoint url
 *  callback - a callback that should expect the following:
 *      callback(error, jsonResponse)
 */
module.exports = endpoints.reduce(function(memo, endpoint) {
	memo[endpoint] = function(id, callback) {

		// Sanitize the id coming in
		id = parseInt(id, 10);

		if (typeof id !== 'number') {
			return callback('Id is not in a numeric format');
		}

		var endpointUrl = apiUrl + serviceEndpoints[endpoint],
			endpointUrlWithId = endpointUrl.replace(idRegEx, id);

		request(endpointUrlWithId, function (err, response, body) {
			if (err || !(response && body)) {
				if (err) {
					return callback(err);
				}
				return callback('There was an error retrieving the pokemon data');
			}
			callback(null, JSON.parse(body));
		});
	};
	return memo;
}, {});