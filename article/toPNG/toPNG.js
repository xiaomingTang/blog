window.onload=function(){
 	
	!!(function(){
 		
		var toPNG = {
			title: "图片白底变透明",
			lastModified: "2017-04-27  0:35:48",
			tag: ["webTools", "life", "killtime"],
			url: "article/toPNG/index.html",
			summary: "jpg等格式转为png，并修改白底为透明，可调整灰度阈值，扩大透明区范围。",
			recommandation: 4,
 		
		}
 		
 		
		myjs.addHandler(window, "click", function(event){
			var e = myjs.getEvent(event);
			var t = myjs.getTarget(e);
			if(t.tagName.toUpperCase() === "IMG" && t.attributes["targetSrc"]){
				fullScreenDisplay(t.attributes["targetSrc"].value.trim());
			}
			
		});
 		
		
			
				
		var fileList = myjs.$("file");
		
		myjs.addHandler(fileList, "change", function(event){
			var e = myjs.getEvent(event);
			var t = myjs.getTarget(e);
			var files = t.files;
			var reader = new FileReader();
			
			if(/image/.test(files[0].type)){
				reader.readAsDataURL(files[0]);
			}
			
			reader.onerror = function(){
				$("#loading").text("由于你的电脑太破，加载失败！骚年，要我是你，我就扔掉！");
			}
			reader.onprogress = function(event){
				if(event.lengthComputable){
					$("#loading").text(event.loaded + " / " + event.total);
				}
			}
			reader.onload = function(){
				$("#loading").text("你不知道，其实图片还在加载。相信我！");
				myjs.$("img").src = reader.result;
				
				myjs.$("img").onload = function(){
					$("#loading").text("恭喜你！骚年！你成功了！");
					myjs.$("input-value").innerHTML = (myjs.$("input").value);
					var width = this.width;
					var height = this.height;
					if(document.getElementsByTagName("canvas").length > 0){
						var oldCanvas = document.getElementsByTagName("canvas")[0];
						oldCanvas.parentNode.removeChild(oldCanvas);
					}
					
					var canvas = myjs.$("canvas").appendChild(myjs.newElem("canvas", null, "你的浏览器不支持canvas，还是算了吧。。。"));
					canvas.width = width;
					canvas.height = height;
					
					myjs.loadStyle("#img, #canvas{position: relative;left: " + (parseInt($(".body").css("width"))-width) / 2 + "px;}");
					
					
					
					var config = {
						img: myjs.$("img"),
						context: canvas.getContext("2d"),
						width: canvas.width,
						height: canvas.height
					}
					
					var filter = new Filter(config);
					
					myjs.$("input").onchange = function(event){
						var e = myjs.getEvent(event);
						var t = myjs.getTarget(e);
						
						var n = parseInt(myjs.$("input-value").innerHTML = t.value);
						
						filter.grayFilter.call(filter, n);
						
					}
				}
			}
			
		});
		
		function Filter(config){
			this.img = config.img;
			this.context = config.context;
			this.width = config.width;
			this.height = config.height;
			
			this.context.clearRect(0, 0, this.width, this.height);
			this.context.drawImage(this.img, 0, 0);
			this.imageData = this.context.getImageData(0, 0, this.width, this.height);
			//	作为图片初始值始终保存
			this.data = [];
			for(var i = 0, len = this.imageData.data.length; i < len; i += 4){
				this.data[i] = this.imageData.data[i];
				this.data[i+1] = this.imageData.data[i+1];
				this.data[i+2] = this.imageData.data[i+2];
				this.data[i+3] = this.imageData.data[i+3];
			}
			
		}
		Filter.prototype = {
			constructor: Filter,
			
			grayFilter: function(n){
				
				for(var i = 0, len = this.data.length; i < len; i += 4){
					var average = (this.data[i] + this.data[i+1] + this.data[i+2]) / 3;
					
					if(average > n){
						//this.imageData.data[4 * i] = this.imageData.data[4 * i + 1] = this.imageData.data[4 * i + 2] = 255;
						this.imageData.data[i + 3] = 0;
					} else {
						this.imageData.data[i] = this.data[i];
						this.imageData.data[i + 1] = this.data[i + 1];
						this.imageData.data[i + 2] = this.data[i + 2];
						this.imageData.data[i + 3] = this.data[i + 3];
					}
					
				}
				
				this.context.putImageData(this.imageData, 0, 0);
				
			},
			
		}
		
		
		
 		
	})();
 		
 		
 		
}
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
