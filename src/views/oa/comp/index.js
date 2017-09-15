import {OaWorkflowComponent} from '../config.toml'
import Vue from 'vue'
import Message from 'common/message'
import {ON_REFRESH_DATA, ON_INIT_DIALOG_DATA} from '@/components/custom/event.toml'
import EventBus from 'common/eventbus'

const _import = require('@/api/_import_' + process.env.NODE_ENV)

const registerComp = () => {
// 注册全局组件
  OaWorkflowComponent.forEach((item) => {
    console.log('[kalix]-[oa] registry name is: ' + item.name, '; registry path is: ' + item.path)
    Vue.component(item.name, _import(item.path))
  })
}

/**
 * 流程未启动判断条件
 * @param scope
 * @returns {boolean}
 */
const startedCond = (scope) => {
  return scope.row.status === 1
}

/**
 * 流程已经启动判断条件
 * @param scope
 * @returns {boolean}
 */
const unstartCond = (scope) => {
  return scope.row.status === 0
}

/**
 * 工作流操作按钮定义
 * @type {[null,null,null,null,null]}
 */
const workflowBtnList = [
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
    cond: unstartCond
  },
  {
    id: 'delete',
    title: '删除',
    isShow: true,   // 是否显示
    isPermission: true,  // 是否进行权限认证
    cond: unstartCond
  },
  {
    id: 'progress',
    title: '进度',
    isShow: true,   // 是否显示
    isPermission: true,  // 是否进行权限认证
    cond: startedCond
  },
  {
    id: 'start',
    title: '启动',
    isShow: true,   // 是否显示
    isPermission: true,  // 是否进行权限认证
    cond: unstartCond
  },
  {
    id: 'attachment',
    title: '附件',
    isShow: true,   // 是否显示
    isPermission: true  // 是否进行权限认证
  }
]

const customTableTool = (row, btnId, requestUrl, that) => {
  switch (btnId) {
    case 'start': { // 流程启动
      that.$confirm('流程启动后业务数据将无法修改！确定要启动吗?', '提示', {
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
      })
      break
    }
    case 'progress' : {
      EventBus.$emit('processTask' + '-' + ON_INIT_DIALOG_DATA, row)
      that.$refs.kalixDialog.$refs.kalixBizDialog.open('查看')
      break
    }
  }
}

export {registerComp, workflowBtnList, customTableTool}
