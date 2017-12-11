/**
 * 用户启用判断条件
 * @param scope
 * @returns {boolean}
 */
const startCond = (scope) => {
  return scope.row.available === 1
}

/**
 * 用户操作按钮定义
 * @type {[null,null,null,null,null]}
 */
const userBtnList = [
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
    id: 'startStopUsing',
    title: '',
    isShow: true,   // 是否显示
    isPermission: true,  // 是否进行权限认证
    titleCompute: (scope) => {
      return scope.row.available === 1 ? '停用' : '启用'
    }
  },
  {
    id: 'key',
    title: '重置密码',
    isShow: true,   // 是否显示
    isPermission: true,  // 是否进行权限认证
    cond: startCond
  },
  {
    id: 'auth',
    title: '权限查看',
    isShow: true,   // 是否显示
    isPermission: true  // 是否进行权限认证
  }
]

const customTableTool = (row, btnId, requestUrl, that) => {
  switch (btnId) {
    case 'startStopUsing': { // 启用/停用
      /* that.$confirm('流程启动后业务数据将无法修改！确定要启动吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return Vue.axios.request({
          method: 'GET',
          url: requestUrl + row.id
        })
      }).then((res) => {
        Message.processResult(res)
        EventBus.$emit(ON_REFRESH_DATA)
      }) */
      if (row.available === 1) {
        alert('停用')
      } else {
        alert('启用')
      }
      break
    }
    case 'key': { // 重置密码
      /* that.$confirm('流程启动后业务数据将无法修改！确定要启动吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return Vue.axios.request({
          method: 'GET',
          url: requestUrl + row.id
        })
      }).then((res) => {
        Message.processResult(res)
        EventBus.$emit(ON_REFRESH_DATA)
      }) */
      alert('重置密码')
      break
    }
    case 'auth' : { // 权限查看
      /* EventBus.$emit('processTask' + '-' + ON_INIT_DIALOG_DATA, row)
      that.$refs.kalixDialog.$refs.kalixBizDialog.open('查看') */
      alert('权限查看')
      break
    }
  }
}

export {userBtnList, customTableTool}
