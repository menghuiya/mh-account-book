// packageA/pages/property/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    envId: "",
    showView: true,
    propertyData: [
      {
        id: 1,
        type: "cash",
        icon: "cash",
        name: "现金",
        amount: 0.0,
        des: "身上现有的现金金额",
      },
      {
        id: 1,
        type: "alipay",
        icon: "zhifubao",
        name: "支付宝",
        amount: 0.0,
        des: "阿里云支付宝账户的金额",
      },
      {
        id: 1,
        type: "wechat",
        icon: "weixin",
        name: "微信钱包",
        amount: 0.0,
        des: "腾讯微信支付账户的金额",
      },
      {
        id: 1,
        type: "qq",
        icon: "QQ",
        name: "QQ",
        amount: 0.0,
        des: "腾讯QQ财付通账户的金额",
      },
      {
        id: 1,
        type: "card",
        icon: "bankcard",
        name: "银行卡",
        amount: 0.0,
        des: "个人银行卡有的金额",
      },
      {
        id: 1,
        type: "touzi",
        icon: "touzi",
        name: "投资账户",
        amount: 0.0,
        des: "其他投资账户",
      },
    ],
    totalPay: 0,
    totalIncome: 0,
    total: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      envId: options.envId,
    });
    this.getTotalData();
  },
  getTotalData() {
    const openid = wx.getStorageSync("openid");
    if (!openid) {
      this.setData({
        isLogin: false,
      });
      return false;
    }
    wx.cloud
      .callFunction({
        name: "quickstartFunctions",
        config: {
          env: this.data.envId,
        },
        data: {
          type: "selectRecord",
          dbName: "bills",
          from: "property",
          fromType: "total",
          openid: openid,
        },
      })
      .then((resp) => {
        console.log(resp);
        let tempArr = this.data.propertyData;
        let tempMap = {};
        let tempPay = 0,
          tempIncome = 0;
        resp.result.forEach((item) => {
          if (!tempMap[item._id.payType]) {
            tempMap[item._id.payType] = {};
          }
          if (item._id.billType === "income") {
            tempMap[item._id.payType].income = item.amount;
          } else {
            tempMap[item._id.payType].pay = item.amount;
          }
        });
        for (let key in tempMap) {
          const index = tempArr.findIndex((item) => item.type === key);
          const tempP = tempMap[key].pay || 0;
          const tempI = tempMap[key].income || 0;
          tempArr[index].amount = (tempI - tempP).toFixed(2);
          tempPay += tempP;
          tempIncome += tempI;
        }

        this.setData({
          propertyData: tempArr,
          totalPay: tempPay,
          totalIncome: tempIncome,
          total: (tempIncome - tempPay).toFixed(2),
        });
        wx.hideLoading();
      })
      .catch((e) => {
        console.log(e);

        wx.hideLoading();
      });
  },

  changeView() {
    this.setData({
      showView: !this.data.showView,
    });
  },
  onClose() {
    this.setData({
      show: false,
    });
  },
});
