window.onload=function(){
 	!function(){
		function $(id){
			return document.getElementById(id);
		}
		
		
		var bat_rename = {
			title: "批量修改文件名",
			lastModified: "2017-04-23 23:54:19",
			tag: ["bat", "webTools", "life"],
			url: "article/bat-rename/index.html",
			summary: " ",
			recommandation: 4,
		}
		
		myjs.addHandler(window, "click", function(event){
			var e = myjs.getEvent(event);
			var t = myjs.getTarget(e);
			console.log(t.attributes["targetSrc"].value);
			if(t.tagName.toUpperCase() === "IMG" && t.attributes["targetSrc"]){
				fullScreenDisplay(t.attributes["targetSrc"].value.trim());
			}
			
		});
		
 	}();
 	
 	
}
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
