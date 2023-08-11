// components/nav-bar/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    searchkey: {
      type: String,
      value: ''
    },
    isShowSearchLogo: {
      type: Boolean,
      value: true
    },
    isShowResultPage: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: '理财通'
    },
    isPullDowning: {
      type: Boolean,
      value: false
    },
    marginTop: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navPaddingTop: 0,
    scrollTop: 0,
    searchStickyTop: 0,
    searchPaddingRight: 0
  },
  observers: {
    "marginTop": function(marginTop) {
      if (marginTop >= this.data.searchStickyTop) {
        marginTop = this.data.searchStickyTop
      } else if (marginTop <= 0) {
        marginTop = 0
      }
      const _paddingRight = marginTop > 0 ? (marginTop - this.data.searchStickyTop + app.globalData.systemInfo.screenWidth - app.globalData.menuRect.left + 16) * 2 : 32
      console.log(_paddingRight)
      this.setData({
        scrollTop: marginTop,
        searchPaddingRight: _paddingRight
      })
    }
  },
  attached () {
    console.log(app.globalData)
    this.setData({
      navPaddingTop: app.globalData.menuRect.top
    })
    // 获取搜索框的距离
    wx.createSelectorQuery().in(this).select('.search-con').boundingClientRect().exec(res => {
      const _offsetMenuBtn = res[0].top - this.data.navPaddingTop
      console.log(res, _offsetMenuBtn)
      app.globalData.searchOffset = _offsetMenuBtn
      this.setData({
        searchStickyTop: _offsetMenuBtn
      })
      this.triggerEvent('getStickyTop', _offsetMenuBtn)
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转搜索页
    goSearchPage () {
      wx.navigateTo({
        url: '/pages/subPackage/logs/logs',
      })
    },
    // 输入框改变事件
    input (e) {
      this.triggerEvent('changeSearchKey', e.detail.value)
    },
    // 清空搜索
    clear () {
      this.triggerEvent('changeSearchKey', '')
    },
    // 搜索
    searchEvent () {
      if (!this.searchkey) {
        return
      }
      this.triggerEvent('confirmSearch')
    },
    // 取消
    cancelEvent () {
      wx.navigateBack({
        delta: 1
      })
    }
  }
})
