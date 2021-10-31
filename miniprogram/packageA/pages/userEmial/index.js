// packageA/pages/userPhone/index.js
import Toast from "@vant/weapp/toast/toast";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    emial: "",
    errorMessage: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userData = wx.getStorageSync("userInfo");
    this.setData({
      emial: userData.emial ? userData.emial : "",
    });
  },
  onHandleSave() {
    const userData = wx.getStorageSync("userInfo");
    const emial = this.data.emial;
    const reg =
      /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (!reg.test(emial)) {
      Toast.fail("格式错误");
      return false;
    } else {
      wx.setStorageSync("userInfo", Object.assign(userData, { emial }));
      wx.navigateBack({ changed: true });
    }
  },
});
