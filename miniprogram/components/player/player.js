const DEFAULT_MUSIC = {
  musicName: '让我想一想',
  artistName: '陈绮',
  musicPic: "http://qukufile2.qianqian.com/data2/pic/9f63c6b3c2795395d422f9818d83287d/68624/68624.jpg@s_2,w_150,h_150",
  musicUrl: "http://zhangmenshiting.qianqian.com/data2/music/86b30b9f7bc231e70d9067027d7c77bf/599618845/2834931560196861128.mp3?xcode=405d8a45845a42285fa4084c7da1aa86",
  playState: 0
}

Component({
  data: {
    playState: DEFAULT_MUSIC.playState,
    musicPic: DEFAULT_MUSIC.musicPic,
    musicName: DEFAULT_MUSIC.musicName,
    musicUrl: DEFAULT_MUSIC.musicUrl,
    artistName: DEFAULT_MUSIC.artistName,
  },
  ready() {

  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    // 由第一页进入到第二页时同步播放器的状态
    show: function () {
      this.updateData();
    },
  },
  methods: {
    /**
     * 更新自己的变量，更新视图
     */
    updateData() {

    },
    /**
     * 更新全局变量
     */
    updateDateGlobal(data) {

    },
    /**
     * 播放方法 
     */
    play: function () {

    },
    /**
     * 暂停方法
     */
    pause: function () {

    },
    /**
     * 切换音乐
     */
    change: function (data) {

    },
    handleClick: function (e) {
      switch (this.data.playState) {
        case 0:
          this.setData({
            playState: 1
          });
          this.play();
          break;
        case 1:
          this.setData({
            playState: 0
          });
          this.pause();
          break;
      }
    }
  }
})