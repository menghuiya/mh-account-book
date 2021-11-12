// packageA/pages/allBills/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    envId: "",
    monthData: [
      { id: 1, month: 1 },
      { id: 2, month: 2 },
      { id: 3, month: 3 },
      { id: 4, month: 4 },
      { id: 5, month: 5 },
      { id: 6, month: 6 },
      { id: 7, month: 7 },
      { id: 8, month: 8 },
      { id: 9, month: 9 },
      { id: 10, month: 10 },
      { id: 11, month: 11 },
      { id: 12, month: 12 },
    ],
    cateData: [
      {
        id: 1,
        name: "食品饮料",
        rate: 0,
        amount: 0.0,
        color: "#F5410F",
        code: "food",
      },
      {
        id: 2,
        name: "外在打扮",
        rate: 0,
        amount: 0.0,
        color: "#FF8706",
        code: "externalDress",
      },
      {
        id: 3,
        name: "居家生活",
        rate: 0,
        amount: 0.0,
        color: "#FFE109",
        code: "family",
      },
      {
        id: 4,
        name: "交通出行",
        rate: 0,
        amount: 0.0,
        color: "#79DD01",
        code: "transportationTravel",
      },
      {
        id: 5,
        name: "休闲娱乐",
        rate: 0,
        amount: 0.0,
        color: "#9AF0DC",
        code: "entertainment",
      },
      {
        id: 6,
        name: "医疗保健",
        rate: 0,
        amount: 0.0,
        color: "#03AAEA",
        code: "medicalCare",
      },
      {
        id: 7,
        name: "文娱教育",
        rate: 0,
        amount: 0.0,
        color: "#831DFF",
        code: "education",
      },
      {
        id: 8,
        name: "人情往来",
        rate: 0,
        amount: 0.0,
        color: "#f2826a",
        code: "humanRelationship",
      },
      {
        id: 9,
        name: "其他杂项",
        rate: 0,
        amount: 0.0,
        color: "#f2826a",
        code: "otherPay",
      },
    ],
    monthDatas: [],
    activeMonth: 5,
    show: false,
    activeCate: 0,
    total: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const date = new Date();
    const month = date.getMonth() + 1;
    this.setData({
      envId: options.envId,
      activeMonth: month,
    });
    this.getData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},
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
    const monthStart = Date.parse(`${year}/${month}/01 00:00:00`);
    const monthEnd = Date.parse(
      `${month === 12 ? year + 1 : year}/${
        month === 12 ? 1 : month + 1
      }/01 00:00:00`
    );
    wx.cloud
      .callFunction({
        name: "quickstartFunctions",
        config: {
          env: this.data.envId,
        },
        data: {
          type: "selectRecord",
          dbName: "bills",
          from: "allBills",
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
        wx.hideLoading();
      });
  },
  initData(result) {
    let tempCateData = this.data.cateData;
    let tempTotal = result.reduce((pre, cur) => {
      return pre + cur.amount;
    }, 0);
    result.forEach((item) => {
      const index = tempCateData.findIndex((v) => v.code === item._id);
      tempCateData[index].amount = item.amount;
      tempCateData[index].rate = ((item.amount / tempTotal) * 100).toFixed(2);
    });
    this.setData({
      total: tempTotal,
      cateData: tempCateData,
    });
  },
  getDetailData(parentType) {
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
    const monthEnd = Date.parse(
      `${month === 12 ? year + 1 : year}/${
        month === 12 ? 1 : month + 1
      }/01 00:00:00`
    );
    wx.cloud
      .callFunction({
        name: "quickstartFunctions",
        config: {
          env: this.data.envId,
        },
        data: {
          type: "selectRecord",
          dbName: "bills",
          from: "allBillsDetail",
          where: {
            openid: openid,
            monthStart,
            monthEnd,
            parentType: parentType,
          },
        },
      })
      .then((resp) => {
        console.log(resp);
        this.initDetailData(resp.result);
        wx.hideLoading();
      })
      .catch((e) => {
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
  initDetailData(baseData) {
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
    this.setData({
      monthDatas: tempArr,
    });
  },
  monthClick(e) {
    const month = e.currentTarget.dataset.month;
    if (month === this.data.activeMonth) return;
    this.setData({
      activeMonth: month,
    });
  },
  onOpen(e) {
    const id = e.currentTarget.dataset.id;
    const tempData = this.data.cateData.find((item) => item.id === id);
    this.getDetailData(tempData.code);
    this.setData({
      activeCate: id,
      show: true,
    });
  },
  onClose() {
    this.setData({
      show: false,
    });
  },
});
