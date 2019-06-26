// pages/tabOne/tabOne.js
const fecth=require('../../utils/fetch')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options){
    fecth('categories').then(res=>{
      this.setData({lists:res.data})
    })
  },
  // onLoad: function (options) {
  //   wx.request({
  //     url:'https://locally.uieee.com/categories',
  //     // url: 'https://m.weibo.cn/api/comments/show?id=4363935979337847',
  //     success:res=> {
  //       this.setData({lists:res.data})
  //     }
  //   })
  // },
  

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