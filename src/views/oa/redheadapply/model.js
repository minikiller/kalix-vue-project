const FormModel = {
  title: '吉林动画学院红头文件申请表',
  orgId: null,                // 申请部门id
  orgName: '',                // 申请部门
  processInstanceId: '',
  currentNode: '',
  status: 0,
  auditResult: '流程尚未启动',
  businessNo: '',             // 文号，业务编号
  applyDate: '',              // 工作流业务申请时间
  creationDate: '',           // 申请日期
  createBy: '',               // 申请人
  docAssort: [],          // 文件种类
  docType: '',       // 发文类型
  editDocType: true, // 是否允许修改发文类型字段，默认t允许修改
  docContent: '',    // 发文内容
  docStatus: '',     // 文档状态
  depUser: '',       // 部门负责人
  schoolUser: '',    // 校务部签字
  managerUser: '',   // 校级领导
  needHeader: true,   // 是否需要校级领导
  chairmanUser: ''   // 董事长审核
}

export default FormModel
