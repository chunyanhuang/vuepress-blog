### js继承

**六种继承方式：**    
原型链继承、借用构造函数继承、组合继承、原型式继承、寄生式继承、寄生组合式继承。

**1、原型继承 (无法继承父类型的属性，但可以继承父类型的方法)**
```javascript
function Person(){
    this.name = 'zs';
    this.age = 18;
    this.sex = '男';
}
Person.prototype.run = function(){
    console.log('i can run')
}
function Student(score){
    this.score = score
}
// 现在 student 想继承 person上的 属性
Student.prototype = new Person();
Student.prototype.consructor = Student;		

var s1 = new Student(100);
console.dir(s1)  // name='zs', age=18, sex='男'，score:100
// 缺陷： 若此时有多个学生，每个学生的name,age,sex信息，要想传递只能通过new Person(), 这样只能传递一次参数，会造成所有学生的个人信息都相同了
```

**2、借用构造函数 （可以继承父类型的属性）**      
```javascript
function Person(name, age, sex){
    this.name = name;
    this.age = age;
    this.sex = sex;
}
function Student(name, age, sex,score){
	// 调用Person函数，并将Person的this指向Student,同时传递参数
	Person.call(this,name, age, sex)
    this.score = score
}
var s1 = new Student('zs',19, '男'，100);
console.log(s1) 
```

**3、组合继承:  继承父类型的属性 ( 借用构造函数  ) +  继承父类型的方法（原型继承）**      
```javascript
function Person(name, age, sex){
    this.name = name;
    this.age = age;
    this.sex = sex;
}
Person.prototype.run = function(){
    console.log('i can run')
}
function Student(name, age, sex, score){ 
	// 继承父类型上的属性； 第一次调用超类构造函数
    Person.call(this,name, age, sex)
    this.score = score
}
// 用于继承父类型的方法 ； 第二次调用超类构造函数
Student.prototype = new Person();
Student.prototype.consructor = Student;

var s1 = new Student('zs',19, '男'，100);
console.dir(s1)
// 组合继承的缺陷：无论什么情况，都会调用两次超类的构造函数
```

**4、寄生式继承**   
```javascript
let person = {
    name:'zs',
    age: 'lisi'
}
function son(obj){
    // clone的__proto__指向obj
    let clone = Object.create(obj) // 通过调用函数创建一个新对象
    clone.say = function(){ // 增强这个新创建的对象
        console.log('son')
    }
    return clone;  // 返回这个对象
}
console.log(son(person)) // {say(){}} 原型上有name:'zs',age:'lisi'
```

**5、寄生组合继承**   
```javascript
function Person(name,age){
    this.name = name;
    this.age = age;
}
Person.prototype.sayHi = function(){
    console.log('hi')
}

function Son(name, age,score){
    // 只这一次的调用父类构造函数
    Person.call(this,name,age)
    this.score = score;
}
// 通过寄生式实现继承父类原型上的属性和方法
function inherit(son, father){
    // obj 是son和father的链接枢纽
    let obj = Object.create(father.prototype)
    son.prototype = obj;
    son.prototype.constructor = son;
}
inherit(Son, Person)

let son1 = new Son('zs',10,100)
console.log(son1)
son1.sayHi()
// 优势： 只调用一次父类构造函数，避免了在 Parent.prototype ，上面创建不必要的、多余的属性
```

**6、es6的继承**    
```javascript
class Person {
 constructor (name, work) {
   this.name = name;
   this.work = work;
 }
 getName () {
   return `This is father's function ${this.name}`;
 }
 }
 class Student extends Person {
 constructor (name, work, grade) {
   super(name, work);
   this.grade = grade;
 }
 getName () {
   console.log(super.getName());
   return `This is son's function ${this.name}`;
 }
 }
 let student = new Student('ReSword', 'Student', 'Junior');
 console.log(student.work);
 console.log(student.getName());
```
