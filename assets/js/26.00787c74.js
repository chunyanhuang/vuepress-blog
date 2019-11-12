(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{226:function(t,s,o){"use strict";o.r(s);var n=o(0),v=Object(n.a)({},(function(){var t=this,s=t.$createElement,o=t._self._c||s;return o("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[o("h3",{attrs:{id:"前端安全"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#前端安全","aria-hidden":"true"}},[t._v("#")]),t._v(" 前端安全")]),t._v(" "),o("ul",[o("li",[o("strong",[t._v("xss攻击")])]),t._v(" "),o("li",[o("strong",[t._v("csrf攻击")])])]),t._v(" "),o("p",[o("strong",[t._v("1、xss攻击")])]),t._v(" "),o("ul",[o("li",[o("p",[o("strong",[t._v("原理：")]),t._v(" 即跨站脚本攻击，它是 Web 程序中常见的漏洞。原理是攻击者往 Web 页面里插入"),o("strong",[t._v("恶意")]),t._v("的脚本代码（css 代码、Javascript 代码等），当用户浏览该页面时，嵌入其中的脚本代码会被执行，从而达到恶意攻击用户的目的，如盗取用户 cookie、破坏页面结构、重定向到其他网站等。")])]),t._v(" "),o("li",[o("p",[o("strong",[t._v("攻击目的：")]),t._v("  想办法获取目标攻击网站的cookie，因为有了cookie相当于有了seesion，有了这些信息就可以在任意能接进互联网的pc登陆该网站，并以其他人的生份登陆，做一些破坏。")])]),t._v(" "),o("li",[o("p",[o("strong",[t._v("预防：")])]),t._v(" "),o("ul",[o("li",[t._v("1.对所有用户输入的地方进行过滤，检查敏感字符，替换敏感字符。过滤双引号，单引号，左右尖括号，分号。改为"),o("strong",[t._v("实体编码")]),t._v("。")]),t._v(" "),o("li",[t._v("2.设置httponly属性")])])])]),t._v(" "),o("p",[o("strong",[t._v("2、csrf攻击")])]),t._v(" "),o("ul",[o("li",[o("p",[o("strong",[t._v("原理")]),t._v("： 1. 用户C访问正常网站A时进行登录，浏览器保存A的cookie；2. 用户C再访问攻击网站B，网站B上有某个隐藏的链接或者图片标签会自动请求网站A的URL地址,例如表单提交，传指定的参数；3. 而攻击网站B在访问网站A的时候，"),o("strong",[t._v("浏览器")]),t._v("会自动带上网站A的cookie 4. 所以网站A在接收到请求之后可判断当前用户是登录状态，所以根据用户的权限做具体的操作逻辑，造成伪造成功。")])]),t._v(" "),o("li",[o("p",[o("strong",[t._v("防御：")]),t._v("  1.  "),o("strong",[t._v("token")]),t._v(",向服务器传参数时，带上Token。这个Token是一个随机值，并且由服务器和用户同时持有。当用户提交表单时带上Token值，服务器就能验证表单和session中的Token是否一致。2. "),o("strong",[t._v("设置 httpOnly 标记")]),t._v("。3."),o("strong",[t._v("验证码")])])])])])}),[],!1,null,null,null);s.default=v.exports}}]);