### leetcode518.零钱兑换II

**题目：**  
给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。  

```
示例1：
输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
示例2：
输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
```

---
**思路：**   
    hashmap + 滑动窗口，

---
**代码：**  
```javascript
var lengthOfLongestSubstring = function(s) {
    // hashmap,滑动窗口[last, i]
    // 将每个字符和索引以key:value形式存储map中，存储的是每个字符最后一次出现时的索引
    // last存储到当前位置的出现的最后一个重复字符的在map中存储的索引
    let max = 0;
    let last = -1;
    let map = {};

    for(let i=0;i<s.length;i++){
        if(map[s[i]] >= 0 && map[s[i]] > last){
            last = map[s[i]]
        }
        if(i-last>max){
            max = i - last;
        }
        map[s[i]] = i;
    }
    return max
};