/*
* 定义window模块
* //requireJs默认将文件名和模块名有一个对应关系；在底下会自动去找jquery.js这个文件,然后动态把它加载进来
* //有时候我们下载的jquery会带着版本号等，它不是直接的jquery.js,它带版本号和压缩等，我们不需要在define上写一个带一大串版本号的文件，不存在直接的映射关系
* //如果没有可以指明，默认是模块名和文件名刚好对应
* //手动的指定映射关系，require.config
* 把jquery
*/
//连缀语法的关键：然后this
define(['widget','jquery','jqueryUI'],function(widget,$,$UI){

	function Window(){
		//config是个字典格式，这里（构造函数中）用于设置默认值
		this.config = {
			title : '系统消息',
			width : 500,
			height: 'auto',
			content: '',
			hasCloseBtn : false,
			hasMask : true,
			isDraggable: true,
			dragHandle : null,
			textForAlertBtn : '确定',
			skinClassName : null,
			handlerForAlert : null,
			handlerForClose : null
		};
		
		//1、定义一个空子低昂
		this.handlers = {};
	};
	
	//$.extend把一个大的字典混合成一个新的字典
	Window.prototype = $.extend({},new widget.Widget(),{
		alert : function(config){
			
			var config = $.extend(this.config,config);
			
			//添加弹窗节点
			var boundingBox_html = '';
				boundingBox_html += '<div class="window_boundingBox">';
					boundingBox_html += '<div class="window_header">'+config.title+'</div>';
					boundingBox_html += '<div class="window_body">'+config.content+'</div>';
					boundingBox_html += '<div class="window_footer"><input type="button" value="'+config.textForAlertBtn+'" class="window_alertBtn" /></div>';
				boundingBox_html += '</div>';
			var boundingBox = $(boundingBox_html);
			boundingBox.appendTo("body");
			
			var that = this;
			var mask = null;
			if(config.hasMask){
				mask = $('<div class="window_mask"></div>');
				mask.appendTo("body");
			}
			
			//设置弹窗的长宽和位置
			boundingBox.css({
				width : config.width + 'px',
				height: config.height+ 'px',
				left  : (config.x || (window.innerWidth - config.width) / 2) + 'px',
				top   : (config.y || (window.innerHeight - config.height) / 2) + 'px'   	
			});
			
			var btn = boundingBox.find(".window_alertBtn");
			//点击alert按钮
			btn.click(function(){
				boundingBox.remove();
				mask && mask.remove();
				that.fire("alert");
				return false;
			});
			
			//查看是否需要关闭按钮
			if(config.hasCloseBtn){
				var closeBtn = $('<span class="window_closeBtn">×</span>');
				closeBtn.appendTo(boundingBox);
				
				//关闭事件
				closeBtn.click(function(){
					boundingBox.remove();
					mask && mask.remove();
					that.fire("close");
				});
			}

			//如果存在皮肤样式名，则在弹窗最外层添加一个class
			if(config.skinClassName){
				boundingBox.addClass(config.skinClassName);
			}
			
			//查看弹窗是否可以拖动
			if(config.isDraggable){
				if(config.dragHandle){
					boundingBox.draggable({handle:config.dragHandle});
				}else{
					boundingBox.draggable();
				}
				
			}
			
			
			if(config.handlerForClose){
				this.on("close",config.handlerForClose);
			}
			
			if(config.handlerForAlert){
				this.on("alert",config.handlerForAlert);
			};
			
			
			return this;
		},
	});
	
	return {Window : Window};
});


