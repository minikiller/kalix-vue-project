<!--
描述：table中column中的tool组件的按钮封装
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  div
    <!-- 按钮列表-->
    template(v-if="displayStyle === 1")
      el-tooltip(v-for="btn in btnList" v-if="btnShow(btn)" v-bind:key="btn.id" v-bind:content="toolTipContent(btn)" placement="top")
        span.operation-btn(type="text" size="small" v-on:click="toggle(scope.row,btn.id)") {{buttonTitle(btn)}}
    <!-- 按钮列表-->
    el-dropdown(v-if="displayStyle === 2" v-on:command="handleCommand")
      span.el-dropdown-link {{dropDownTitle}}
        i.el-icon-arrow-down.el-icon--right
      el-dropdown-menu(slot="dropdown")
        el-dropdown-item(v-for="btn in btnList" v-if="btnShow(btn)" v-bind:command="btn.id" v-bind:key="btn.id") {{buttonTitle(btn)}}
</template>

<script type="text/ecmascript-6">
  import {ON_TABLE_TOOLBAR_CLICK} from './event.toml'

  export default {
    props: {
      displayStyle: {
        default: 1    // 显示样式 1：按钮列表、2：下拉菜单。默认 1。
      },
      dropDownTitle: {
        default: '操作'
      },
      scope: {
        type: Object
      },
      btnList: {  // 工具按钮的列表
        type: Array,
        required: true,
        default: () => {
          return [
            {id: 'view', title: '查看', isShow: true},
            {id: 'edit', title: '编辑', isShow: true},
            {id: 'delete', title: '删除', isShow: true}]
        }
      }
    },
    created() {
      console.log(`[kalix] table tool button is `, this.btnList)
    },
    data() {
      return {}
    },
    methods: {
      btnShow(btn) {
        return btn.isShow && (!btn.cond || btn.cond(this.scope))
      },
      buttonTitle(btn) {
        return (btn.titleCompute) ? btn.titleCompute(this.scope) : btn.title
      },
      toolTipContent(btn) {
        return (btn.toolTipTitle) ? btn.toolTipTitle : (btn.titleCompute) ? btn.titleCompute(this.scope) : btn.title
      },
      toggle(row, btnId) { // toolbar click event
        console.log('%c [BaseTable] toggle ', 'color:#fff;background:#458B00', row.id, btnId)
        this.$emit(ON_TABLE_TOOLBAR_CLICK, row, btnId)
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
</style>
