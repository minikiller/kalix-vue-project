const FormModel = {
  code: '',                   // 学号
  name: '',                   // 姓名
  region: null,               // 工作省份（地区），字典【省份】
  city: '',                   // 工作城市
  expectingIndustry: null,    // 期望行业，字典【企业行业】
  jobType: null,              // 工作类型，字典【工作类型】
  position: '',               // 期望岗位
  learningSofts: '',          // 所学软件
  education: '',              // 学历
  salary: 1000,               // 薪资
  skills: '',                 // 个人特点，字典【个人要求】多个
  // careerGoal: '',             // 职业规划、目标
  creationDate: null,         // 创建时间
  sex: '',                // 性别
  email: '',              // 邮箱
  phone: '',              // 固定电话
  mobile: '',             // 手机
  majorId: null,          // 专业id
  majorName: '',          // 专业名称
  instructor: '',         // 辅导员
  // identificationCard: '', // 身份证号
  birthday: null,         // 出生日期
  nation: '',             // 民族
  placeOfOrigin: '',      // 籍贯
  politicalStatus: '',    // 政治面貌
  joinPartyDate: null,    // 入党团时间
  address: '',            // 联系地址
  postalcode: '',         // 邮政编码
  homePhone: '',          // 家庭联系电话
  province: null,         // 生源省份，字典【省份】
  entranceYear: null,     // 入学年份
  trainingLevel: '',      // 学生培养层次
  period: ''              // 学习年限
}

export default FormModel
