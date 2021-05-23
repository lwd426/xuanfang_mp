//获取应用实例
const app = getApp();
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    // 数据列表
    newList:[],
  },
  
  getData:function(){
    var self = this;
    console.log(self.newList);
    console.log(self.showText);
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
     
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
// 监听底部菜单变化
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) 
    {
      this.getTabBar().setData({
        selected: 1    // 根据tab的索引值设置
      })  
    }
    var self = this;
    self.setData({
      newList:[
        {
          addtime:'2020-09-10 15:21:08',
          content:'这里是内容'
        },
        {
          addtime:'2020-09-10 15:21:08',
          content:'这里是内容'
        },
        {
          addtime:'2020-09-10 15:21:08',
          content:'这里是内容'
        },
    ],
    })
    return
    // 请求后台接口获取随言碎语列表
    wx.request({
      // 请求连接
      url: 'xxxxxxxxxxxxxxxxxxx',
      // 请求所需要的的参数
      data: {},
      success(result){
        self.newList = result.data;
        self.setData({
          newList:self.newList,
          showText: self.showText
        })
      }
    });
     
  },
  
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },
  
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },
  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },
  
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})