// index.js
// const app = getApp()
const { envList } = require("../../envList.js");

Page({
  data: {
    envList,
    selectedEnv: envList[0],
    haveCreateCollection: false,
    monthDatas: [
      {
        date: "29",
        pay: 20000,
        income: 0,
        data: [
          {
            type: "电子产品",
            amount: 8000,
            time: "22:55",
            des: "买了一台电脑",
            id: 1,
          },
          {
            type: "服饰",
            amount: 1000,
            time: "22:55",
            des: "去春熙路买了一件衣服",
            id: 2,
          },
          {
            type: "奶茶",
            amount: 25,
            time: "22:55",
            des: "点了一杯奶茶",
            id: 3,
          },
          {
            type: "午餐",
            amount: 20,
            time: "22:55",
            des: "吃了午餐",
            id: 4,
          },
        ],
      },
      {
        date: "28",
        pay: 20000,
        income: 0,
        data: [
          {
            type: "电子产品",
            amount: 5999,
            time: "22:55",
            des: "买了一个iPhone13",
            id: 5,
          },
          {
            type: "服饰",
            amount: 1000,
            time: "22:55",
            des: "淘宝上买了衣服",
            id: 6,
          },
          {
            type: "奶茶",
            amount: 25,
            time: "22:55",
            des: "饿了吗点了奶茶",
            id: 7,
          },
          {
            type: "午餐",
            amount: 20,
            time: "22:55",
            des: "吃了午餐",
            id: 8,
          },
        ],
      },
    ],
  },

  onClickPowerInfo(e) {
    const index = e.currentTarget.dataset.index;
    const powerList = this.data.powerList;
    powerList[index].showItem = !powerList[index].showItem;
    if (
      powerList[index].title === "数据库" &&
      !this.data.haveCreateCollection
    ) {
      this.onClickDatabase(powerList);
    } else {
      this.setData({
        powerList,
      });
    }
  },

  onChangeShowEnvChoose() {
    wx.showActionSheet({
      itemList: this.data.envList.map((i) => i.alias),
      success: (res) => {
        this.onChangeSelectedEnv(res.tapIndex);
      },
      fail(res) {
        console.log(res.errMsg);
      },
    });
  },

  onChangeSelectedEnv(index) {
    if (this.data.selectedEnv.envId === this.data.envList[index].envId) {
      return;
    }
    const powerList = this.data.powerList;
    powerList.forEach((i) => {
      i.showItem = false;
    });
    this.setData({
      selectedEnv: this.data.envList[index],
      powerList,
      haveCreateCollection: false,
    });
  },

  jumpPage(e) {
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index?envId=${this.data.selectedEnv.envId}`,
    });
  },

  onClickDatabase(powerList) {
    wx.showLoading({
      title: "",
    });
    wx.cloud
      .callFunction({
        name: "quickstartFunctions",
        config: {
          env: this.data.selectedEnv.envId,
        },
        data: {
          type: "createCollection",
        },
      })
      .then((resp) => {
        if (resp.result.success) {
          this.setData({
            haveCreateCollection: true,
          });
        }
        this.setData({
          powerList,
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
  onLoad() {
    // const date = new Date();
    // this.setData({
    //   //通过setData来修改
    //   activeMonth: date.getMonth() + 1,
    //   nowYear: date.getFullYear(),
    // });
  },
});
