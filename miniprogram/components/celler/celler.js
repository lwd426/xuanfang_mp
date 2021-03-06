// components/celler/celler.js
import URLS from '../../utils/urls'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    consumerUnionid: { // 属性名
      type: String,
      value: '',
      observer: function(newVal, oldVal) {
        // 属性值变化时执行
        if (newVal !== oldVal) this.init()
      }
    }
  },
  
  /**
   * 组件的初始数据
   */
  data: {
    feedList: [],
    wineCount: 0
  },
  attached: function (options) {
    // this.setData({loading:true});
  },

  /**
   * 组件的方法列表
   */
  methods: {
    init () {
      wx.request({
        url: URLS.get_celler,
        data: {
          unionId: this.properties.consumerUnionid  
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
            if (!res || res.code !== 0 || !res.data) {
              this.setData({feedList: []});
              return
            }
            let wineCount = 0;           
            let feedList = res.data.data && res.data.data.length && res.data.data.map( item => {
              wineCount = wineCount + item.wine_count
              return {
                id: item.id,
                name: item.name,
                title: item.title,
                pics: item.pics ? item.pics[0] : 'http://pic.xuanfang.club/nowine.png',
                origin_price: item.origin_price,
                current_price: item.current_price,
                descrition: item.descrition,
                volume: item.volume,
                userId: item.user_id || '',
                count: item.wine_count,
              }
            })
            
            this.setData({feedList,wineCount});
            this.triggerEvent('parentEvent', {
              wineCount,
              wineUngiftCount: res.data.ungift || 0 // 未被领取的酒品信息
            })
          } catch (e) {
            console.log(e)
            this.setData({feedList: []});
          }
        }    
          
      })
    },
    onWineItemTap(event) {
      const cellerId = event.currentTarget.dataset.cellerId
      const wineId = event.currentTarget.dataset.wineId
      wx.redirectTo({
        url: `/pages/detail/index?cellerId=${cellerId}&wineId=${wineId}`,
      })
    },
  }
})
