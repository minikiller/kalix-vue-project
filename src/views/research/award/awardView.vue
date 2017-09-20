<!--
描述：报名信息组件
开发人：fj
开发日期：2017年9月13日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="award"
  ref="kalixBizDialog" v-bind:form-model="formModel" v-bind:targetURL="targetURL"
  v-bind:isView="readonly")
    div.el-form(slot="dialogFormSlot")
      div.s-flex
        el-form-item.s-flex_item(label="展赛ID" prop="competitionId" label-width="140px")
          el-input(v-model="formModel.competitionId" v-bind:readonly="readonly")
        el-form-item.s-flex_item(label="展赛类型" prop="competitionType" label-width="140px")
          el-input(v-model="formModel.competitionType" v-bind:readonly="readonly")
      div.s-flex
        el-form-item.s-flex_item(label="报名ID" prop="signupId" label-width="140px")
          el-input(v-model="formModel.signupId" v-bind:readonly="readonly")
        el-form-item.s-flex_item(label="获奖人" prop="awardname" label-width="140px" )
          el-input(v-model="formModel.awardname" v-bind:readonly="readonly")
      div.s-flex
        el-form-item.s-flex_item(label="获奖级别" prop="awardLevel" label-width="140px")
          el-input(v-model="formModel.awardname" v-bind:readonly="readonly")
        el-form-item.s-flex_item(label="备注" prop="remark" label-width="140px")
          el-input(v-model="formModel.remark" v-bind:readonly="readonly")

</template>
<script type="text/ecmascript-6">
  import Dialog from '@/components/custom/baseDialog.vue'
  import {AwardURL} from '../config.toml'
  export default {
    props: {
      formModel: {
        type: Object,
        required: true
      },
      formRules: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        targetURL: AwardURL,
        readonly: true
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
