/**
 * 文号废除判断条件
 * @param scope
 * @returns {boolean}
 */
const abolishCond = (scope) => {
  return scope.row.status === '使用中'
}

/**
 * 发文判断条件
 * @param scope
 * @returns {boolean}
 */
const publishCond = (scope) => {
  return (scope.row.status === '使用中' && scope.row.docStatus === '审批通过')
}

/**
 * 文号管理操作按钮定义
 * @type {[null,null,null,null,null]}
 */
const DocumentToolButtonList = [
  {
    id: 'view',
    title: '查看',
    isShow: true,   // 是否显示
    isPermission: true  // 是否进行权限认证
  },
  {
    id: 'publish',
    title: '发文',
    isShow: true,   // 是否显示
    isPermission: true,  // 是否进行权限认证
    cond: publishCond
  },
  {
    id: 'abolish',
    title: '废除',
    isShow: true,   // 是否显示
    isPermission: true,  // 是否进行权限认证
    cond: abolishCond
  }
]

export {DocumentToolButtonList}
