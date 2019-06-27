// page/detailPage/detailPage.js
const fetch = require('../../utils/fetch.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        shops:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('--print onLoad--')
        console.log(options)
        let openid=options.Openid
        let iid=options.Iid
        // 先顶死了 两个参数
        var that=this
        const params = { Openid: 'oYKEK43t1HNAljVQRGGMibzjRIeQ', Iid: '42' }
        return fetch('getComment', params).then(res => {
            console.log('加载完后再加载商品信息')
            console.log(res.data)
            that.setData(res.data)
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