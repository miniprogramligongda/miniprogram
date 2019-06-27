// pages/tabTwo/Mycol/Mycol.js
const fetch = require('../../../utils/fetch.js')
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    shops: []
  },
  loadMore() {
    this.setData({shops: [] })
    const params = { Openid: app.globalData.userId }
    console.log('nikokvcs come here')      
    console.log(params)
    return fetch('getFav', params).then(res => {
      // console.log('加载完后再加载商品信息')
      console.log('nikokvcs come where')
      console.log(res.data)            
      // const totalCount = parseInt(res.header['X-Total-Count']) //字符转数字
      // const hasMore = this.isEmpty(res.data)
      const hasMore = true
      const shops = this.data.shops.concat(res.data)    //追加到shop里
      this.setData({ shops })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMore()
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
    //在loadMore加载之前需要把之前的数据都清了
    this.setData({ pageIndex: -1, shops: [], hasMore: true })
    this.loadMore().then(() => wx.stopPullDownRefresh())
    console.log('123')
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

  },

  isEmpty: function (json) {
    if (json) {
      for (this.data.log in json) {
        return false;
      }
      return true;
    } else {
      return true;
    }
  }
})