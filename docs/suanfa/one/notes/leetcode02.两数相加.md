### leetcode02.两数相加

**题目:**  
给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。您可以假设除了数字 0 之外，这两个数都不会以 0 开头。  
  
`输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)      
输出：7 -> 0 -> 8      
原因：342 + 465 = 807`  
   

**思路**    
  属于链表处理，将链表对应位置的值相加，并设置一个进位符

---
**代码**  
```javascript
var addTwoNumbers = function(l1, l2) {
    let ll = new ListNode(null)
    // 要点1：复制一份出来，进行操作
    let cur = ll;
    // 进位符标识进位情况
    let flag = 0;
    while(l1!==null||l2!==null){
        // 要点2：若有任意一个提前遍历完，要将其设置为0
        let val1 = l1 !== null ? l1.val : 0;
        let val2 = l2 !== null ? l2.val : 0;
        let tmp = val1 + val2 + flag;
        // 每一个相加的值都应该new成一个结点，添加到当前节点的后面
        let newNode = new ListNode((tmp%10));
        cur.next = newNode;
        flag = tmp > 9 ? 1 : 0;
        // 要点3： 若不为空时，才进入下一个节点
        if(l1!==null)l1 = l1.next;
        if(l2!==null)l2 = l2.next;
        cur = cur.next;
    }
    // 要点4：最后一个若存在进位要添加到链表末尾，new一个结点添加进来
    if(flag){
        cur.next = new ListNode(flag);
    }
    // 因为第一个cur是从next才开始存储结果的
    return ll.next
};