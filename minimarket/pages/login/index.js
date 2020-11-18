// pages/login/index.js
Page({
  handleGetUserInfo(e){
    const {userInfo} = e.detail;
    wx.setStorageSync("userinfo", userInfo);
    wewx.navigateBack({
      delta: 1
    });
  }
})