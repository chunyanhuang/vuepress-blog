(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{225:function(s,t,e){"use strict";e.r(t);var o=e(0),a=Object(o.a)({},(function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h3",{attrs:{id:"本地存储"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#本地存储","aria-hidden":"true"}},[s._v("#")]),s._v(" 本地存储")]),s._v(" "),e("ul",[e("li",[e("strong",[s._v("1、sessionStorage")])]),s._v(" "),e("li",[e("strong",[s._v("2、localStorage")])]),s._v(" "),e("li",[e("strong",[s._v("3、session")])]),s._v(" "),e("li",[e("strong",[s._v("4、cookie")])])]),s._v(" "),e("p",[e("strong",[s._v("特性")]),s._v("：不同浏览器无法共享localStorage和sessionStorage中的信息。同一浏览器的相同域名和端口的不同页面间可以共享相同的 localStorage，但是不同页面间无法共享sessionStorage的信息。")]),s._v(" "),e("ul",[e("li",[e("ol",[e("li",[s._v("本地存储，数据存储在浏览器")])])]),s._v(" "),e("li",[e("ol",{attrs:{start:"2"}},[e("li",[s._v("sessionStorage约5M,  localStorage约20M")])])]),s._v(" "),e("li",[e("ol",{attrs:{start:"3"}},[e("li",[s._v("只存储json字符串")])])])]),s._v(" "),e("p",[e("strong",[s._v("1、sessionStorage")])]),s._v(" "),e("ul",[e("li",[s._v("关闭浏览器数据就丢失。**通过跳转的页面可以共享sessionStorage值")]),s._v(" "),e("li",[e("strong",[s._v("方法：")]),s._v(" "),e("ul",[e("li",[s._v("sessionStorage.setItem('key', 'value')  设置数据")]),s._v(" "),e("li",[s._v("sessionStorage.getItem('key'  )      获取数据")]),s._v(" "),e("li",[s._v("sessionStorage.removeItem('key' )     移除数据")]),s._v(" "),e("li",[s._v("sessionStorage.clear( )      清除数据")])])])]),s._v(" "),e("p",[e("strong",[s._v("2、localStorage")])]),s._v(" "),e("ul",[e("li",[s._v("除非手动删除，否则数据永久存在，同源窗口可共享；"),e("strong",[s._v("没有失效时间，永久存在")])]),s._v(" "),e("li",[s._v("localStorage的存取都是异步")]),s._v(" "),e("li",[e("strong",[s._v("方法：")]),s._v(" "),e("ul",[e("li",[s._v("localStorage.setItem('key', 'value')")]),s._v(" "),e("li",[s._v("localStorage.getItem('key'  )")]),s._v(" "),e("li",[s._v("localStorage.clear( )")])])])]),s._v(" "),e("p",[e("strong",[s._v("实现localStorage跨域存储")]),s._v("：postMessage和iframe"),e("br"),s._v("\n在A域和B域下引入C域，所有的读写都由C域来完成，本地数据存在C域下;A域】【B域】需要读写时，通过postMessage 向【C域】发送跨哉消息，【C域】监听跨域消息，在接到批定的消息时进行读写操作，【C域】接到跨域消息时，如果是写入删除可以不做什么，如果是读取，就要先读取本域本地数据通过postMessage向父页面发送消息,【A 域 / B 域】在读取【C域】数据时就需要监听来自【C域】的跨域消息")]),s._v(" "),e("p",[e("strong",[s._v("3、session")])]),s._v(" "),e("ul",[e("li",[s._v("是一个回话对象，存储在服务端，可存储多条数据，每条数据都有一个唯一标识符sessionID")]),s._v(" "),e("li",[s._v("访问网页的时候被创建，关闭浏览器的时候被销毁。")])]),s._v(" "),e("p",[e("strong",[s._v("4、cookie")])]),s._v(" "),e("ul",[e("li",[e("p",[s._v("Cookie是解决HTTP无状态性的有效手段，"),e("strong",[s._v("服务器可以设置或读取Cookie中所包含的信息")]),s._v("。当用户登录后，"),e("strong",[s._v("服务器会发送包含登录凭据的Cookie到用户浏览器客户端")]),s._v("，而浏览器对该Cookie进行某种形式的"),e("strong",[s._v("存储")]),s._v("（内存或硬盘）。用户再次访问该网站时，"),e("strong",[s._v("浏览器会发送该Cookie（Cookie未到期时）到服务器")]),s._v("，服务器对该凭据进行验证，合法时使用户不必输入用户名和密码就可以直接登录。")])]),s._v(" "),e("li",[e("p",[s._v("本质上讲，Cookie是一段文本信息。客户端请求服务器时，如果服务器需要记录用户状态，就在响应用户请求时发送一段Cookie信息。客户端浏览器保存该Cookie信息，当用户再次访问该网站时，浏览器会把Cookie做为请求信息的一部分提交给服务器。服务器检查Cookie内容，以此来判断用户状态，服务器还会对Cookie信息进行维护，必要时会对Cookie内容进行修改。")])]),s._v(" "),e("li",[e("p",[s._v("浏览器在电脑硬盘开辟的空间，用于存储服务端数据；"),e("strong",[s._v("数据有过期时间")]),s._v("，超过时间数据会被自动删除，数据会随请求发送到服务器.")])]),s._v(" "),e("li",[e("p",[s._v("当客户端向服务端发送请求时，成功后服务端会返回一个sessionID给客户端，客户端会将这个sessionID存储在cookie中。"),e("strong",[s._v("之后每次请求一个新的页面的时候Cookie都会被发送过去")])])]),s._v(" "),e("li",[e("p",[s._v("Cookie是网站系统为了方便某些功能（记住密码）由服务器生成并保存在访问者浏览器中的某个记录文件（一个文本文件），因此如果你访问某个网站，登录的信息会保存在你的浏览器中，下一次访问该网站时，网站服务器会先通过访问你的cookie识别你的登录信息")])]),s._v(" "),e("li",[e("p",[s._v("cookie解决了什么问题？ 解决了同一网站访问不同网页的时候，信息不能共享的问题，因为http协议是无状态的")])]),s._v(" "),e("li",[e("p",[s._v("cookie的缺点： 存储大小和个数受限制")])]),s._v(" "),e("li",[e("p",[s._v("cookie是怎么交互的？ 是通过http的响应头和请求头使客户端和服务器端进行交互的。当客户端要发送http请求时，浏览器会先检查下是否有对应的cookie。有的话，则自动地添加在request header中的cookie字段")])]),s._v(" "),e("li",[e("p",[e("strong",[s._v("cookie的参数：")])]),s._v(" "),e("ul",[e("li",[s._v("key = value ; 存储value的值时候必须转义，一般用encodeURICompoment 进行转义，对key的合法性也必须进行检查")]),s._v(" "),e("li",[e("code",[s._v("expires = <date>")]),s._v("  ;  cookie的过期日期，")]),s._v(" "),e("li",[e("code",[s._v("domain = <domain>")]),s._v(" ; 生效的域名，(当前网页的域名)")])])])]),s._v(" "),e("p",[e("strong",[s._v("webStorage与cookie的区别：")]),e("br"),s._v("\nweb storage是用于本地大容量存储数据，cookie是用于客户端和服务端间的信息传递。")]),s._v(" "),e("p",[e("strong",[s._v("cookie的实现原理:")]),e("br"),s._v("\n客户端请求服务器后，如果服务器需要记录用户状态，服务器会在响应信息中包含一个Set-Cookie的响应头，客户端会根据这个响应头存储Cookie信息。再次请求服务器时，客户端会在请求信息中包含一个Cookie请求头，而服务器会根据这个请求头进行用户身份、状态等较验。")]),s._v(" "),e("div",{staticClass:"language-javascript line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 服务器向客户端发送的cookie")]),s._v("\nSet"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("Cookie"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("value "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("expires"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("date"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("domain"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("domain"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("path"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("path"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("secure"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Expires/Max-age:设置过期时间；")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// domain:表示指定了哪些主机可以接受cookie")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Path:设置必须是匹配的路径和子路径才会发送cookie")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Secure:标志cookie只能通过https传输，可以防止xss攻击；")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 客户端向服务器发送的cookie")]),s._v("\nCookie"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" value\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br")])]),e("p",[e("strong",[s._v("阻止xss攻击")]),s._v("："),e("br"),s._v("\ncookie有个属性叫HttpOnly，当这个值设为true时，浏览器是无法通过document.cookie来读取这个cookie值的，只有服务端能够读取。从而能够阻止xss攻击。")])])}),[],!1,null,null,null);t.default=a.exports}}]);