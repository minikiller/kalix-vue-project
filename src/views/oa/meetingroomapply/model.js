const FormModel = {
  title: '吉林动画学院会议室申请表',
  orgId: null,                // 申请部门id
  orgName: '',                // 申请部门
  processInstanceId: '',
  currentNode: '',
  status: 0,
  auditResult: '流程尚未启动',
  businessNo: '',             // 业务编号
  applyDate: '',              // 工作流业务申请时间
  creationDate: '',           // 申请日期
  createBy: '',               // 申请人
  meetingroomId: null,      // 会议地点id
  meetingroomName: '',      // 会议地点
  meetingDate: null,        // 会议日期
  meetingDateStr: '',
  beginTime: null,          // 会议时段，开始时间
  beginTimeStr: '',
  endTime: null,            // 会议时段，结束时间
  endTimeStr: '',
  meetingTopic: '',         // 会议名称
  meetingAgenda: '相关内容', // 会议内容
  participant: '',          // 参会人员
  host: '',                 // 主持人
  securityPerson: '',       // 协调人（联系人（安全责任人））
  securityTel: '',          // 协调人电话（联系人电话）
  operatorPhone: '',        // 申请人联系电话
  requireType: null,        // 宣传需求（企划中心），字典【会议需求类型】
  attendance: null,         // 参会人数（出席人数）
  equipmentRequirement: '', // 设备要求
  schoolAdminUser: '',      // 校务部行政事务办主管
  schoolUser: '',           // 校务部签字
  weekCalander: false,      // 是否周历
  schoolYear: '',           // 学年
  term: '',                 // 学期
  week: null                // 学周，字典【学周】
}

export default FormModel
