
/**
 * 待办流程操作按钮定义
 * @type {[null,null,null,null,null]}
 */
const taskBtnList = [
  {
    id: 'viewTask',
    title: '进度',
    isShow: true,   // 是否显示
    isPermission: true  // 是否进行权限认证
  },
  {
    id: 'complete',
    title: '',
    isShow: true,   // 是否显示
    isPermission: true,  // 是否进行权限认证
    titleCompute: (scope) => {
      return scope.row.name === '部门拟稿修改' ? '修改' : '审批'
    }
  }
]

export {taskBtnList}
