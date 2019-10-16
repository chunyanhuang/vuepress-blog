### leetcode518.零钱兑换II

**题目：**  
给定不同面额的硬币和一个总金额。写出函数来计算可以凑成总金额的硬币组合数。假设每一种面额的硬币有无限个。 

```
输入: amount = 5, coins = [1, 2, 5]
输出: 4
解释: 有四种方式可以凑成总金额:
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1
```

---
**思路：**   
    **动态规划**，思路同leetcode518，巧思在于，两个for循环颠倒，以硬币值为准进行计算

---
**代码：**  
```javascript
var change = function(amount, coins) {
    // 初始化为0, 
    // 要点：dp[0]=1
    dp = [1].concat(Array(amount).fill(0))

    // 将每种硬币值单独计算，当在coins[i]时，每个dp[j]
    for(let i=0;i<coins.length;i++){
        for(let j=1;j<=amount;j++){
            // 当前总金额j要大于当前的硬币值
            if(coins[i] <= j){
                dp[j] = dp[j] + dp[j-coins[i]]
            }
        }
    }
    return dp[amount]
};