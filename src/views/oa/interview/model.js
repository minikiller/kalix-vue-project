const FormModel = {
  candidateId: null,          // 应聘id
  personCategory: null,         // 人员类别
  orgId: null,                  // 部门代码
  orgName: '',                  // 部门名称
  xm: '',                       // 姓名
  sex: null,                    // 性别
  age: null,                    // 年龄
  tel: '',                      // 联系电话
  position: '',                 // 应聘岗位
  dateFirst: '',              // 初试时间
  interviewerFirst: '',       // 初试面试官
  interviewContentFirst: '',  // 初试面试内容
  passFirst: '',              // 初试是否通过
  whichInterview: '',         // 判断初试/复试review
  dateSecond: '',             // 复试时间
  interviewerSecond: '',      // 复试面试官
  interviewContentSecond: '', // 复试面试内容
  passSecond: ''              // 复试是否通过
}

export default FormModel
