// packageA/pages/mortgage/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataList: [
      { month: 1, monthAmount: 7166.93, reAmount: 8166.66, reTotal: 21825.47 },
      { month: 2, monthAmount: 7166.93, reAmount: 8166.66, reTotal: 20825.47 },
      { month: 3, monthAmount: 7166.93, reAmount: 8166.66, reTotal: 18825.47 },
      { month: 4, monthAmount: 7166.93, reAmount: 8166.66, reTotal: 21825.47 },
      { month: 5, monthAmount: 7166.93, reAmount: 8166.66, reTotal: 21825.47 },
      { month: 6, monthAmount: 7166.93, reAmount: 8166.66, reTotal: 21825.47 },
      { month: 7, monthAmount: 7166.93, reAmount: 8166.66, reTotal: 21825.47 },
    ],
    loanTypes: [
      { id: 1, name: "商业贷款", des: "xxx" },
      { id: 2, name: "公积金贷款", des: "xxx" },
      { id: 3, name: "组合型贷款", des: "xxx" },
    ],
    payments: [
      { name: "2成", id: "2" },
      { name: "3成", id: "3" },
      { name: "4成", id: "4" },
      { name: "5成", id: "5" },
      { name: "6成", id: "6" },
      { name: "7成", id: "7" },
      { name: "8成", id: "8" },
      { name: "9成", id: "9" },
    ],

    loanShow: false,
    paymentShow: false,
    repaymentType: "equalInterest", //equalInterest 等额本息 equalPrincipal 等额本金
    loanType: 1, //1 商业贷款 2 公积金贷款 3 组合型贷款
    loanTypeStr: "商业贷款", //1 商业贷款 2 公积金贷款 3 组合型贷款
    totalAmount: "",
    payment: "7", // 首付比例
    paymentStr: "7成", // 首付比例
    payItem: 20, //期限
    loanAmount: "根据比例自动计算",
    show: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  handleNavClick(e) {
    const type = e.currentTarget.dataset.code;
    this.setData({
      repaymentType: type,
    });
  },
  openLoan() {
    this.setData({ loanShow: true });
  },
  onLoanClose() {
    this.setData({ loanShow: false });
  },
  onLoanSelect(event) {
    const { id, name } = event.detail;
    this.setData({
      loanType: id,
      loanTypeStr: name,
    });
    console.log(this.data.payItem);
  },
  openPayment() {
    this.setData({ paymentShow: true });
  },
  onPaymentClose() {
    this.setData({ paymentShow: false });
  },
  onPaymentSelect(event) {
    const { id, name } = event.detail;
    this.setData({
      payment: id,
      paymentStr: name,
    });
  },
  onChange(value) {
    this.setData({ payItem: value.detail });
  },
  handleBlur(event) {
    const { value } = event.detail;
    let tempAmount = (this.data.payment * value) / 10;
    if (value) {
      this.setData({
        loanAmount: tempAmount + "元",
      });
    } else {
      this.setData({
        loanAmount: "根据比例自动计算",
      });
    }
  },
  onClose() {
    this.setData({
      show: false,
    });
  },
  onComputed() {
    this.setData({
      show: true,
    });
  },
});
