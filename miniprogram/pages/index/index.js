// index.js
// const app = getApp()
const { payTypeMap } = require("../../utils/mokeData");
Page({
  data: {
    payTypeMap: payTypeMap,
    showView: true,
    monthDatas: [
      {
        date: "29",
        pay: 20000,
        income: 0,
        data: [
          {
            type: "digital",
            amount: 8000,
            time: "22:55",
            des: "买了一台电脑",
            id: 0,
            billType: "pay",
          },
          {
            type: "jijin",
            amount: 12.62,
            time: "22:55",
            des: "基金收入",
            id: 1,
            billType: "income",
          },
          {
            type: "clothingShoe",
            amount: 1000,
            time: "22:55",
            des: "去春熙路买了一件衣服,感觉还不错呀哈哈哈哈",
            id: 2,
            billType: "pay",
          },
          {
            type: "drink",
            amount: 25,
            time: "22:55",
            des: "点了一杯奶茶",
            id: 3,
            billType: "pay",
          },
          {
            type: "eat",
            amount: 20,
            time: "22:55",
            des: "吃了午餐",
            id: 4,
            billType: "pay",
          },
        ],
      },
      {
        date: "28",
        pay: 20000,
        income: 0,
        data: [
          {
            type: "digital",
            amount: 5999,
            time: "22:55",
            des: "买了一个iPhone13",
            id: 5,
            billType: "pay",
          },
          {
            type: "clothingShoe",
            amount: 1000,
            time: "22:55",
            des: "淘宝上买了衣服",
            id: 6,
            billType: "pay",
          },
          {
            type: "drink",
            amount: 25,
            time: "22:55",
            des: "饿了吗点了奶茶",
            id: 7,
            billType: "pay",
          },
          {
            type: "eat",
            amount: 20,
            time: "22:55",
            des: "吃了午餐",
            id: 8,
            billType: "pay",
          },
        ],
      },
    ],
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
    // const date = new Date();
    // this.setData({
    //   //通过setData来修改
    //   activeMonth: date.getMonth() + 1,
    //   nowYear: date.getFullYear(),
    // });
    wx.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
  },
  changeView() {
    this.setData({
      showView: !this.data.showView,
    });
  },
});
