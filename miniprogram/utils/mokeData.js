const mokeDataForPayType = [
  {
    code: "food",
    name: "食品饮料",
    desc: "民以食为天",
    children: [
      {
        id: 1,
        code: "eat",
        name: "早中晚餐",
        desc: "吃饭饭",
        icon: "food",
      },
      {
        id: 2,
        code: "buyvege",
        name: "买菜",
        desc: "买菜撒",
        icon: "vegetables",
      },
      { id: 3, code: "fruit", name: "水果", desc: "吃水果", icon: "fruits" },
      { id: 4, code: "drink", name: "饮料", desc: "就是喝的", icon: "yinliao" },
      { id: 4, code: "snacks", name: "零食", desc: "就是喝的", icon: "snacks" },
    ],
  },
  {
    code: "externalDress",
    name: "外在打扮",
    desc: "就是你穿的戴的",
    children: [
      {
        id: 1,
        code: "clothingShoe",
        name: "衣服鞋帽",
        desc: "你的衣服鞋子帽子",
        icon: "clothes",
      },
      {
        id: 2,
        code: "beautyHair",
        name: "美容理发",
        desc: "剪头发美容",
        icon: "cosmetology",
      },
      {
        id: 3,
        code: "makeUp",
        name: "彩妆美妆",
        desc: "女性化妆",
        icon: "cosmetics",
      },
      {
        id: 4,
        code: "jewelry",
        name: "珠宝首饰",
        desc: "戒指啊那些",
        icon: "shoushi",
      },
    ],
  },
  {
    code: "family",
    name: "居家生活",
    desc: "在家要花费的",
    children: [
      {
        id: 1,
        code: "roomRent",
        name: "房租",
        desc: "租房子要花的钱，心塞",
        icon: "fangzu",
      },
      {
        id: 2,
        code: "powerRate",
        name: "电费",
        desc: "电脑花的电",
        icon: "electric",
      },
      {
        id: 3,
        code: "waterRate",
        name: "水费",
        desc: "洗澡洗衣服上厕所",
        icon: "water",
      },
      {
        id: 5,
        code: "upkeep",
        name: "维修费",
        desc: "通下水道，修空调",
        icon: "weixiu",
      },
      {
        id: 6,
        code: "daliyUse",
        name: "生活用品",
        desc: "卫生纸啊那些",
        icon: "daily-necessities",
      },
      {
        id: 7,
        code: "furniture",
        name: "家具家电",
        desc: "洗衣机电视那些",
        icon: "x",
      },
      {
        id: 8,
        code: "mortgage",
        name: "房贷",
        desc: "买了房子的，我买不起",
        icon: "housing",
      },
      {
        id: 9,
        code: "digital",
        name: "数码产品",
        desc: "手机电脑相机啥的",
        icon: "digital",
      },
    ],
  },
  {
    code: "transportationTravel",
    name: "交通出行",
    desc: "上班地铁公交车打车",
    children: [
      {
        id: 1,
        code: "busSubway",
        name: "公交地铁",
        desc: "上班的",
        icon: "traffic",
      },
      {
        id: 2,
        code: "trainPlane",
        name: "火车飞机",
        desc: "旅行的，虽然我没坐过",
        icon: "plane",
      },
      {
        id: 3,
        code: "taxiRental",
        name: "打车租车",
        desc: "半夜没地铁了",
        icon: "car",
      },
      {
        id: 4,
        code: "carLoan",
        name: "车贷",
        desc: "买了车，贷款的钱",
        icon: "cardai",
      },
      {
        id: 5,
        code: "maintenance",
        name: "保养维修",
        desc: "买了车得花钱，还好我买不起",
        icon: "car-repair",
      },
      {
        id: 6,
        code: "insure",
        name: "保险",
        desc: "车的保险，还好我没车",
        icon: "carbao",
      },
      {
        id: 7,
        code: "violationTicket",
        name: "违章罚款",
        desc: "车的，还好我没车",
        icon: "cardai",
      },
      {
        id: 8,
        code: "parkingRate",
        name: "停车费",
        desc: "车的，还好我没车",
        icon: "parking",
      },
      {
        id: 9,
        code: "oilRate",
        name: "加油费",
        desc: "车的，还好我没车",
        icon: "oil",
      },
    ],
  },
  {
    code: "entertainment",
    name: "休闲娱乐",
    desc: "玩耍的撒",
    children: [
      {
        id: 1,
        code: "game",
        name: "游戏",
        desc: "游戏花费",
        icon: "fun",
      },
      {
        id: 2,
        code: "movie",
        name: "电影",
        desc: "看电影的钱吧，我一个人可不看",
        icon: "movie",
      },
      {
        id: 3,
        code: "sportsFitness",
        name: "运动健身",
        desc: "锻炼身体的",
        icon: "jianshen",
      },
      {
        id: 4,
        code: "vip",
        name: "网络会员",
        desc: "qq会员那种",
        icon: "huiyuan",
      },
      {
        id: 4,
        code: "other",
        name: "其他娱乐",
        desc: "其他的吧",
        icon: "yule",
      },
    ],
  },
  {
    code: "medicalCare",
    name: "医疗保健",
    desc: "看病啊体检啊那些",
    children: [
      {
        id: 1,
        code: "medicinal",
        name: "药物费",
        desc: "买药花的钱",
        icon: "yaoping",
      },
      {
        id: 2,
        code: "treatmentFee",
        name: "治疗费",
        desc: "花钱看病的",
        icon: "zhiliao",
      },
      {
        id: 3,
        code: "hospitalizationExpenses",
        name: "住院费",
        desc: "住院治疗的，我可不想",
        icon: "zhuyuan",
      },
      {
        id: 4,
        code: "nursingFee",
        name: "护理费",
        desc: "情人照顾啥的",
        icon: "huli",
      },
    ],
  },
  {
    code: "education",
    name: "文娱教育",
    desc: "学习相关的",
    children: [
      {
        id: 1,
        code: "material",
        name: "学习资料",
        desc: "学习资料的钱",
        icon: "book",
      },
      {
        id: 2,
        code: "stationery",
        name: "学习用品",
        desc: "学习用品",
        icon: "book",
      },
      {
        id: 3,
        code: "textualResearch",
        name: "考证报名",
        desc: "四六级或者其他的玩意儿",
        icon: "education",
      },
    ],
  },
  {
    code: "humanRelationship",
    name: "人情往来",
    desc: "人情往来",
    children: [
      {
        id: 1,
        code: "treat",
        name: "请客送礼",
        desc: "请客送礼的钱",
        icon: "cash-gift",
      },
      {
        id: 2,
        code: "loveFamily",
        name: "爱的家人",
        desc: "给家人用的撒",
        icon: "friends",
      },
      {
        id: 3,
        code: "forUs",
        name: "属于我们",
        desc: "害，可惜时单身狗",
        icon: "social",
      },
    ],
  },
  {
    code: "otherPay",
    name: "其他杂项",
    desc: "其他用的吧",
    children: [
      {
        id: 1,
        code: "lose",
        name: "意外丢失",
        desc: "意外丢失的钱",
        icon: "financing",
      },
      {
        id: 2,
        code: "badDebts",
        name: "烂账损失",
        desc: "不还钱就很难受",
        icon: "financing",
      },
      {
        id: 3,
        code: "otherExpenses",
        name: "其他支出",
        desc: "不晓得花哪儿去了",
        icon: "financing",
      },
    ],
  },
];

const payTypeMap = {
  eat: { name: "早中晚餐", desc: "吃饭饭", icon: "food" },
  buyvege: { name: "买菜", desc: "买菜撒", icon: "vegetables" },
  fruit: { name: "水果", icon: "fruits" },
  drink: { name: "饮料", icon: "yinliao" },
  snacks: { name: "零食", icon: "snacks" },
  clothingShoe: { name: "衣服鞋帽", icon: "clothes" },
  beautyHair: { name: "美容理发", icon: "cosmetology" },
  makeUp: { name: "彩妆美妆", icon: "cosmetics" },
  jewelry: { name: "珠宝首饰", icon: "shoushi" },
  roomRent: { name: "房租", icon: "fangzu" },
  powerRate: { name: "电费", icon: "electric" },
  waterRate: { name: "水费", icon: "water" },
  upkeep: { name: "维修费", icon: "weixiu" },
  daliyUse: { name: "生活用品", icon: "daily-necessities" },
  furniture: { name: "家具家电", icon: "x" },
  mortgage: { name: "房贷", icon: "housing" },
  digital: { name: "数码产品", icon: "digital" },
  busSubway: { name: "公交地铁", icon: "traffic" },
  trainPlane: { name: "火车飞机", icon: "plane" },
  taxiRental: { name: "打车租车", icon: "car" },
  carLoan: { name: "车贷", icon: "cardai" },
  maintenance: { name: "保养维修", icon: "car-repair" },
  insure: { name: "保险", icon: "carbao" },
  violationTicket: { name: "违章罚款", icon: "cardai" },
  parkingRate: { name: "停车费", icon: "parking" },
  oilRate: { name: "加油费", icon: "oil" },
  game: { name: "游戏", icon: "fun" },
  movie: { name: "电影", icon: "movie" },
  sportsFitness: { name: "运动健身", icon: "jianshen" },
  vip: { name: "网络会员", icon: "huiyuan" },
  other: { name: "其他娱乐", icon: "yule" },
  medicinal: { name: "药物费", icon: "yaoping" },
  treatmentFee: { name: "治疗费", icon: "zhiliao" },
  hospitalizationExpenses: { name: "住院费", icon: "zhuyuan" },
  nursingFee: { name: "护理费", icon: "huli" },
  material: { name: "学习资料", icon: "book" },
  stationery: { name: "学习用品", icon: "book" },
  textualResearch: { name: "考证报名", icon: "education" },
  treat: { name: "请客送礼", icon: "cash-gift" },
  loveFamily: { name: "爱的家人", icon: "friends" },
  forUs: { name: "属于我们", icon: "social" },
  lose: { name: "意外丢失", icon: "financing" },
  badDebts: { name: "烂账损失", icon: "financing" },
  otherExpenses: { name: "其他支出", icon: "financing" },
  salary: { name: "工资", icon: "salary" },
  bonus: { name: "奖金", icon: "bonus" },
  parttimejob: { name: "兼职", icon: "part-time-job" },
  reimbursement: { name: "报销", icon: "reimbursement" },
  refund: { name: "退款", icon: "refund" },
  lottery: { name: "彩票", icon: "lottery" },
  jijin: { name: "基金", icon: "jijin" },
};

const mokeDataForIncomType = [
  {
    code: "work",
    name: "职业收入",
    desc: "打工来的钱撒",
    children: [
      {
        id: 1,
        code: "salary",
        name: "工资",
        desc: "唉，辛苦所得的",
        icon: "salary",
      },
      {
        id: 2,
        code: "bonus",
        name: "奖金",
        desc: "工作的奖金撒",
        icon: "bonus",
      },
      {
        id: 3,
        code: "parttimejob",
        name: "兼职",
        desc: "兼职收入撒",
        icon: "part-time-job",
      },
    ],
  },
  {
    code: "otherIncom",
    name: "其他收入",
    desc: "其他收入",
    children: [
      {
        id: 1,
        code: "reimbursement",
        name: "报销",
        desc: "出差报销",
        icon: "reimbursement",
      },
      {
        id: 2,
        code: "refund",
        name: "退款",
        desc: "退款",
        icon: "refund",
      },
      {
        id: 3,
        code: "lottery",
        name: "彩票",
        desc: "中奖啦",
        icon: "lottery",
      },
      {
        id: 4,
        code: "jijin",
        name: "基金",
        desc: "中奖啦",
        icon: "jijin",
      },
    ],
  },
];

const mokeDataOccupation = [
  "销售",
  "客服",
  "人事/行政/后勤",
  "餐饮",
  "旅游",
  "酒店",
  "超市/百货/零售",
  "美容/美发",
  "保健按摩",
  "运动健身",
  "普工/技工",
  "生产管理/研发",
  "汽车制造/服务",
  "建筑",
  "物业管理",
  "房产中介",
  "家政保洁/安保",
  "司机/交通服务",
  "贸易/采购",
  "物流/仓储",
  "淘宝职位",
  "美术/设计/创意",
  "市场/媒介/公关",
  "广告/会展/咨询",
  "影视/娱乐/休闲",
  "教育培训",
  "财务/审计/统计",
  "法律",
  "翻译",
  "编辑/出版/印刷",
  "计算机/互联网/通信",
  "电子/电气",
  "机械/仪器仪表",
  "金融/银行/证券/投资",
  "保险",
  "医院/医疗/护理",
  "制药/生物工程",
  "服装/纺织/食品",
  "环保/能源",
  "质控/安防",
  "高级管理",
  "农/林/牧/渔业",
  "其他招聘信息",
  "失业",
];

const payTopTypeMap = {
  cash: {
    name: "现金",
    type: "1",
    icon: "gold-coin",
    iconColor: "#FFD30C",
    code: "cash",
  },
  wechat: {
    name: "微信",
    type: "2",
    icon: "wechat-pay",
    iconColor: "#06C05F",
    code: "wechat",
  },
  alipay: {
    name: "支付宝",
    type: "3",
    icon: "alipay",
    iconColor: "#1477FE",
    code: "alipay",
  },
  card: {
    name: "银行卡",
    type: "4",
    icon: "card",
    iconColor: "#161616",
    code: "card",
  },
};

module.exports = {
  mokeDataForPayType,
  mokeDataForIncomType,
  mokeDataOccupation,
  payTypeMap,
  payTopTypeMap,
};
