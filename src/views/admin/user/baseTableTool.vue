<template lang="pug">
  div
    el-table-column(label="操作" width="150")
      template(scope="scope")
        el-button(v-for="btn in btnList" :key="btn.id" v-on:click="toggle(scope.row,btn.id)"
          :type="btn.type" :size="btn.size") {{btn.title}}
        //el-button(v-if="btnView" v-on:click="tableView(scope.row)" type="text" size="small") 查看
        //el-button(v-if="btnEdit" v-on:click="tableEdit(scope.row)" type="text" size="small") 编辑
        //el-button(v-if="btnDelete" v-on:click="tableDelete(scope.row)" type="text" size="small") 删除
</template>
<script type="text/ecmascript-6">
  const ON_CLICK_TABLE_VIEW = 'onTableView'
  const ON_CLICK_TABLE_EDIT = 'onTableEdit'
  const ON_CLICK_TABLE_DELETE = 'onTableDelete'
  const ON_TABLE_TOOL_CLICK = 'onTableToolClick'

  import Message from 'common/message'

  export default {
    props: {
      btnOption: {
        type: Array,
        default: () => {
          return ['btnView', 'btnEdit', 'btnDelete']
        }
      },
      btnList: {  // 工具按钮的列表
        type: Array
      }
    },
    data() {
      return {
      }
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
      toggle(row, btnId) {
        this.$emit(ON_TABLE_TOOL_CLICK, row, btnId)
      },
      tableView(row) {
        console.log('view button is click ', row)
        if (this._events[ON_CLICK_TABLE_VIEW]) {
          this.$emit(ON_CLICK_TABLE_VIEW, row)
        }
      },
      tableEdit(row) {
        console.log('edit button is click ', row)
        if (this._events[ON_CLICK_TABLE_EDIT]) {
          this.$emit(ON_CLICK_TABLE_EDIT, row)
        }
      },
      tableDelete(row) {
        if (this._events[ON_CLICK_TABLE_DELETE]) {
          this.$emit(ON_CLICK_TABLE_DELETE, row)
        } else {
          this.$confirm('确定要删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            return this.axios.request({
              method: 'DELETE',
              url: this.$parent.targetURL + '/' + row.id,
              params: {},
              data: {
                id: row.id
              }
            })
          }).then(response => {
            this.refresh()
            Message.success(response.data.msg)
          }).catch(() => {
          })
        }
      }
    }
  }
</script>
<style scoped lang="scss" type="text/scss">
</style>
