const FormModel = {
  id: null,
  userType: null,      // 用户类型,字典[用户类型]
  code: '',            // 工号
  position: null,      // 岗位,字典[岗位名称]
  sex: '',             // 性别
  loginName: '',       // 登录名
  name: '',            // 名称
  password: '',        // 密码
  confirmPassword: '', // 确认密码
  email: '',           // 邮箱
  phone: '',           // 固定电话
  mobile: '',          // 手机
  available: 1,        // 是否可用
  icon: ''             // 头像
}

export default FormModel
