const FormModel = {
  title: '吉林动画学院教学用车申请表',
  orgId: null,
  orgName: '',
  processInstanceId: '',
  currentNode: '',
  status: 0,
  auditResult: '流程尚未启动',
  businessNo: '',
  applyDate: '',
  creationDate: '',
  createBy: '',
  reason: '',             // 用车事由
  usageCount: null,       // 乘车人数
  beginDate: null,        // 用车时段,开始时间
  endDate: null,          // 用车时段，结束时间
  address: '',            // 用车起始地点
  city: true,             // 是否市内用车
  operatorPhone: '',      // 申请人联系电话
  depManageUser: '',      // 申请部门主管领导签批
  needTeachingUser: true, // 是否需要教务部审批
  teachingUser: '',       // 教务部签批
  manageCenterUser: '',   // 平台建设与管理中心签批
  learningUser: '',       // 学工部签批
  schoolUser: '',         // 校务部签字
  schoolLeader: ''        // 校领导审批
}

export default FormModel
