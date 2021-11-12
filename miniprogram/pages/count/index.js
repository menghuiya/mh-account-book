// index.js
// const app = getApp()
const { envList } = require("../../envList.js");
const formDate = require("../../utils/formatDate");
const {
  mokeDataForPayType,
  mokeDataForIncomType,
} = require("../../utils/mokeData");
Page({
  data: {
    selectedEnv: envList[0],
    active: 0,
    billType: "pay",
    show: false,
    actions: [
      {
        name: "现金",
        type: "1",
        icon: "gold-coin",
        iconColor: "#FFD30C",
        code: "cash",
      },
      {
        name: "微信",
        type: "2",
        icon: "wechat-pay",
        iconColor: "#06C05F",
        code: "wechat",
      },
      {
        name: "支付宝",
        type: "3",
        icon: "alipay",
        iconColor: "#1477FE",
        code: "alipay",
      },
      {
        name: "银行卡",
        type: "4",
        icon: "card",
        iconColor: "#161616",
        code: "card",
      },
    ],

    payTypes: mokeDataForPayType,
    payChildTypes: [],
    payParentType: "food", //一级分类默认code
    payChildType: "", //耳机分类code
    amount: 0,
    selectType: {
      name: "现金",
      type: "1",
      icon: "gold-coin",
      iconColor: "#FFD30C",
      code: "cash",
    },
    inputFocus: false,
    markHeight: { maxHeight: 100, minHeight: 50 },
    mark: "",
    showTimePiker: false,
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2019, 10, 1).getTime(),
    currentDate: new Date().getTime(),
    currentDateStr: "",
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      }
      if (type === "month") {
        return `${value}月`;
      }
      if (type === "day") {
        return `${value}日`;
      }
      if (type === "hour") {
        return `${value}时`;
      }
      if (type === "minute") {
        return `${value}分`;
      }

      return value;
    },
  },
  onLoad() {
    const tempDate = formDate("YYYY-mm-dd HH:MM", this.data.currentDate);
    this.initChildType(this.data.payParentType);
    this.setData({
      currentDateStr: tempDate,
    });
    wx.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
  },
  onClose() {
    this.setData({ show: false });
  },

  onSelect(event) {
    console.log(event.detail);
    this.setData({
      selectType: event.detail,
    });
  },
  changeType() {
    this.setData({ show: true });
  },
  onChange(e) {
    let tempData = {};
    let tempType = "";
    let tempbillType = "";
    if (e.detail.index === 0) {
      tempData = mokeDataForPayType;
      tempType = "food";
      tempbillType = "pay";
    } else {
      tempData = mokeDataForIncomType;
      tempType = "work";
      tempbillType = "income";
    }
    this.setData({
      payTypes: tempData,
      payChildType: "",
      billType: tempbillType,
    });
    this.initChildType(tempType);
  },
  _focusInput() {
    this.setData({
      inputFocus: true,
    });
  },
  typeClick(e) {
    let tempCode = e.currentTarget.dataset.code;
    if (tempCode === this.data.payChildType) {
      tempCode = "";
    }
    console.log(tempCode);
    this.setData({
      payChildType: tempCode,
    });
  },
  payParentClick(e) {
    let code = e.currentTarget.dataset.code;
    this.initChildType(code);
  },
  initChildType(code) {
    let tempData = this.data.payTypes.find((item) => item.code === code);
    this.setData({
      payParentType: code,
      payChildTypes: tempData.children,
    });
  },
  showPopup() {
    this.setData({ showTimePiker: true });
  },

  closePopup() {
    this.setData({ showTimePiker: false });
  },
  onConfirm(event) {
    const formDate = require("../../utils/formatDate");
    const tempDate = formDate("YYYY-mm-dd HH:MM", event.detail);
    this.setData({
      currentDate: event.detail,
      currentDateStr: tempDate,
    });
    this.closePopup();
  },
  savePay() {
    const openid = wx.getStorageSync("openid");
    if (!openid) {
      wx.showToast({
        title: "请先登录！",
        icon: "error",
        duration: 2000,
      });
      return false;
    }
    const saveData = {
      amount: Number(this.data.amount), //金额
      payType: this.data.selectType.code, //支付方式
      desc: this.data.mark, //备注
      creatTime: Date.now(), //创建时间
      parentType: this.data.payParentType, //一级分类
      childType: this.data.payChildType, //二级分类
      billType: this.data.billType, //收入还是支出
      time: this.data.currentDate, //交易时间
      openid: openid, //用户id
    };

    console.log(saveData);
    this.postData(saveData);
  },
  postData(saveData) {
    wx.showLoading({
      title: "正在保存",
    });
    wx.cloud
      .callFunction({
        name: "quickstartFunctions",
        config: {
          env: this.data.selectedEnv.envId,
        },
        data: {
          type: "insertRecord",
          dbName: "bills",
          data: saveData,
        },
      })
      .then((resp) => {
        wx.hideLoading();
        wx.showToast({
          title: "保存成功！",
          icon: "success",
          duration: 2000,
        });
      })
      .catch((e) => {
        console.log(e);
        this.setData({
          showUploadTip: true,
        });
        wx.hideLoading();
      });
  },
});
