window.onload=function(){
 	
	!!(function(){
		function $(id){
			return document.getElementById(id);
		}
 		
 		
		var git_shell = {
			title: "git-Bash小教程",
			lastModified: "2017-04-24  6:19:11",
			tag: ["github", "bat", "killtime"],
			url: "article/git-shell/index.html",
			summary: "github客户端bash命令上传文件超简易教程，照葫芦画瓢，一看就会。",
			recommandation: 4,
 		
		}
 		
 		
		myjs.addHandler(window, "click", function(event){
			var e = myjs.getEvent(event);
			var t = myjs.getTarget(e);
			if(t.tagName.toUpperCase() === "IMG" && t.attributes["targetSrc"]){
				fullScreenDisplay(t.attributes["targetSrc"].value.trim());
			}
			
		});
 		
 		
	})();
 		
 		
 		
}
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
