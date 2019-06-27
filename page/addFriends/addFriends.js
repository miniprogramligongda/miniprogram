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
        ObjOpenid:null,
        SubOpenid:null,
        input_contain:''
    },

    bindTextAreaBlur: function (e) {
        this.setData({
            xinsheng_contain: e.detail.value
        })

    },
    /**
     *点击添加地址事件
     */
    add_address_fun: function () {
        wx.navigateTo({
            url: 'add_address/add_address',
        })
    },
    formName: function (e) {
        this.setData({
            input_contain: e.detail.value
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        this.setData({ ObjOpenid: options.ObjectOpenid, SubOpenid: options.SubjectOpenid})
    },
    sendMessage: function (e) {
        var that = this
        console.log('print get contain')
        console.log(that.data.input_contain)


                // Notes: that.data.input_contain

        wx.request({
            url: 'https://apis.1.chensmallx.top:1323/friendRequest',
            method: 'POST',
            data: {
                ObjectOpenid: that.data.ObjOpenid,
                SubjectOpenid: that.data.SubOpenid,
                url: 'https://apis.1.chensmallx.top:1323/friendRequestAgree'
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
    }
})