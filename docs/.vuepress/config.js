module.exports = {
    title: '前端知识仓',
    description: '花里胡哨 ',
    // 默认在.vuepress目录下
    dest: './dist',
    port: '7777',
    head: [
        ['link', {rel: 'icon', href: '/img/icon.png'}],
        ['link', {rel: 'stylesheet', href: '/css/style.css'}],
        ['script', {charset: 'utf-8', src: '/js/main.js'}]
    ],
    markdown: {
        lineNumbers: true
    },
    base:'/vuepress-blog/',
    themeConfig: {
        repo: 'chunyanhuang/vuepress-blog',
        nav: require("./nav.js"),
        sidebar: require("./sidebar.js"),
        sidebarDepth: 2,
        lastUpdated: 'Last Updated',
        searchMaxSuggestoins: 10,
        serviceWorker: {
            updatePopup: {
                message: "有新的内容.",
                buttonText: '更新'
            }
        },
        editLinks: true,
        editLinkText: '编辑'
    }
}