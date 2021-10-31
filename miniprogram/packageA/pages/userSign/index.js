// packageA/pages/userPhone/index.js
import Toast from "@vant/weapp/toast/toast";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sign: "",
    errorMessage: "",
    signSize: { maxHeight: 100, minHeight: 50 },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userData = wx.getStorageSync("userInfo");
    this.setData({
      sign: userData.sign ? userData.sign : "",
    });
  },
  onHandleSave() {
    const userData = wx.getStorageSync("userInfo");
    const sign = this.data.sign;

    if (!sign) {
      Toast.fail("请输入签名");
      return false;
    } else {
      wx.setStorageSync("userInfo", Object.assign(userData, { sign }));
      wx.navigateBack({ changed: true });
    }
  },
});
