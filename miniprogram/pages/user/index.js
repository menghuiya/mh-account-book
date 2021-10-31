// index.js
// const app = getApp()

Page({
  data: {
    isLogin: false,

    userInfo: null,
  },
  onLoad() {
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
});
