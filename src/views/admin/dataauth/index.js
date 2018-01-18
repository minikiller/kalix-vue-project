/**
 * 启用判断条件
 * @param scope
 * @returns {boolean}
 */
const startCond = (scope) => {
  return scope.row.available === 1
}

/**
 * 操作按钮定义
 * @type {[null,null,null,null,null]}
 */
const dataauthBtnList = [
  {
    id: 'view',
    title: '查看',
    isShow: true,   // 是否显示
    isPermission: true  // 是否进行权限认证
  },
  {
    id: 'edit',
    title: '编辑',
    isShow: true,   // 是否显示
    isPermission: true,  // 是否进行权限认证
    cond: startCond
  },
  {
    id: 'delete',
    title: '删除',
    isShow: true,   // 是否显示
    isPermission: true,  // 是否进行权限认证
    cond: startCond
  }
]

export {dataauthBtnList}
