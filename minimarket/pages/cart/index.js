// pages/cart/index.js
Page({
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },

  onShow(){
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart")||[];
    this.setData({
      address
    })
    this.setCart(cart);
  },

  onLoad: function (options) {

  },

  handleChooseAddress(){
    wx.chooseAddress({
      success: (result)=>{
        wx.setStorageSync("address", result);
      }
    });
  },

  handleItemChange(e){
    const goods_id = e.currentTarget.dataset.id;
    let {cart} = this.data;
    let index = cart.findIndex(v=>v.goods_id === goods_id);
    cart[index].checked = !cart[index].checked;
    this.setCart(cart);
  },

  setCart(cart){
    const allChecked = cart.length?cart.every(v=>v.checked):false;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num
      }
    });
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    });
    wx.setStorageSync("cart", cart);
  },

  handleItemAllCheck(){
    let {cart,allChecked} = this.data;
    allChecked = !allChecked;
    cart.forEach(v=>v.checked = allChecked);
    this.setCart(cart)
  },

  handleItemNumEdit(e){
    const {operation,id} = e.currentTarget.dataset;
    let {cart} = this.data;
    let index = cart.findIndex(v=>v.goods_id === id);
    if(cart[index].num === 1 && operation === -1){
      wx.showModal({
        title: '提示',
        content: '是否要删除该商品',
        success: (result) => {
          if(result.confirm){
            cart.splice(index,1);
            this.setCart(cart);
          }
        }
      });
    }else{
      cart[index].num +=operation;
      this.setCart(cart) 
    }
  },

  handlePay(){
    const {address,totalNum} = this.data;
    if(!address.userName){
      wx.showToast({
        title: '您还没有选择收货地址',
        icon: 'none',
        mask: true
      });
      return;
    }
    if(totalNum === 0){
      wx.showToast({
        title: '您还没有选择商品',
        icon: 'none',
        mask: true
      });
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    });
  }
})