  var currentpage=0;

  window.onload=function(){

    //关注
    var attention=document.querySelector(".attention");
    var logincontainer = document.getElementById("logincontainer");
    attention.onclick=function(){
        var all=document.createElement("div");
        all.id="all";
        all.style.zIndex="999"; 
        all.style.background="#333";
        all.style.left="0px";
        all.style.top="0px"; 
        all.style.position="fixed";
        all.style.width=document.body.scrollWidth+"px";  
        all.style.height=document.body.scrollHeight+"px";
        all.style.filter="alpha(opacity=70)";  
        all.style.opacity="0.70";
        document.body.appendChild(all);

        var w = document.body.clientWidth;
        var h = document.body.clientHeight;//带!DOCTYPE时高度是整个网页的高度
        logincontainer.style.display="block";
        logincontainer.style.left=(w/ 2 - 193)+"px";
    }
    var closed=document.querySelector(".closed");
    closed.onclick=function(){ 
        logincontainer.style.display="none";
        document.body.removeChild(document.getElementById("all"));   
    }
    var login=document.getElementById("login");
    var hasattention=document.querySelector(".hasattention");
    var followSuc=getCookie("followSuc"); 
    

    login.onclick=function(){ 
        var userName = document.getElementById('userName');
        var password = document.getElementById('password');
        if (userName.value.length === 0 || password.value.length === 0) {
                    alert('用户名或密码不能为空');
                    return false;
        }
        userName = hex_md5(userName.value);
        password = hex_md5(password.value);
        ajax({
        method : 'get',
        url : 'http://study.163.com/webDev/login.htm',
        data : {
             'userName':userName,
             'password':password
        },
        success : function (data) {
            if (parseInt(data, 10) === 1) {//parseInt将返回的值幻化为十进制
                    logincontainer.style.display="none";
                    attention.style.display="none";
                    hasattention.style.display="block";
                    document.body.removeChild(document.getElementById("all")); 
                    if(followSuc==1){ 
                        // 取消
                        var cal=document.querySelector(".cal");  
                        cal.onclick=function(){
                            return ;
                        } 
                    }
                    else{
                        setCookie("followSuc","1");
                    }
                } 
                else{
                    alert('用户名或密码错误');
                    return false;
                }

            },
        async : true
        });         
    } 

    // 轮播图
    var oUL=document.getElementsByTagName("ul")[0];
    var oULLi=oUL.getElementsByTagName("li");

    var oOL=document.getElementsByTagName("ol")[0];
    var oOLLi=oOL.getElementsByTagName("li");

    var iNow=0;
    var timer=null;
    var box=document.getElementById("container-img");

    for (var i =0; i < oOLLi.length; i++) {
    	oOLLi[i].index=i;
    	oOLLi[i].onclick=function(){
    		 for (var i =0; i < oOLLi.length; i++) {
    		 	oOLLi[i].className='';
    		 	oULLi[i].style.display='none';
    		 	oULLi[i].style.filter='alpha(opacity=0)';
    		 	oULLi[i].style.opacity=0;
    		 }
    		this.className ='active';
    		iNow=this.index;
    		oULLi[this.index].style.display='block';
    		fadeIn(oULLi[this.index]);
    		// oULLi[this.index].style.opacity=1;
    		// startMove(oULLi[this.index],{opacity:100});
    	};
    }

     var operrate={
            getId:function(name){return document.getElementById(name);},//获取id
            setOpacity:function(ev,v){ev.filters ? ev.style.filter='alpha(opacity='+v+')':ev.style.opacity=v/100;//设置透明度
            }        
        }
    function fadeIn(elem,speed,opacity){
        //elem指定的元素
        //spee动画的速度
        //opacityz指定的透明度
        speed=speed||20;//默认为20
        opacity=opacity||100;//默认为100
        elem.style.display="block";//首先将display设为block
        operrate.setOpacity(elem,0);//将透明度设为0.，处于不可见状态
        var val=0;
        (function(){
            operrate.setOpacity(elem,val);
            val+=5;
            if(val<opacity){
                setTimeout(arguments.callee,speed);
            }
        })()
    }

    timer=setInterval(toRun,5000);
    box.onmouseover=function(){
    	clearInterval(timer);
    }
    box.onmouseout=function(){
     	timer=setInterval(toRun,5000);
    }

    function toRun(){
    	if(iNow==oOLLi.length-1){
    		iNow=0;
    	}
    	else {
    		iNow++;
        }
    	for (var i =0; i < oOLLi.length; i++) {
    		 	oOLLi[i].className='';
    		 	oULLi[i].style.display='none';
    		 	oULLi[i].style.filter='alpha(opacity=0)';
    		 	oULLi[i].style.opacity=0
    	}
    	oOLLi[iNow].className='active';
    	oULLi[iNow].style.display='block';
    	// startMove(oULLi[iNow],{opacity:100});
    	fadeIn(oULLi[iNow]);
    };
    // 视频
    var vedio=document.getElementById("vedio");

    vedio.onclick=function(){
		var all=document.createElement("div");
		all.id="all";
		all.style.zIndex="999"; 
		all.style.background="#333";
		all.style.left="0px";
		all.style.top="0px"; 
		all.style.position="fixed";
		all.style.width=document.body.scrollWidth+"px";  
		all.style.height=document.body.scrollHeight+"px";
		all.style.filter="alpha(opacity=70)";  
		all.style.opacity="0.70";
		document.body.appendChild(all);

		var loading = document.getElementById("loading");
		var w = document.body.clientWidth;
		var h = document.body.clientHeight;//带!DOCTYPE时高度是整个网页的高度
		loading.style.display="block";
		loading.style.left=(w/ 2 - 415)+"px";
    }
    var closed=document.getElementById("closed");
    closed.onclick=function(){ 
        loading.style.display="none";
    	document.body.removeChild(document.getElementById("all"));   
	}

//计算页数
function calculatePage(total,pageSize)//pageSize每页返回数据个数total返回总数
{
    var totalPage=total/pageSize;
    if(total%pageSize>0)
        return Math.ceil(totalPage);
    else
        return totalPage;//总共页数
}

var pg=document.querySelectorAll(".pg");
for(i=0;i<pg.length;i++){
    pg[i].index=i;
    pg[i].onclick=function(){
         for (var i =0; i < pg.length; i++) {
            pg[i].className="pg";
         }
        this.className +=' selected';
        currentpage=this.index;
        if(document.getElementById("menu1").className=="hover"){
            make_page_list(currentpage+1,20,10);
        }
        else
            make_page_list(currentpage+1,20,20);
    }
}
// 上一页
var pre=document.querySelector(".pre");
pre.onclick=function(){
    if(currentpage==0) {
        // pre.style.background="#eee";
        return;
    }
    else{
            for (var i =0; i < pg.length; i++) {
            pg[i].className="pg";
            }
            pg[currentpage-1].className +=' selected';
        }
        currentpage=currentpage-1;
        if(document.getElementById("menu1").className=="hover"){
            make_page_list(currentpage+1,20,10);
        }
        else
            make_page_list(currentpage+1,20,20);
   
}
// 下一页
var next=document.querySelector(".next");
next.onclick=function(){
    if(currentpage==24) return ;
    else{
            for (var i =0; i < pg.length; i++) {
            pg[i].className="pg";
            }
            pg[currentpage+1].className +=' selected';
        }
        currentpage=currentpage+1;
        if(document.getElementById("menu1").className=="hover"){
            make_page_list(currentpage+1,20,10);
        }
        else
            make_page_list(currentpage+1,20,20);
   
 }

}//window.onload结束
function make_page_list(pageNo,pageSize,type){
        ajax({
        method : 'get',
        url : 'http://study.163.com/webDev/couresByCategory.htm',
        data : {
            'pageNo':pageNo,//当前页码
            'psize':pageSize,//每页返回数据个数20
            'type':type//筛选类型（ 10：产品设计； 20： 编程语言） ;
            //  'pageNo':"2",//当前页码
            // 'psize':"20",//每页返回数据个数20
            // 'type':"10"//筛选类型（ 10：产品设计； 20： 编程语言） ;
        },
        success : function (data) {
           // console.log(data);

           var _data= JSON.parse(data);//parse用于从一个字符串中解析出json对象,
            // var total=_data.totalCount;
            var menu = document.getElementById("centermenu");
            var cDiv =menu.querySelectorAll(".center-list");

            for(i=0;i<_data.list.length;i++){
              cDiv[i].querySelector(".imgpic").src= _data.list[i].middlePhotoUrl;
              cDiv[i].querySelector(".p1").innerHTML=_data.list[i].name;
              cDiv[i].querySelector(".p2").innerHTML=_data.list[i].provider;
              cDiv[i].querySelector(".num").innerHTML=_data.list[i].learnerCount;
              cDiv[i].querySelector(".money").innerHTML="¥ "+_data.list[i].price+".00";
              cDiv[i].querySelector(".kindname").innerHTML=_data.list[i].categoryName;
              cDiv[i].querySelector(".disc").innerHTML=_data.list[i].description;
                }
            },
            async : true
        });
}


// tab实现
function setTab(name,cursel,n){
        for(i=1;i<=n;i++){
        var menu=document.getElementById(name+i);
        //var con=document.getElementById("con_"+name+"_"+i);
        menu.className=i==cursel?"hover":"";
        //con.style.display=i==cursel?"block":"none";
        if(cursel==2){
            make_page_list(1,20,20);
        }
        else
             make_page_list(1,20,10);

    }
        var pg=document.querySelectorAll(".pg");
        for (var i =0; i < pg.length; i++) {
            pg[i].className="pg";
        }
        pg[0].className +=' selected';
        currentpage=0;

}
// 获取指定名称的cookie值 
function getCookie(name){ 
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)")); 
    if(arr != null) return unescape(arr[2]); return null; 
} 
// 设置一个cookie  
function setCookie(name,value){ 
    var exp = new Date();  
    exp.setTime(exp.getTime() + 1*60*60*1000);//有效期1小时 
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
}

//右侧热门
function Run(k){
  ajax({
    method : 'get',
    url : 'http://study.163.com/webDev/hotcouresByCategory.htm',
    data : {
        // 'pageNo':pageNo,//当前页码
        // 'psize':pageSize,//每页返回数据个数20
    },
    success : function (data) {
       var _data= JSON.parse(data);//parse用于从一个字符串中解析出json对象,
        // var total=_data.totalCount;
        var hotlist = document.getElementById("hotlistul");
        var oli =hotlist.querySelectorAll("li");
        var len=_data.length;
        for(var i=0;i<10;i++){
          oli[i].querySelector(".hot-img").src= _data[(i+k)%len].smallPhotoUrl;
          oli[i].querySelector(".p3").innerHTML=_data[(i+k)%len].name;
          oli[i].querySelector("#count").innerHTML=_data[(i+k)%len].learnerCount;
            }
        },
        async : true
    });
};
  //运动
  Run(0);
  var k=1;
  setInterval(function(){
    Run(k);
    k=k+1;
  },5000);
// 课程第一页
  ajax({
        method : 'get',
        url : 'http://study.163.com/webDev/couresByCategory.htm',
        data : {
            // 'pageNo':pageNo,//当前页码
            // 'psize':pageSize,//每页返回数据个数20
            // 'type':type//筛选类型（ 10：产品设计； 20： 编程语言） ;
             'pageNo':"1",//当前页码
            'psize':"20",//每页返回数据个数20
            'type':"10"//筛选类型（ 10：产品设计； 20： 编程语言） ;
        },
        success : function (data) {
            //console.log(data);

           var _data= JSON.parse(data);//parse用于从一个字符串中解析出json对象,
            // var total=_data.totalCount;
            var menu = document.getElementById("centermenu");
            var cDiv =menu.querySelectorAll(".center-list");

            for(i=0;i<_data.list.length;i++){

              cDiv[i].querySelector(".imgpic").src= _data.list[i].middlePhotoUrl;
              cDiv[i].querySelector(".p1").innerHTML=_data.list[i].name;
              cDiv[i].querySelector(".p2").innerHTML=_data.list[i].provider;
              cDiv[i].querySelector(".num").innerHTML=_data.list[i].learnerCount;
              cDiv[i].querySelector(".money").innerHTML="¥ "+_data.list[i].price+".00";
              cDiv[i].querySelector(".kindname").innerHTML=_data.list[i].categoryName;
              cDiv[i].querySelector(".disc").innerHTML=_data.list[i].description;

                }
            },
            async : true
        });

      // 提示条
    var tips_module = (function(){
    var adCookie=getCookie("m-tip"); 
    //如果本地存在词条cookie，不显示浮层 
    if(adCookie==0){ 
     document.getElementById("m-tip").style.display="none";
    }
    else{
    //如果本地没有cookie，将词条cookie写入本地 
    document.getElementById("m-tip").style.display="block";
    }
    //关闭广告，隐藏浮层  
    var cl=document.getElementById("close"); 
    cl.onclick=function(){
        document.getElementById("m-tip").style.display="none";
        setCookie("m-tip","0"); 
    }
    })(); 