<template lang="pug">
  keep-alive
    base-table(bizKey="workgroup" title='工作组列表' v-bind:tableFields="tableFields" v-bind:targetURL="targetURL"
    v-bind:buttonPermissionPrefix="buttonPermissionPrefix"
    v-bind:formModel.sync="formModel" v-bind:formRules="formRules" v-bind:bizDialog="bizDialog"
    bizSearch="AdminWorkGroupSearch"  v-bind:btnList="btnList")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {workgroupURL, workGroupBtnPermissionPrefix, ToolButtonList, WorkGroupComponent} from '../config.toml'
  import EventBus from 'common/eventbus'
  import {registerComponent} from '@/api/register'

  // 注册全局组件
  registerComponent(WorkGroupComponent)

  export default {
    data() {
      return {
        btnList: ToolButtonList,
        buttonPermissionPrefix: workGroupBtnPermissionPrefix,
        targetURL: workgroupURL,
        tableFields: [
          {prop: 'app', label: '所属应用'},
          {prop: 'name', label: '工作组名称'},
          {prop: 'remark', label: '备注'},
          {prop: 'createBy', label: '创建人'},
          {prop: 'creationDate', label: '创建日期'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'AdminWorkGroupView'},
          {id: 'add', dialog: 'AdminWorkGroupAdd'},
          {id: 'edit', dialog: 'AdminWorkGroupAdd'}
        ],
        formModel: {
          name: '',
          app: '',
          available: 1,
          remark: ''
        },
        formRules: {
          app: [
            {required: true, message: '请输入所属应用', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入工作组名称', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      changeFormModel(model) {
        console.log('changeFormModel', model)
        this.formModel = model
      }
    },
    components: {
      BaseTable
    },
    mounted() {
      EventBus.$on('updateAppModel', this.changeFormModel)
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
