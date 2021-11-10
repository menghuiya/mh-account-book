// packageA/pages/billDetail/index.js
const { envList } = require("../../../envList.js");
const { payTypeMap, payTopTypeMap } = require("../../../utils/mokeData");
const formDate = require("../../../utils/formatDate");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    selectedEnv: envList[0],
    payTypeMap: payTypeMap,
    billId: "",
    billData: null,
    billTypeMap: {
      income: "收入",
      pay: "支出",
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      billId: options.id,
    });
    this.getData();
  },
  getData() {
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
          dbName: "bills",
          from: "oneDetail",
          billId: this.data.billId,
        },
      })
      .then((resp) => {
        console.log(resp);
        // this.initData(resp.result);
        resp.result.createTimeStr = formDate(
          "YYYY-mm-dd HH:MM",
          resp.result.creatTime
        );
        resp.result.timeStr = formDate("YYYY-mm-dd HH:MM", resp.result.time);
        resp.result.payTypeStr = payTopTypeMap[resp.result.payType].name;
        this.setData({
          billData: resp.result,
        });
        wx.hideLoading();
      })
      .catch((e) => {
        console.log(e);

        wx.hideLoading();
      });
  },
});
