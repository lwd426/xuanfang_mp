// index.js
// 获取应用实例
const app = getApp()
import URLS from '../../utils/urls'

Page({
  data: {
    addNum: 1,
    canSlice: true,
    canAdd: true,
    title: '',
    name: '',
    wineId: 0,
    cellerId: 0,
    alcoho_vol: 0,
    count: 0,
    current_price: 0,
    origin_price: 0,
    userInfo: {},
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
  onLoad(options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    if (!options.wineId) {
      wx.redirectTo({
        url: `pages/index/index`,
      })
    }
    this.setData({cellerId: options.cellerId})
    this.init(options.wineId)
  },
  init (id) {
    wx.request({
      url: `${URLS.get_wine}/${id}`,
      header: {
      'content-type': 'application/json'
      },
      method: 'GET',
      success: (res) => {
          var data = res.data.data //返回openid
          this.setData({
            title: data.title || '',
            name: data.name || '',
            wineId: data.id || '',
            alcoho_vol: data.alcoho_vol || '',
            count: data.count || '',
            current_price: data.current_price || '',
            origin_price: data.origin_price || '',
          })
      }
    })
  },
  add () {
    if (this.data.addNum >= this.data.count) {
      return
    }
    const num = this.data.addNum + 1
    this.setData({
      addNum: num,
      canSlice: num > 0,
      canAdd: num < this.data.count
    })
  },
  slice () {
    if(!this.data.addNum) {
      return
    }
    const num = this.data.addNum - 1
    this.setData({
      addNum: num,
      canSlice: num > 0,
      canAdd: num < this.data.count
    })
  },
  buy () {
    // 买酒加仓，传参：酒品id,酒窖id,酒品数量
    const data = {
      wine_id: this.data.wineId,
      celler_id: this.data.cellerId,
      count: this.data.addNum
    }
    
    if (!this.data.wineId || !this.data.cellerId || !this.data.addNum) {
      wx.showToast({
        title: '信息有误，请核对',
      })
      return
    }
    const openId = wx.getStorageSync('openId')
    
    if (!openId) {
      wx.showToast({
        title: '信息有误，请核对',
      })
      return
    }
    wx.request({
      url: `${URLS.buy_wine}`,
      data: {
        wine_id: this.data.wineId,
        celler_id: this.data.cellerId,
        count: this.data.addNum,
        union_id: openId
      },
      header: {
      'content-type': 'application/json'
      },
      method: 'POST',
      success: (res) => {
        if (res.data.code === 1) {
          wx.showToast({
            title: res.data.msg
          })
          return
        }
        var data = res.data.data //返回openid
        wx.showToast({
          title: '加仓成功'
        })
        wx.redirectTo({
          url: '/pages/index/index',
          success: (result) => {},
        });
      }
    })
  }
  // getUserProfile(e) {
  //   // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  //   wx.getUserProfile({
  //     desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  //     success: (res) => {
  //       console.log(res)
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   })
  // }
})
