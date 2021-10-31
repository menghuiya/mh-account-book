// packageA/pages/property/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showView: true,
    propertyData: [
      {
        id: 1,
        type: "cash",
        icon: "cash",
        name: "现金",
        amount: 536.5,
        des: "身上现有的现金金额",
      },
      {
        id: 1,
        type: "alipay",
        icon: "zhifubao",
        name: "支付宝",
        amount: 26872.89,
        des: "阿里云支付宝账户的金额",
      },
      {
        id: 1,
        type: "weixin",
        icon: "weixin",
        name: "微信钱包",
        amount: 8592.62,
        des: "腾讯微信支付账户的金额",
      },
      {
        id: 1,
        type: "qq",
        icon: "QQ",
        name: "QQ",
        amount: 8592.62,
        des: "腾讯QQ财付通账户的金额",
      },
      {
        id: 1,
        type: "card",
        icon: "bankcard",
        name: "银行卡",
        amount: 12713.86,
        des: "个人银行卡有的金额",
      },
      {
        id: 1,
        type: "touzi",
        icon: "touzi",
        name: "投资账户",
        amount: 34921.49,
        des: "其他投资账户",
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  changeView() {
    this.setData({
      showView: !this.data.showView,
    });
  },
});
