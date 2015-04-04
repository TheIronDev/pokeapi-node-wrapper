'use strict';

var api = require('../index.js'),
	assert = require('assert'),
	async = require('async');

describe('Testing Endpoints', function() {

	it('should have the appropriate endpoints', function(done) {

		assert.notEqual(api.getPokedex, undefined);
		assert.notEqual(api.getPokemon, undefined);
		assert.notEqual(api.getType, undefined);
		assert.notEqual(api.getMove, undefined);
		assert.notEqual(api.getAbility, undefined);
		assert.notEqual(api.getEggGroup, undefined);
		assert.notEqual(api.getDescription, undefined);
		assert.notEqual(api.getSprite, undefined);
		assert.notEqual(api.getGame, undefined);

		done();
	});

	it('should not map to non-existent endpoints', function(done) {
		assert.equal(api.getNonExistantEndpoint, undefined);
		done();
	});

	it('should return appropriate information for /pokemon/25 (Pikachu)', function(done) {
		api.getPokemon(25, function(err, result) {
			assert.equal(err, null);
			assert.equal(result.name, 'Pikachu');
			done();
		});
	});

	it('should return an error for an inappropriate id', function(done) {
		api.getPokemon('bacon cheeseburger', function(err, result) {
			assert.notEqual(err, null);
			done();
		});
	});

	it('should return an error for an id that is too large', function(done) {
		api.getPokemon(9999999, function(err, result) {
			assert.notEqual(err, null);
			done();
		});
	});

	/**
	 * I know, I know, this is an integration test. I still find it helpful for debugging.
	 */
	it('should verify all the endpoints', function(done) {
		var endpoints = [
			['getPokedex', 1],
			['getPokemon', 1],
			['getType', 1],
			['getMove', 1],
			['getAbility', 1],
			['getEggGroup', 1],
			['getDescription', 2], // Description seems to have a bug with id=1
			['getSprite', 1],
			['getGame', 1]
		];

		async.each(endpoints, function(endpoint, callback) {
			api[endpoint[0]](endpoint[1], function (err, result) {
				assert.equal(err, null);
				assert.notEqual(result, undefined);
				callback(err);
			});
		}, function(err) {
			assert.equal(err, null);
			done();
		});
	});
});