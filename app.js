//app.js
var app = getApp()
App({
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        console.log('------')
        wx.setStorageSync('logs', logs)
        var that = this
        // 获取用户信息
    },
    globalData: {
        userInfo: null,
        userId: null,
        showFlag:false
    }
})