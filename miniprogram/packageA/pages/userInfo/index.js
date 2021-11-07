// index.js
// const app = getApp()
import Toast from "@vant/weapp/toast/toast";

const { mokeDataOccupation } = require("../../../utils/mokeData");
Page({
  data: {
    envId: "",
    isLogin: false,
    occupations: mokeDataOccupation,
    showProfession: false,
    showSex: false,
    show: false, //通用修改的
    actions: [
      {
        name: "男",
      },
      {
        name: "女",
      },
      {
        name: "保密",
      },
    ],
    changeType: "", //phone 手机，emial 邮箱，sign 签名
    changeValue: "",
    userInfo: {
      sex: "保密",
      id: 123456789,
      phone: "18715890318",
      emial: "1274323054@qq.com",
      profession: "未知",
      sign: "一条简单签名",
    }, //可以提交的
  },
  onLoad(options) {
    this.setData({
      envId: options.envId,
    });
  },
  onShow() {
    const tempUserInfo = wx.getStorageSync("userInfo");
    // if (tempUserInfo) {
    //   this.setData({
    //     userInfo: Object.assign(this.data.userInfo, tempUserInfo),
    //     isLogin: true,
    //   });
    // }
    wx.showLoading({
      title: "",
    });
    wx.cloud
      .callFunction({
        name: "quickstartFunctions",
        config: {
          env: this.data.envId,
        },
        data: {
          type: "selectRecord",
          dbName: "user",
          openid: tempUserInfo.openid,
        },
      })
      .then((resp) => {
        this.setData({
          userInfo: Object.assign(tempUserInfo, resp.result),
          isLogin: true,
        });
        wx.hideLoading();
      })
      .catch((e) => {
        console.log(e);
        this.setData({
          showUploadTip: true,
        });
        wx.hideLoading();
      });
  },
  showProfession() {
    this.setData({
      showProfession: true,
    });
  },
  closeProfession() {
    this.setData({
      showProfession: false,
      showSex: false,
      show: false,
    });
  },
  onConfirm(event) {
    const { picker, value, index } = event.detail;
    // Toast(`当前值：${value}, 当前索引：${index}`);
    const temppro = "userInfo.profession";
    const userData = wx.getStorageSync("userInfo");
    this.setData({
      [temppro]: value,
    });
    wx.setStorageSync(
      "userInfo",
      Object.assign(userData, { profession: value })
    );
    this.closeProfession();
  },
  showSex() {
    this.setData({
      showSex: true,
    });
  },
  selectSex(e) {
    const userData = wx.getStorageSync("userInfo");
    const { name } = e.detail;
    const tempsex = "userInfo.sex";
    this.setData({
      [tempsex]: name,
    });
    wx.setStorageSync("userInfo", Object.assign(userData, { sex: name }));
    this.closeProfession();
  },
  openChangeData(e) {
    const tempType = e.currentTarget.dataset.type;
    switch (tempType) {
      case "phone":
        wx.navigateTo({
          url: `/packageA/pages/userPhone/index`,
        });
        break;
      case "emial":
        wx.navigateTo({
          url: `/packageA/pages/userEmial/index`,
        });
        break;
      case "sign":
        wx.navigateTo({
          url: `/packageA/pages/userSign/index`,
        });
        break;
    }
  },
});
