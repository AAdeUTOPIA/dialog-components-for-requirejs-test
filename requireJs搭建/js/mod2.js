/*
* 定义模块2
*/
define(['mod1'],function(m1){
	
	var a, b = 2, c = 3;
	a = c * m1.a;
	return {
		a : a,
		b : b
	};
});
