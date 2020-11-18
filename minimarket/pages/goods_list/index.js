const { request } = require("../../request/index");

// pages/goods_list/index.js
Page({
  data: {
    tabs:[
      {
        id:0,
        value:'综合',
        isActive:true
      },
      {
        id:1,
        value:'销量',
        isActive:false
      },
      {
        id:2,
        value:'价格',
        isActive:false
      }
    ],
    goodsList:[]
  },

  QueryParams:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },

  totalPages:1,

  onLoad: function (options) {
    this.QueryParams.cid = options.cid;
    this.getGoodsList()
  },

  async getGoodsList(){
    const res = await request({url:"/goods/search",data:this.QueryParams})
    const total = res.total;
    this.totalPages = Math.ceil( total / this.QueryParams.pagesize)
    this.setData({
      goodsList:this.data.goodsList.concat(res.goods)
    })
    wx.stopPullDownRefresh();
  },

  handleTabsItemChange(e){
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },

  onReachBottom(){
    if( this.QueryParams.pagenum>=this.totalPages){
      wx.showToast({
        title: '没有下一页啦！',
      });
    }else{
      this.QueryParams.pagenum++;
      this.getGoodsList()
    }
  },

  onPullDownRefresh(){
    this.setData({
      goodsList:[]
    })
    this.QueryParams.pagenum=1;
    this.getGoodsList()
  }
})