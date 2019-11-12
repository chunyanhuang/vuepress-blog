### promise

+ [promise](#pp)   
+ [Generator,async](#ge)


<span id="pp">**promise**</span>  
**定义：**    
是一个对象，用来**传递异步操作的消息**，避免了层层嵌套的回调函数。      

**发展：**      
ES6诞生以前，异步编程的方法，大概有如下四种：**回调函数、事件监听、发布/订阅、Promise对象**；ES6中，引入了**Generator函数**；ES7中，**async**更是将异步编程带入了一个全新的阶段。   

**解决的问题：**      
回调地狱，即异步回调 多层嵌套形成；不易维护。（嵌套是因为后面的异步操作依赖前面的结果）。    

**promise的三种状态：**       
+ 初始化，状态：pending
+ 当调用resolve(成功)，状态：pending=>fulfilled
+ 当调用reject (失败), 状态：pending=>rejected
+ 只要这两种情况发生，状态就凝固了，不会再改变，称为 ( resolved ) 已定型。此时再对promise对象添加回调函数，也会立即得到这个结果。

**promise的使用：**     
```javascript
// 构造函数`Promise`必须接受一个函数作为参数；`resolve`和`reject`两个参数，它们是两个函数。
var p = new Promise(function(resolve,reject){
  // 这个函数内部就是来写异步操作的
  setTimeout(function(){
    var flag = true
    if(flag){
      resolve('成功')
    }else{
      reject('error')
    }
  },2000)
})
// 通过Promise的实例对象.then的方法来指定成功和失败的回调,then方法第一个参数：成功的函数，第二个参数就是失败的回调函数
p.then(function(data)}{
  console.log(data)
},function(err){
  console.log(err)
})
```

**如何解决回调地狱问题：**      
```javascript
function queryData(url) {
      var p = new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
          // 0初始化请求－1发送请求－2接收数据－3解析数据－4完成 。
          if(xhr.readyState != 4) return;
          if(xhr.readyState == 4 && xhr.status == 200) {
            // 处理正常的情况
            resolve(xhr.responseText);
          }else{
            // 处理异常情况
            reject('服务器错误');
          }
        };
        xhr.open('get', url);
        xhr.send(null);
      });
      return p;
    }
 // 
 queryData('http://localhost:3000/data')
      .then(function(data){
        console.log(data);
        return queryData('http://localhost:3000/data1')  
      }).then(function(data){
        return queryData('http://localhost:3000/data2')  
      }).then(function(data){
        console.log(data)
      })
// 在第一个then的成功的回调函数里面，return回一个新的promise实例对象，然后我们就可以在.then的后面继续调用.then从而构成链式编程
// 如果.then里面通过return返回普通值，那么还是可以调用.then,因为上一个then默认创建了一个新的promise
```

**promise常用API:**      
- **p.then()**  异步处理的正确结果。**作用**：为promise实例添加状态改变时的回调函数
- **p.catch()：**  出现异常会调用的函数
- **p.finally()：** 不管是成功还是失败都会触发
- **Promise.all()**  并发处理多个异步任务，所有任务都成功才返回成功的结果，有一个出错就返回错误的结果
- **Promise.race()**  并发处理多个异步任务，有一个任务执行完就得到结果

```javascript
// Promise.all()这个方法可以接收一个数组，数组里面的每一项就是每一个异步任务的promise实例对象;所有任务都执行完才得到结果。**Promise.all获得的成功结果的数组里面的数据顺序和Promise.all接收到的数组顺序是一致的**。可以实现**并行**执行。
Promise.all([p1,p2,p3]).then(function(result){
      console.log(result)
    })
//这个then函数会等所有的任务完成才会触发，最终result的结果也是一个数组，数组里面就得到了每一个任务的结果
// promise.all的缺陷：只要有一个失败，就会返回失败
// promise.all只返回一个promise，所以当遇到第一个rejected的promise时，就会立即返回rejected，其他fullfilled的promise即使执行了也不会返回。
// 解决办法：
// asyncAction4()为失败的操作，1,2,3为正常的
promiseArr = [asyncAction1(), asyncAction2(), asyncAction3(), asyncAction4()];
// 遍历异步操作数组，利用catch捕获错误，并return err出去。当catch捕获rejected信息后，promise的链条就恢复了，我们可以在catch中将错误信息进行返回，那么下一步then返回的promise将会成为fufilled状态,错误信息将成为resolve回调函数的参数。
Promise.all(promiseArr.map(p => p.catch(err => err)))
  .then(res => {
    console.log(res); // async1,async2,async3
  })
  .catch(err => {
    console.log(err); // err4
  });
```

**promise源码分析:**     
```javascript
// 首先new Promise时，传给promise的函数发送异步请求，接着调用promise对象的then属性，注册请求成功的回调函数，然后当异步请求发送成功时，调用resolve(results.id)方法, 该方法执行then方法注册的回调数组。
function Promise(fn){ // fn(exector)执行器
  let self = this;
  this.status = 'pending'; // 设置状态
  this.value = undefined; // 成功的值
  this.reason = undefined; // 失败的值
  // 存放成功回调的数组
  this.onResolveCallbacks = [];
  // 存放失败回调的数组
  this.onRejectedCallbacks = [];
    // 成功执行
  function resolve(value){ // 调用resolve方法，就是执行then中的回调
    if(self.status === 'pending'){
      self.status = 'fulfilled';
        // 保存成功数据
      self.value = value;
        // 成功后遍历then中成功的所有回调函数
      self.onResolveCallbacks.forEach(callback => callback(self.value))
    }
  } 
    // 失败执行
  function reject(reason){
    if(self.status === 'pending'){
      self.status = 'rejected';
     // 保存失败数据
      self.reason = reason;
      // 失败后遍历then中失败的所有回调函数
      self.onRejectCallbacks.forEach(callback => callback(self.value))
    }
  } 
  try{
    fn(resolve, reject)
  } catch(e) {
    reject(e)
  }
}

// then
Promise.prototype.then = funtion(onFulfilled,onRejected){
    let self = this;
    if (this.status === 'resolved') {
        onFulfulled(self.value);
    }
    
    if (this.status === 'rejected') {
        onRejected(self.reason);
    }
    
    // 如果异步执行则位pending状态
    if(this.status === 'pending') {
        // 保存回调函数； 将then中的参数函数保存起来
        this.onResolvedCallbacks.push(() => {
            onFulfilled(self.value);
        })

        this.onRejectedCallbacks.push(() => {
            onRejected(self.reason)
        });
    }
    // 实现链式调用
    return this
}

// 这里我们可以再次实验
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if(Math.random() > 0.5) {
            resolve('成功');
        } else {
            reject('失败');
        }
    })
})

promise.then((data) => {
    console.log('success' + data);
}, (err) => {
    console.log('err' + err);
})

// 实现promise.finally()
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
}
```

**promise.then()的第二个参数和catch的区别：**    
```javascript
// 1.Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。
getJSON('/post/1.json').then(function(post) {
  return getJSON(post.commentURL);
}).then(function(comments) {
  // some code
}).catch(function(error) {
  // 处理前面三个Promise产生的错误
});
// 上面代码中，一共有三个 Promise 对象：一个由getJSON产生，两个由then产生。它们之中任何一个抛出的错误，都会被最后一个catch捕获。这也是then的第二个参数处理不了的。
// 主要区别：then的第一个回调出错，第二个回调是捕获不到的。但catch可以捕获到
```

**实现一个promise.all**    
```javascript
function promiseAll(promises) {
  //   all()返回的是promise实例对象
  return new Promise(function(resolve, reject) {
  	 // 判断 promises是否为数组
    if (!isArray(promises)) {
      return reject(new TypeError('arguments must be an array'));
    }
    // 记录promises中的对象resolve的个数
    var resolvedCounter = 0;
    // promise实例对象的个数
    var promiseNum = promises.length;
    // 存储结果
    var resolvedValues = new Array(promiseNum);
    // 对数组中的实例对象进行调用
    for (var i = 0; i < promiseNum; i++) {
        // 自执行函数
      (function(i) {
        Promise.resolve(promises[i]).then(function(value) {
          resolvedCounter++
          resolvedValues[i] = value
          if (resolvedCounter == promiseNum) {
            return resolve(resolvedValues)
          }
        }, function(reason) {
          return reject(reason)
        })
      })(i)
    }
  })
}
```
<span id="ge">**promise, generator,async/await:**</span>      
**关系**：Promise是基础，Generator和async/await串连多个Promise的同步执行，也就是把Promise的异步特性变为同步，编程更爽。async/await是Generator的语法糖，就是将**generator+自动执行器**封装到一起实现。

**Generator**（生成器）：可以实现程序的暂停和多次返回    

- 生成器是一种类协程或半协程，它提供了一种可以通过**特定语句或方法使其执行对象暂停**的功能。 
  Generator函数，返回一个部署了Iterator接口的遍历器对象，用来操作内部指针。以后，每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。value属性表示当前的内部状态的值，是yield语句后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。
- **协程**(coroutine)，意思是**多个线程相互协作，完成异步任务**。执行流程：协程A开始执行，协程A执行到一半，暂停执行，执行的权利转交给协程B，一段时间后B交还执行权，协程A重得执行权，继续执行。
- Generator是协程在ES6的实现，最大的特点就是可以交出函数的执行权，懂得退让.

```javascript
function* gen(x) {
    var y = yield x +2;
  }
  var g = gen(1); // g是Generator函数的实例。它具有状态值suspended和closed，suspended代表暂停，closed则为结束。
  console.log( g.next()) // { value: 3, done: false }
  console.log( g.next()) // { value: undefined, done: true }

//函数多了*号，用来表示这是一个Generator函数，和普通函数不一样，
//返回的是指针对象g，这个指针g有个next方法，调用它会返回yield后执行的内容.
//对象中有两个值，value和done，value 属性是 yield 语句后面表达式的值，表示当前阶段的值，done表示是否Generator函数是否执行完毕。
```
**Genarator的使用：**     
```javascript
// 首先声明一个生成器函数
function *main() {
    console.log('starting *main()');
    yield; // 打住，不许往下走了
    console.log('continue yield 1');
    yield; // 打住，又不许往下走了
    console.log('continue yield 2');
}
// 构造出一个迭代器it
let it = main(); 

// 调用next()启动*main生成器，表示从当前位置开始运行，停在下一个yield处
it.next(); // 输出 starting *main()

// 继续往下走
it.next(); // 输出 continue yield 1

// 再继续往下走
it.next(); // 输出 continue yield 2
//----------------------------
/*
因为let it = main(); 进行实例化之后，main()里的代码不会主动执行。第一个next()永远是用于启动生成器，生成器启动后要想运行到最后，其内部的每个yield都会对应一个next()，所以说next()永远都会比yield多一个了
yield相当于录音机的暂停键
next相当于录音机的继续键
next()可接受参数，传入的参数把上一个yield语句的返回值给覆盖了。通过Next方法可以分阶段的注入数据
*/
//---------------------------------------
function* fun(){
    var n=1;
    var v = yield n + 22;
    console.log('aa--:' + v);
    yield ++n;
    yield ++n
}
var it = fun();
console.log(it.next()); // {value:23, done:false}
console.log(it.next()) // aa--:undefined {value:2, done:false}
console.log(it.next());//{value:3, done:false}
/*
- 通过**yield**语句可以在生成器函数内部暂停代码的执行使其挂起，此时生成器函数仍然是运行并且是活跃的，其内部资源都会保留下来，只不过是处在暂停状态。
- 在迭代器上调用**next()**方法可以使代码从暂停的位置开始继续往下执行。
- 虽然Generator将异步操作表示得很简洁，但是管理麻烦，何时执行第一阶段，又何时执行第二阶段？--- 是的，这时候到Async/await出现了
*/
```

**Generator和自动执行器实现async/await**:   
```javascript
// 定义了一个promise，用来模拟异步请求，作用是传入参数++
function getNum(num){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(num+1)
        }, 1000)
    })
}
//自动执行器，如果一个Generator函数没有执行完，则递归调用
function asyncFun(func){
  var gen = func();
  function next(data){
    var result = gen.next(data);
    if (result.done) return result.value;
    result.value.then(function(data){
      next(data);
    });
  }
  next();
}
// 所需要执行的Generator函数，内部的数据在执行完成一步的promise之后，再调用下一步
var func = function* (){
  var f1 = yield getNum(1);
  var f2 = yield getNum(f1);
  console.log(f2) ;
};
asyncFun(func);
```



