const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();

// 插入数据库信息云函数入口函数
exports.main = async (event, context) => {
  try {
    //获取需要插入的数据可名  默认test 避免错误
    const dbName = event.dbName || "test";
    db.collection(dbName).add({
      data: event.data,
    });
    return {
      success: true,
      data: event.data,
    };
  } catch (e) {
    return {
      success: false,
      errMsg: e,
    };
  }
};
