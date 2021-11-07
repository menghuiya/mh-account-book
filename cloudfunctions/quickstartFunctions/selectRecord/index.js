const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();
const _ = db.command;
// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  // 返回数据库查询结果 重写
  console.log(event.dbName);
  switch (true) {
    case event.dbName === "user":
      var result = await db
        .collection(event.dbName)
        .where({
          openid: event.openid,
        })
        .get();
      if (result.data.length) {
        return result.data[0];
      } else {
        return null;
      }
      break;
    case event.dbName === "bills":
      const { openid, monthStart, monthEnd } = event.where;
      console.log(event.where);
      var result = await db
        .collection(event.dbName)
        .where({
          openid: openid,
          time: _.gte(monthStart).and(_.lt(monthEnd)),
        })
        .orderBy("time", "desc")
        .get();
      return result.data;
      break;
    default:
      return await db.collection("sales").get();
  }
};
