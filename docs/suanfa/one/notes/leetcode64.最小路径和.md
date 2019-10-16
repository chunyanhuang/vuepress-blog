## leetcode64.最小路径和

**题目：**
给定一个包含非负整数的 m x n 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。说明：每次只能向下或者向右移动一步。
`输入：[[1,3,1],[1,5,1],[4,2,1]]; 输出：7`
---

**思路：**
    动态规划，将问题进行拆解，dp[i][j]只与其上方和左方位置的dp有关，使用dp[i][j]表示到达第i,j个位置时的最短距离。
---

**代码：**
```javascript
var minPathSum = function(grid) {
    // 动态规划
    let m = grid.length;
    let n = grid[0].length;
    for(let i=0;i<m;i++){
        for(let j=0;j<n;j++){
            // 沿着最上层，即第一行时
            if(i===0 && j!==0){
                grid[i][j] += grid[i][j-1]
            // 第一列
            }else if(j===0 && i !== 0){
                grid[i][j] += grid[i-1][j]
            }else if(i !== 0 && j !== 0){
                grid[i][j] += Math.min(grid[i-1][j], grid[i][j-1])
            }
        }
    }
    return grid[m-1][n-1]
};