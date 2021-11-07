// index.js
// const app = getApp()
const { envList } = require("../../envList.js");
import Toast from "@vant/weapp/toast/toast";
Page({
  data: {
    selectedEnv: envList[0],
    isLogin: false,
    userInfo: null,
    openId: "",
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
    fistIn: true,
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
        fistIn: false,
      });
    }
  },
  onShow() {
    if (!this.data.fistIn) {
      const openid = wx.getStorageSync("openid");
      if (!openid) {
        this.setData({
          userInfo: null,
          isLogin: false,
        });
      }
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
        const tempUserData = res.userInfo;
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
              type: "getOpenId",
            },
          })
          .then((resp) => {
            tempUserData.openid = resp.result.openid;
            wx.setStorageSync("openid", tempUserData.openid);
            this.setData({
              userInfo: tempUserData,
              isLogin: true,
              openId: resp.result.openid,
            });
            wx.setStorageSync("userInfo", tempUserData);
            wx.hideLoading();
          })
          .catch((e) => {
            this.setData({
              showUploadTip: true,
            });
            wx.hideLoading();
          });
      },
    });
  },
  jumpPage() {
    wx.navigateTo({
      url: `/packageA/pages/userInfo/index?envId=${this.data.selectedEnv.envId}`,
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

  getOpenId() {},
  getTest() {
    wx.checkSession({
      success(res) {
        //session_key 未过期，并且在本生命周期一直有效
        console.log(res);
      },
      fail(err) {
        // session_key 已经失效，需要重新执行登录流程
        // wx.login() //重新登录
        console.log(err);
      },
    });
  },
});
