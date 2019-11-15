### h5+c3

**h5新特性**
- 语义化标签 header/footer/nav/section/aside/article/
- 表单type类型：tel/number/search /email/url/time/date/month/week
- 表单新属性： placeholder/autofocus/multiple
- 视频音频 audio / video
- video: 标签，属性: autoplay, controls, src, ; video标签中插入source标签可以设置视频格式；
- audio:音频标签，属性：autoplay, controls, src; 可插入source标签定义音频格式
- 画布canvas
- 伸缩矢量图svg
- 拖拽属性 draggable
- 事件 resize ,input
- web存储:  sessionStorage 和 localStorage
- 文件通讯协议 websocket
- .文件读取 fileReader
- 类名操作   classlist

**c3新特性** 
- 结构伪类选择器：first-child/last-child/nth-child(n)/ first-of-type/nth-of-type/:checked/:disabled
  - E:nth-child: 父元素的第n个子元素且为E元素
  - E:nth-of-type(n): 所有的子元素E中的第n个
- 属性选择器： E[att="val"]; E[att$="val"]
- 盒模型： box-sizing: content-box / border-box
- 阴影： box-shadow：水平阴影 垂直阴影 模糊距离 阴影颜色,  text-shadow
- 背景缩放：background-size: cover(图片沾满屏幕可能会溢出隐藏), contain(保证完整显示，背景可能会占不满)
- 背景渐变： background:linear-gradient(起始方向，颜色1，颜色2)
- 圆角边框： border-radius
- 2d/3d转换： transform: translate rotate scale skew
- 过渡： transition
- 动画： keyframes, animation
- 弹性盒模型：flex
- 媒体查询: @media
- Chrome中实现6px的字体： chrome中的最小字体是12px; 可通过transform:scaleY(0.5)