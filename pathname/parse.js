"use strict"

var parseQueryString = require("../querystring/parse")

// Returns `{path, params}` from `url`
module.exports = function(url) {
	var queryIndex = url.indexOf("?")
	var hashIndex = url.indexOf("#")
	var queryEnd = hashIndex < 0 ? url.length : hashIndex
	var pathEnd = queryIndex < 0 ? queryEnd : queryIndex
	var path = url.slice(0, pathEnd).replace(/\/{2,}/g, "/")
	var params = {}

	if (!path) path = "/"
	else {
		if (path[0] !== "/") path = "/" + path
		if (path.length > 1 && path[path.length - 1] === "/") path = path.slice(0, -1)
	}
	// Note: these are reversed because `parseQueryString` appends parameters
	// only if they don't exist. Please don't flip them.
	if (queryIndex >= 0) parseQueryString(url.slice(queryIndex + 1, queryEnd), params)
	if (hashIndex >= 0) parseQueryString(url.slice(hashIndex + 1), params)
	return {path: path, params: params}
}
