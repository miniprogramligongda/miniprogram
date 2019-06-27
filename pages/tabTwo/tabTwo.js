// pages/tabOne/tabOne.js

//sort.js
//獲取應用實例
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //用户个人信息
        userInfo: {
            avatarUrl: "",//用户头像
            nickName: "",//用户昵称
            province: "",//用户省份
            city: "",//用户城市
            showFlag: app.globalData.showFlag,
        },

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
        this.setData({ showFlag: app.globalData.showFlag })

        /**
         * 获取用户信息
         */
        wx.getUserInfo({
            success: function (res) {
                console.log(res);
                var avatarUrl = 'userInfo.avatarUrl';
                var nickName = 'userInfo.nickName';
                var province = 'userInfo.province';
                var city = 'userInfo.city';
                that.setData({
                    [avatarUrl]: res.userInfo.avatarUrl,
                    [nickName]: res.userInfo.nickName,
                    [province]: res.userInfo.province,
                    [city]: res.userInfo.city,
                })
            }
        })
    },
    idea: function () {
        wx.navigateTo({
            url: 'idea/idea'
        })

    },
    about: function () {

        wx.showModal({
            title: '关于',
            content: '项目经理：冷瑜，开发及测试人员：冯逸楠，陈可，吴灿柳，单家辉，李浩铮',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })

    },
    Mycol: function () {
        wx.navigateTo({
            url: 'Mycol/Mycol'
        })

    },
    Myset: function () {
        wx.navigateTo({
            url: 'MySet/MySet'
        })

    },
})
