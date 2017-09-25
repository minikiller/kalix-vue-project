<!--
描述：报名信息组件
开发人：fj
开发日期：2017年9月13日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="award"
  ref="kalixBizDialog" v-bind:form-model.sync="formModel"
  v-bind:isView="readonly")
    div.el-form(slot="dialogFormSlot")
      div.s-flex
        el-form-item.s-flex_item(label="展赛ID" prop="competitionId" label-width="140px")
          el-input(v-model="formModel.competitionId" readonly)
        el-form-item.s-flex_item(label="展赛类型" prop="competitionType" label-width="140px")
          el-input(v-model="formModel.competitionType" readonly)
      div.s-flex
        el-form-item.s-flex_item(label="报名ID" prop="signupId" label-width="140px")
          el-input(v-model="formModel.signupId" readonly)
        el-form-item.s-flex_item(label="获奖人" prop="awardname" label-width="140px" )
          el-input(v-model="formModel.awardname" readonly)
      div.s-flex
        el-form-item.s-flex_item(label="获奖级别" prop="awardLevel" label-width="140px")
          el-input(v-model="formModel.awardLevel" readonly)
        el-form-item.s-flex_item(label="备注" prop="remark" label-width="140px")
          el-input(v-model="formModel.remark" readonly)

</template>
<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'
  export default {
    data() {
      return {
        readonly: true,
        formModel: Object.assign({}, FormModel)
      }
    },
    created() {
    },
    components: {
      KalixDialog: Dialog
    },
    methods: {
    }
  }
</script>
