/*
* 定义main模块
//自己模拟的弹窗，本质上就是一些DOM操作，所以我们的弹窗不可避免的要使用一些DOM操作
*/
require.config({
    paths: {
        jquery  : 'jquery-1.11.1.min',
		jqueryUI: 'jquery-ui'
    }
});
//在应用层不显式的再写一次就很难在这里用到Jquery
//虽然在window.js和main.js都将jquery引入，但是require.js只会将jquery加载一次
require(['jquery','window'],function($,w){
	//alert(w.Window())
	$("#a").click(function(){
		var win = new w.Window()
		win.alert({
			title   : '消息',
			content : 'Welcome you!',
			width   : 300,
			y		: 80,
			hasCloseBtn : true,
			textForAlertBtn : 'OK',
			//指定点击上面位置可以拖动
			dragHandle		: '.window_header',
			skinClassName:'winSkin_a',
			handlerForAlert: null,
			handlerForClose: null
			//handlerForAlert : function(){ alert('You click the alertBtn!'); },
			//handlerForClose : function(){ alert("You click the closeBtn!"); }
		}).on("alert",function(){ 
			alert("The second alert handler!"); 
		}).on("alert",function(){ alert("The third alert handler!"); });
		
		win.on("close",function(){ alert("The second close handler!"); });
	});
	
});