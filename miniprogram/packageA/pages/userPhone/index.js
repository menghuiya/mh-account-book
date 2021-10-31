// packageA/pages/userPhone/index.js
import Toast from "@vant/weapp/toast/toast";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    errorMessage: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userData = wx.getStorageSync("userInfo");
    this.setData({
      phone: userData.phone ? userData.phone : "",
    });
  },
  onHandleSave() {
    const userData = wx.getStorageSync("userInfo");
    const phone = this.data.phone;
    if (!/^1[3456789]\d{9}$/.test(phone)) {
      Toast.fail("格式错误");
      return false;
    } else {
      wx.setStorageSync("userInfo", Object.assign(userData, { phone }));
      wx.navigateBack({ changed: true });
    }
  },
});
