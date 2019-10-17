### leetcode22.括号生成

**题目：**  
给出 n 代表生成括号的对数，请你写出一个函数，使其能够生成所有可能的并且有效的括号组合。

```
例如，给出 n = 3，生成结果为：
[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]
```

---
**思路：**   
    利用递归处理。
    left表示左括号的剩余数量 right表示右括号的剩余数量  
    1.当left===0 && right===0,表示找到一种组合  
    2.当left!==0 ,可以放左括号  
    3.当right!==0 && left>right, 可放右括号  

---
**代码：**  
```javascript
var generateParenthesis = function(n) {
    // 递归
    /*
    left表示左括号的剩余数量 right表示右括号的剩余数量
    1.当left===0 && right===0,表示找到一种组合
    2.当left!==0 ,可以放左括号
    3.当right!==0 && left>right, 可放右括号
    */
    let res = [];
    let path = '';
    combination(n,n,path,res)
    return res;
};
function combination(left,right,path, res){
    if(left == 0 && right == 0){
        return res.push(path)
    }
    if(left !== 0){
        combination(left-1, right, path+'(' , res)
    }
    if(right !== 0 && left < right){
        combination(left, right-1, path+')', res)
    }
}