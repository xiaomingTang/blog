
window.onload=function(){
	"use strict";
	
	function Album(config){
		this.config = (config);
		// 全屏覆层
		this.fullScreenCladding = document.body.appendChild(document.createElement("div"));
		this.fullScreenCladding.className = "fullScreenCladding hidden";
		// 全屏大图
		this.fullScreenImg = this.fullScreenCladding.appendChild(document.createElement("img"));
		this.fullScreenImg.className = "fullScreenImg";
		// 可编辑、易修改头文件样式节点, 专用于设置 this.fullScreenImg 的样式
		this.stylesheet = document.getElementsByTagName("head")[0].appendChild(document.createElement("style"));
	}
	Album.prototype = {
		constructor: Album,
		
		//	----------------
		//	--构建html骨架--
		//	----------------
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
			
			return frag;
		},
		/*	根据 category_title & category_description & category_lastModify & category_cover_url 创建类目封面元素
		 *	返回Fragment实例
		 */
		createCategoryCover: function(category_obj){
			var frag = document.createDocumentFragment();
			var container = this.newElem("div", "album-category-cover-container");
			frag.appendChild(container);
			var header = this.newElem("div", "album-category-cover-header");
			container.appendChild(header);
			var body = this.newElem("div", "album-category-cover-body");
			container.appendChild(body);
			var imgBox=this.newElem("div", "album-category-cover-imgBox");
			body.appendChild(imgBox);
			var aside = this.newElem("div", "album-category-cover-aside");
			container.appendChild(aside);
			var footer = this.newElem("div", "album-category-cover-footer", category_obj.category_lastModify);
			container.appendChild(footer);
			var img = this.newElem("img", "album-category-cover-img");
			imgBox.appendChild(img);
			
			img.src = category_obj.category_cover_url;
			img.targetCategory = category_obj;
			
			return frag;
		},
		/*	根据 album_title & album_description & album_img 创建相册元素, 覆层及大图事件于此绑定
		 *	返回Fragment实例
		 */
		createAlbum: function(config_obj){
			// 为全屏覆层添加点击事件
			myjs.addHandler(this.fullScreenCladding, "mousedown", this.handleMouseDown.bind(this));
			// 为全屏覆层添加滚动事件
			myjs.addHandler(this.fullScreenCladding, "mousewheel", this.handleMouseWheel.bind(this));
			myjs.addHandler(this.fullScreenCladding, "DOMMouseScroll", this.handleMouseWheel.bind(this));
			// 为全屏大图添加load事件
			myjs.addHandler(this.fullScreenImg, "load", this.imgOnload.bind(this));
			
			var frag = document.createDocumentFragment();
			var container = this.newElem("div", "album-container");
			frag.appendChild(container);
			var header = this.newElem("div", "album-header");
			container.appendChild(header);
			var title = this.newElem("h1", "album-title", config_obj.album_title);
			header.appendChild(title);
			var aside = this.newElem("div", "album-aside", config_obj.album_description);
			container.appendChild(aside);
			var body = this.newElem("div", "album-body");
			container.appendChild(body);
			var categoriesList = this.newElem("ul", "album-categories");
			body.appendChild(categoriesList);
			// 创建目录
			for(var i = 0, leni = config_obj.album_img.length; i < leni; i++){
				var category_obj = config_obj.album_img[i];
				var category = this.newElem("li", "album-category");
				categoriesList.appendChild(category);
				var category_header = this.newElem("div", "album-category-header");
				category.appendChild(category_header);
				var category_title = this.newElem("h2", "album-category-title", category_obj.category_title);
				category_header.appendChild(category_title);
				var category_cover = this.createCategoryCover(category_obj);
				category_header.appendChild(category_cover);
				var category_body = this.newElem("div", "album-category-body hidden");
				category.appendChild(category_body);
				
			}
			return frag;
			
		},
		
		
		//	----------------
		//	----应用方法----
		//	----------------
		// 全屏显示@param url
		displayFullScreen: function(url){
			
			myjs.delClass(this.fullScreenCladding,"hidden");
			// 清楚上次残存样式
			this.stylesheet.innerHTML = "";
			this.fullScreenImg.style.width = "";
			this.fullScreenImg.style.height = "";
			
			this.fullScreenImg.src = url;
		},
		//	退出全屏
		exitFullScreen: function(){
			this.fullScreenImg.src = "";
			// 清楚残余样式
			this.fullScreenImg.style.width = "";
			this.fullScreenImg.style.height = "";
			this.stylesheet.innerHTML = "";
			
			myjs.addClass(this.fullScreenCladding, "hidden");
		},

		//	----------------
		//	--事件处理方法--
		//	----------------
		//	全屏显示图片
		//	this.fullScreenImg大图加载完成事件
		imgOnload: function(){
			var sx = document.documentElement.clientWidth || document.body.clientWidth;
			var	sy = document.documentElement.clientHeight || document.body.clientHeight;
			var	x = this.fullScreenImg.width;
			var	y = this.fullScreenImg.height;
			var	scale = sx/x < sy/y ? sx/x : sy/y ;
			var borderWidth = 20;
			
			x *= scale * 0.95;
			y *= scale * 0.95;
			
			//	设置内联样式, 便于缩放及移动
			this.fullScreenImg.style.width = x + "px";
			this.fullScreenImg.style.height = y + "px";
			this.fullScreenImg.style.marginLeft = (-x/2 - borderWidth) + "px";
			this.fullScreenImg.style.marginTop = (-y/2 - borderWidth) + "px";
			
			this.stylesheet.innerHTML = ".fullScreenImg{position: fixed; top:50%; left:50%; border: " + borderWidth + "px solid #fff; border-radius:" + borderWidth + "px;}";
			
		},
		//	缩放全屏大图图片, 仅本原型可用, 使用时应将其作用域绑定到 Album 的实例上, 其他情况套用需修改参数
		handleMouseWheel: function(event){
			var e = myjs.getEvent(event);
			
			var co = 1 + 0.02 * myjs.getWheelDelta(e) / 120;
			
			myjs.preventDefault(e);
			
			var old_w = parseFloat(this.fullScreenImg.style.width);
			var old_h = parseFloat(this.fullScreenImg.style.height);
			var old_ml = parseFloat(this.fullScreenImg.style.marginLeft);
			var old_mt = parseFloat(this.fullScreenImg.style.marginTop)
			var _w = old_w * co;
			var _h = old_h * co;
			var _left = old_ml - (co - 1) * old_w / 2;
			var _top = old_mt - (co - 1) * old_h / 2;
			
			this.fullScreenImg.style.width=_w+"px";
			this.fullScreenImg.style.height=_h+"px";
			this.fullScreenImg.style.marginTop=_top+"px";
			this.fullScreenImg.style.marginLeft=_left+"px";
		},
		//	点击实现全屏大图的拖拽, 仅本原型可用, 使用时应将其作用域绑定到 Album 的实例上
		handleMouseDown: function(event){
				var e = myjs.getEvent(event),
					posX = e.clientX,
					posY = e.clientY,
					isMoved = false;
				
				myjs.preventDefault(e);
				
				var that = this;
				
				this.fullScreenCladding.onmousemove = function(_event){
					isMoved = true;
					console.log(isMoved);
					var _e = myjs.getEvent(_event),
						dx = _e.clientX-posX,
						dy = _e.clientY-posY,
						_left=parseInt(that.fullScreenImg.style.marginLeft),
						_top=parseInt(that.fullScreenImg.style.marginTop);
					
					posX = _e.clientX;
					posY = _e.clientY;
					that.fullScreenImg.style.marginLeft = (_left+dx)+"px";
					that.fullScreenImg.style.marginTop = (_top+dy)+"px";
				};
				this.fullScreenCladding.onmouseup = function(){
					that.fullScreenCladding.onmousemove = null;
					that.fullScreenCladding.onmouseup = null;
					that.fullScreenCladding.onmouseleave = null;
					if(!isMoved){
						that.exitFullScreen();
					}
				};
			},
		//	展示小图(小图区默认display: none)
		displaySmallImg: function(event){
			var e = myjs.getEvent(event);
			var t = myjs.getTarget(e);
			var selfBox = t.parentNode.parentNode.parentNode;
			var targetBox = selfBox.parentNode.parentNode.getElementsByClassName("album-category-body")[0];
			
			var li = selfBox.parentNode.parentNode;
			var ul = li.parentNode;
			
			console.log(ul);
			console.log(li);
			
			var index = 0;
			var arr = ul.getElementsByClassName("album-category");
			for(var i = 0, len = arr.length; i < len; i++){
				console.log(arr[i]);
				if(arr[i] === li){
					index = i;
					break;
				}
			}
			
			myjs.addClass(selfBox, "hidden");
			myjs.delClass(targetBox, "hidden");
			
			var cfg = {
				container: targetBox,
				img_arr: this.config.album_img[index].category_img,
				containerWidth: 960,
			}
			var waterfall = new Waterfall(cfg);
			waterfall.init();
			
			
		},
		//	----------------
		//	---基础方法区---
		//	----------------
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
		
	/*	原型于此处完结, 如有添加, 请于该行以上
	 */
	}
	
	// 相册配置
	var config_obj = {
		album_title: "锋哥，我好崇拜你！",
		album_description: "锋哥相册，必须叼！",
		album_img: [	//相册所有图片
			{	// 茶溪谷
				category_title: "茶溪谷",
				category_description: "锋哥为我国旅游事业做过的一点微小的贡献",
				category_lastModify: "2017-04-20",
				category_cover_url: "img/feng/chaxigu-8/small_1.jpg",
				category_img: [	// 日期、描述、小图地址、大图地址
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/chaxigu-8/small_1.jpg",
						bigUrl: "img/feng/chaxigu-8/big_1.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/chaxigu-8/small_2.jpg",
						bigUrl: "img/feng/chaxigu-8/big_2.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/chaxigu-8/small_3.jpg",
						bigUrl: "img/feng/chaxigu-8/big_3.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/chaxigu-8/small_4.jpg",
						bigUrl: "img/feng/chaxigu-8/big_4.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/chaxigu-8/small_5.jpg",
						bigUrl: "img/feng/chaxigu-8/big_5.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/chaxigu-8/small_6.jpg",
						bigUrl: "img/feng/chaxigu-8/big_6.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/chaxigu-8/small_7.jpg",
						bigUrl: "img/feng/chaxigu-8/big_7.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/chaxigu-8/small_8.jpg",
						bigUrl: "img/feng/chaxigu-8/big_8.jpg",
					},
				],
			},
			{	// 海柴角
				category_title: "海柴角",
				category_description: "锋哥为我国旅游事业做过的一点微小的贡献",
				category_lastModify: "2017-04-20",
				category_cover_url: "img/feng/haichaijiao-12/small_1.jpg",
				category_img: [	// 日期、描述、小图地址、大图地址
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/haichaijiao-12/small_1.jpg",
						bigUrl: "img/feng/haichaijiao-12/big_1.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/haichaijiao-12/small_2.jpg",
						bigUrl: "img/feng/haichaijiao-12/big_2.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/haichaijiao-12/small_3.jpg",
						bigUrl: "img/feng/haichaijiao-12/big_3.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/haichaijiao-12/small_4.jpg",
						bigUrl: "img/feng/haichaijiao-12/big_4.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/haichaijiao-12/small_5.jpg",
						bigUrl: "img/feng/haichaijiao-12/big_5.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/haichaijiao-12/small_6.jpg",
						bigUrl: "img/feng/haichaijiao-12/big_6.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/haichaijiao-12/small_7.jpg",
						bigUrl: "img/feng/haichaijiao-12/big_7.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/haichaijiao-12/small_8.jpg",
						bigUrl: "img/feng/haichaijiao-12/big_8.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/haichaijiao-12/small_9.jpg",
						bigUrl: "img/feng/haichaijiao-12/big_9.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/haichaijiao-12/small_10.jpg",
						bigUrl: "img/feng/haichaijiao-12/big_10.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/haichaijiao-12/small_11.jpg",
						bigUrl: "img/feng/haichaijiao-12/big_11.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/haichaijiao-12/small_12.jpg",
						bigUrl: "img/feng/haichaijiao-12/big_12.jpg",
					},
				],
			},
			{	// 牛奶排
				category_title: "牛奶排",
				category_description: "锋哥为我国旅游事业做过的一点微小的贡献",
				category_lastModify: "2017-04-20",
				category_cover_url: "img/feng/niunaipai-15/small_1.jpg",
				category_img: [	// 日期、描述、小图地址、大图地址
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/niunaipai-15/small_1.jpg",
						bigUrl: "img/feng/niunaipai-15/big_1.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/niunaipai-15/small_2.jpg",
						bigUrl: "img/feng/niunaipai-15/big_2.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/niunaipai-15/small_3.jpg",
						bigUrl: "img/feng/niunaipai-15/big_3.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/niunaipai-15/small_4.jpg",
						bigUrl: "img/feng/niunaipai-15/big_4.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/niunaipai-15/small_5.jpg",
						bigUrl: "img/feng/niunaipai-15/big_5.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/niunaipai-15/small_6.jpg",
						bigUrl: "img/feng/niunaipai-15/big_6.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/niunaipai-15/small_7.jpg",
						bigUrl: "img/feng/niunaipai-15/big_7.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/niunaipai-15/small_8.jpg",
						bigUrl: "img/feng/niunaipai-15/big_8.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/niunaipai-15/small_9.jpg",
						bigUrl: "img/feng/niunaipai-15/big_9.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/niunaipai-15/small_10.jpg",
						bigUrl: "img/feng/niunaipai-15/big_10.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/niunaipai-15/small_11.jpg",
						bigUrl: "img/feng/niunaipai-15/big_11.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/niunaipai-15/small_12.jpg",
						bigUrl: "img/feng/niunaipai-15/big_12.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/niunaipai-15/small_13.jpg",
						bigUrl: "img/feng/niunaipai-15/big_13.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/niunaipai-15/small_14.jpg",
						bigUrl: "img/feng/niunaipai-15/big_14.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/niunaipai-15/small_15.jpg",
						bigUrl: "img/feng/niunaipai-15/big_15.jpg",
					},
				],
			},
			{	// 七娘山
				category_title: "七娘山",
				category_description: "锋哥为我国旅游事业做过的一点微小的贡献",
				category_lastModify: "2017-04-20",
				category_cover_url: "img/feng/qiniangshan-3/small_1.jpg",
				category_img: [	// 日期、描述、小图地址、大图地址
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/qiniangshan-3/small_1.jpg",
						bigUrl: "img/feng/qiniangshan-3/big_1.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/qiniangshan-3/small_2.jpg",
						bigUrl: "img/feng/qiniangshan-3/big_2.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/qiniangshan-3/small_3.jpg",
						bigUrl: "img/feng/qiniangshan-3/big_3.jpg",
					},
				],
			},
			{	// 洋畴湾
				category_title: "洋畴湾",
				category_description: "锋哥为我国旅游事业做过的一点微小的贡献",
				category_lastModify: "2017-04-20",
				category_cover_url: "img/feng/yangchouwan-11/small_1.jpg",
				category_img: [	// 日期、描述、小图地址、大图地址
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/yangchouwan-11/small_1.jpg",
						bigUrl: "img/feng/yangchouwan-11/big_1.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/yangchouwan-11/small_2.jpg",
						bigUrl: "img/feng/yangchouwan-11/big_2.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/yangchouwan-11/small_3.jpg",
						bigUrl: "img/feng/yangchouwan-11/big_3.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/yangchouwan-11/small_4.jpg",
						bigUrl: "img/feng/yangchouwan-11/big_4.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/yangchouwan-11/small_5.jpg",
						bigUrl: "img/feng/yangchouwan-11/big_5.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/yangchouwan-11/small_6.jpg",
						bigUrl: "img/feng/yangchouwan-11/big_6.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/yangchouwan-11/small_7.jpg",
						bigUrl: "img/feng/yangchouwan-11/big_7.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/yangchouwan-11/small_8.jpg",
						bigUrl: "img/feng/yangchouwan-11/big_8.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/yangchouwan-11/small_9.jpg",
						bigUrl: "img/feng/yangchouwan-11/big_9.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/yangchouwan-11/small_10.jpg",
						bigUrl: "img/feng/yangchouwan-11/big_10.jpg",
					},
					{
						img_dateStr: "2017-04-20",
						img_description: "这张图片这么好看需要描述吗！",
						smallUrl: "img/feng/yangchouwan-11/small_11.jpg",
						bigUrl: "img/feng/yangchouwan-11/big_11.jpg",
					},
				],
			},
		],
		
		album_style: {
			arrangement: "waterfall",	//瀑布布局
		},
	}
	// 相册初始化
	var feng = new Album(config_obj);
	$("album").appendChild(feng.createAlbum(config_obj));
	
	
	window.onclick = function(event){
		var e = myjs.getEvent(event);
		var t = myjs.getTarget(e);
		
		switch(t.className.trim()){
			case "album-image-small-img":
				feng.displayFullScreen(t.targetSrc);
				break;
			case "fullScreenCladding":
				feng.exitFullScreen();
				break;
			
			case "album-category-cover-img":
				feng.displaySmallImg();
				break;
			
			
			
			
			default:
				break;
		}
		
		
	}
	
	
	
	
	
	
	
	
	
}
	
	
	
	
	
	
	
	
	
	
	
	
	