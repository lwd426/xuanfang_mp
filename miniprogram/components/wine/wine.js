// components/feed.js
Component({
  /**
   * Component properties
   */
  properties: {
    // 酒名
    name: {
      type: String,
      value: '玄方'
    },
    cellerId: {
      type: String,
      value: 0
    },
    // 酒品id
    wineId: {
      type: String,
      value: 0
    },
    // 标题
    title: {
      type: String,
      value: ''
    },
    // 图片
    pics: {
      type: Array,
      value: []
    },
    // 原价
    origin_price: {
      type: String,
      value: ''
    },
    // 现价
    current_price: {
      type: String,
      value: ''
    },
    descrition: {
      type: String,
      value: ''
    },
    // 酒品规格
    volume: {
      type: Number,
      value: 0
    },
    count: {
      type: Number,
      value: 0
    }
  },

  /**
   * Component initial data
   */
  data: {
    show: 'normal',
    addNum: 0,
    canSlice: true,
    canAdd: true
  },

  /**
   * Component methods
   */
  methods: {
    go2detail (event) {
      const cellerId = event.currentTarget.dataset.cellerId
      const wineId = event.currentTarget.dataset.wineId
      wx.redirectTo({
        url: `pages/detail/index?cellerId=${cellerId}&wineId=${wineId}`,
      })
    },
    add () {
      if (this.data.addNum >= this.properties.count) {
        return
      }
      const num = this.data.addNum + 1
      this.setData({
        addNum: num,
        canSlice: num > 0,
        canAdd: num < this.properties.count
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
        canAdd: num < this.properties.count
      })
    },
    gift () {
      this.setData({
        show: 'share'
      })
      // const data = [1,2,3]
      // wx.showActionSheet({
      //   itemList: ['1瓶', '2瓶', '3瓶'],
      //   success: function(res) {
      //     // data[tapIndex]
      //     this.onShareAppMessage()
      //   },
      //   fail: function(res) {
      //     console.log(res.errMsg)
      //   }
      // })
    }
    
  }
})
