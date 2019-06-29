// page/detailPage/detailPage.js
const fetch = require('../../../utils/fetch.js')
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        shops: [],
        input_contain: '',
        open_id: '',
        i_id: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('--print onLoad--')
        console.log(options)
        // 先顶死了 两个参数
        // 'oYKEK43t1HNAljVQRGGMibzjRIeQ'
        // '42'
        var that = this
        const params = { ObjectOpenid: options.Openid }
        return fetch('friendList', params).then(res => {
            console.log('加载完后再加载商品信息')
            console.log(res.data)
            that.setData({ shops: res.data })
        })
    },

    /**
     * 获取input内容
     */
    formName: function (e) {
        this.setData({
            input_contain: e.detail.value
        })
    },

    /**
     * 发表评论
     */
    sendMessage: function (e) {
        var that = this
        console.log('print get contain')
        console.log(that.data.i_id)

        console.log(that.data.input_contain)
        // Notes: that.data.input_contain

        wx.request({
            url: 'https://apis.1.chensmallx.top:1323/postComment',
            method: 'POST',
            data: {
                Openid: app.globalData.userId,
                Iid: that.data.i_id,
                Content: that.data.input_contain
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'//默认值
            },
            success(res) {
                console.log('success')
                console.log(res)
                wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 2000
                })
            },
            fail(res) {
                console.log('fail')
                console.log(res)
                wx.showToast({
                    title: '发送失败',
                    icon: 'cancel',
                    duration: 2000
                })
            }
        })
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})