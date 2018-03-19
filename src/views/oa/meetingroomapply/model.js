const FormModel = {
  title: '吉林动画学院会议室申请表',
  orgId: null,
  orgName: '',
  creationDate: '',
  applyDate: '',
  createBy: '',

  meetingroomId: null, // 会议地点
  meetingTopic: '',  // 会议名称
  requireType: null, // 宣传需求（企划中心）

  host: '', // 主持人
  meetingDate: '', // 会议日期
  beginTime: '', // 会议时段,开始时间
  endTime: '', // 会议时段，结束时间
  participant: '', // 参会人员
  attendance: '', // 出席人数
  equipmentRequirement: '', // 设备要求
  securityPerson: '', // 联系人（安全责任人）
  securityTel: '', // 联系人电话
  operatorPhone: '', // 申请人联系电话

  schoolAdminUser: '', // 校务部行政事务办主管
  schoolUser: '', // 校务部签字
  weekCalander: '否' // 是否周历
}

export default FormModel
