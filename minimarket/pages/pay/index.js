import { request } from "../../request/index.js"

Page({
  data: {
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  },

  onShow(){
    const address = wx.getStorageSync("address");
    let cart = wx.getStorageSync("cart")||[];
    cart = cart.filter(v => v.checked)
    this.setData({ address })

    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
      totalPrice+=v.num*v.goods_price;
      totalNum+=v.num
    });
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
  },

  handleOrderPay(){
    const token = wx.getStorageSync("token");
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }
    wx.showToast({
      title: '该功能还未开放哦！',
      icon:'none'
    });
  }

})