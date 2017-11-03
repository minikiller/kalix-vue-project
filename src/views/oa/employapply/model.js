const FormModel = {
  // title: '吉林动画学院入职申请表',
  orgId: null,              // 部门id
  orgName: '',              // 部门名称
  processInstanceId: '',    // 流程实例id
  currentNode: '',          // 当前环节
  status: null,             // 工作流状态
  auditResult: '无审批结果', // 审批最终结果
  businessNo: '',
  applyDate: '',
  creationDate: '',
  createBy: '',
  personCategory: null,        // 人员类别
  xm: '',                      // 姓名
  sex: null,                   // 性别
  age: null,                   // 年龄
  tel: '',                     // 联系电话
  position: '',                // 应聘岗位
  employApplyWorkflowId: null, // 入职申请流程id
  branchSchoolLeader: '',      // 分院领导审批
  schoolLeader: '',            // 校领导审批
  manpower: ''                 // 人力资源部长签字
}

export default FormModel
