### js实现栈和队列

+ **js实现栈**
```javascript
function Stack() {
  this.dataStore = [];
  this.top = 0;//指向栈顶，没有元素
  this.push = push;
  this.pop = pop;
  this.peek = peek;
  this.length=length;
  this.clear=clear;
}
Stack.prototype.push = function(element) {//进栈
   this.dataStore[this.top++] = element;
}
function pop() {//出栈
  return this.dataStore[--this.top];
}
function peek() {//栈顶元素
  return this.dataStore[this.top-1];
}
function length() {
  return this.top;
}
function clear() {
  this.top = 0;
}
```

+ **js实现队列**  
```javascript
// 队列：只允许在队列前端删除，在队列尾部添加
function ArrayQueue(){  
    var arr = [];  
        //入队操作  
    this.push = function(element){  
        arr.push(element);  
        return true;  
    }  
        //出队操作  
    this.pop = function(){  
        return arr.shift();  
    }  
        //获取队首  
    this.getFront = function(){  
        return arr[0];  
    }  
        //获取队尾  
    this.getRear = function(){  
        return arr[arr.length - 1]  
    }  
        //清空队列  
    this.clear = function(){  
        arr = [];  
    }  
        //获取队长  
    this.size = function(){  
        return length;  
    }  
}  
```