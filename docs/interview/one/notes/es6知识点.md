### es6知识点  

+ [let, const](#lc)
+ [解构赋值](#jg)
+ [箭头函数](#jt)
+ [扩展运算符](#kz)
+ [generator,proxy](#gp)
+ [模块化](#part)
+ [set集合](#set)
+ [class类](#cs)
+ [基本数据类型symbol](#syb)
+ [数据结构](#map)

<span id="lc">**let, const**</span>

+ **let**
    + 在一个大括号中 使用let关键字声明的变量才具有块级作用域
    + 不存在变量提升
    + 存在暂时性死区
+ **const**   
    + 只能声明常量（常量就是值（内存地址）不能变化的量）
    + 具有块级作用域
    + 声明常量时必须赋值
    + 常量赋值后，值不能修改; 如果是基本数据类型，不能更改值，如果是复杂数据类型，不能更改地址值

```javascript
if (true) { 
     const a = 10;
 }
console.log(a) // a is not defined
//------------------------
const PI; // Missing initializer in const declaration
```

**const定义的变量，其值无法改变**：    
+ 对于基本类型来说，const定义的量是无法改变的；
+ 但对于引用类型，const p={name:ww}；此时p.name='ss'；不会报错；因为p存储的是对象的指针，对象属性的变化不会造成指针变化


**变量提升：**    
+ js代码执行前引擎会先进行预编译，预编译期间会将变量声明与函数声明提升至其对应作用域的最顶端。

**变量提升：** 将变量的声明提升到当前作用域的顶端
```javascript
console.log(a);
var a = 3;
//实际可看做如下：
var a; // 将变量a的声明提升至最顶端，赋值逻辑不提升。
console.log(a); // undefined
a = 3; 
```

**函数提升：**  js中创建函数有两种方式：函数声明式和函数字面量式。只有函数声明才存在函数提升    
```javascript
console.log(foo1); // [Function: foo1]
foo1(); // foo1
console.log(foo2); // undefined
foo2(); // TypeError: foo2 is not a function
function foo1 () {
	console.log("foo1");
};
var foo2 = function () {
	console.log("foo2");
}
// ----- 实际如下： ----
function foo1 () {
	console.log("foo1");
};
var foo2
console.log(foo1); // [Function: foo1]
foo1(); // foo1
console.log(foo2); // undefined
foo2 = function () {
	console.log("foo2");
};
```

<span id="jg">**解构赋值**</span>   

ES6中允许从数组/对象中提取值，按照对应位置，对变量赋值。
```javascript
// 数组解构
let [a, b, c] = [1, 2, 3];
// 对象解构
let person = { name: 'zhangsan', age: 20 }; 
let { name, age } = person;
```

<span id="jt">**箭头函数**</span>

+ 特点：1.匿名函数，不能作为构造函数，不能new; 2.不绑定this, 其this继承父作用域的this；3.call、apply、bind也无法改变; 4.没有原型对象；
+ 优点： 1.语法更加简洁2.不绑定this

```javascript
() => {} //()：代表是函数； =>：必须要的符号，指向哪一个代码块；{}：函数体
const fn = () => {}//代表把一个函数赋值给fn

// -------------------------------
var age = 100;
// 对象没有作用域
var obj = {
age: 20,
say: () => {
    alert(this.age)
}
}

obj.say();//箭头函数this指向的是被声明的作用域里面，而对象没有作用域的，所以箭头函数虽然在对象中被定义，但是this指向的是全局作用域
```

<span id="kz">**扩展运算符**</span>

+ 可以将数组或者对象转为用逗号分隔的参数序列。
+ 可以应用于合并数组
+ 将类数组或可遍历对象转换为真正的数组: 1. 扩展运算符 2. Array.from();；注意： 如果是对象，那么属性需要写对应的索引
```javascript
var age = 100;
// 对象没有作用域
var obj = {
age: 20,
say: () => {
    alert(this.age)
}
}

obj.say();//箭头函数this指向的是被声明的作用域里面，而对象没有作用域的，所以箭头函数虽然在对象中被定义，但是this指向的是全局作用域

//-----------------------------
// 方法一 
let ary1 = [1, 2, 3];
let ary2 = [3, 4, 5];
let ary3 = [...ary1, ...ary2];
// 方法二 
ary1.push(...ary2);
//-------------------------
// 将伪数组或可遍历对象转换为真正的数组 (1)
let oDivs = document.getElementsByTagName('div'); 
oDivs = [...oDivs];
// 将伪数组或可遍历对象转换为真正的数组 (2)
//定义一个集合
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
}; 
//转成数组
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
// 将伪数组或可遍历对象转换为真正的数组 (3)
// 方法还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组
let arrayLike = { 
    "0": 1,
    "1": 2,
    "length": 2
}
let newAry = Array.from(arrayLike, item => item *2)//[2,4]
```

<span id="gp">**generator,proxy**</span>

+  **proxy**: Proxy 对象用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等）
```javascript
// 初始化一个Proxy对象
let p = new Proxy(target, handler);
1. target是你要代理的对象.它可以是JavaScript中的任何合法对象.如: (数组, 对象, 函数等等)
2. handler是你要自定义操作方法的一个集合.
3. p是一个被代理后的新对象,它拥有target的一切属性和方法.只不过其行为和结果是在handler中自定义的.
```

**基本使用：**
```javascript
let obj = {
  a: 1,
  b: 2,
}

const p = new Proxy(obj, {
  get(target, key, value) {
    if (key === 'c') {
      return '我是自定义的一个结果';
    } else {
      return target[key];
    }
  },

  set(target, key, value) {
    if (value === 4) {
      target[key] = '我是自定义的一个结果';
    } else {
      target[key] = value;
    }
  }
})

console.log(obj.a) // 1
console.log(obj.c) // undefined
console.log(p.a) // 1
console.log(p.c) // 我是自定义的一个结果

obj.name = '李白';
console.log(obj.name); // 李白
obj.age = 4;
console.log(obj.age); // 4

p.name = '李白';
console.log(p.name); // 李白
p.age = 4;
console.log(p.age); // 我是自定义的一个结果

// handler对象是由get和set两个函数方法组成的.这两个方法会在一个对象被get和set时被调用执行,以代替原生对象上的操作.
// handler本身就是ES6所新设计的一个对象.它的作用就是用来自定义代理对象的各种可代理操作。它本身一共有13种方法,每种方法都可以代理一种操作
```

**proxy的作用：**  
+ 1、拦截和监视外部对对象的访问
+ 2、 降低函数或类的复杂度
+ 3、 在复杂操作前对操作进行校验或对所需资源进行管理

**reflext**：  
与Proxy对象一样，也是 ES6 为了操作对象而提供的新 API。	将`Object`对象的一些明显属于语言内部的方法（比如`Object.defineProperty`），放到`Reflect`对象上。

**设计目的：**  
+ 1、将Object对象的一些明显属于语言内部的方法**（比如Object.defineProperty），**放到Reflect对象上**。现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在Reflect对象上。也就是说，从Reflect对象上可以拿到语言内部的方法。
+ 2、修改某些Object方法的返回结果，让其变得更合理**。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。
+ 3、让Object操作都变成函数行为**。某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。
+ 4、Reflect对象的方法与Proxy对象的方法一一对应**，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。


<span id="part">**模块化**</span>

- import xx from '模块标识符' ； import { xxx } from '模块标识符'
- export default {}   ;     export  s1='aa'


<span id="set">**set集合**</span>

+ 类似于数组，但是成员的值都是唯一的，没有重复的值。Set本身是一个构造函数，用来生成  Set  数据结构

```javascript
const s = new Set();
// Set函数可以接受一个数组作为参数，用来初始化。
// 数组变集合：集合的构造函数传参可将数组变成集合
const set = new Set([1, 2, 3, 4, 4]);//{1, 2, 3, 4}
// 集合变数组: 扩展运算符 / Array.from
 const arr = [...new Set([1,2,3])]
```

**实例方法：**    
- add(value)：添加某个值，返回 Set 结构本身
- delete(value)：删除某个值，返回一个布尔值，表示删除是否成功
- has(value)：返回一个布尔值，表示该值是否为 Set 的成员
- clear()：清除所有成员，没有返回值

```javascript
const s = new Set();
 s.add(1).add(2).add(3); // 向 set 结构中添加值 
 s.delete(2)             // 删除 set 结构中的2值   
 s.has(1)                // 表示 set 结构中是否有1这个值 返回布尔值 
 s.clear()               // 清除 set 结构中的所有值
 //注意：删除的是元素的值，不是代表的索引
```

<span id="cs">**class类**</span>

**基本使用：**    
```javascript
class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  // 方法挂载到prototype上	
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

}

var point = new Point(2, 3);

point.toString() // (2, 3)

point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true
// --------------------
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__ === p2.__proto__   // true
```

+ 在“类”的内部可以使用`get`和`set`关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

```javascript
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'
```

**类的继承：**    
```javascript
class Person {
    constructor(name){
        console.log(`构造函数执行了,${name}`)
        this.name=name
    }
    showName(){
        return `名字为${this.name}`
    }
}
// 执行构造器 constructor 
let p1= new Person('jona')
console.log(p1.showName())
// 子类
class children  extends Person{
    constructor(agrs){
        super(agrs)  // 执行父类的构造器
    }
 
 showName (){
        super.showName()//调用父级的方法也是用super
    }
}
let p2 = new children('子类')
console.log(p2.name)
```

<span id="syb">**基本数据类型symbol**</span>

+ Symbol 本质上是一种唯一标识符，可用作对象的唯一属性名，这样其他人就不会改写或覆盖你设置的属性值。
+ **特点**：唯一性; 隐藏性

```javascript
let id = Symbol("id“);
// 1. Symbol 数据类型的特点是唯一性，即使是用同一个变量生成的值也不相等。
let id1 = Symbol('id');
let id2 = Symbol('id');
 console.log(id1 == id2);  //false
// 2.Symbol 数据类型的另一特点是隐藏性，for···in，object.keys() 不能访问
let id = Symbol("id");
 let obj = {
  [id]:'symbol'
 };
 for(let option in obj){
     console.log(obj[option]); //空
 }
// 3. 可以使用 Object.getOwnPropertySymbols 方法访问，会返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。
let id = Symbol("id");
let obj = {
  [id]:'symbol'
 };
let array = Object.getOwnPropertySymbols(obj);
 console.log(array); //[Symbol(id)]
 console.log(obj[array[0]]);  //'symbol'
// 4.若想要多次使用同一个symbol值；官方提供了全局注册并登记的方法：Symbol.for()
let name1 = Symbol.for('name'); //检测到未创建后新建
let name2 = Symbol.for('name'); //检测到已创建后返回
 console.log(name1 === name2); // true
// 5. 通过symbol对象获取到参数值
let name1 = Symbol.for('name');
 let name2 = Symbol.for('name');
 console.log(Symbol.keyFor(name1));  // 'name'
 console.log(Symbol.keyFor(name2)); // 'name'
```

<span id="map">**数据结构Map**</span> 

+ Map对象保存**键值对**，任何值（原始值或对象）都可以作为一个键或一个值。**键可为任何类型**
+ Map 中的键值是**有序**的，而添加到对象中的键则不是。因此，当对它进行遍历时，Map 对象是按插入的顺序返回键值。

```javascript
// 基本操作方法
let map = new Map();
let obj = {
	name: 'Leon',
	sex: 'male'
};
map.set(obj,'myObject');
map.get(obj); // "myObject"
map.has(obj) //true
map.delete(obj) //true
map.has(obj) // false

// ----------------------
// 属性或操作方法
1. set(key,value)： set方法设置键名key对应的键值为value； 然后返回整个 Map 结构。

2. get(key): 获取key的值

3. has(key)： has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。

4. delete(key)： delete方法删除某个键，返回true。如果删除失败，返回false。

5. clear() ： 清空Map对象

遍历方法：
size: 获取长度
keys()	 返回键名的遍历器
values()	返回键值的遍历器
entries()	返回所有成员的遍历器
forEach()	遍历 Map 的所有成员

const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);  // map={"F" => "no", "T" => "yes"}

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) { // item=["F", "no"] ; item=["T", "yes"]
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"
```

**Map和原生对象的区别：**    
+ object和Map存储的都是键值对组合。 但是：object的键的类型是 **字符串**；map的键的类型是 **可以是任意类型**；
+ map是有顺序的，按照push的先后；可通过size()直接获取长度；

