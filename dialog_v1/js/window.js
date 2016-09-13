/*
* 定义window模块
* //requireJs默认将文件名和模块名有一个对应关系；在底下会自动去找jquery.js这个文件,然后动态把它加载进来
* //有时候我们下载的jquery会带着版本号等，它不是直接的jquery.js,它带版本号和压缩等，我们不需要在define上写一个带一大串版本号的文件，不存在直接的映射关系
* //如果没有可以指明，默认是模块名和文件名刚好对应
* //手动的指定映射关系，require.config
* 把jquery
*/

define(['jquery'],function($){

	function Window(){
	
	};
	
	Window.prototype = {
		alert  : function(content){
			var boundingBox = $('<div class="window_boundingBox"></div>');
			boundingBox.appendTo("body");
			boundingBox.html(content);
		},
		confirm: function(){},
		prompt : function(){}
	};
	
	return {Window : Window};
});


