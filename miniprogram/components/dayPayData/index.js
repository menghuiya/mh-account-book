// miniprogram/components/cloudTipModal/index.js
const { payTypeMap } = require("../../utils/mokeData");
const formDate = require("../../utils/formatDate");
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

  methods: {
    formDates(fmt, time) {
      return formDate(fmt, time);
    },
  },
});
