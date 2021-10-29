// index.js
// const app = getApp()
const formDate = require("../../utils/formatDate");
const { mokeDataForPayType } = require("../../utils/mokeData");
Page({
  data: {
    active: 0,
    show: false,
    actions: [
      {
        name: "现金",
        type: "1",
        icon: "gold-coin",
        iconColor: "#FFD30C",
      },
      {
        name: "微信",
        type: "2",
        icon: "wechat-pay",
        iconColor: "#06C05F",
      },
      {
        name: "支付宝",
        type: "3",
        icon: "alipay",
        iconColor: "#1477FE",
      },
      {
        name: "银行卡",
        type: "4",
        icon: "card",
        iconColor: "#161616",
      },
    ],
    first_names: [
      {
        id: 1,
        goods_name: "早中晚餐",
        image: "/images/types/eat.png",
        image_default: "/images/types/eat-default.png",
      },
      {
        id: 2,
        goods_name: "水果",
        image: "/images/types/fruit.png",
        image_default: "/images/types/fruit-default.png",
      },
      {
        id: 3,
        goods_name: "商城购物",
        image: "/images/types/shop.png",
        image_default: "/images/types/shop-default.png",
      },
      {
        id: 4,
        goods_name: "交通工具",
        image: "/images/types/traficc.png",
        image_default: "/images/types/traficc-default.png",
      },
      {
        id: 5,
        goods_name: "买菜",
        image: "/images/types/vege.png",
        image_default: "/images/types/vege-default.png",
      },
      {
        id: 6,
        goods_name: "饮料奶茶",
        image: "/images/types/naicha.png",
        image_default: "/images/types/naicha-default.png",
      },
      {
        id: 7,
        goods_name: "游戏消费",
        image: "/images/types/game.png",
        image_default: "/images/types/game-default.png",
      },
      {
        id: 8,
        goods_name: "生活用品",
        image: "/images/types/life.png",
        image_default: "/images/types/life-default.png",
      },
      {
        id: 9,
        goods_name: "医疗健康",
        image: "/images/types/medi.png",
        image_default: "/images/types/medi-default.png",
      },
      {
        id: 10,
        goods_name: "其他",
        image: "/images/types/other.png",
        image_default: "/images/types/other-default.png",
      },
    ],
    payTypes: mokeDataForPayType,
    payChildTypes: [],
    first_id: 0, //用于判断是否是当前选中的
    payParentType: "food", //一级分类默认code
    payChildType: "", //耳机分类code
    amount: 100,
    selectType: {
      name: "现金",
      type: "1",
      icon: "gold-coin",
      iconColor: "#FFD30C",
    },
    inputFocus: false,
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
    console.log(e);
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
    const saveData = {
      amount: this.data.amount,
      selectType: this.data.selectType,
      mark: this.data.mark,
      currentDate: this.data.currentDate,
      payParentType: this.data.payParentType,
      payChildType: this.data.payChildType,
    };
    console.log(saveData);
  },
});
