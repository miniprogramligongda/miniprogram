// page/listenPage/listenPage.js
const fetch=require('../../utils/fetch.js')
var app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //当前加载的分类
    category:{},
    userId:app.globalData.userId,
    showFlag:app.globalData.showFlag,
    //此分类下的
    shops:[],
    pageIndex:-1,
    pageSize:10,
    open_id:'0000000000000000000000000001',
    hasMore:true,
    queryKey:'',
    showFlag: false,
    authFlag:false
  },
    //显示按钮的方式
    getUserInfo:function(){
        var that = this
        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.userInfo']) {
                    wx.authorize({
                        scope: 'scope.userInfo',
                        success() {
                            that.UserLogin();
                        }
                    })
                }
                else {
                    that.UserLogin();
                }
            }
        })
    } ,
    //获取用户授权弹框
    UserLogin:function(){
        wx.getUserInfo({
            fail:res=>{
                console.log('fail login')
            },
            success: res => {
                // 可以将 res 发送给后台解码出 unionId
                console.log(res.userInfo)
                app.globalData.userInfo = res.userInfo
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 登录
                wx.login({
                    success: res => {
                        console.log(res.code)
                        if (res.code) {
                            //获取data
                            app.globalData.showFlag=true
                            this.setData({ showFlag: true })
                            // console.log(app.globalData.userInfo.avatarUrl)
                            // console.log(app.globalData.userInfo.nickName)
                            // console.log(app.globalData.userInfo.gender)
                            //存在code
                            wx.request({
                                url: 'https://apis.1.chensmallx.top:1323/loginCode',
                                data: {
                                    Code: res.code,
                                    AvatarUrl: app.globalData.userInfo.avatarUrl,
                                    Nickname: app.globalData.userInfo.nickName,
                                    Gender: app.globalData.userInfo.gender
                                },
                                method: 'POST',
                                header: {
                                    "content-type": "application/x-www-form-urlencoded"
                                },
                                success: res => {
                                    wx.showToast({
                                        title: '授权成功',
                                        icon: 'success',
                                        duration: 2000
                                    })
                                    console.log(res)
                                    app.globalData.userId = res.data.OpenID
                                    console.log(app.globalData.userId)
                                },
                                fail: function () {
                                    wx.showToast({
                                        title: '服务器请求失败',
                                        icon: 'success',
                                        duration: 2000
                                    })
                                    console.log('服务器请求失败!')
                                },
                            })
                        } else {
                            console.log('获取用户信息失败!' + res.errMsg)
                        } 
                    }
                })
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                }
            }
        })
    },
    loadMore(){
        if(this.data.hasMore) {
            console.log('还有数据')
            let {pageIndex,pageSize,open_id,queryKey}=this.data
            open_id=app.globalData.userId
            console.log(open_id)
            const params = { Openid:open_id,Page:++pageIndex }
            return fetch('getIdea', params).then(res => {
                console.log('加载完后再加载商品信息')
                // console.log(res.data)            
        // const totalCount = parseInt(res.header['X-Total-Count']) //字符转数字
                // const hasMore = this.isEmpty(res.data)
                const hasMore=true
                const shops=this.data.shops.concat(res.data) //追加到shop里
                this.setData({ shops, pageIndex,hasMore,userId:app.globalData.userId })

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
      console.log('--print-onLoad--')
      console.log(options)
        this.loadMore()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      var that = this
    //   wx.showModal({
    //       title: '用户授权',
    //       content: '允许获取头像信息、姓名昵称、性别',
    //       success(res) {
    //           if (res.confirm) {
    //               console.log('用户点击确定')
    //               that.setData({authoFlag:true})
    //               that.getAuth()
    //           } else if (res.cancel) {
    //               console.log('用户点击取消')
    //           }
    //       }
    //   })
      if(this.data.authFlag){
          wx:wx.setNavigationBarTitle({
              title: "成功授权",
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
          })
      }
  },
    //bindtap事件 加好友
    tap_addFriends:function(e){
        console.log(' 加好友')        
        // wx.showModal({
        //     title: '请求添加好友',
        //     success(res) {
        //         if (res.confirm) {
        //             console.log('用户点击确定')
        //         } else if (res.cancel) {
        //             console.log('用户点击取消')
        //         }
        //     }
        // })
        
        // let { pageIndex, pageSize, open_id, queryKey } = this.data
        // 先顶死了 两个参数
        // const params = { Openid: 'oYKEK43t1HNAljVQRGGMibzjRIeQ', Iid: '42' }
        // return fetch('like', params).then(res => {
        //     console.log('加载完后再加载商品信息')
        //     console.log(res.data)
        // })
    },

    //bindtap事件  点赞
    tap_like:function(e){
        let { pageIndex, pageSize, open_id, queryKey } = this.data
        // 先顶死了 两个参数
        const params = { Openid: 'oYKEK43t1HNAljVQRGGMibzjRIeQ', Iid: '42' }
        return fetch('like', params).then(res => {
            console.log('加载完后再加载商品信息')
            console.log(res.data)
        })
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
      this.setData({pageIndex:-1,shops:[],hasMore:true})
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
        this.setData({pageIndex:-1,shops:[]})
        this.loadMore()
    },
    isEmpty: function (json){    
        if(json) {
            for (this.data.log in json) {
                return false;                
            }
            return true;
        }else{
            return true;
        }
    }
})