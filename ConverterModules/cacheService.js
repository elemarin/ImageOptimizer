const NodeCache = require("node-cache");

const cache = new NodeCache({
    stdTTL: 20
});

function storeValue(key, value){
    cache.set(key, value);
}

function getValue(key){
    return cache.get(key);
}

module.exports = {
    getValue: getValue,
    storeValue: storeValue
}