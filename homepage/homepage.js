 window.onload=function(){
	"use strict";
	function $(id){
		return document.getElementById(id);
	}
	
	//	生成文章和标签列表
	!function(){
		
		//	标签列表, 应作为全局变量
		//如"game"标签, 类名是"tag-game", 显示内容是"游戏";
		var tagList={
			html: "html",
			js: "js",
			css:"css",
			webTools: "web小工具",
			bat: "简单批处理",
			game: "游戏",
			life: "日常生活",
			github: "github",
			reprint: "转载",
			killtime:"闲聊",
		}

		//根据tagList动态创建侧边栏的标签列表
		!(function createTagList(){
			var ul=document.createElement("ul"),
				arr=Object.keys(tagList);
			for(var i=0, len=arr.length; i<len; i++){
				var li=myjs.newElem("li", "", "");
				li.appendChild(myjs.newElem("a", "tag-"+arr[i], tagList[arr[i]]));
				ul.appendChild(li);
			}
			$("tag-list").appendChild(ul);
		})();

		
		
		var articleElem = myjs.$("homepage").getElementsByTagName("article")[0];
		var article = [];
		
		var usualCH = {
			title: "常用汉字及其unicode编码",
			lastModified: "2017-4-21 15:09:06",
			tag: ["webTools", "html"],
			summary: "常用汉字及其unicode",
			recommandation: 4,
			url: "article/usualCH/index.html",
		}
		article.unshift(usualCH);
		
		var bat_rename = {
			title: "批量修改文件名",
			lastModified: "2017-04-23 23:54:19",
			tag: ["bat", "webTools", "life"],
			url: "article/bat-rename/index.html",
			summary: "上次弄一个相册，需要修改大量的文件名，全部修改为类似“small_1”、“big_2”这样的形式，就临时去看了看批处理一点教程（ps：命令行中任意命令后加“ /?”是该命令的详情）。自己捣鼓出了点简单的批处理，就在这里做个备忘吧。",
			recommandation: 4,
		}
		article.unshift(bat_rename);
		var html_characters = {
			title: "html字符与编码",
			lastModified: "2017-04-24  5:02:34",
			tag: ["html", "webTools"],
			url: "article/html-characters/index.html",
			summary: "html字符与编码，特殊字符已放大，方便观看。",
			recommandation: 4,
 		
		}
 		article.unshift(html_characters);
		var git_shell = {
			title: "git-Bash小教程",
			lastModified: "2017-04-24  6:19:11",
			tag: ["github", "bat", "killtime"],
			url: "article/git-shell/index.html",
			summary: "github客户端bash命令上传文件超简易教程，照葫芦画瓢，一看就会。",
			recommandation: 4,
 		
		}
 		article.unshift(git_shell);
		//将article数组中的所有文章动态创建出来
		for(var i=0, len=article.length; i<len; i++){
			articleElem.appendChild(createArticleSection(article[i]));
		}
		
		//分类栏添加点击事件
		//同类名修改样式, 文章重排序
		myjs.addHandler($("tag-list"), "click", function(event){
			var e=myjs.getEvent(event),
				t=myjs.getTarget(e),
				style=document.createElement("style"),
				head=document.getElementsByTagName("head")[0];
			if($("tag-style")){
				head.removeChild($("tag-style"));
			}
			if(/tag-(\w+)\b/g.test(t.className)){
				var tagName=RegExp.$1;
				style.rel="stylesheet";
				style.type="text/css";
				style.id="tag-style";
				style.innerHTML=".tag-"+tagName+"{color:#c23;}";
				head.appendChild(style);
				article.sort(function(a,b){
					return (b.tag.join("").indexOf(tagName) >= 0) - (a.tag.join("").indexOf(tagName) >= 0);
				});
				var articleElem=document.getElementsByTagName("article")[0];
				articleElem.innerHTML="";
				for(var i=0, len=article.length; i<len; i++){
					articleElem.appendChild(createArticleSection(article[i]));
				}
			}
		});
		
		//date对象按 2017-3-12 12:08:49 的格式返回字符串
		function displayTime(date){
			var y,m,d,h,min,s;
			y=date.getFullYear();
			m=date.getMonth()+1;
			d=date.getDate();
			h=date.getHours();
			min=date.getMinutes();
			s=date.getSeconds();
			return y+"-"+m+"-"+d+" "+h+":"+min+":"+s;
		}
		
		//	根据obj对象动态创建填充生成文章<section>区
		function createArticleSection(obj){
			var frag=document.createDocumentFragment(),
				article=myjs.newElem("section", "article"),
				head=myjs.newElem("section", "article-head"),
				title=myjs.newElem("a", "article-title", obj.title),
				time=myjs.newElem("time", "", obj.lastModified),
				aButton=myjs.newElem("a", "button", "复制本文链接"),
				tip=myjs.newElem("section", "article-tip"),
				tag=myjs.newElem("label", "", ""),
				tag_span=myjs.newElem("span", "", "标签："),
				summary=myjs.newElem("section", "article-summary"),
				p=myjs.newElem("p", "", obj.summary),
				foot=myjs.newElem("section", "article-foot"),
				aCheckAll=myjs.newElem("a", "article-all", "查看更多");
			
			tag.appendChild(tag_span);
			for(var i=0, len=obj.tag.length; i<len; i++){
				var tag_child=myjs.newElem("a", "tag-"+obj.tag[i], tagList[obj.tag[i]])
				tag.appendChild(tag_child);
			}
			//头部
			frag.appendChild(article);
			article.appendChild(head);
			head.appendChild(title);
			title.href=obj.url;
			title.target="_blank";
			head.appendChild(time);
			head.appendChild(aButton);
			//腰部
			article.appendChild(tip);
			tip.appendChild(tag);
			//文章简介
			article.appendChild(summary);
			summary.appendChild(p);
			//查看全文
			article.appendChild(foot);
			foot.appendChild(aCheckAll);
			
			return frag;
		}
		
	}();
	
	//	轮播图配置
 	!function(){
		var config={
				container: myjs.$("carousel"),
				imgList: ["homepage/img/1.jpg", "homepage/img/2.jpg", "homepage/img/3.jpg"],
				width: 1200,
				height: 300,
				delay: 5000,
			},
			carousel=new Carousel(config);
		carousel.init();
		
	}();
	
	//	全屏显示大图
	myjs.$("me").onclick = function(){
		fullScreenDisplay(this.src);
	}
	
	//	日历
	!function(){
		var config = {
			date: new Date(),			//	初始化日期
			container: myjs.$("calendar"),	//	容器
			selectable: false,			//	顶部月份年份是否可选
			suitable: false,			//	行数是否自适应（或固定6行）
			selectType: 1,				//	主体日期是否可选（0--不可选**1--可选单个日期**2--可选时间段）
		};
		var calendar = new Calendar(config);
		
		calendar.init();
	}();
	
	//	搜索框
	!function(){
		
		var config = {
			targetElem: myjs.$("md5"),
			width: "300px",
			height: "35px",
			inpDT: "md5",
			btnDT: "确认",
			fn: search
		}
		
		var easyInput = new EasyInput(config);
		easyInput.init();
		function search(){
			alert(myjs.md5(easyInput.searchValue));
		}
		
	}();
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}