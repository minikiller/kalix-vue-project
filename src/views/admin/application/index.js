const unstartCond = (scope) => {
  return scope.row.code !== 'admin'
}
const applicationBtnList = [
  {
    id: 'view',
    title: '查看',
    isShow: true,   // 是否显示
    isPermission: true  // 是否进行权限认证
  },
  {
    id: 'startStopUsing',
    title: '启动',
    isShow: true,   // 是否显示
    isPermission: true,  // 是否进行权限认证
    cond: unstartCond,
    titleCompute: (scope) => {
      return scope.row.active === true ? '停用' : '启用'
    }
  }
]
export {applicationBtnList}
