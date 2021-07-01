// components/celler/celler.js
import URLS from '../../utils/urls'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    feedList: []
  },
  attached: function (options) {
    console.log(URLS.get_wine_list)
    // this.setData({loading:true});
    wx.request({
      url: URLS.get_wine_list,
      success: res => {
        console.log(res)
        // this.setData({loading:false});
        try {
          res = res.data
          if (!res || res.code !== 0 || !res.data) {
            this.setData({feedList: []});
            return
          }
          
          let feedList = res.data && res.data.length && res.data.map( item => {
            return {
              id: item.id,
              name: item.name,
              title: item.title,
              pics: item.pics ? item.pics[0] : 'http://pic.xuanfang.club/nowine.png',
              origin_price: item.origin_price,
              current_price: item.current_price,
              descrition: item.descrition,
              volume: item.volume,
              count: item.count,
            }
          })
          console.log(feedList)
          this.setData({feedList});
        } catch (e) {
          console.log(e)
          this.setData({feedList: []});
        }
      }    
        
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onFeedItemTap(event) {
      const feedId = event.currentTarget.dataset.feedId;
      wx.navigateTo({
        url: `/pages/detail/index?articleId=${feedId}`
      });
    },
  }
})
