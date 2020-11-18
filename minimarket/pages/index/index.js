import { request } from "../../request/index.js"

Page({
  data: {
    swiperList:[],
    catesList:[],
    floorList:[]
  },

  onLoad: function(options){
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
  },

  getSwiperList(){
    request({url:"/home/swiperdata"})
    .then(result =>{
      this.setData({
          swiperList:result
        })
    })
  },

  getCatesList(){
    request({url:"/home/catitems"})
    .then(result =>{
      this.setData({
        catesList:result
      })
    })
  },

  getFloorList(){
    request({url:"/home/floordata"})
    .then(result =>{
      this.setData({
        floorList:result
      })
    })
  },
});