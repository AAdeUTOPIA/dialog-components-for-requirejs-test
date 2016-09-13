/*
* 定义window模块
* //requireJs默认将文件名和模块名有一个对应关系；在底下会自动去找jquery.js这个文件,然后动态把它加载进来
* //有时候我们下载的jquery会带着版本号等，它不是直接的jquery.js,它带版本号和压缩等，我们不需要在define上写一个带一大串版本号的文件，不存在直接的映射关系
* //如果没有可以指明，默认是模块名和文件名刚好对应
* //手动的指定映射关系，require.config
* 把jquery
*/
//连缀语法的关键：然后this
define(['jquery','jqueryUI'],function($,$UI){

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
	
	Window.prototype = {
		//2、给window新增两个方法
		//on方法类似于DOM的addEventListener(),可以监听多个同名的事件，可以在多处监听
		//on是关于事件的绑定
		//背后的原理：把需要执行的回调，push到数组里面；在handlers里面给的事件类型；这个事件类型里面是个数组
		//type:事件类型，事件类型是个数组
		on : function(type,handler){

			if(this.handlers[type] == undefined){
				this.handlers[type] = [];
			}
			
			//在数组里面我要把需要执行的回调push到数组里面
			this.handlers[type].push(handler);
			
			return this;
		},
		//fire是关于事件的触发,事件在什么时候触发；事件的触发时间节点，其实是交给组件的一个合适的时机
		//fire的时候实际上是做什么事情？fire接受两个参数，第一个是事件类型，第二个fire的时候传入一个什么样的参数进来
		//当fire一旦被触发的时候（自定义事件一旦被触发的时候），就把handlers里事件名(type{this.handlers[type]})下的数组遍历一遍，
		//把它里面保存的function(函数)依次执行一遍,这是一个非常经典的观察者模式
		//type:事件类型
		fire: function(type,data){
			if(this.handlers[type] instanceof Array){
				var handlers = this.handlers[type];
				for(var i = 0; i < handlers.length; i++){
					handlers[i](data);
				}
			}
		},
		//第三个参数，配置也是字典格式
		//将宽高、left:top位置作为第三个参数传递给alert方法
		alert  : function(config){

			//将两个字典进行比较，如果有同名的，后面的键名将替代同名的前面的
			var config = $.extend(this.config,config);
	
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
			
			var btn = boundingBox.find(".window_alertBtn");

			//点击事件
			btn.click(function(){

				//config.handlerForAlert && config.handlerForAlert();
				boundingBox.remove();
				
				//将遮罩一并删除掉
				mask && mask.remove();
				that.fire("alert");
				return false;
			});
			
			if(config.handlerForAlert){
				this.on("alert",config.handlerForAlert);
			};
			
			//设置弹窗的长宽和位置
			boundingBox.css({
				width : config.width + 'px',
				height: config.height+ 'px',
				left  : (config.x || (window.innerWidth - config.width) / 2) + 'px',
				top   : (config.y || (window.innerHeight - config.height) / 2) + 'px'   	
			});
			
			var closeBtn = $('<span class="window_closeBtn">×</span>');
			closeBtn.appendTo(boundingBox);
			closeBtn.click(function(){
				//config.handlerForClose && config.handlerForClose();
				boundingBox.remove();
				//将遮罩一并删除掉
				mask && mask.remove();
				that.fire("close");
			});
				
			//查看是否需要一个关闭按钮
			if(config.handlerForClose){
				this.on("close",config.handlerForClose);
			}
			
			//如果存在皮肤样式名，则在弹窗最外层添加一个class
			if(config.skinClassName){
				boundingBox.addClass(config.skinClassName);
			}
			
			//查看弹窗是否可以拖动
			if(config.isDraggable){
				//传递进来一个参数(点击上面位置可以拖动，使用jqueryUI的拖动功能)
				if(config.dragHandle){
					boundingBox.draggable({handle:config.dragHandle});
				}else{
					boundingBox.draggable();
				}
				
			}
			
			
			//连缀语法的关键：返回this
			return this;
		},
		confirm: function(){},
		prompt : function(){}
	};
	
	return {Window : Window};
});


