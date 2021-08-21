// index.js
// 获取应用实例
const app = getApp()
const Util = require('../../utils/util')
import URLS from '../../utils/urls'

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    cellerInfo: [],
    wineCount: 0,
    wineUngiftCount: 0,
    consumerId: '',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    if (!wx.getStorageInfoSync('openId')) {
      Util.login((openId, exsit) => {
        this.init(openId)
      })
    } else {
      this.init(wx.getStorageSync('openId'))
    }
  },
  init (consumer_id) {
    // 根据用户唯一标识获取酒窖信息
    this.setData({consumerId: consumer_id})
    // 判断是否为客态领取酒品 是否有携带必要参数包括礼品表id 
    if (!this.options.from_user_id || !this.options.wine_id || !this.options.count) return 
    // 如果有，判断礼品订单状态是否为待领取或者未回收
    wx.request({
      url: `${URLS.wine_gift_valid}`,
      data: {
          user_id: _this.data.consumerId
      },
      header: {
      'content-type': 'application/json'
      },
      method: 'POST',
      success: function(res) {
        this.selectComponent("#myceller").init()
      }
    })
    // 如果存在，弹出领取框收取，酒仓新建并入库酒品
    // 不过不存在，则提示已被领取，请核实
  },
  go2xuanfang () {
    wx.redirectTo({
      url: '/pages/xuanfang/index',
      success: (result) => {},
      fail: () => {},
      complete: () => {}
    });
  },
  cellerUpdate (e) {
    this.setData({
      wineCount: e.detail.wineCount,
      wineUngiftCount: e.detail.wineUngiftCount
    })
  },
  // 回收礼品酒
  onRecycle () {
    const _this = this
    wx.showModal({
      title: '回收所有酒品？',
      cancelText: '取消',
      success (res) {
        if (res.confirm) {
          // 发起回收请求
          wx.request({
            url: `${URLS.wine_recycle}`,
            data: {
                user_id: _this.data.consumerId
            },
            header: {
            'content-type': 'application/json'
            },
            method: 'POST',
            success: function(res) {
              this.selectComponent("#myceller").init()
            }
          })
        } 
      }
    })
  },
  onShareAppMessage(e) {
    const userId = e.target.dataset.userid
    const count = e.target.dataset.count
    const wineId = e.target.dataset.wineid
    const img = e.target.dataset.pic
    const userName = this.data.userInfo.nickName || wx.getStorageSync('userInfo').nickName || '玄方客户'
    // 执行酒品入礼品临时库逻辑
    wx.request({
      url: URLS.wine_gift,
      data: {
        user_id: userId,
        count: count,
        wine_id: wineId
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: res => {
        console.log(res)
        // this.setData({loading:false});
        try {
          res = res.data
          this.selectComponent("#myceller").init()
          if (!res || res.code !== 0 || !res.data) {
            // wx.showToast({
            //   title: '服务错误，请重试',
            // })
            return
          }
          
          wx.showToast({
            title: '礼品已放入临时礼品库',
          })
        } catch (e) {
          console.log(e)
        }
      },
      fail() {
        this.selectComponent("#myceller").init()
      }   
        
    })
    return {
      title: `${userName}送您${count}瓶酒` ,
      path: `/page/index/index?wine_id=${wineId}&from_user_id=${userId}&count=${count}`,
      imageUrl: `${img}`
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        wx.setStorageSync('userInfo', res.userInfo)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    wx.setStorageSync('userInfo', e.detail.userInfo)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
