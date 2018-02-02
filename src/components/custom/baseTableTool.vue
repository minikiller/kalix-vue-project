<!--
描述：table中column中的tool组件的按钮封装
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  div
    el-tooltip(v-for="btn in btnList" v-if="btn.isShow" v-bind:key="btn.id" v-bind:content="toolTipContent(btn)" placement="top")
      span.operation-btn(type="text" v-if="btnShow(btn)" size="small" v-on:click="toggle(scope.row,btn.id)") {{buttonTitle(btn)}}
</template>

<script type="text/ecmascript-6">
  import {ON_TABLE_TOOLBAR_CLICK} from './event.toml'

  export default {
    props: {
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
        return !btn.cond || btn.cond(this.scope)
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
