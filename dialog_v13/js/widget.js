/*
* 定义widget抽象类
*/
define(function(){
	
	function Widget(){
		this.handlers = {};
	}
	
	Widget.prototype = {
		on : function(type,handler){
			if(this.handlers[type] == undefined){
				this.handlers[type] = [];
			}
			
			this.handlers[type].push(handler);
			
			//return this是为了连缀写法
			return this;
		},
		fire : function(type,data){
			if(this.handlers[type] instanceof Array){
				var handlers = this.handlers[type];
				for(var i = 0, len = handlers.length; i < len; i++){
					handlers[i](data);
				}
			}
		}
	};
	
	
	return {
		Widget : Widget
	};
	
});