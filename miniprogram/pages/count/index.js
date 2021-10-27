// index.js
// const app = getApp()
Page({
  data: {
    active: 0,
    show: false,
    actions: [
      {
        name: "现金",
        type: "1",
      },
      {
        name: "微信",
        type: "2",
      },
      {
        name: "支付宝",
        type: "3",
      },
      {
        name: "银行卡",
        type: "4",
      },
    ],
    amount: 100,
    inputFocus: false,
  },
  onClose() {
    this.setData({ show: false });
  },

  onSelect(event) {
    console.log(event.detail);
  },
  changeType() {
    this.setData({ show: true });
  },
  onChange(e) {
    console.log(e);
  },
  _focusInput() {
    this.setData({
      inputFocus: true,
    });
  },
});
