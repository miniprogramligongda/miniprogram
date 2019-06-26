// pages/tabOne/tabOne.js

//sort.js
//獲取應用實例
var app = getApp
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用户个人信息
    userInfo: {
      avatarUrl: "",//用户头像
      nickName: "",//用户昵称
    }
  },

  /**
  *点击添加地址事件
  */
  add_address_fun: function () {
    wx.navigateTo({
      url: 'add_address/add_address',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /**
     * 获取用户信息
     */
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        var avatarUrl = 'userInfo.avatarUrl';
        var nickName = 'userInfo.nickName';
        that.setData({
          [avatarUrl]: res.userInfo.avatarUrl,
          [nickName]: res.userInfo.nickName,
        })
      }
    })
  },
  BindPhone: function(){
    wx.navigateTo({
      url: 'BindPhone/BindPhone'
    })

  },
  Mycol: function(){
    wx.navigateTo({
      url: 'Mycol/Mycol'
    })

  },
  Myset: function (){
    wx.navigateTo({
      url: 'MySet/MySet'
    })

  },
})
