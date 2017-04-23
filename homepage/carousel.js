	
	
	
	/*	横向轮播图
	 *	初始化为传入一个obj对象，其中以下为必须项
	 *	imgList: 图片的寻址地址字符串
	 *	container: 轮播图容器
	 *	width: 图片的宽度（这里图片宽度与容器宽度须相等，如不等需修改原型内参数）
	 *	使用方法为: var carousel = new Carousel(config);	carousel.init();
	 *	需附带配套的carousel.css文件
	 *	css文件中有一处需修改, 即图片的宽度和高度, 已在css文件中标出
	 */
	function Carousel(obj){
		//	轮播图片列表（url）！！必须
		this.imgList = obj.imgList;
		//	轮播图容器（element元素）！！必须
		this.container = obj.container;
		//	容器宽度（number类型）！！必须
		this.width = obj.width;
		//	容器高度（number类型）！！可缺省
		this.height = obj.height;
		//	自动轮播延迟时间（可选）（number类型）
		this.delay=obj.delay || 2000;
		//	当前显示图片（可选）（number类型）
		this.index = obj.index || 0;
		
		//	以下为实例内全局变量
		//	将待轮播图片数量缓存起来
		this.num = this.imgList.length;
		//	图片容器, 缓存起来助于查找
		this.imgBox = undefined;
		//	li, 缓存起来, 助于查找
		this.lis = [];
		//	手动切图 setInterval 的 id 号
		this.loop = null;
		//	自动轮播 setInterval 的 id 号
		this.autoloop = null;
	}
	Carousel.prototype={
		constructor:Carousel,
		
		init: function(){
			frag = document.createDocumentFragment();
			leftBtn = myjs.newElem("div", "carousel-leftBtn", "<<");
			rightBtn = myjs.newElem("div", "carousel-rightBtn", ">>");
			this.imgBox = myjs.newElem("div", "carousel-imgBox");
			navBar = myjs.newElem("div", "carousel-navBar")
			ul = myjs.newElem("ul", "carousel-navBar-ul");
			
			frag.appendChild(this.imgBox);
			frag.appendChild(leftBtn);
			frag.appendChild(rightBtn);
			frag.appendChild(navBar);
			navBar.appendChild(ul);
			
			this.imgBox.style.width = (this.num * this.width) + "px";
			this.imgBox.style.left = -this.index * this.width;
			
			for(var i = 0; i < this.num; i++){
				var img = myjs.newElem("img", "carousel-imgBox-img");
				img.src = this.imgList[i];
				this.imgBox.appendChild(img);
				
				var li = myjs.newElem("li", "carousel-navBar-li");
				li.index = i;
				ul.appendChild(li);
				if(this.index == i){
					myjs.addClass(li, "current");
				}
				this.lis.push(li);
			}
			
			this.container.appendChild(frag);
			
			myjs.addHandler(this.container, "click", this.handler.bind(this));
			myjs.addHandler(this.container, "mouseover", this.preventAutoplay.bind(this));
			myjs.addHandler(this.container, "mouseleave", this.autoPlay.bind(this));
			
			this.autoPlay();
		},
		
		turnTo: function(n){
			clearInterval(this.loop);
			var left = parseFloat(this.imgBox.style.left);
			var that = this;
			var step = 2 * (n - left)/that.width;
			if(left > n){	//	左移
				that.loop = setInterval(function(){
					left += step;
					if(left <= n){
						that.imgBox.style.left = n + "px";
						clearInterval(that.loop);
						that.loop = null
					} else {
						that.imgBox.style.left = left + "px";
					}
				}, 1);	
			} else if(left == n){
				return ;
			} else {	//右移
				that.loop = setInterval(function(){
					left += step;
					if(left >= n){
						that.imgBox.style.left = n + "px";
						clearInterval(that.loop);
						that.loop = null
					} else {
						that.imgBox.style.left = left + "px";
					}
				}, 1);	
			}
			
		},
		
		handler: function(event){
			var e = myjs.getEvent(event);
			var t = myjs.getTarget(e);
			switch(t.className){
				case "carousel-leftBtn":	//	左按钮
					myjs.delClass(this.lis[this.index],"current");
					this.index = this.index - 1 < 0 ? this.num - 1 : this.index - 1;
					this.turnTo(-this.index * this.width);
					myjs.addClass(this.lis[this.index],"current");
					
					break;
				case "carousel-rightBtn":	//	右按钮
					myjs.delClass(this.lis[this.index],"current");
					this.index = this.index + 1 == this.num ? 0 : this.index + 1;
					this.turnTo(-this.index * this.width);
					myjs.addClass(this.lis[this.index],"current");
					break;
				case "carousel-navBar-li":	//	导航条按钮
					myjs.delClass(this.lis[this.index],"current");
					this.index = t.index;
					this.turnTo(-this.index * this.width);
					myjs.addClass(this.lis[this.index],"current");
					break;
				default:
					break;
			}
		},
		
		autoPlay: function(){
			var that = this;
			that.autoloop = setInterval(function(){
				myjs.delClass(that.lis[that.index],"current");
				that.index = that.index + 1 == that.num ? 0 : that.index + 1;
				that.turnTo(-that.index * that.width);
				myjs.addClass(that.lis[that.index],"current");
			}, that.delay);
		},
		
		preventAutoplay: function(){
			clearInterval(this.autoloop);
			this.autoloop = null
		}
		
	}
	
	
