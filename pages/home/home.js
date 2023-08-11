// pages/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPullDowning: false,
    marginTop: 0,
    stickyTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    console.log('onReady')
    // wx.createSelectorQuery()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log('onShow')
    if (typeof this.getTabBar === 'function') {
      this.getTabBar().setData({
        currentTab: 'home'
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
    this.setData({
      isPullDowning: true
    })
    setTimeout(() =>{
      console.log('结束下拉')
      this.setData({
        isPullDowning: false
      })
      wx.stopPullDownRefresh()
    }, 3000)
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
    let _scrollTop = e.scrollTop
    // console.log(_scrollTop)
    // if (_scrollTop >= 46) {
    //   _scrollTop = 46
    // } else if (_scrollTop <= 0) {
    //   _scrollTop = 0
    // }
    this.setData({
      marginTop: Math.round(_scrollTop)
    })
  },
  getStickyTop (e) {
    console.log('>>>>>', e.detail)
    this.setData({
      stickyTop: e.detail
    })
  }
})