const http = require("superagent");

module.exports = async (keyword, page) => await http.get(baseURL).set(headers).query({
	keyword,
	page
});
