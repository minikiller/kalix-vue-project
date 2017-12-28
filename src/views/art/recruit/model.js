const FormModel = {
  companyCode: '',          // 企业组织机构代码
  companyName: '',          // 企业名称
  companyEmail: '',         // 邮箱
  companyPhone: '',         // 固定电话
  companyMobile: '',        // 手机
  companyNature: null,      // 企业性质，字典
  companyScale: '',         // 企业规模
  companyIndustry: null,    // 企业行业，字典
  companyLife: '',          // 企业年限
  companyRegion: null,      // 企业所在省份（地区）
  companyCity: '',          // 企业所在城市
  companyAddress: '',       // 企业详细地址
  publishDate: new Date(),  // 发布时间
  region: null,             // 工作省份（地区）
  city: '',                 // 工作城市
  position: '',             // 岗位名称(职位描述)
  positionRequires: '',     // 岗位要求
  requireSofts: '',         // 岗位所需软件
  jobNumbers: 1,            // 岗位个数
  education: '',            // 学历
  functionCategoryId: null, // 职能类别，对象字典
  salary: 1000,             // 薪资
  appliedTechnology: '',    // 应用技术名称
  personRequires: '',       // 个人要求
  jobType: null             // 工作类型
}

export default FormModel
