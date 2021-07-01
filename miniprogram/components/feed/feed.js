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
    // 酒品id
    wine_id: {
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

  },

  /**
   * Component methods
   */
  methods: {
    momentRead: function(event) {
      const feedId = event.currentTarget.dataset.feedId;
      console.log(event.currentTarget.dataset)
    },
    go2detail () {
      wx.redirectTo({
        url: 'pages/detail/index',
      })
    }
  }
})
