import {OaWorkflowComponent} from '../config.toml'
import Vue from 'vue'

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
import {ON_INIT_DIALOG_DATA} from '@/components/custom/event.toml'
import EventBus from 'common/eventbus'

const customTableTool = (row, btnId) => {
  switch (btnId) {
    case 'start': {
      break
    }
    case 'progress': {
      EventBus.$emit('processTask' + '-' + ON_INIT_DIALOG_DATA, row)
      this.$refs.kalixDialog.$refs.kalixBizDialog.open('查看')
      break
    }
  }
}

export {registerComp, workflowBtnList, customTableTool}
