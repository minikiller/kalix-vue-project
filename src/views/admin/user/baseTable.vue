<template lang="pug">
  div
    kalix-tool-bar(@onAddClick="onAddClick" @onRefreshClick="onRefreshClick")
    el-table( :data="tableData" style="width: 100%" v-loading.body="loading")
      //table的字段
      div(v-if="tableData && tableData.length > 0" v-for="field in fields" v-bind:key="field.prop")
        el-table-column( :prop="field.prop" v-bind:label="field.label")
      //  table的工具按钮
      slot(name="tableToolSlot")
        kalix-table-tool(:btnList="btnList" v-on:onTableToolClick="btnClick")
    el-pagination(v-if="pager.totalCount"
    v-on:size-change="pagerSizeChange"
    v-on:current-change="pagerCurrentChange"
    v-bind:current-page="pager.currentPage"
    v-bind:page-sizes="pager.pageSizes"
    v-bind:page-size="1"
    layout="total, sizes, prev, pager, next, jumper"
    v-bind:total="pager.totalCount")
    <!--el-dialog.dialog-form(v-bind:title="title" v-bind:visible="visible")-->
    <!--slot(name="dialogFormSlot")-->
    <!--kalix-dialog(ref="kalixDialog" v-bind:formModel="formModel" v-bind:formRules="formRules")-->
    component(:is="whichBizDialog" ref="kalixDialog" v-bind:formModel="formModel" v-bind:formRules="formRules"
    v-on:refreshData="refresh")

</template>
<script type="text/ecmascript-6">
  import {PageConfig, ToolButtonList} from 'config/global.toml'
  import TableTool from './baseTableTool'
  import ToolBar from './baseToolBar'
  import Dialog from './baseDialog'
  import Message from 'common/message'
  import UserAdd from './userAdd.vue'

  export default {
    props: {
      bizDialog: {
        type: Array
      },
      formModel: {
        type: Object
//        required: true
      },
      formRules: {
        type: Object
//        required: true
      },
      targetURL: {
        type: String,
        required: true
      },
      jsonStr: {
        type: String,
        default: ''
      },
      fields: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        title: '',
        visible: false,
        btnList: ToolButtonList,
        loading: true,
        tableData: [],
        totalCount: 0,
        whichBizDialog: '',
        pager: {
          totalCount: 0,
          pageSizes: PageConfig.sizes,
          currentPage: 1,
          limit: PageConfig.limit,
          start: 0
        }
      }
    },
    created() {
      this.getData()
    },
    methods: {
      onAddClick() {
        let that = this
        that.$emit('resetFormModel')
        let dig =
          this.bizDialog.filter((item) => {
            return item.id === 'add'
          })
        console.log(dig[0].dialog)
        this.whichBizDialog = dig[0].dialog
        this.$nextTick(() => {
          that.$refs.kalixDialog.open('添加')
        })
      },
      onRefreshClick() {
        this.getData()
      },
      refresh() {
        this.getData()
      },
      btnClick(row, btnId) {
        console.log(row, btnId)
        switch (btnId) {
          case 'view':
            let that = this
            this.formModel = row
            let dig =
              this.bizDialog.filter((item) => {
                return item.id === 'view'
              })
            console.log(dig[0].dialog)
            this.whichBizDialog = dig[0].dialog
            setTimeout(() => {
              that.$refs.kalixDialog.open('查看')
            }, 20)
//            this.$refs.kalixDialog.open('查看')
            console.log('view is clicked')
            break
          case 'edit':
            this.formModel = row
            this.$refs.kalixDialog.open('编辑')
            console.log('edit is clicked')
            break
          case 'delete': {
            console.log('delete is clicked')
            this.$confirm('确定要删除吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              return this.axios.request({
                method: 'DELETE',
                url: this.targetURL + '/' + row.id,
                params: {},
                data: {
                  id: row.id
                }
              })
            }).then(response => {
              this.getData()
              Message.success(response.data.msg)
            }).catch(() => {
            })
            break
          }
        }
      },
      pagerSizeChange(val) {
        //  改变每页记录数
        this.pager.limit = val
        this.getData()
      },
      pagerCurrentChange(val) {
        //  翻页
        this.pager.currentPage = val
        this.getData()
      },
      getData() {
        console.log('baseTable', 'getData')
        this.loading = true
        let _data = {
          jsonStr: this.jsonStr,
          page: this.pager.currentPage,
          start: this.pager.start,
          limit: this.pager.limit
        }
        this.$http.get(this.targetURL, {
          params: _data
        }).then(response => {
//          if(response.data)
          this.tableData = response.data.data
          this.pager.totalCount = response.data.totalCount
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }
    },
    components: {
      KalixTableTool: TableTool,
      KalixToolBar: ToolBar,
      KalixDialog: Dialog,
      UserAdd
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
