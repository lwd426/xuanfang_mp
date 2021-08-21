"use strict";
import URLS from './utils/urls'
import Utils from './utils/util'
App({
    globalData: {},
    onLaunch: function () {
        var _this = this;
        var logs = wx.getStorageSync('logs') || [];
        logs.unshift(Date.now());
        wx.setStorageSync('logs', logs);
        Utils.login(function (openId, exsit) {
            wx.getSetting({
                success: function (res) {
                    if (res.authSetting['scope.userInfo']) {
                        wx.getUserProfile({
                            success: function (res) {
                                console.log(res.userInfo)
                                !wx.getStorageSync('userInfo') && wx.setStorageSync('userInfo', res.userInfo) 
                                !exsit && _this.getUser()
                                if (_this.userInfoReadyCallback) {
                                    _this.userInfoReadyCallback(res);
                                }
                            },
                        });
                    }
                },
            });
        })   
    },
    getUser () {
        // 验证用户是否存在，如果不存在，则建立用户及酒窖
        wx.request({
            url: `${URLS.consumer_create}`,
            data: {
                userInfo: wx.getStorageSync('userInfo') ,
                openId: wx.getStorageSync('openId') 
            },
            header: {
              'content-type': 'application/json'
            },
            method: 'POST',
            success: function(res) {
                if (res.code === 0) {
                    wx.showToast({
                        title: '登录成功',
                        icon: 'success',
                        duration: 1000
                    })
                }
            }
          })
    }
});
