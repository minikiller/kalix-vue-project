const FormModel = {
  title: '吉林动画学院红头文件申请表',
  businessNo: '', // 文号，业务编号
  orgId: null, // 申请部门id
  orgName: '', // 申请部门
  creationDate: '', // 申请日期
  applyDate: '', // 工作流业务申请时间
  createBy: '', // 申请人
  docContent: '', // 发文内容
  docCategory: '', // 文件种类
  docType: '', // 发文类型
  docStatus: '', // 文档状态
  docDate: '', // 发文时间
  docDept: '', // 发文部门
  printer: '', // 打印人
  checker: '', // 校对人
  page: '', // 页数
  number: '', // 份数
  other: '', // 抄送

  auditResult: '流程尚未启动',
  currentNode: '',
  depUser: '', // 部门负责人
  schoolUser: '', // 校务部签字
  managerUser: '', // 校级领导
  chairmanUser: '' // 董事长审核
}

export default FormModel
