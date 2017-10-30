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
  evectionApplyId: null,   // 出差申请id
  reimbursementDate: '',   // 报销日期
  reimbursementNo: '',     // 编号
  bussinessPeopleId: null, // 出差人id
  bussinessPeopleName: '', // 出差人姓名
  reason: '',              // 出差事由
  projectName: '',         // 项目名称
  managerUser: '',         // 领导批示
  chairmanUser: '',        // 董事长
  depUser: '',             // 部门领导
  financeUser: '',         // 财务主管
  accountantUser: '',      // 会计
  cashierUser: '',         // 出纳
  payeeUser: '',           // 领款人
  borrowMoney: null,       // 预借金额
  backMoney: null          // 补退金额
}

export default FormModel
