<template lang="pug">
  div
    kalix-base-form(ref="kalixBaseForm"
      v-bind:formModel.sync="formModel"
      v-bind:targetURL="targetURL")
      div.el-form.kalix-form-table(slot="dialogFormSlot")
        div.table-title 吉林动画学院用章申请表
        el-form-item(label="名称" v-bind:label-width="labelWidth" prop="title" v-bind:rules="rules.title")
          el-input(v-model="formModel.title")
        el-form-item(label="申请部门" v-bind:label-width="labelWidth" prop="orgId" v-bind:rules="rules.orgId")
          kalix-org-select(v-model="formModel.orgId" v-on:selectChange="onOrgIdChange")
        el-form-item(label="用印数" v-bind:label-width="labelWidth")
          el-input-number(v-model="formModel.usageCount" v-bind:min="1" v-bind:max="10" style="width:100%")
        el-form-item(label="备注" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.remark")
</template>
<script type="text/ecmascript-6">
  import {SealApplyURL} from '../config.toml'
  import KalixBaseForm from '@/components/custom/baseForm'
  import UserOrgSelect from '@/components/biz/select/UserOrgSelect'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  import FormModel from '../sealapply/model'

  export default {
    created() {
      this.labelWidth = '110px'
    },
    data() {
      return {
        targetURL: SealApplyURL,
        formModel: Object.assign({}, FormModel),
        rules: {
          title: [{required: true, message: '请输入名称', trigger: 'blur'}],
          orgId: [{type: 'number', required: true, message: '请选择申请部门', trigger: 'change'}],
          sealType: [{type: 'number', required: true, message: '请选择印章类型', trigger: 'change'}]
        }
      }
    },
    methods: {
      onOrgIdChange(item) {
        this.formModel.orgName = item.name
      }
    },
    components: {
      KalixOrgSelect: UserOrgSelect,
      KalixDictSelect: BaseDictSelect,
      KalixBaseForm
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
