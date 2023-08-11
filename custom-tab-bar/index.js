// components/custom-tabbar.js
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
    currentTab: 'home',
    tabList: [
      {
        "text": "首页",
        "name": "home",
        "pagePath": "/pages/home/home",
        "iconPath": "../image/home.png",
        "selectedIconPath": "../image/home-active.png"
      },
      {
        "text": "我的",
        "name": "mine",
        "pagePath": "/pages/mine/mine",
        "iconPath": "../image/mine.png",
        "selectedIconPath": "../image/mine-active.png"
      }
    ]
	},
	attached() {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    changeTab(e) {
      const dataset = e.currentTarget.dataset
      // console.log(dataset)
      wx.switchTab({
        url: dataset.path
      })
      // this.setData({
      //   currentTab: dataset.index
      // })
      // console.log(this.data.currentTab)
    }
  }
})
