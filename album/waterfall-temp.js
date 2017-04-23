	"use strict";
	function $(id){
		return document.getElementById(id);
	}
	
	function Waterfall(config){
		this.container = config.container;
		
		this.urlList=config.urlList;
		
		// 当前显示的组urlList中的编号
		this.index=0;
		
		this.columnClassName = config.columnClassName || "waterfall-column";
		this.elemClassName = config.elemClassName || "waterfall-elem";
		this.imgClassName = config.imgClassName || "waterfall-img";
		this.columnNum = config.columnNum || 4;
		this.margin = config.margin || "15px";
		this.width = config.width || "300px";
		
		this.columns=[];
		
		this.cladding=null;
	}
	Waterfall.prototype={
		constructor:Waterfall,
		
		init: function(){
			// 根据竖条条的数量和里边元素的margin 设置container的宽度
			this.container.style.width=(this.columnNum*parseInt(this.width)+2*this.columnNum*parseInt(this.margin))+"px";
			// 添加覆层
			this.cladding=document.createElement("div");
			var style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background-color:rgba(0, 0, 0, 0.8); ";
			this.bindStyle(this.cladding, style);
			document.getElementsByTagName("body")[0].appendChild(this.cladding);
			// 给container和覆层绑定点击事件
			myjs.addHandler(this.container, "click", this.containerClick.bind(this));
			myjs.addHandler(this.cladding, "click", this.claddingClick);
			// 创建columnNum个竖条条
			for(var i = 0; i<this.columnNum; i++){
				var column = document.createElement("div");
				column.className = this.columnClassName;
				this.columns.push(column);
				this.container.appendChild(column);
			}
			
			
			// 添加滚屏事件
			var that=this;
			window.onscroll = window.onmousewheel = window.onDOMMouseScroll = function() {
				var screenHeight = (document.documentElement.scrollTop || document.body.scrollTop) +(document.documentElement.clientHeight || document.body.clientHeight);
				var container = that.columns[that.getMinHeightIndex()];
				var containerHeight = container.offsetTop  + container.offsetHeight;
				if (containerHeight < screenHeight) {
					if(that.index < that.urlList.length){
						that.addImg(that.urlList[that.index++]);
					}
					
				}
			}
			
			// 不管3721先放16张图片上去
			for( ; this.index<16; this.index++){
				if(this.index<that.urlList.length){
					var urlArr=this.urlList[this.index];
					this.addImg(urlArr);
				}
			}
			
			
		},
		// IE和safari不能通过elem.style="**; **; **";批量设置style, 因此用这个方法批量添加样式语句
		bindStyle: function(elem, styleStr){
			var className=myjs.randomStr(10),
				style=document.createElement("style");
			myjs.addClass(elem, className);
			style.rel="stylesheet";
			style.type="text/css";
			style.innerHTML="."+className+"{"+styleStr+"}";
			document.getElementsByTagName("head")[0].appendChild(style);
			return [className, style];
		},
		// getMinHeightIndex
		getMinHeightIndex: function(){
			var index=0, min=this.columns[0].clientHeight;
			for(var i=1,len=this.columns.length; i<len; i++){
				if(this.columns[i].clientHeight<min){
					min=this.columns[i].clientHeight;
					index=i;
				}
			}
			return index;
		},
		// 点击事件绑定在外层container上
		containerClick: function(event){
			var e=myjs.getEvent(event),
				t=myjs.getTarget(e);
			
			if(t.tagName.toLowerCase() == "img" && t.targetSrc){
				this.displayImg(t.targetSrc);
			}
		},
		// 显示大图
		displayImg: function(url){
			var img = document.createElement("img");
			var that = this;
			
			img.src = url;
			
			this.cladding.style.display="block";
			this.cladding.appendChild(img);
			
			img.onload=function(){
				var sx=document.documentElement.clientWidth || document.body.clientWidth,
					sy=document.documentElement.clientHeight || document.body.clientHeight,
					x=this.width || this.style.width,
					y=this.height || this.style.height,
					scale= sx/x < sy/y ? sx/x : sy/y ;
				
				x*=scale*0.95;
				y*=scale*0.95;
				
				var style = "{position: fixed; width:"+x+"px; height:"+y+"px; top:50%; left:50%; margin-left:"+(-x/2-20)+"px; margin-top:"+(-y/2-20)+"px; border: 20px solid #fff; border-radius:20px;}";
				that.bindStyle(this, style);
			}
			
		},
		// 覆层点击消失
		claddingClick: function(event){
			this.innerHTML="";
			this.style.display="none";
		},
		// 根据传入的 srcArr 里的数据 往竖条条里放图片
		addImg: function(srcArr){
			var elem=document.createElement("div"),
				img=document.createElement("img");
			img.targetSrc=srcArr[1];
			img.src=srcArr[0];
			img.style.width=this.width;
			img.className=this.imgClassName;
			img.alt="瀑布流相册";
			elem.className = this.elemClassName;
			elem.style.margin=this.margin;
			elem.appendChild(img);
			this.columns[this.getMinHeightIndex()].appendChild(elem);
		},
	}
	
	
	
	