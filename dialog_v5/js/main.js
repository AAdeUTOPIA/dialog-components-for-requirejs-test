/*
* 定义main模块
//自己模拟的弹窗，本质上就是一些DOM操作，所以我们的弹窗不可避免的要使用一些DOM操作
*/
require.config({
    paths: {
        jquery: 'jquery-1.11.1.min'
    }
});
//在应用层不显式的再写一次就很难在这里用到Jquery
//虽然在window.js和main.js都将jquery引入，但是require.js只会将jquery加载一次
require(['jquery','window'],function($,win){
	$("#a").click(function(){
		new win.Window().alert({
			title   : '消息',
			content : 'Welcome you!',
			handler : function(){ alert('Hello, you clicked the button!'); },
			width   : 300,
			height  : 150,
			y		: 80	
		});
	});
	
});