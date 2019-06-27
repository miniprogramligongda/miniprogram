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
            avatarUrl: "", //用户头像
            nickName: "", //用户昵称
            showFlag: app.globalData.showFlag
        },
        height: 20,
        focus: false,
        input_contain: '',
        productInfo: {},
        isShow: false,
        url: "../img/lock.png",
        iShow: true,
        user_code:[]
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({showFlag:app.globalData.showFlag})
        console.log('---print--userId')
        console.log(app.globalData.userId);
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
    clickMic: function () {
        var s = this;
        console.log("start");
        wx.startRecord({
            success: function (res) {
                console.log(res);
                var tempFilePath = res.tempFilePath;
                s.setData({
                    recodePath: tempFilePath,
                    isRecode: true
                });
            },
            fail: function (res) {
                console.log("fail");
                console.log(res);
                //录音失败

            }

        });
    },

    clickPho: function () {
        var that = this;
        wx.chooseImage({
            count: 3, //最多可以选择的图片总数  
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
            sourceType: ['album', 'camera'], // 指定来源是相册  
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
                var tempFilePaths = res.tempFilePaths;
                //启动上传等待中...  
                wx.showToast({
                    title: '正在上传...',
                    icon: 'loading',
                    mask: true,
                    duration: 10000
                })
                var uploadImgCount = 0;
                for (var i = 0, h = tempFilePaths.length; i < h; i++) {
                    wx.uploadFile({
                        // url: ?????????

                        filePath: tempFilePaths[i],
                        name: 'uploadfile_ant',
                        formData: {
                            'imgIndex': i
                        },
                        header: {
                            "Content-Type": "multipart/form-data"
                        },
                        success: function (res) {
                            uploadImgCount++;
                            var data = JSON.parse(res.data);
                            //服务器返回格式: { "Catalog": "testFolder", "FileName": "1.jpg", "Url": "https://test.com/1.jpg" }  
                            var productInfo = that.data.productInfo;
                            if (productInfo.bannerInfo == null) {
                                productInfo.bannerInfo = [];
                            }
                            productInfo.bannerInfo.push({
                                "catalog": data.Catalog,
                                "fileName": data.FileName,
                                "url": data.Url
                            });
                            that.setData({
                                productInfo: productInfo
                            });

                            //如果是最后一张,则隐藏等待中  
                            if (uploadImgCount == tempFilePaths.length) {
                                wx.hideToast();
                            }
                        },
                        fail: function (res) {
                            wx.hideToast();
                            wx.showModal({
                                title: '错误提示',
                                content: '上传图片失败',
                                showCancel: false,
                                success: function (res) { }
                            })
                        }
                    });
                }
            }
        });
    },
    clickCam: function () {


    },
    clickLoc: function () {
        if (IsclickLocK) {
            this.setData({
                IsclickLocK: false
            })
        } else {
            this.setData({
                IsclickLocK: true
            })
        }
    },


    //点击选择是否匿名
    close_tap: function () {
        this.setData({
            isShow: true
        })
    },
    open_tap: function () {
        this.setData({
            isShow: false
        })
    },

    clickLoc: function (res) {
        console.log(res);
        let url
        if (res.currentTarget.dataset.msg == "../img/lock.png") {
            url = "../img/lock_open.png"
        } else {
            url = "../img/lock.png"
        }
        this.setData({
            url: url
        })
    },
    formName: function (e) {
        this.setData({
            input_contain: e.detail.value
        })
    },
    sendMessage:function(e){  
        var that=this
        console.log('print get contain')    
        console.log(that.data.input_contain)
        wx.request({
            url: 'https://apis.1.chensmallx.top:1323/postIdea',
            method:'POST',
            data: {
                Openid: app.globalData.userId,
                Content: that.data.input_contain,
                // Content: '每天反复告诉自己，每天无论有多伤心都要笑，就是为了不要让那些看不起自己的人看笑话，哪里来的这么多委屈，睡觉之前甩甩被子，都甩干净了再重新拾起笑容，面对生活。',
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success(res){
                console.log('success')
                console.log(res)
                wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 2000
                })
            },
            fail(res){
                console.log('fail')
                console.log(res)
                wx.showToast({
                    title: '发送失败',
                    icon: 'fail',
                    duration: 2000
                })
            }

        })
    }
})