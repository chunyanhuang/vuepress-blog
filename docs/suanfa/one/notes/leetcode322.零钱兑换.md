### leetcode322.零钱兑换

**题目：**  
给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。  

`输入：coins = [1, 2, 5], amount = 11;    
输出：3; 11 = 5 + 5 + 1`

---
**思路：**   
    **动态规划**，dp[i]表示总金额为i时的最少硬币数，对其初始化为amount，双层for循环，对每一个dp[i]，当总金额为i时，尝试每种硬币，选个数最少的方案。

---
**代码：**  
```javascript
var coinChange = function(coins, amount) {
    // 动态规划
    // dp[i]表示总金额为i时，最少的硬币数
    // 初始化
    // dp[0]=0;方便后面金额的计算
    if(coins.length==0 || amount==0) return 0;
    // 要点：初始化为(amount+1)的数，以防[1]1这种情况
    let dp = [0].concat(Array(amount).fill(amount+1))
    // 将硬币数按从小到大的顺序排列
    coins.sort((a,b)=>a-b)

    for(let i=1;i<=amount;i++){
        for(let j=0;j<coins.length;j++){
            // 要点：如果当前硬币数比总金额大就直接break;因为后面的硬币数肯定会更大，不符合要求
            if(coins[j] > i) break;
            dp[i] = Math.min(dp[i], dp[i-coins[j]] + 1)
        }
    }
    return dp[amount] === (amount+1) ? -1 : dp[amount]
};