module.exports = (url, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
        url: 'https://apis.1.chensmallx.top:1323/' + url,
        // url: 'https://locally.uieee.com/' + url,
    //   method:"POST",
      data:data,
      success: resolve,
      fail: reject
    })
  })
}

