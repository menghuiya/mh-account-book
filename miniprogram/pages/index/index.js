// index.js
// const app = getApp()
const { envList } = require("../../envList.js");
const { payTypeMap } = require("../../utils/mokeData");
const formDate = require("../../utils/formatDate");
Page({
  data: {
    selectedEnv: envList[0],
    payTypeMap: payTypeMap,
    showView: true,
    monthDatas: [],
  },

  onClickLeft() {
    wx.navigateTo({
      url: "/packageA/pages/property/index",
    });
  },

  jumpPage(e) {
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index?envId=${this.data.selectedEnv.envId}`,
    });
  },

  onLoad() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
    this.getData();
  },
  onShow() {
    // this.getData();
  },
  getData() {
    const openid = wx.getStorageSync("openid");
    if (!openid) {
      this.setData({
        isLogin: false,
      });
      return false;
    }
    wx.showLoading({
      title: "",
    });
    const nowDate = new Date();
    const year = nowDate.getFullYear();
    const month = nowDate.getMonth() + 1;
    const day = nowDate.getDate();
    console.log(`${year}-${month}-01 00:00:00`);
    const monthStart = Date.parse(`${year}/${month}/01 00:00:00`);
    const monthEnd = Date.parse(`${year}/${month + 1}/01 00:00:00`);
    wx.cloud
      .callFunction({
        name: "quickstartFunctions",
        config: {
          env: this.data.envId,
        },
        data: {
          type: "selectRecord",
          dbName: "bills",
          where: {
            openid: openid,
            monthStart,
            monthEnd,
          },
        },
      })
      .then((resp) => {
        console.log(resp);
        this.initData(resp.result);
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
  timeToAll(value) {
    const date = new Date(value);
    if (!value) {
      return value;
    } else {
      value =
        date.getFullYear().toString() +
        "年" +
        (date.getMonth() + 1).toString() +
        "月" +
        date.getDate().toString() +
        "日";
      return value;
    }
  },
  initData(baseData) {
    let tempMap = {};
    let tempArr = [];
    baseData.forEach((item) => {
      const tempDate = new Date(item.time).getDate();
      if (!tempMap.hasOwnProperty(tempDate)) {
        tempMap[tempDate] = {
          date: this.timeToAll(item.time),
          pay: 0,
          income: 0,
          data: [],
        };
        tempArr.push(tempMap[tempDate]);
      }
      tempMap[tempDate].data.push(item);
      if (item.billType === "pay") {
        tempMap[tempDate].pay = tempMap[tempDate].pay + Number(item.amount);
      } else {
        tempMap[tempDate].income =
          tempMap[tempDate].income + Number(item.amount);
      }
    });

    // let tempArr = [];
    // for (let key in tempMap) {
    //   tempArr.push(tempMap[key]);
    // }
    console.log(tempMap, tempArr);
    this.setData({
      monthDatas: tempArr,
    });
  },
  changeView() {
    this.setData({
      showView: !this.data.showView,
    });
  },
});
