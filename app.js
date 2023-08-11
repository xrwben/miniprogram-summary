// app.js
App({
  onLaunch() {
    // 自定义导航栏的状态栏高度设置
    this.setNavHeight()
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    menuRect: null,
    systemInfo: null
  },
  // 根据机型动态设置导航栏高度
  setNavHeight() {
    // 获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点。
    // https://developers.weixin.qq.com/miniprogram/dev/api/ui/menu/wx.getMenuButtonBoundingClientRect.html
    const MenuRect = wx.getMenuButtonBoundingClientRect()
    console.log(wx.getMenuButtonBoundingClientRect())
    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        this.globalData.menuRect = MenuRect
        this.globalData.systemInfo = res
      }
    })
  },
})
