// packageA/pages/userPhone/index.js
import Toast from "@vant/weapp/toast/toast";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    email: "",
    errorMessage: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userData = wx.getStorageSync("userInfo");
    this.setData({
      email: userData.email ? userData.email : "",
    });
  },
  onHandleSave() {
    const userData = wx.getStorageSync("userInfo");
    const email = this.data.email;
    const reg =
      /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (!reg.test(email)) {
      Toast.fail("格式错误");
      return false;
    } else {
      wx.setStorageSync("userInfo", Object.assign(userData, { email }));
      wx.navigateBack({ changed: true });
    }
  },
});
