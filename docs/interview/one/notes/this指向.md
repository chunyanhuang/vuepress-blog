### this指向

+ [this指向](#th)   
+ [call, apply, bind](#cal)   


<span id="th">**一、this指向**</span>  

**分为四种：**    
+ 默认绑模式 中this指向window。
+ 隐式绑定：被直接对象包含的函数调用，this指向直接对象。也称方法调用。
+ 显式绑定：call() , apply() , bind()
+ new绑定： this指向新对象

**1、默认绑定：**     
默认绑定指向全局对象  
```javascript
// 在调用sayHi()时,应用了默认绑定,所以this指向全局对象(全局环境中，this默认绑定到window)
function sayHi() {
    console.log('Hello,', this.name);
}
var name = 'YvetteLau';
sayHi(); //Hello, YvetteLau
```

**2、隐式绑定：**      
函数的调用是在某个对象上触发的,即调用位置上存在上下文对象。
```javascript
// sayHi函数声明在外部,严格来说并不属于person,但是在调用sayHi时,调用位置会使用person的上下文来引用函数,隐式绑定会把函数调用中的this(即此例sayHi函数中的this)绑定到这个上  下文对象(即此例中的person)

function sayHi() {
    console.log('Hello,', this.name);
}
var person = {
    name: 'YvetteLau',
    sayHi: sayHi
}
var name = 'Wiliam';
person.sayHi(); //Hello, YvetteLau
//-------------------------------------------------
var x = 3;
var y = 4;
var obj = {
    x: 1,
    y: 6,
    getX: function() {
        var x =5;
        return function() {
            return this.x;
        }();
    },
    getY: function() {
        var y =7;
         return this.y; 、// this指向Obj
    }
}
console.log(obj.getX())//3 自调用函数的调用者是 window
console.log(obj.getY())//6  方法的调用，指向调用者，obj

//-------------------------------------
// 注意：对象属性链中只有最后一层会影响到调用位置。因为只有最后一层会确定this指向的是什么,不管有多少层,在判断this的时候,我们只关注最后一层,即此处的friend。
function sayHi() {
 	console.log('Hello,', this.name);
 }
 var person2 = {
	 name: 'Christina',
 	sayHi: sayHi
 }
 var person1 = {
 	name: 'YvetteLau',
 	friend: person2
 }
 person1.friend.sayHi(); //Hello, Christina

 //------------------------------------------------
 // 隐式绑定有一个大陷阱,绑定很容易丢失,Hi直接指向了sayHi的引用,在调用的时候,跟person并没有关系,针对此类问题,我建议大家只需牢牢继续这个格式:XXX.fn();fn()前如果什么都没有,那么肯定不是隐式绑定。
 function sayHi() {
     console.log('Hello,', this.name);
 }
var person = {
    name: 'YvetteLau',
    sayHi: sayHi
}
var name = 'Wiliam';
var Hi = person.sayHi; // hi指向sayhi的引用
Hi(); //Hello, Wiliam

//------------------------------------------
/* 
- 隐式绑定的丢失是发生在回调函数中(事件回调也是其中一种)
- 第一条输出很容易理解,setTimeout的回调函数中,this使用的是默认绑定,非严格模式下,执行的是全局对象
- 第二条我们可以这么理解：setTimeout(fn,delay){ fn(); },相当于是将person2.sayHi赋值给了一个变量,最后执行了变量,这个时候,sayHi中的this显然和person2就没有关系了。
- 第三条虽然也是在setTimeout的回调中,但是我们可以看出,这是执行的是person2.sayHi()使用的是隐式绑定,因此这是this指向的是person2,跟当前的作用域没有任何关系。
*/
function sayHi() {
    console.log('Hello,', this.name);
}
var person1 = {
    name: 'YvetteLau',
    sayHi: function () {
    setTimeout(function () {
        console.log('Hello,', this.name);
    })
    }
}
var person2 = {
    name: 'Christina',
    sayHi: sayHi
}
var name = 'Wiliam';
person1.sayHi(); //Hello, Wiliam   定时器this指向全局
setTimeout(person2.sayHi, 100); //Hello, Wiliam  定时器里面的this指向window
setTimeout(function () {
    person2.sayHi(); //Hello, Christina  上下文绑定
}, 200);
//---------------------------------------------------------------
foo = function(){
    this.myName = "Foo function.";
}
foo.prototype.sayHello = function(){
    alert(this.myName);
}
foo.prototype.bar = function(){
    setTimeout(this.sayHello, 1000);
}
var f = new foo;
f.bar(); // undefined  定时器中的this指向window,执行全局下的sayhello函数
```

**3、显式绑定**     
通过call,apply,bind的方式,显式的指定this所指向的对象。 call,apply和bind的第一个参数,就是对应函数的this所指向的对象。call和apply的作用一样,只是传参方式不同。call和apply都会执行对应的函数,而bind方法不会。
```javascript
function sayHi() {
    console.log('Hello,', this.name);
}
var person = {
    name: 'YvetteLau',
    sayHi: sayHi
}
var name = 'Wiliam';
var Hi = person.sayHi;
Hi.call(person); // 输出的结果为: Hello, YvetteLau 因为使用硬绑定明确将this绑定在了person上。

// Hi.call(person, person.sayHi)的确是将this绑定到Hi中的this了。但是在执行fn的时候,相当于直接调用了sayHi方法(记住: person.sayHi已经被赋值给fn了,隐式绑定也丢了),没有指定this的值,对应的是默认绑定。
function sayHi() {
    console.log('Hello,', this.name);
}
var person = {
    name: 'YvetteLau',
    sayHi: sayHi
}
person.sayHi() // hello, YvetteLau
var name = 'Wiliam';
var Hi = function (fn) {
    fn(); // window.fn()
}
Hi.call(person, person.sayHi); //Hello, Wiliam  执行person.sayHi()   易错！！
//------------------------------
var length = 10;
function fn(){
    console.log(this.length)
}
var obj = {
    length:5,
    method:function(fn){
        fn(); // this指向window
        arguments[0](); // this指向arguments
    }
}
obj.method(fn) // 10 1

// 因为person被绑定到Hi函数中的this上,fn又将这个对象绑定给了sayHi的函数。这时,sayHi中的this指向的就是person对象。
function sayHi() {
      console.log('Hello,', this.name);
    }
    var person = {
      name: 'YvetteLau',
      sayHi: sayHi
    }
    var name = 'Wiliam';
    var Hi = function (fn) {
      fn.call(this);  // fn指向person
    }
    Hi.call(person, person.sayHi); //Hello, YvetteLau    值得再研究！！
//-----------------------------------------------
var name = 'window';
var obj = {
     name: 'netease',
     print1: () => {
         console.log(this.name);
     },
     print2 () {
         console.log(this.name);
     }
};
obj.print1(); // window
obj.print2(); // netease
```

**4、new绑定：**     
我们使用new来调用函数的时候，就会新对象绑定到这个函数的this上。但是前提是构造函数中没有返回对象或者是function，否则this指向这个对象或者是function。
```javascript
function sayHi(name) {
    this.name = name;
}
var Hi = new sayHi('Yevtte');
console.log('Hello,', Hi.name); // Hello, Yevtte,  原因是因为在var Hi = new sayHi('Yevtte');这一步，会将sayHi中的this绑定到Hi对象上。
```

**例外：**     
+ 如果我们将null或者是undefined作为this的绑定对象传入call、apply或者是bind,这些值在调用时会被忽略,实际应用的是默认绑定规则，指向全局window。
```javascript
var foo = {
    name: 'Selina'
}
var name = 'Chirs';

function bar() {
    console.log(this.name);
}
bar.call(null); //Chirs 
```
+ 箭头函数(箭头函数是ES6中新增的,它和普通函数有一些区别,箭头函数没有自己的this,它的this继承于外层代码库中的this。)
+ 注意：1.不可以当作构造函数，也就是说,不可以使用new命令,否则会抛出一个错误;2.箭头函数没有自己的this,所以不能用call()、apply()、bind()这些方法去改变this的指向.
```javascript
var obj = {
    hi: function () {
    console.log(this);
    return () => {
        console.log(this);
    }
    },
    sayHi: function () {
    return function () {
        console.log(this);
        return () => {
        console.log(this);
        }
    }
    },
    say: () => {
    console.log(this);
    }
}
let hi = obj.hi(); //输出obj对象
hi(); //输出obj对象
let sayHi = obj.sayHi();
// obj.sayHi()()
let fun1 = sayHi(); //输出window  
// obj.sayHi()()()
fun1(); //输出window
obj.say(); //输出window    obj对象不存在this,往上找就是全局的this

// (1)obj.hi(); 对应了this的隐式绑定规则，this绑定在obj上，所以输出obj，很好理解。
// (2)hi(); 这一步执行的就是箭头函数，箭头函数继承上一个代码库的this，刚刚我们得出上一层的this是obj，显然这里的this就是obj.
// (3)执行sayHi();这一步也很好理解，我们前面说过这种隐式绑定丢失的情况，这个时候this执行的是默认绑定，this指向的是全局对象window.
// (4)fun1(); 这一步执行的是箭头函数，如果按照之前的理解，this指向的是箭头函数定义时所在的对象，那么这儿显然是说不通。OK，按照箭头函数的this是继承于外层代码库的this就很好理解了。外层代码库我们刚刚分析了，this指向的是window，因此这儿的输出结果是window.
// (5)obj.say(); 执行的是箭头函数，当前的代码块obj中是不存在this的，只能往上找，就找到了全局的this，指向的是window.
```


<span id="cal">**二、call, apply, bind**</span> 

+ fn.call(this指向，参数1，...) : 第一个参数是this指向，之后参数为向fn函数传递的参数；改变this指向并直接调用
+ fn.apply(this指向，[参数1，...]) : 第二个参数是一个包含多个参数的数组；改变this指向并直接调用；
+ fn.bind(this指向，参数1，...)  :   改变this指向并生成一个新函数返回(没有调用)
+ 若第一个参数为null或undefined，则函数内部this指向**window**  

```javascript
// bind(newThis,args) 返回一个新函数，这个新函数的this指向newThis
function foo(){
    this.b = 100;
    console.log(this)
    console.log(this.a)
    console.log(this.b)
    return this.a
}
//执行完foo.bind({a:1})，
//  func = {
//    this.b = 100;
//    console.log(this)
//    console.log(this.a)
//    console.log(this.b)
//    return this.a
// }
// 其中的this指向 {a:1}
  var func = foo.bind({a:1})
// 调用func(), this指向的对象{a:1}变成{a:1,b:100}
  func() // 打印结果{a:1,b:100} 1 100
// new创建一个新对象，使func中的this指向这个新对象，
 new func() // 打印结果：{b:100} undefined 100
```

**实现bind函数：**
```javascript
if(!Function.prototype.bind){
       Function.prototype.bind = function(oThis){
           // 步骤一：判断调用此bind方法的对象是不是一个函数function，若不是则报错；
             if(typeof this === 'function'){
            //if( Object.prototype.toString.call(this) !== '[object function]'){
                throw new TypeError('被绑定的对象需要是函数')
            }
            var that = this;
            // 获取foo.bind(newThis,args) 中的args; arguments是一个伪数组[newThis,args]，slice截取，去掉第一个newThis
           // arguments转为数组： Array.prototype.slice.call(arguments)
            var args = Array.prototype.slice.call(arguments,1)
            fBound = function(){
                // 步骤二：这里的this指的是调用fun()时的环境；
                // 1. 当直接调用fun()时，this指向全局对象，this instanceof fBound==false; 这里的arguments=[1,2]; 通过concat将bind中参数和fun()中的参数进行合并
                // 2. 通过new fun()调用时，创建一个空对象，然后this指向这个空对象，然后运行fun()代码，也就是说通过new fun()时，this指向的是新对象，bind修改的执行不起作用
                return that.apply(this instanceof fBound ? this : oThis, args.concat(Array.prototype.slice.call(arguments)))
            }
            var func = function(){}
            // 步骤三：完成了给fBound拷贝一个foo.prototype；相当于fBound.prototype = Object.create(this.prototype)
            if(this.prototype){
                func.prototype = this.prototype
            }
            fBound.prototype = new func()
            // 返回的是一个函数，当调用这个函数时就是调用fBound中return的内容
            return fBound
       }
    }
/*
步骤二和步骤三主要实现：
1. bind返回的新函数如果被new了，this指向的是新对象，之前的bind绑定的不生效
2. 步骤三实现返回的新函数能够继承原对象原型上的属性和方法
*/
```

