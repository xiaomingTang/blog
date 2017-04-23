@echo off
set /p fileName="input file name(in English): "
set /p title="input title(can be Chinese): "
md %fileName%
cd %fileName%
md img
cd.>%fileName%.css
:: css file init
echo *{>>%fileName%.css
echo 	margin:0;>>%fileName%.css
echo 	padding:0;>>%fileName%.css
echo }>>%fileName%.css
echo. >>%fileName%.css
echo. >>%fileName%.css
echo. >>%fileName%.css
echo. >>%fileName%.css
echo. >>%fileName%.css
echo. >>%fileName%.css
echo. >>%fileName%.css
:: js file init
cd.>%fileName%.js
echo window.onload=function(){>>%fileName%.js
echo. 	>>%fileName%.js
echo 	!!(function(){>>%fileName%.js
echo 		function $(id){>>%fileName%.js
echo 			return document.getElementById(id);>>%fileName%.js
echo 		}>>%fileName%.js
echo. 		>>%fileName%.js
echo. 		>>%fileName%.js
echo 		var %fileName% = {>>%fileName%.js
echo 			title: "%title%",>>%fileName%.js
echo 			lastModified: "%date:~0,4%-%date:~5,2%-%date:~8,2% %time:~0,8%",>>%fileName%.js
echo 			tag: [" ", " ", " "],>>%fileName%.js
echo 			url: "article/%fileName%/index.html",>>%fileName%.js
echo 			summary: " ",>>%fileName%.js
echo 			recommandation: 4,>>%fileName%.js
echo. 		>>%fileName%.js
echo 		}>>%fileName%.js
echo. 		>>%fileName%.js
echo. 		>>%fileName%.js
echo 		myjs.addHandler(window, "click", function(event){>>%fileName%.js
echo 			var e = myjs.getEvent(event);>>%fileName%.js
echo 			var t = myjs.getTarget(e);>>%fileName%.js
echo 			if(t.tagName.toUpperCase() === "IMG" ^&^& t.attributes["targetSrc"]){>>%fileName%.js
echo 				fullScreenDisplay(t.attributes["targetSrc"].value.trim());>>%fileName%.js
echo 			}>>%fileName%.js
echo.			>>%fileName%.js
echo 		});>>%fileName%.js
echo. 		>>%fileName%.js
echo. 		>>%fileName%.js
echo 	})();>>%fileName%.js
echo. 		>>%fileName%.js
echo. 		>>%fileName%.js
echo. 		>>%fileName%.js
echo }>>%fileName%.js
echo. 	>>%fileName%.js
echo. 	>>%fileName%.js
echo. 	>>%fileName%.js
echo. 	>>%fileName%.js
echo. 	>>%fileName%.js
echo. 	>>%fileName%.js
echo. 	>>%fileName%.js
echo. 	>>%fileName%.js
echo. 	>>%fileName%.js
echo. 	>>%fileName%.js
echo. 	>>%fileName%.js
echo. 	>>%fileName%.js
echo. 	>>%fileName%.js
echo. 	>>%fileName%.js
echo. 	>>%fileName%.js
echo. 	>>%fileName%.js
echo. 	>>%fileName%.js
echo. 	>>%fileName%.js
:: html file init
cd.>index.html
echo ^<!DOCTYPE html^>>>index.html
echo ^<html^>>>index.html
echo ^<head^>>>index.html

echo 	^<meta charset="utf-8" /^>>>index.html
echo 	^<meta name="author" content="tang" /^>>>index.html
echo 	^<meta name="description" content="" /^>>>index.html
echo 	^<meta name="keywords" content="" /^>>>index.html
echo.	>>index.html
echo 	^<title^>%title%^</title^>>>index.html
echo.	>>index.html
echo 	^<link rel="shortcut icon" type="image/ico" href="../../homepage/img/icon_head.ico" /^>>>index.html
echo 	^<link rel="stylesheet" type="text/css" href="%fileName%.css" /^>>>index.html
echo 	^<link rel="stylesheet" type="text/css" href="../article.css" /^>>>index.html
echo ^</head^>>>index.html
echo ^<body^>>>index.html
echo 	^<section class="body"^>>>index.html
echo 		^<header^>>>index.html




echo 		^<div^>^<a class="color-_g" href="../../index.html" target="_blank"^>^&lt;^&lt; xiaoming's blog^</a^>^</div^>>>index.html





echo 		^</header^>>>index.html
echo 		^<header^>>>index.html
echo 			^<h1 class="title"^>%title%^</h1^>>>index.html
echo 		^</header^>>>index.html
echo 		^<div class="time"^>^<time^>%date:~0,4%-%date:~5,2%-%date:~8,2% %time:~0,8%^</time^>^</div^>>>index.html
echo 		^<div class="tag"^>>>index.html
echo 			^<ul^>>>index.html
echo 			^<!-- tagList = {>>index.html
echo 					html: "html",>>index.html
echo 					js: "js",>>index.html
echo 					css:"css",>>index.html
echo 					wabTools: "web小工具",>>index.html
echo 					bat: "简单批处理",>>index.html
echo 					game: "游戏",>>index.html
echo 					life: "日常生活",>>index.html
echo 					github: "github",>>index.html
echo 					reprint: "转载",>>index.html
echo 					killtime: "闲聊",>>index.html
echo 					webTools: "web小工具",>>index.html
echo 				} --^>>>index.html
echo 				^<li^>^<span class="color-_r"^>tag^</span^>^</li^>>>index.html
echo 				^<li^>^<span class="color-_g"^>tag^</span^>^</li^>>>index.html
echo 				^<li^>^<span class="color-_b"^>tag^</span^>^</li^>>>index.html
echo 			^</ul^>>>index.html
echo 		^</div^>>>index.html
echo 		^<nav class="nav"^>>>index.html
echo.			>>index.html
echo.			>>index.html
echo 		^</nav^>>>index.html

echo 		^<article class="content"^>>>index.html
echo 			^<div class="text"^>>>index.html
echo.				>>index.html
echo.				>>index.html
echo 			^</div^>>>index.html
echo 			^<div class="text"^>>>index.html
echo.				>>index.html
echo.				>>index.html
echo 			^</div^>>>index.html
echo 			^<div class="text"^>>>index.html
echo.				>>index.html
echo.				>>index.html
echo 			^</div^>>>index.html
echo 		^</article^>>>index.html
echo 	^</section^>>>index.html

echo.	>>index.html
echo.	>>index.html
echo 	^<script type="text/javascript" src="../../myjs.js" ^>^</script^>>>index.html
echo 	^<script type="text/javascript" src="../../homepage/fullScreenDisplay.js" ^>^</script^>>>index.html
echo 	^<script type="text/javascript" src="%fileName%.js" ^>^</script^>>>index.html
echo ^</body^>>>index.html
echo ^</html^>>>index.html