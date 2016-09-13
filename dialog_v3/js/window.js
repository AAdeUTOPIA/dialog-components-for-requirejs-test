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
		//config是个字典格式，这里（构造函数中）用于设置默认值
		this.config = {
			width : 500,
			height: 300
		};
	};
	
	Window.prototype = {
		//第三个参数，配置也是字典格式
		alert  : function(content,handler,config){

			var boundingBox = $('<div class="window_boundingBox"></div>');
			boundingBox.appendTo("body");
			boundingBox.html(content);
			
			var btn = $('<input type="button" value="确定" />');
			btn.appendTo(boundingBox);
			
			//点击事件
			btn.click(function(){

				handler && handler();
				boundingBox.remove();
				
				return false;
			});
			
			//将两个字典进行比较，如果有同名的，后面的键名将替代同名的前面的
			$.extend(this.config,config);
			//设置弹窗的长宽和位置
			boundingBox.css({
				width : this.config.width + 'px',
				height: this.config.height+ 'px',
				left  : (this.config.x || (window.innerWidth - this.config.width) / 2) + 'px',
				top   : (this.config.y || (window.innerHeight - this.config.height) / 2) + 'px'   	
			});
		},
		confirm: function(){},
		prompt : function(){}
	};
	
	return {Window : Window};
});


