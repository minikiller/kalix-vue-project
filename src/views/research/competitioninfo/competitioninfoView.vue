<!--
描述：展赛详细信息组件
开发人：fj
开发日期：2017年9月05日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="competitionInfo" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      div.s-flex
        el-form-item.s-flex_item(label="展赛名称" prop="name" label-width="140px")
          el-input(v-model="formModel.name" readonly)
        div.dd
        el-form-item.s-flex_item(label="展赛地址" prop="address" label-width="140px")
          el-input(v-model="formModel.address" readonly)
      div.s-flex
        el-form-item.s-flex_item(label="展赛类别" prop="type" label-width="140px")
          el-input(v-model="formModel.type" readonly)
        div.dd
        el-form-item.s-flex_item(label="联系人" prop="contactor" label-width="140px")
          el-input(v-model="formModel.contactor" readonly)
      div.s-flex
        el-form-item.s-flex_item(label="联系人电话" prop="phone" label-width="140px")
          el-input(v-model="formModel.phone" readonly)
        div.dd
        el-form-item.s-flex_item(label="联系人邮箱" prop="email" label-width="140px")
          el-input(v-model="formModel.email" readonly)
      div.s-flex
        el-form-item.s-flex_item(label="作品征集开始时间" prop="collectionStartTime" label-width="140px")
          el-input(v-model="formModel.collectionStartTime" readonly)
        div.dd
        el-form-item.s-flex_item(label="作品征集结束时间" prop="collectionEndTime" label-width="140px")
          el-input(v-model="formModel.collectionEndTime" readonly)
      div.s-flex
        el-form-item.s-flex_item(label="初评开始时间" prop="preEvalStartTime" label-width="140px")
          el-input(v-model="formModel.preEvalStartTime" readonly)
        div.dd
        el-form-item.s-flex_item(label="初评结束时间" prop="preEvalEndTime" label-width="140px")
          el-input(v-model="formModel.preEvalEndTime" readonly)
      div.s-flex
        el-form-item.s-flex_item(label="终评开始时间" prop="lastEvalStartTime" label-width="140px")
          el-input(v-model="formModel.lastEvalStartTime" readonly)
        div.dd
        el-form-item.s-flex_item(label="终评结束时间" prop="lastEvalEndTime" label-width="140px")
          el-input(v-model="formModel.lastEvalEndTime" readonly)
      div.s-flex
        el-form-item.s-flex_item(label="作品内容要求" prop="contentNeed" label-width="140px")
          el-input(type="textarea" v-model="formModel.contentNeed" readonly)
        el-form-item.s-flex_item(label="作品技术要求" prop="technologyNeed" label-width="140px")
          el-input(type="textarea" v-model="formModel.technologyNeed" readonly)
      div.s-flex
        el-form-item.s-flex_item(label="详细信息" prop="detail" label-width="140px")
          el-input(type="textarea" v-model="formModel.detail" readonly)
        el-form-item.s-flex_item(label="备注" prop="remark" label-width="140px")
          el-input(type="textarea" v-model="formModel.remark" readonly)
      div.s-flex
        el-form-item.s-flex_item(label="报名表样式" prop="signupStyle" label-width="140px")
          kalix-upload(v-model="formModel.signupStyle" v-bind:isImage="false" readonly)
</template>
<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel)
      }
    },
    components: {
      KalixDialog: Dialog
    },
    created() {
    },
    methods: {
    }
  }
</script>
