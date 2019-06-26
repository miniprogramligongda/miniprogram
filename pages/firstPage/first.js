Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:"这里是内容...",
    btnText:"这是按钮的内容",
    show:true,
    news: ['aaa', 'bbb', 'ccc'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    
  },

  view1click:function(event){
    console.log('view1click')
    console.log(event)
  },
  view2click: function () {
    console.log('view2click')
  },
  view3click: function () {
    console.log('view3click')
  },
  btnClick:function(){
    wx.request({
      url: 'https://m.weibo.cn/api/comments/show?id=4363935979337847', //仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'Content-Type':'application/json'
      },
      success: function (res) {
        console.log(res.data.data.data)
      },
      fail:function(res){
        console.log('--fail--')
      }
    })
  }

  // btnClick:function(){
  //   console.log("按钮被点击了...")
  //   this.setData({text:"这是一个新内容"})
  //   var isShow=this.data.show
  //   console.log("isShow: "+isShow)

  //   var newsdata=this.data.news;
  //   newsdata.shift()  //删除一个数据

  //   this.setData({text:"这是一个内容...",show:!isShow,news:newsdata})
  // }
})

