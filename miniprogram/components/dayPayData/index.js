// miniprogram/components/cloudTipModal/index.js
const { payTypeMap } = require("../../utils/mokeData");
Component({
  /**
   * 页面的初始数据
   */
  data: {
    payTypeMap: payTypeMap,
  },
  properties: {
    payDatas: {
      type: Array,
      default: [],
    },
  },

  methods: {},
});
