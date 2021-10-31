// index.js
// const app = getApp()
import Toast from "@vant/weapp/toast/toast";

const { mokeDataOccupation } = require("../../../utils/mokeData");
Page({
  data: {
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
    userInfo: {
      sex: "保密",
      id: 123456789,
      phone: "18715890318",
      emial: "1274323054@qq.com",
      profession: "未知",
      sign: "一条简单签名",
    }, //可以提交的
  },
  onLoad() {
    const tempUserInfo = wx.getStorageSync("userInfo");
    if (tempUserInfo) {
      this.setData({
        userInfo: Object.assign(this.data.userInfo, tempUserInfo),
        isLogin: true,
      });
    }
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
    this.setData({
      [temppro]: value,
    });
    this.closeProfession();
  },
  showSex() {
    this.setData({
      showSex: true,
    });
  },
  selectSex(e) {
    const { name } = e.detail;
    const tempsex = "userInfo.sex";
    this.setData({
      [tempsex]: name,
    });
    this.closeProfession();
  },
  openChangeData(e) {
    this.setData({
      changeType: e.type,
      show: true,
    });
  },
});
