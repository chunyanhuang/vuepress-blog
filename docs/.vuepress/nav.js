module.exports = [
    {
        text: '懵逼指南', link: '/guide/'
    },
    {
        // 有多级的时候一级就不允许点击了
        text: '学习笔记',
		items: [
            {text: '基础知识', link: '/baodian/zero/'},
            {text: '常用命令', link: '/baodian/high/'},
        ]
    },{
        // 有多级的时候一级就不允许点击了
        text: '前端算法',
		items: [
            {text: '✏️leetcode题解', link: '/suanfa/one/'},
            {text: '💡算法归纳', link: '/suanfa/two/'},
        ]
    },{
        // 有多级的时候一级就不允许点击了
        text: '面试知识',
		items: [
            {text: 'js基础知识', link: '/interview/one/'},
            {text: 'html+css', link: '/interview/three/'},
            {text: 'vue', link: '/interview/two/'},
            {text: '网络相关', link: '/interview/four/'},
        ]
    },
    {
        text: '服务相关',
        items: [
			{
                text: '在线编辑',
				items: [
					{text: '图片压缩', link: 'https://tinypng.com/'}
				]
            },
			{
                text: '在线服务',
				items: [
					{text: '阿里云', link: 'https://www.aliyun.com/'},
					{text: '腾讯云', link: 'https://cloud.tencent.com/'}
				]
            },
			{
                text: '博客指南',
				items: [
					{text: '掘金', link: 'https://juejin.im/'},
					{text: 'CSDN', link: 'https://blog.csdn.net/'}
				]
            }
        ]
    }
]