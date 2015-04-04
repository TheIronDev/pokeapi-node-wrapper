# PokeApi Node Wrapper

This is a simple node wrapper to the [PokéApi](http://pokeapi.co/) api.

## Usage:

Requiring in the node-wrapper will return an object literal that exposes functions that access the endpoints.

```javascript

var pokeApi = require('pokeapi-node-wrapper'),
    callback = function(err, jsonResponse) {
        // Implement
    };

pokeApi.getPokedex(1, callback);
pokeApi.getPokemon(1, callback);
pokeApi.getType(1, callback);
pokeApi.getMove(1, callback);
pokeApi.getAbility(1, callback);
pokeApi.getEggGroup(1, callback);
pokeApi.getDescription(2, callback);
pokeApi.getSprite(1, callback);
pokeApi.getGame(1, callback);
```

A great place to start would be checking out `test/index.js`.

## API Documentation

For a more thorough documentation of what server responses to expect, checkout [PokéApi's Docs](http://pokeapi.co/docs/)