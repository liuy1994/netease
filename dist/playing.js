"use strict";function change(){var a=$(".more"),e=$(".lyric"),n=a[0].offsetTop;n>520&&e.height(96),n<=520&&n>485&&e.height(64),n<=485&&n>455&&e.height(32),n<=455&&e.height(0)}var APP_ID="1Qdc1TPXUizTEg6dQCV2CLPr-gzGzoHsz",APP_KEY="iocnXl16pNnwl7oSE1mObQFu";AV.init({appId:APP_ID,appKey:APP_KEY}),setTimeout(function(){change(),$(window).resize(function(){change()})},300),$("#icon-play").on("click",function(){$($(".point")[0]).removeClass("pause").addClass("play"),$($(".wrapper")[0]).removeClass("pause").addClass("play"),$("audio")[0].play()}),$("#icon-pause").on("click",function(){$($(".point")[0]).removeClass("play").addClass("pause"),$($(".wrapper")[0]).removeClass("play").addClass("pause"),$("audio")[0].pause()});var id=window.location.search.substr(1),query=new AV.Query("Song");query.get(id).then(function(a){var e=a.attributes,n='<audio src="'+e.url+'"></audio>';$("#playing").append(n);var r='<img src="'+e.cover+'"  alt="封面">';$(".cover").append(r);var t="\n    <style>\n    .playing::after{\n        background: transparent url("+e.cover+") no-repeat 50% 50%;\n        background-size: 200%;\n    }\n    <.style>\n    ";$("head").append(t);var i=e.lyric,s=/([\u4e00-\u9fa5]|[A-Za-z]).*/g,o=i.match(s),l='\n    <div class="name" id="name">'+e.name+" - <span>"+e.author+'</span></div>\n    <div class="lyric" id="lyric"><div class="content" id="content"></div></div>\n    ';$("#playing").append(l);for(var c=0;c<o.length;c++){var p="<p>"+o[c]+"</p>";$(".content").append(p)}var d=/\d.{7}/g,u=i.match(d),h=[],v=$(".content")[0];$(v).children()[0].style.color="white";for(var y=0;y<u.length;y++){var g=u[y].split(":"),f=60*+g[0]+ +g[1];h.push(f)}setInterval(function(){var a=$("audio")[0].currentTime;for(c=0;c<h.length;c++)if(c===h.length-1);else if(h[c]<=a&&h[c+1]>a){var e=$(".more")[0].offsetTop;e>485?v.style.transform="translateY(-"+32*(c-1)+"px)":e<=485&&(v.style.transform="translateY(-"+32*c+"px)"),c&&($(v).children()[c-1].style.color="hsla(0,0%,100%,.6)",$(v).children()[c].style.color="white")}},300)});