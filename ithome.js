var http=require('https')
var cheerio=require('cheerio')
var url='https://win10.ithome.com/'


function processing(html){
	var $=cheerio.load(html)
	var news=$('.new')
	var processingData=[]
	
	news.each(function(item){
		var newlist=$(this)
		var newsTitle=newlist.find('.title').text().trim()
		var newsUrl=newlist.find('a').attr('href')
//		var newsUrl=urla.attr('href')
		var pushData={
			newsTitle:newsTitle,
			newsurl:newsUrl
		}
		processingData.push(pushData)
	})
	return processingData
}


function printData(resultData){
	resultData.forEach(function(item){
		var newsTitle=item.newsTitle
		var urldate=item.newsurl
		console.log(newsTitle+'  '+urldate+'\n')
	})
}



http.get(url,function(res){
	var html=""
	res.on('data',function(data){
		html+=data
	})
	res.on('end',function(){
		var resultData=processing(html)
		printData(resultData)
//		console.log(html)
	}).on("error",function(){
		console.log("抓取IT新闻数据出错")
	})
	
})
