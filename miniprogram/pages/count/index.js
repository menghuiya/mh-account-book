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
        goods_name: "吃饭",
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
        goods_name: "购物",
        image: "/images/types/shop.png",
        image_default: "/images/types/shop-default.png",
      },
      {
        id: 4,
        goods_name: "交通",
        image: "/images/types/traficc.png",
        image_default: "/images/types/traficc-default.png",
      },
      {
        id: 5,
        goods_name: "保护眼睛",
        image: "/images/types/shop.png",
        image_default: "/images/types/shop-default.png",
      },
      {
        id: 6,
        goods_name: "骨骼健康",
        image: "/images/types/shop.png",
        image_default: "/images/types/shop-default.png",
      },
      {
        id: 7,
        goods_name: "滋补养生",
        image: "/images/types/shop.png",
        image_default: "/images/types/shop-default.png",
      },
      {
        id: 8,
        goods_name: "增强免疫",
        image: "/images/types/shop.png",
        image_default: "/images/types/shop-default.png",
      },
      {
        id: 9,
        goods_name: "国内旅游",
        image: "/images/types/shop.png",
        image_default: "/images/types/shop-default.png",
      },
    ],
    first_id: 0, //用于判断是否是当前选中的
    amount: 100,
    selectType: {
      name: "现金",
      type: "1",
      icon: "gold-coin",
      iconColor: "#FFD30C",
    },
    inputFocus: false,
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
    let tempId = e.currentTarget.dataset.id;
    if (tempId === this.data.first_id) {
      tempId = 0;
    }
    this.setData({
      first_id: tempId,
    });
  },
});
