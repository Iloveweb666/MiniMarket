import { request } from "../../request/index.js"

Page({
  data: {
    leftMenuList:[],
    rightContent:[],
    currentIndex:0,
    position:0
  },
  Cates:[],

  onLoad: function (options) {
    const Cates = wx.getStorageSync("cates");
    if(!Cates){
      this.getCategory();
    }else{
      if(Date.now() - Cates.time > 1000*300){
        this.getCategory();
      }else{
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v=>v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },

  async getCategory(){
    const res = await request({url:"/categories"})
    this.Cates = res;
    wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});
    let leftMenuList = this.Cates.map(v=>v.cat_name);
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },

  handleItemTap(e){
    const {index} = e.currentTarget.dataset;
    
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      position:0
    })
  }
})