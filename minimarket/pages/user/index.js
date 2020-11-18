// pages/user/index.js
Page({
  data: {
    userinfo:{}
  },

  onShow(){
    const userinfo = wx.getStorageSync("userinfo");
    this.setData({
      userinfo
    })
  },

  handleGetUserInfo(e){
    const {userInfo} = e.detail;
    wx.setStorageSync("userinfo", userInfo);
    this.onShow()
  },

  handleWarn(){
    wx.showToast({
      title: '该功能还未开放哦！',
      icon:'none'
    });
  }
})