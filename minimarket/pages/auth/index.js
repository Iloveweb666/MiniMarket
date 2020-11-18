import { request } from "../../request/index.js"
import { login } from "../../utils/asyncWX.js"

Page({

  data: {

  },

  async handleGetUsetInfo(e){
    try {
      const {encryptedData,rawData,iv,signature} = e.detail;
      const {code} = await login();
      const loginParams= {encryptedData,rawData,iv,signature,code};
      const res = await request({url:"/users/wxlogin",data:loginParams,method:"post"})
      const token = "clearLove7";
      wx.setStorageSync("token", token);
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.log(error);
    }
  }
})