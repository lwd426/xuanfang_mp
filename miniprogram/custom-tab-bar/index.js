Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
        "pagePath": "/pages/index/index",
        "text": "酒品首页",
        "iconPath": "/images/christmasTree.png",
        "selectedIconPath": "/images/christmasTree.png",
      },
      {
          "pagePath": "/pages/personal/index",
          "text": "个人中心",
          "iconPath": "/images/christmasMan.png",
          "selectedIconPath": "/images/christmasMan.png",
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      console.log(data)
      this.setData({
        selected: data.index
      })
    }
  }
})