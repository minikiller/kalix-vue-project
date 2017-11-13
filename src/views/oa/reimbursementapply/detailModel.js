const FormModel = {
  // title: '吉林动画学院报销申请表',
  title: '吉林动画学院差旅费用报销单',
  orgId: null,
  orgName: '',
  processInstanceId: '',
  currentNode: '',
  status: null,
  auditResult: '',
  businessNo: '',
  applyDate: '',
  creationDate: '',
  createBy: '',
  reimbursementApplyId: 0,    // 主表id
  startMonth: null,           // 开始月
  startDay: null,             // 开始日
  startTime: '',              // 开始时间
  startPlace: '',             // 开始地点
  arriveMonth: null,          // 到达月
  arriveDay: null,            // 到达日
  arriveTime: '',             // 到达时间
  arrivePlace: '',            // 到达地点
  personNumber: null,         // 人数
  trafficTool: '',            // 交通工具
  trafficMoney: null,         // 交通费
  dayNumber: null,            // 天数
  subsidyStandard: null,      // 补助标准
  subsidyMoney: null,         // 补助金额
  hotelMoney: null,           // 住宿金额
  cityTrafficMoney: null,     // 市内交通费
  otherMoneyOne: null,        // 其他费用1
  otherMoneyTwo: null,        // 其他费用2
  otherMoneyThree: null,      // 其他费用3
  totalMoney: null            // 费用总额
}

export default FormModel
