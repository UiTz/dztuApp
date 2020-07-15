'use strict';
const cheerio = require("cheerio");
const http = require("superagent");
const baseURL = "http://www.adoutu.com/search";
const headers = {
	"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36"
};

exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event : ' + event)
	const {
		keyword,
		page = 1
	} = event;
	const {
		text: html
	} = await http.get(baseURL).set(headers).query({
		keyword,
		page
	});
	const $ = cheerio.load(html);
	const items = []
	$("#search-results-picture .picture-list a > img").each(function() {
		const $this = $(this)
		let title = $this.attr('title') || keyword
		let url = $this.attr('src')
		items.push({
			title,
			url
		})
	})
	//返回数据给客户端
	return items
};
