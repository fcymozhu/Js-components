
//返回顶部
function goTop(){
	document.documentElement.scrollTop = 0;
}


//生成一个指定范围的随机整数
function randomInt(min,max){
	var num =min + Math.random()*(max-min);
	return Math.round(num);
}

//随机生成一组六位由大小写字母和数字组成的验证码
function yzm(){
	var str = '';//用来存放验证码
	for(var i=1; i<=6; i++ ){
		//随机的从48--122中间获取一个数字
		var code = randomInt(48,122);
		//判断  在58--64 和91--96这两个区间不满足条件就重新抽一下
		if(code>=58 && code<=64 || code>=91 && code<=96){
			i--;
		}else{
			//将这个编码值转换成对应的字符  存入到str这个空的字符串
			var ch = String.fromCharCode(code);
			str += ch;
		}
	}
	return str;
}

//生成一个随机颜色
function randomColor(){
	return 'rgb(' + randomInt(0,255) + ',' + randomInt(0,255) + ',' + randomInt(0,255) + ')';
}

//根据rgb三原色，生成16进制颜色值
function rgbToString(r,g,b){
	r = r.toString(16).length>1 ? r.toString(16) : '0'+r.toString(16);
	g = g.toString(16).length>1 ? g.toString(16) : '0'+g.toString(16);
	b = b.toString(16).length>1 ? b.toString(16) : '0'+b.toString(16);
 	return	r+g+b;
}

//Math.min()数组求最小值
function min(arr){
	return	Math.min(...arr);	//...展开操作符
}

//Math.max()数组求最小值
function max(arr){
	return	Math.max(...arr);	//...展开操作符
}


// 统计每个字符在字符串中出现的次数
function bianli(str){
	var arr = [];
	for(var i=0; i<str.length; i++){
		if(arr[str[i]]){
			arr[str[i]]++;
		}else{
			arr[str[i]] = 1;
		}
	}
	return arr;
}


//获取当前日期
function dateString(){
	var d = new Date();
	var year = d.getFullYear();
	var month = (d.getMonth()+1)>9 ? d.getMonth()+1 : '0'+(d.getMonth()+1);
	var day = d.getDate()>9 ? d.getDate() : '0'+d.getDate();
	return year + '.' + month + '.' + day;
}




//n天以后是几月几号
function getDateAfter(n){
	var now = new Date();
	now.setDate( now.getDate() + n );
	return now;
}

//获取非行内样式
//兼容IE浏览器
function getStyle(ele){
	if(ele.currenStyle){
		return ele.currenStyle;
	}else{
		return getComputedStyle(ele);
	}
}

//通过class名获取元素
//IE8以下不支持class名获取元素的方法
function getElementsByClassName(classname){
	var tem = [];
	var all = document.getElementsByTagName('*');
	for(var i=0; i<all.length; i++){
		var classList = all[i].className.split(' ');
		for(var k in classList){
			if(classname == classList[k]){
				tem.push(all[i]);
				break;
			}
		}
	}
	return tem; 
}


//添加事件addEvent，IE兼容写法
function addEvent(ele,eventtype,func,isCapture){
	if(ele.addEventListener){
		ele.addEventListener(eventtype,func,!!isCapture);
	}else{
		ele.attachEvent('on'+eventtype,function(){
			func.call(ele);
		});
	}
} 


//设置cookie
function setCookie(key,value,expires,path){
	expires = expires || 0;
	path = path || '/';
	
	var str = key+'='+value+';';
	
	if(expires > 0){
		var now = new Date();
		now.setDate( now.getDate() + expires );
		str += 'expires=' + now + ';';
	}
	
	str += 'path=' +path;
	document.cookie = str;
}

//获取cookie，并获取所需要的value
function getCookie(key){
	var str = document.cookie;
	var list = str.split(';');
	for (var i in list) {
		var ck = list[i];
		var keyval = ck.split('=');
		if(key == keyval[0]){
			return keyval[1];
		}
	}
	//如果整个循环之后没有找到需要的key，返回一个空字符串
	return '';
}

//删除cookie
function remmoveCookie(key){
	document.cookie = key + '=;expries=' + new Date(0)+';';
}

//碰撞函数，如果发生碰撞就返回true,否者就返回false
function knock(node1,node2){
	//找到两个节点的上下左右
	var l1 = node1.offsetLeft;
	var r1 = node1.offsetLeft + node1.offsetWidth;
	var t1 = node1.offsetTop;
	var b1 = node1.offsetTop + node1.offsetHeight;
	
	var l2 = node2.offsetLeft;
	var r2 = node2.offsetLeft + node2.offsetWidth;
	var t2 = node2.offsetTop;
	var b2 = node2.offsetTop + node2.offsetHeight;
	
	//将所有碰到上的可能找到，剩下的就是可以碰到的
	if(l1>r2 || r1<l2 || t1>b2 || b1<t2){
		//在这些情况下是碰不到的
		return false;
	}else{
		return true;
	}
}

//拖动
function drag(id) {
	let box = id;
	box.onmousedown = function(e) {
		var e = e || event;
		var mouse = {
			x: e.offsetX,
			y: e.offsetY
		};

		document.onmousemove = function(e) {
			var e = e || event;
			var _left = Math.min(Math.max(0, e.clientX - mouse.x), (window.innerWidth - box.offsetWidth));
			var _top = Math.min(Math.max(0, e.clientY - mouse.y), (window.innerHeight - box.offsetHeight));
			box.style.left = _left + 'px';
			box.style.top = _top + 'px';
		}
	}
	document.onmouseup = function(e) {
		var e = e || event;
		document.onmousemove = null;
	}
}

//解析url数据，获取所需要的值
function getParams(key,url){
	var obj = {};
	var reg = /([^?=&#]+)=([^?=&#]+)/g;
	url.replace(reg,function(){
		obj[arguments[1]]=arguments[2];
	})
	return obj[key]; 
}



//url :路径
//callback ： 回调函数  服务器处理后将结果返回
//data ： 参数 （可选）  放到最后
function ajaxGet(url,callback,data){
	var ajax = null;
	var result = 0;
	if( window.XMLHttpRequest ){
		ajax = new XMLHttpRequest();
	}else{
		ajax = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if( data ){
		url = url + "?" + data;
	}
	ajax.open("get",url);
	ajax.send();
	ajax.onreadystatechange = function(){
		if( ajax.readyState == 4 && ajax.status == 200 ){
			// ajax.responseText;//服务器返回的结果到客户端     客户端对于 ajax.responseText处理是可变的 
			//通过回调函数的调用  将服务器处理的结果返回到客户端上
			callback( ajax.responseText );
		}
	}
}


//封装一个ajax函数，使用promise对象
/*
	document.onclick = function(){
		var pro = getAjaxPromise('data.json');
		pro.then(function(msg){
			document.body.innerHTML = msg;
		},function(msg){
			document.body.innerHTML = msg;
		})
	} 
*/
function getAjaxPromise(url) {
	var pro = new Promise(function(success, failed) {
		var ajax = null;
		if(window.XMLHttpRequest){
			ajax = new XMLHttpRequest();
		}else{
			ajax = new ActiveXObject("Microsoft.XMLHTTP");
		}
		ajax.open('get', url, true);
		ajax.send();
		ajax.onreadystatechange = function() {
			if(ajax.readyState == 4 && ajax.status == 200) {
				success(ajax.responseText); //通知promise对象承诺的事情成功了
			}
		}
		//承诺5s后 不执行success就提示失败
		setTimeout(function() {
			failed('请求数据失败');
		}, 5000)
	});
	return pro;
}