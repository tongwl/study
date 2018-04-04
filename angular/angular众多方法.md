## angular方法整理
#### 1.angular.bind
##### 语法：angular.bind(self, fn, args);

##### 参数说明：
参数名称 | 参数类型 | 说明 |
---|---|---
self | Object | this绑定的对象
fn | function    | 绑定的方法
args | * | 传入fn的参数

##### 返回值：function

##### 说明：将fn内部的this绑定为self对象，返回一个this绑定为self的新的方法。


##### 例子：
            var tongwl={
                name:"tongwl"
            };

            function sayHello(){
                console.log("hello:"+this.name);
            }

            var sayHelloFun=angular.bind(tongwl,sayHello); //将tongwl绑定到sayHello里面，返回一个新的sayHelloFun
            sayHelloFun();//输出：hello:tongwl


#### 2.angular.bootstrap
##### 语法：angular.bootstrap(element, [modules], [config]);

##### 参数说明：
参数名称 | 参数类型 | 说明 |
---|---|---
element | dom对象 | 要启动angular的根节点，一般为document，也可以是其他的的html的dom。
modules(可选) | Array<String\|Function\|Array>    | 依赖的模块。
config(可选) | Object | 配置项，目前只有strictDi一个可配置项，默认为false,是否开启辅助debug。

##### 返回值：app的injector(注入器)

##### 说明：手动启动angularjs application(ng-app)。

##### 例子：
        var app=angular.module("myApp",[]);
        app.controller("myCtrl",function($scope){
            $scope.username="tongwl";
        });

        $(function(){
            angular.bootstrap(document,["myApp"]);
        });
        
##### 注意点：angular.bootstrap必须在element参数指向的dom树加载完之后才能调用，所以通常我们会在$(funtion(){})内执行。
        
#### 2.angular.copy
##### 语法：angular.copy(source, [destination]);

##### 参数说明：
参数名称 | 参数类型 | 说明 |
---|---|---
source | * | 被拷贝的对象，可以是任意类型(包括null,undefined)
destination(可选) |  对象(数组) | 拷贝到destination，必须和source类型一致

##### 说明：
copy有两种写法：

1. var destination=angular.copy(source);
###### 例子：
            //test1
            var copy1={
                name:"tongwl"
            };
            var paster1=angular.copy(copy1);
            console.log(paster1); //输出为:{name:"tongwl"}

            //test2
            var copy2=[1,2,3];
            var paster2=angular.copy(copy2);
            console.log(paster2); //输出为:[1,2,3]

            //test3
            var copy3;
            var paster3=angular.copy(copy3);
            console.log(paster3); //输出为:undefined

            //test4
            var copy4=null;
            var paster4=angular.copy(copy4);
            console.log(paster4); //输出为:null

            //test5
            var copy5=true;
            var paster5=angular.copy(copy5);
            console.log(paster5);//输出为:true


2. anguar.copy(source,destination);
###### 例子：
            //test1
            var copy1={
                name:"tongwl"
            };
            var paster1;
            angular.copy(copy1,paster1);
            console.log(paster1); //输出为：undefined

            //test2
            var copy2={
                name:"tongwl"
            };
            var paster2=null;
            angular.copy(copy2,paster2);
            console.log(paster2);//输出为：null

            //test3
            var copy3="test3";
            var paster3="";
            angular.copy(copy3,paster3);
            console.log(paster3); // 输出为空字符串

            //test4
            var copy4="test4";
            var paster4="a";
            //angular.copy(copy4,paster4);//报错
            console.log(paster4);

            //test5
            var copy5={
                name:"tongwl"
            };
            var paster5={};
            angular.copy(copy5,paster5);
            console.log(paster5);//输出为对象:{name:"tongwl"}
            
            //test6
            var copy6=[1,2,3];
            var paster6=[];
            angular.copy(copy6,paster6);
            console.log(paster6);//输出为:[1,2,3]
            
###### 注意点：若要拷贝一个对象(数组),必须提前设置destination：var destination={};       
