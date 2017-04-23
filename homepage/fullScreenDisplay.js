	
		/*	使用示例
		document.getElementById("fullScreenDisplay").onclick = function(){
			fullScreenDisplay("img/big_1.jpg");
		}
		*/
		function fullScreenDisplay(url){
			var cladding = document.createElement("div"),	// 覆层
				claddingId = myjs.randomStr(10),
				img = document.createElement("img"),		// 弹出的图片
				imgId = myjs.randomStr(10),
				w,
				h;
			
			img.id = imgId;
			img.src = url;
			cladding.id=claddingId;
			cladding .appendChild(img);
			
			cssText = "#"+claddingId+"{position: fixed; width: 100%; height: 100%; top: 0; left: 0; background-color: rgba(0, 0, 0, 0.8); }";
			var head = document.getElementsByTagName("head")[0];
			var style = myjs.loadStyle(cssText);
			
			document.body.appendChild(cladding);
			
			img.onload = function(){
				var sx = document.documentElement.clientWidth || document.body.clientWidth;
				var	sy = document.documentElement.clientHeight || document.body.clientHeight;
				var x = img.offsetWidth;
				var y = img.offsetHeight;
				
				var	scale = sx/x < sy/y ? sx/x : sy/y ;
				
				x *= scale * 0.95;
				y *= scale * 0.95;
				
				img.style.width = x + "px";
				img.style.height = y + "px";
				img.style.marginLeft = -x/2 + "px";
				img.style.marginTop = -y/2 + "px";
				
				myjs.loadStyle("#" + imgId + "{display: inline-block; position: relative; top:50%; left:50%; }");
				
				myjs.addHandler(cladding, "click", removeCladding);
				myjs.addHandler(cladding, "mousewheel", handleMouseWheel);
				myjs.addHandler(cladding, "DOMMouseScroll", handleMouseWheel);
			}
			
			img.onmousedown = function(event){
				var e = myjs.getEvent(event),
					posX = e.clientX,
					posY = e.clientY,
					isMoved = false;
				
				myjs.preventDefault(e);
				
				img.onmousemove = function(_event){
					isMoved = true;
					var _e = myjs.getEvent(_event),
						dx = _e.clientX-posX,
						dy = _e.clientY-posY,
						_left = parseInt(img.style.marginLeft),
						_top = parseInt(img.style.marginTop);
					
					posX = _e.clientX;
					posY = _e.clientY;
					img.style.marginLeft = (_left + dx) + "px";
					img.style.marginTop = (_top + dy) + "px";
				};
				img.onmouseup = img.onmouseleave = function(_event){
					img.onmousemove = null;
					img.onmouseup = null;
					img.onmouseleave = null;
					if(!isMoved){
						img.onmousedown = null;
						myjs.removeHandler(cladding, "click", removeCladding);
						myjs.removeHandler(cladding, "mousewheel", handleMouseWheel);
						myjs.removeHandler(cladding, "DomMouseScroll", handleMouseWheel);
						document.body.removeChild(cladding);
						head.removeChild(style);
					}
				};
			}
			
			
			function handleMouseWheel(event){
				var e=myjs.getEvent(event),
					co=1 + 0.02 * myjs.getWheelDelta(e) / 120;
				myjs.preventDefault(e);
				
				var old_w = parseInt(img.style.width),
					old_h = parseInt(img.style.height),
					old_top = parseInt(img.style.marginTop),
					old_left = parseInt(img.style.marginLeft),
					_w = old_w * co,
					_h = old_h * co,
					_top = old_top - (_w - old_w) / 2,
					_left = old_left - (_h - old_h) / 2;
				
				img.style.width = _w + "px";
				img.style.height = _h + "px";
				img.style.marginTop = _top + "px";
				img.style.marginLeft = _left + "px";
			}
			
			function removeCladding(event){
				var e = myjs.getEvent(event),
					t = myjs.getTarget(e);
				if(t === img){
					return false;
				}
				img.onmousedown = null;
				myjs.removeHandler(cladding, "click", removeCladding);
				myjs.removeHandler(cladding, "mousewheel", handleMouseWheel);
				myjs.removeHandler(cladding, "DomMouseScroll", handleMouseWheel);
				document.body.removeChild(cladding);
				head.removeChild(style);
			}
			
			
		}

 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
