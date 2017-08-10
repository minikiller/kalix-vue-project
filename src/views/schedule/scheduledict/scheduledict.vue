<!--
描述：计划任务 - 系统管理 - 字典管理
开发人：桑杨
开发日期：2017年7月17日
-->
<template lang="pug">
  div.schedule-dict
    kalix-search(ref="mySearch" title="字典查询")
      el-form.search-container(ref="searchForm" v-bind:rules="search.rules" v-bind:model="search.form" v-bind:inline="true")
        el-form-item(label="类型" prop="type")
          el-input(v-model="search.form.type")
        el-form-item
          el-button(type="primary" v-on:click="searchFormSubmit")
            i.iconfont.icon-query
            | 查询
          el-button(type="success" v-on:click="resetSearchForm")
            i.iconfont.icon-reset
              | 重置
    kalix-wrapper(ref='myWrapper' title="字典列表" icon="iconfont icon-dict-management"
    v-bind:data-url="dataUrl"
    v-bind:request-data="requestData"
    v-on:tableView="tableView"
    v-on:tableEdit="tableEdit")
      <!-- 按钮 -->
      div(slot="toolbar")
        el-button(v-on:click="addData" type="primary")
          i.iconfont.icon-add
          | 添加
        el-button(v-on:click="refresh" type="primary")
          i.iconfont.icon-refresh
          | 刷新
      kalix-table-columns(slot="container")
    <!-- 对话框 -->
    kalix-dialog(ref="kalixDialog" v-bind:form-name="'kalixScheduleDitDialogForm'" v-bind:formModel="formModel"
    v-bind:rules="rules" v-bind:data-url="dataUrl" v-on:refreshData="()=>{$refs.myWrapper.refresh()}")
      kalix-dialog-form(slot="dialog-container" ref="kalixScheduleDitDialogForm" v-bind:formModel="formModel")
    <kalix-dialog ref="kalixDialog"
                  :form-name="'kalixScheduleDitDialogForm'"
                  :formModel="formModel"
                  :rules="rules"
                  :data-url="dataUrl"
                  @refreshData="()=>{$refs.myWrapper.refresh()}">
      <kalix-dialog-form slot="dialog-container"
                         ref="kalixScheduleDitDialogForm"
                         :parent-ref-name="kalixDialog"
                         :parent-refs="$refs"
                         :formModel="formModel"></kalix-dialog-form>
    </kalix-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import {ScheduleDictsURL} from 'config/global.toml'
  import {strToUnicode} from 'common/unicode-convert'
  import KalixTableButtons from '@/components/table/tableButtons.vue'
  import KalixTableColumns from './scheduledictColumns'
  import KalixScheduleDitDialogForm from './scheduledictForm'

  export default {
    name: 'scheculedict',
    data() {
      let validateType = (rule, value, callback) => {
        callback()
      }
      return {
        dataUrl: ScheduleDictsURL,
        // 请求参数
        requestData: {},
        // 搜索框
        search: {
          form: {
            type: ''
          },
          rules: {
            type: [
              {validator: validateType, trigger: 'blur'}
            ]
          }
        },
        formModel: {
          id: 0,
          type: '',
          label: '',
          description: '',
          types: []
        },
        // 对话框表单验证项
        rules: {
          type: [
            {required: true, message: '请选择类型', trigger: 'blur'}
          ],
          label: [
            {required: true, message: '请输入标签名', trigger: 'blur'}]
        }
      }
    },
    created() {
      this.tempFormModel = JSON.stringify(Object.assign({}, this.formModel))
    },
    mounted() {
    },
    methods: {
      searchFormSubmit() {
        // 提价查询
        let that = this
        if (that.search.form.type.length > 0) {
          that.requestData = {jsonStr: '{"%type%": "' + strToUnicode(that.search.form.type) + '"}'}
          that.$refs.myWrapper.refresh()
        }
      },
      resetSearchForm() {
        // 重置搜索框
        this.search.obj = {}
        this.$refs.searchForm.resetFields()
        this.$refs.myWrapper.refresh()
      },
      addData() {
        // 打开对话框
        this.$refs.kalixDialog.open('添加')
      },
      refresh() {
        this.$refs.myWrapper.refresh()
      },
      resetDialogForm() {
        // 清空form
        this.formModel = JSON.parse(this.tempFormModel)
      },
      tableView(row) {
        this.formModel.id = row.id
        this.formModel.type = row.type
        this.formModel.label = row.label
        this.formModel.description = row.description
        // 打开对话框
        this.$refs.kalixDialog.open('查看', true)
      },
      tableEdit(row) {
        this.formModel.id = row.id
        this.formModel.type = row.type
        this.formModel.label = row.label
        this.formModel.description = row.description
        // 打开对话框
        this.$refs.kalixDialog.open('修改')
      }
    },
    components: {
      KalixTableButtons,
      KalixTableColumns,
      KalixDialogForm: KalixScheduleDitDialogForm
    }
  }
</script>

<style scoped lang='scss' type='text/scss'>
  @import "../../../assets/scss/Color";

  .schedule-dict {
    .dialog-form {
      text-align: left;
    }
  }
</style>

