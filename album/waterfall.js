	"use strict";
	function $(id){
		return document.getElementById(id);
	}
	
	function Waterfall(config){
		// 由 @param config 传值
		this.container = config.container;
		this.img_arr=config.img_arr;
		this.imgWidth = config.imgWidth || 300;
		this.containerWidth = config.containerWidth || 1280;
		// 由 calcSize 方法计算得出
		this.columnNum = this.borderWidth = this.margin = 0;
		// 作为构造函数内部全局变量
		this.columns=[];
	}
	Waterfall.prototype={
		constructor:Waterfall,
		
		calcSize: function(){
			this.columnNum = Math.floor(this.containerWidth / this.imgWidth);
			this.borderWidth = this.margin = (this.containerWidth - this.columnNum * this.imgWidth) / (this.columnNum * 4);
		},
		
		init: function(){
			this.calcSize();
			for(var i = 0, len = this.columnNum; i < len; i++){
				var column = this.newElem("div", "waterfall-column");
				column.style.margin = "0 " + this.margin + "px";
				column.style.width = (this.imgWidth + this.borderWidth + this.margin) + "px";
				this.columns.push(this.container.appendChild(column));
			}
			
			for(var i = 0, len = this.img_arr.length; i < len; i++){
				var n = i % this.columnNum;
				this.columns[n].appendChild(this.createSmallImage(this.img_arr[i]));
			}
			
		},
		
		/*	根据 img_dateStr & img_description & smallUrl & bigUrl 创建小图元素
		 *	返回Fragment实例
		 */
		createSmallImage: function(img_obj){
			var frag = document.createDocumentFragment();
			var container = this.newElem("div", "album-image-small-container");
			frag.appendChild(container);
			var header = this.newElem("div", "album-image-small-header");
			container.appendChild(header);
			var body = this.newElem("div", "album-image-small-body");
			container.appendChild(body);
			var aside = this.newElem("div", "album-image-small-aside");
			container.appendChild(aside);
			var footer = this.newElem("div", "album-image-small-footer", img_obj.img_dateStr);
			container.appendChild(footer);
			var img = this.newElem("img", "album-image-small-img");
			body.appendChild(img);
			
			img.src = img_obj.smallUrl;
			img.targetSrc = img_obj.bigUrl;
			img.createDate = img_obj.dateStr;
			img.alt = img_obj.img_description;
			img.title = "点击查看大图";
			
			img.style.border = this.borderWidth + "px solid #fff";
			
			
			
			return frag;
		},
		
		/*	根据参数新建元素, 主要函数为document.createElement(type);
		 *	
		 *	@param type: 元素类别, 必需, 诸如"div", "ul", "p", 可为内联元素
		 *	@param className: 类名, 非必需, 如不需要, 建议设为null
		 *	@param textNode: 文本, 非必需, 如不需要, 建议设为null 直接作为返回元素的文本子节点
		 */
		newElem: function(type, className, textNode){
			var elem = document.createElement(type);
			if(!!className){
				elem.className = className;
			}
			if(!!textNode){
				elem.appendChild(document.createTextNode(textNode));
			}
			return elem;
		},
		
		
		
		
		
		
		/*
		
		
		// 旧的原型方法
		// 旧的原型方法
		// 旧的原型方法
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
		
		*/
		
		
		
	}
	
	
	
	