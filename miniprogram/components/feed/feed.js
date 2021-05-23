// components/feed.js
Component({
  /**
   * Component properties
   */
  properties: {
    // 作者
    author: {
      type: String,
      value: '作者'
    },
    feed_id: {
      type: String,
      value: 0
    },
    // 时间
    time: {
      type: String,
      value: '5天前'
    },
    // 标题
    title: {
      type: String,
      value: '标题'
    },
    desc: {
      type: String,
      value: '文章预览或者简介'
    },
    // 图片远程url
    pic: {
      type: String,
      value: '头图链接'
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
    }
  }
})
