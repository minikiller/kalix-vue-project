const FormModel = {
  docType: null,              // 发文类型，字典【文号类型】
  year: '',                   // 年份
  number: null,               // 编号
  businessNo: '',             // 文号
  status: '',                 // 文号状态
  docDate: null,              // 发文时间
  docDeptId: null,            // 发文部门id(临时字段)
  docDept: '',                // 发文部门
  printer: '',                // 打印人
  checker: '',                // 校对
  page: null,                 // 页数
  copy: null,                 // 份数
  other: '',                  // 抄送
  creationDate: null,         // 创建时间
  updateDate: null,           // 更新时间
  redheadId: null,            // 红头文件id
  title: '',                  // 文题
  docUrl: '',                 // 发文地址
  docContent: '',             // 文档内容
  docStatus: ''               // 文档状态
}

export default FormModel
