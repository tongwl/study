## call 、apply、bind区别

### 语法对比
##### call : 对象1.方法名.call(对象2,arg1,arg2...,argN)
##### apply : 对象1.方法名.apply(对象2,[arg1,arg2...,argN]) 
##### bind : 对象1.方法名.bind(对象2,arg1,arg2...,argN)


### 1. call
##### 语法：对象1.方法名.call(对象2,arg1,arg2...,argN)
##### 定义：对象2调用对象1的方法
##### 解释：
对象1有一个方法叫method1，在某些特殊情况下，对象2也想要调用对象1的method1方法，就可用：对象1.method1.call(对象2,arg1,arg2...,argN)。arg1,arg2,argN对应method1的参数，比如method1的定义为：对象1.method1=function(name,age){}，那么对象2在传name和age时，就这么用：对象1.method1.call(对象2,"tongwl",18)

#### 例子：
1.
        //Child构造函数
		function Child(name,age){
			this.name=name;
			this.age=age;
		}

		//Parent构造函数
		function Parent(name,age){
			this.name=name;
			this.age=age;
		}
		
		//Parent的原型
		Parent.prototype.sayContent=function(content){
			console.log(this.name+" say:"+content);
		}

		//创建两个对象child1,parent1
		var child1=new Child("child1",10);
		var parent1=new Parent("parent1",38);
		
		//parent1调用原型方法sayContent不会报错
		parent1.sayContent("Hello,everyone!");	
		
		//child1调用sayContent会报错，因为它本身没有sayContent方法
		//child1.sayContent("I am learning speak!");

		//child1想要调用partent1的sayContent,就可以用call来借用
		parent1.sayContent.call(child1,"I am learning speak!");
		
#### 实际运用：判断对象类型(Date、Array、RegExp等)
1.
        //借用window对象的toString来判断date的对象类型
		console.log(window.toString.call(date)=="[object Date]"?"Date类型":"非Date类型");

### 2. apply
##### 语法：对象1.方法名.apply(对象2,[arg1,arg2...,argN])
##### 说明：
apply作用和call完全一样，只不过参数传递方式有差异，apply的arg1,arg2...argN是打包成一个数组的方式，call的arg1,arg2...argN的每一个都是一个参数。
##### call和apply语法对比：
##### call : 对象1.方法名.call(对象2,arg1,arg2...,argN)
##### apply : 对象1.方法名.apply(对象2,[arg1,arg2...,argN]) 

### 3. bind
##### 语法：对象1.方法名.bind(对象2,arg1,arg2...,argN)
##### 说明：
bind方法会返回一个新函数，称为绑定函数，这个新函数内部this指的就是对象2了。区别于call和apply，写完 对象1.method1.bind(对象2,arg1,arg2...,argN)并不会执行method1方法，它只是会返回一个内部this绑定为对象2的新函数，所以需要定义一个var newMethod去接住它：var newMethod=对象1.method1.bind(对象2,arg1,arg2...,argN);以后我们去用newMethod的时候，内部的this指的就是对象2。
同时请注意，如果方法带有参数，有两种方式可以绑定：
(1). var newMethod=对象1.method1.bind(对象2,arg1,arg2);  //以后newMethod无论传不传参数，参数都是arg1和arg2的值
(2). var newMethod=对象1.method1.bind(对象2);  //调用的时候带上参数，newMethod("参数1","参数2");这种调用方式更加灵活

#### 例子：

##### 错误：
1.
        var test={
			myName:"tongwl",
			sayHello:function(){
				document.getElementById("btn").onclick=function(){
					console.log(this.myName);//这里的this指的是document.getElementById("btn")这个dom对象
				}
			}
		}

##### 正确：
1.
        var test={
			myName:"tongwl",
			sayHello:function(){
				document.getElementById("btn").onclick=function(){
					console.log(this.myName);
				}.bind(this);//将函数里面的this替换为test对象
			}
		}
		
		
### 总结
##### 1.apply,call,bind都是为了改变内部this。
##### 2.apply,call含义相同，一次性绑定this，且立即调用，它们之间的区别是函数的参数的传递方式不同；bind表示永久绑定，不会立即调用，返回一个新函数，用于后面调用。