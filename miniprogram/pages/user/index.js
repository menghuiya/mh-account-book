// index.js
// const app = getApp()
import Toast from "@vant/weapp/toast/toast";
Page({
  data: {
    isLogin: false,
    userInfo: null,
    options: [
      [
        { name: "微信", icon: "wechat", openType: "share" },
        { name: "朋友圈", icon: "wechat-moments", openType: "contact" },
        { name: "微博", icon: "weibo" },
        { name: "QQ", icon: "qq" },
      ],
      [
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
        { name: "小程序码", icon: "weapp-qrcode" },
      ],
    ],
    showShare: false,
  },
  onLoad() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
    const tempUserInfo = wx.getStorageSync("userInfo");
    if (tempUserInfo) {
      this.setData({
        userInfo: tempUserInfo,
        isLogin: true,
      });
    }
  },
  onClose() {
    this.setData({
      show: false,
      showShare: false,
    });
  },
  openUserInfo() {
    if (this.data.isLogin) {
      this.setData({
        show: true,
      });
    } else {
      this.setData({
        show: true,
      });
    }
  },

  getUserBaseInfo() {
    if (this.data.isLogin) {
      this.jumpPage();
      return;
    }
    wx.getUserProfile({
      desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          isLogin: true,
        });
        wx.setStorageSync("userInfo", res.userInfo);
      },
    });
  },
  jumpPage() {
    wx.navigateTo({
      url: `/packageA/pages/userInfo/index`,
    });
  },
  goAbout() {
    wx.navigateTo({
      url: `/packageA/pages/about/index`,
    });
  },
  onClickShare() {
    this.setData({
      showShare: true,
    });
  },

  onSelect(event) {
    Toast(event.detail.name);
    // if (event.detail.name === "微信") {
    //   this.onShareAppMessage();
    // }
    this.onClose();
  },
  // onShareAppMessage() {
  //   const promise = new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve({
  //         title: "自定义转发标题",
  //       });
  //     }, 2000);
  //   });
  //   return {
  //     title: "自定义转发标题",
  //     path: "/pages/user/index?id=123",
  //     promise,
  //   };
  // },
});
