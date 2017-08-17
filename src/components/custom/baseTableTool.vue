<!--
描述：table中column中的tool组件的按钮封装
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang='pug'>
  div
    el-table-column(label='操作' width='150')
      template(scope='scope')
        el-button(v-for='btn in btnList' v-if='btn.isShow' v-bind:key='btn.id' v-on:click='toggle(scope.row,btn.id)'
        type='text' size='small') {{btn.title}}
</template>

<script type='text/ecmascript-6'>
  const ON_TABLE_TOOL_CLICK = 'onTableToolClick'

  export default {
    props: {
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
    data() {
      return {}
    },
    computed: {
      btnEdit() {
        return this.btnOption.indexOf('btnEdit') > -1
      },
      btnDelete() {
        return this.btnOption.indexOf('btnDelete') > -1
      },
      btnView() {
        return this.btnOption.indexOf('btnView') > -1
      }
    },
    methods: {
      toggle(row, btnId) { // toolbar click event
        this.$emit(ON_TABLE_TOOL_CLICK, row, btnId)
      }
    }
  }
</script>

<style scoped lang='stylus' type='text/stylus'>
</style>
