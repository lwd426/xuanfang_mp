import URLS from './urls'
module.exports = {
    login (callback) {
        const unionId = wx.getStorageSync('openId')
        if (unionId) {
            return callback(unionId, wx.getStorageSync('userExsit'))
        }
        wx.login({
            success: res => {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
                wx.request({
                    url: `${URLS.get_authorization_code}`,
                    data: {
                        js_code:res.code, //临时登录凭证
                    },
                    header: {
                    'content-type': 'application/json'
                    },
                    method: 'POST',
                    success: function(res) {
                        var data = res.data.data //返回openid
                        wx.setStorageSync('openId', data.openId)
                        wx.setStorageSync('userExsit', data.exsit)
                        callback(data.openId, data.exsit)
                    }
                })
            }
        })
    }
}