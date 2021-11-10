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
      if (event.from === "home") {
        const { openid, monthStart, monthEnd } = event.where;
        const result = await db
          .collection(event.dbName)
          .where({
            openid: openid,
            time: _.gte(monthStart).and(_.lt(monthEnd)),
          })
          .orderBy("time", "desc")
          .get();
        return result.data;
      }
      if (event.from === "oneDetail") {
        const result = await db
          .collection(event.dbName)
          .doc(event.billId)
          .get();
        return result.data;
      }
      if (event.from === "property") {
        const $ = db.command.aggregate;
        if (event.fromType === "total") {
          const result = await db
            .collection(event.dbName)
            .aggregate()
            .match({
              openid: event.openid,
            })
            .group({
              _id: {
                payType: "$payType",
                billType: "$billType",
              },
              amount: $.sum("$amount"),
            })
            .end();

          return result.list;
        }
      }
      break;
    default:
      return await db.collection("sales").get();
  }
};
