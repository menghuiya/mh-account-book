// index.js
// const app = getApp()
const { envList } = require('../../envList.js');

Page({
  data: {
    monthData:[
      {month:1,name:'1月'},
      {month:2,name:'2月'},
      {month:3,name:'3月'},
      {month:4,name:'4月'},
      {month:5,name:'5月'},
      {month:6,name:'6月'},
      {month:7,name:'7月'},
      {month:8,name:'8月'},
      {month:9,name:'9月'},
      {month:10,name:'10月'},
      {month:11,name:'11月'},
      {month:12,name:'12月'},
    ],
    activeMonth:1,
    nowYear:2021,
    envList,
    selectedEnv: envList[0],
    haveCreateCollection: false,
    
  },

  onClickPowerInfo(e) {
    const index = e.currentTarget.dataset.index;
    const powerList = this.data.powerList;
    powerList[index].showItem = !powerList[index].showItem;
    if (powerList[index].title === '数据库' && !this.data.haveCreateCollection) {
      this.onClickDatabase(powerList);
    } else {
      this.setData({
        powerList
      });
    }
  },

  onChangeShowEnvChoose() {
    wx.showActionSheet({
      itemList: this.data.envList.map(i => i.alias),
      success: (res) => {
        this.onChangeSelectedEnv(res.tapIndex);
      },
      fail (res) {
        console.log(res.errMsg);
      }
    });
  },

  onChangeSelectedEnv(index) {
    if (this.data.selectedEnv.envId === this.data.envList[index].envId) {
      return;
    }
    const powerList = this.data.powerList;
    powerList.forEach(i => {
      i.showItem = false;
    });
    this.setData({
      selectedEnv: this.data.envList[index],
      powerList,
      haveCreateCollection: false
    });
  },

  jumpPage(e) {
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index?envId=${this.data.selectedEnv.envId}`,
    });
  },

  onClickDatabase(powerList) {
    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.selectedEnv.envId
      },
      data: {
        type: 'createCollection'
      }
    }).then((resp) => {
      if (resp.result.success) {
        this.setData({
          haveCreateCollection: true
        });
      }
      this.setData({
        powerList
      });
      wx.hideLoading();
    }).catch((e) => {
      console.log(e);
      this.setData({
        showUploadTip: true
      });
      wx.hideLoading();
    });
  },
  onLoad(){
    const date = new Date()
    this.setData({//通过setData来修改
      activeMonth:date.getMonth()+1,
      nowYear:date.getFullYear(),
    });
  },
  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });
    this.setData({//通过setData来修改
      activeMonth:event.detail.name,
    });
  },
});
