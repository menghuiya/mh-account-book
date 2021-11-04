// packageA/pages/allBills/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
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
        rate: 43.22,
        amount: 2222.33,
        color: "#F5410F",
      },
      {
        id: 2,
        name: "外在打扮",
        rate: 43.22,
        amount: 2222.33,
        color: "#FF8706",
      },
      {
        id: 3,
        name: "居家生活",
        rate: 43.22,
        amount: 2222.33,
        color: "#FFE109",
      },
      {
        id: 4,
        name: "交通出行",
        rate: 33.22,
        amount: 2222.33,
        color: "#79DD01",
      },
      {
        id: 5,
        name: "休闲娱乐",
        rate: 22.22,
        amount: 2222.33,
        color: "#9AF0DC",
      },
      {
        id: 6,
        name: "医疗保健",
        rate: 1.65,
        amount: 2222.33,
        color: "#03AAEA",
      },
      {
        id: 7,
        name: "文娱教育",
        rate: 2.32,
        amount: 2222.33,
        color: "#831DFF",
      },
      {
        id: 8,
        name: "人情往来",
        rate: 0.22,
        amount: 2222.33,
        color: "#f2826a",
      },
      {
        id: 9,
        name: "其他杂项",
        rate: 9.22,
        amount: 2222.33,
        color: "#f2826a",
      },
    ],
    activeMonth: 5,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  monthClick(e) {
    const month = e.currentTarget.dataset.month;
    if (month === this.data.activeMonth) return;
    this.setData({
      activeMonth: month,
    });
  },
});
