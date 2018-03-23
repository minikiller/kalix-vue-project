const FormModel = {
  title: '吉林动画学院公务用车申请表',
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
  reason: '',            // 用车事由
  usageCount: null,      // 乘车人数
  beginDate: null,       // 用车时段,开始时间
  endDate: null,         // 用车时段，结束时间
  address: '',           // 用车起始地点
  city: true,            // 是否市内用车
  operatorPhone: '',     // 申请人联系电话
  depUser: '',           // 申请部门负责人签字
  depManageUser: '',     // 申请部门主管领导签批
  schoolUser: '',        // 校务部签字
  schoolManageUser: '',  // 校务部主管领导审批（市外）
  carNo: '',             // 车牌号
  entourage: '',         // 部门陪同人员
  entouragePhone: '',    // 陪同人员电话
  startKM: null,         // 起车公里数
  endKM: null            // 收车公里数
}

export default FormModel
