// page/listenPage/listenPage.js
const fetch=require('../../utils/fetch.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    //当前加载的分类
    category:{},
    //此分类下的
    shops:[],
    pageIndex:0,
    pageSize:10,
    hasMore:true,
    queryKey:''
  },

    loadMore(){
        if(this.data.hasMore) {
            console.log('还有数据')
            let {pageIndex,pageSize,queryKey}=this.data
            const params = { _page: ++pageIndex, _limit: pageSize,q:queryKey }
            return fetch('categories/'+this.data.category.id+'/shops', params).then(res => {
                console.log('加载完后再加载商品信息')
                // console.log(res.data)
                const totalCount = parseInt(res.header['X-Total-Count']) //字符转数字
                const hasMore=pageIndex*pageSize<totalCount
                const shops=this.data.shops.concat(res.data)    //追加到shop里
                this.setData({ shops, pageIndex,hasMore })

                // this.setData({ shops: res.data,pageIndex })
                // console.log('----') 
                // console.log(this.data.shops)
            })
        } //end if(hasMore)
        else{
            console.log('已访问完全部！')
        }
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    fetch("categories/1").then(res=>{
    //   console.log(res.data)
        // wx:wx.setNavigationBarTitle({
        //     title: res.data.name,
        //     success: function(res) {},
        //     fail: function(res) {},
        //     complete: function(res) {},
        // })

        //
        this.setData({category:res.data})
        wx.setNavigationBarTitle({
            title: res.data.name,
        })

        //加载完分类信息过后再去加载商品信息
        console.log(this.data.category.id)
        this.loadMore()
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      if(this.data.category.name){
          wx:wx.setNavigationBarTitle({
              title: this.data.category.name,
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
          })
      }
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
      this.setData({pageIndex:0,shops:[],hasMore:true})
      this.loadMore().then(()=>wx.stopPullDownRefresh())
      console.log('123')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //需要判断是否正在加载，否则会有多次触发问题
    //在这里加载下一页的数据
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 搜索功能
   */
  searchListen:function(){
      this.setData({pageIndex:0,shops:[],q:[]})
      this.loadMore()
      
  }
})