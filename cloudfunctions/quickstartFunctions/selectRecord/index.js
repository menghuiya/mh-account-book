const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;
const getUser = async (event) => {
  const result = await db
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
};
const getHome = async (event) => {
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
};

const getBillDetail = async (event) => {
  const result = await db.collection(event.dbName).doc(event.billId).get();
  return result.data;
};
const getProperty = async (event) => {
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
};
const getAllBills = async (event) => {
  const { openid, billType } = event.where;
  console.log(event);
  const result = await db
    .collection(event.dbName)
    .aggregate()
    .match({
      openid: openid,
      billType: billType,
    })
    .group({
      _id: "$parentType",
      amount: $.sum("$amount"),
    })
    .end();
  return result.list;
};

const getAllBillsDetail = async (event) => {
  const { openid, monthStart, monthEnd, parentType } = event.where;
  const result = await db
    .collection(event.dbName)
    .where({
      openid: openid,
      parentType: parentType,
      // time: _.gte(monthStart).and(_.lt(monthEnd)),
    })
    .orderBy("time", "desc")
    .get();
  return result.data;
};
/**
 * 删除账单
 * @param {*} event
 * @returns
 */
const deleteBill = async (event) => {
  const result = await db.collection(event.dbName).doc(event.billId).remove();
  return result.stats.removed;
};

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  // 返回数据库查询结果 重写
  console.log(event.dbName);
  switch (true) {
    case event.dbName === "user":
      return getUser(event);
      break;
    case event.dbName === "bills":
      if (event.from === "home") {
        return getHome(event);
      }
      if (event.from === "oneDetail") {
        return getBillDetail(event);
      }
      if (event.from === "property") {
        if (event.fromType === "total") {
          return getProperty(event);
        }
      }
      if (event.from === "allBills") {
        return getAllBills(event);
      }
      if (event.from === "allBillsDetail") {
        return getAllBillsDetail(event);
      }
      if (event.from === "deleteBill") {
        return deleteBill(event);
      }
      break;
    default:
      return await db.collection("sales").get();
  }
};
