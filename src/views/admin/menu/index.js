/**
 * 描述： 定义系统管理-菜单管理功能中使用表格列上的用户操作按钮
 * 开发人：hqj
 * 开发日期：2018年05月22日
 */

/**
 * 用户删除模块判断条件
 * @param scope
 * @returns {boolean}
 */
const deleteModuleCond = (scope) => {
  return scope.row.text !== '系统管理'
}

/**
 * 用户编辑模块判断条件
 * @param scope
 * @returns {boolean}
 */
const editMenuCond = (scope) => {
  return scope.row.id !== 'menuMenu'
}

/**
 * 用户删除模块判断条件
 * @param scope
 * @returns {boolean}
 */
const deleteMenuCond = (scope) => {
  return scope.row.id !== 'menuMenu'
}

/**
 * 定义模块表格列上的用户操作按钮
 * @type {[null,null,null,null,null]}
 **/
const moduleBtnList = [
  {
    id: 'newEdit',
    title: '编辑',
    isShow: true,       // 是否显示
    isPermission: true  // 是否进行权限认证
  }, {
    id: 'newDelete',
    title: '删除',
    isShow: true,        // 是否显示
    isPermission: true,  // 是否进行权限认证
    cond: deleteModuleCond
  }
]

/**
 * 定义菜单表格列上的用户操作按钮
 * @type {[null,null,null,null,null]}
 **/
const menuBtnList = [
  {
    id: 'newEdit',
    title: '编辑',
    isShow: true,       // 是否显示
    isPermission: true, // 是否进行权限认证
    cond: editMenuCond
  }, {
    id: 'newDelete',
    title: '删除',
    isShow: true,        // 是否显示
    isPermission: true,  // 是否进行权限认证
    cond: deleteMenuCond
  }
]

export {moduleBtnList, menuBtnList}
