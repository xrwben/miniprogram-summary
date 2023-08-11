// pages/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    descRichText: '<p>1、解答关于用户研究的流程及方法</p>',
    descRichText2: '<p>2、讨论用户研究可以帮助业务解决哪些问题 <<< </p>',
    descRichText3: '3、33&lt; >',
    descRichText4: '<p>4、mp-html插件使用 << <p>',
    isShowPopup: false,
    forbidScrollStyle: '',
    visible: false,
    scrollTop: 0,
    audio: {
      url: '',
      isPlaying: false,
      currentTime: 0,
      durationTime: 0,
      progress: 0,
      playbackRate: 1
    },
    currentTime: '00:00',
    durationTime: '00:00',
    playbackRate: '1.0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('onLoad')
    this.setData({
      ['audio.url']: 'https://s1.aigei.com/src/aud/mp3/83/834a05ea1fd146b2bb9cef2323565b75.mp3?e=1691779920&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:qbmiZZfAhv3asOUUTm7VGmtIAaA='
    }, () => {
      console.log
      this.createAudio()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    console.log('onReady', this.transformTime(30))
    // const times = 30
    // debugger
    // const mm = Math.round(times / 60)
    // const ss = Math.round(times % 60)
    // let min = mm <= 9 ? '0' + mm : mm
    // let sec = ss <= 9 ? '0' + ss : ss
    // console.log(min + ':' + sec)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (typeof this.getTabBar === 'function') {
      this.getTabBar().setData({
        currentTab: 'mine'
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  // 页面滚动触发事件的处理函数
  onPageScroll(e) {
    const _scrollTop = e.scrollTop
    this.setData({
      scrollTop: Math.round(_scrollTop)
    })
  },
  showPopup () {
    this.setData({
      isShowPopup: true,
      forbidScrollStyle: `position: fixed; left: 0; top: ${-this.data.scrollTop}px; z-index: 0;` ,
      visible: true
    })
    wx.setPageStyle({
      style: {
        overflow: 'hidden'
      }
    })
  },
  closePopup () {
    this.setData({
      isShowPopup: false,
      forbidScrollStyle: '',
      visible: false
    })
    wx.setPageStyle({
      style: {
        overflow: 'auto'
      }
    })
  },
  catchtouchmoveEvent () {
    if (this.data.isShowPopup) {
      return true
    }
  },
  // 创建音频
  createAudio () {
    const bgAudio = wx.getBackgroundAudioManager()
    bgAudio.title = '旅行的意义'
    bgAudio.coverImgUrl = 'http://p2.music.126.net/O5MGnD9aH25GrTJNzjogrQ==/870813209198983.jpg?param=130y130'
    // 设置了 src 之后会自动播放
    bgAudio.src = this.data.audio.url
    bgAudio.playbackRate = this.data.audio.playbackRate
    bgAudio.startTime = this.data.audio.currentTime
    // console.log(bgAudio)
    bgAudio.onCanplay(() => {
      console.log('可以播放了', bgAudio.paused, bgAudio.duration)
      // onCanplay事件会多次触发（seek/stop等方法），设置src会自动播放，所以不是isPlaying的时候就暂停
      if (!this.data.audio.isPlaying) {
        bgAudio.pause()
      }
      if (!this.data.audio.durationTime) {
        setTimeout(() => {
          this.setData({
            ['audio.durationTime']: bgAudio.duration,
            durationTime: this.transformTime(bgAudio.duration)
          })
        }, 100)
      }
    })
    bgAudio.onError((res) => {
      console.log('error>>>>', res)
      wx.showToast({
        title: '音频加载出错~',
        icon: 'none',
        duration: 2000
      })
    })
    bgAudio.onTimeUpdate(() => {
      console.log('onTimeUpdate>>>>', this.data.audio.durationTime, bgAudio.duration)
      // 如果onCanplay事件没有获取到歌曲总时长则在这里监听获取
      if (!this.data.audio.durationTime) {
        this.setData({
          ['audio.durationTime']: bgAudio.duration,
          durationTime: this.transformTime(bgAudio.duration)
        })
      }
      this.setData({
        ['audio.currentTime']: bgAudio.currentTime,
        'audio.progress': Math.round(this.data.audio.currentTime / this.data.audio.durationTime * 100),
        currentTime: this.transformTime(bgAudio.currentTime)
      })
    })
    bgAudio.onStop(() => {
      console.log('销毁')
      this.setData({
        'audio.isPlaying': false
      })
      this.createAudio()
    })
    bgAudio.onEnded(() => {
      // 播完了所有数据都被清理了，重新创建音频
      console.log('onEnded')
      this.setData({
        ['audio.isPlaying']: false,
        ['audio.currentTime']: 0,
        ['audio.progress']: 0
      })
      this.createAudio()
    })
  },
  play () {
    console.log('播放')
    const bgAudio = wx.getBackgroundAudioManager()
    bgAudio.play()
    this.setData({
      ['audio.isPlaying']: true
    })
  },
  pause () {
    const bgAudio = wx.getBackgroundAudioManager()
    bgAudio.pause()
    this.setData({
      ['audio.isPlaying']: false
    })
  },
  changeRate () {
    const _rate = this.data.audio.playbackRate >= 2 ? 0.5 : this.data.audio.playbackRate + 0.5
    this.setData({
      ['audio.playbackRate']: _rate,
      playbackRate: _rate.toFixed(1)
    })
    const bgAudio = wx.getBackgroundAudioManager()
    bgAudio.playbackRate = this.data.audio.playbackRate
    // 需要重新更新src才会生效，所以这里调用销毁然后重新创建
    bgAudio.stop()
    if (this.data.audio.isPlaying) {
      setTimeout(() => {
        this.play()
      }, 100)
    }
  },
  changeAudioProgress (event) {
    console.log('进度条拖动')
    const bgAudio = wx.getBackgroundAudioManager()
    const val = event.detail.value
    console.log(val, this.data.audio.durationTime)
    this.setData({
      ['audio.progress']: val,
      ['audio.currentTime']: this.data.audio.durationTime * val / 100,
      currentTime: this.transformTime(this.data.audio.durationTime * val / 100)
    })
    bgAudio.seek(this.data.audio.currentTime)
  },
  // 前进后退15s
  changeSeek (event) {
    if (event.target.dataset.seek === 'prev') {
      // console.log('后退15s')
      const _prevTime = this.data.audio.currentTime <= 0 ? 0 : this.data.audio.currentTime - 15
      this.setData({
        ['audio.currentTime']: _prevTime,
        currentTime: this.transformTime(_prevTime)
      })
    }
    if (event.target.dataset.seek === 'next') {
      // console.log('前进15s')
      const _nextTime = this.data.audio.currentTime >= this.data.audio.durationTime ? this.data.audio.durationTime : this.data.audio.currentTime + 15
      this.setData({
        ['audio.currentTime']: _nextTime,
        currentTime: this.transformTime(_nextTime)
      })
    }
    // console.log(this.data.audio.currentTime, this.data.currentTime)
    this.setData({
      ['audio.progress']: parseInt(this.data.audio.currentTime / this.data.audio.durationTime * 100)
    })
    const bgAudio = wx.getBackgroundAudioManager()
    bgAudio.seek(this.data.audio.currentTime)
  },
  // 将数字转换为时分秒
  transformTime (times) {
    const mm = parseInt(times / 60)
    const ss = parseInt(times % 60)
    let min = mm <= 9 ? '0' + mm : mm
    let sec = ss <= 9 ? '0' + ss : ss
    return min + ':' + sec
  },
})