<!--
描述：展赛详细信息组件
开发人：fj
开发日期：2017年9月05日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="competitionInfo" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      div.s-flex
        el-form-item.s-flex_item(label="展赛名称" prop="name" label-width="120px" )
          el-input(v-model="formModel.name" readonly style="width:100%")
        div.dd
        el-form-item.s-flex_item(label="展赛类别" prop="type" label-width="120px")
          el-input(v-bind:value="formModel.type|getDictName('research','展赛类别')" readonly)
      div.s-flex
        el-form-item.s-flex_item(label="展赛地址" prop="address" label-width="120px")
          el-input(v-model="formModel.address" readonly style="width:100%")
        div.dd
        el-form-item.s-flex_item(label="联系人员" prop="contactor" label-width="120px")
          el-input(v-model="formModel.contactor" readonly style="width:100%")
      div.s-flex
        el-form-item.s-flex_item(label="联系电话" prop="phone" label-width="120px")
          el-input(v-model="formModel.phone" readonly style="width:100%")
        div.dd
        el-form-item.s-flex_item(label="联系邮箱" prop="email" label-width="120px")
          el-input(v-model="formModel.email" readonly style="width:100%")
      div.s-flex
        el-form-item.s-flex_item(label="征集开始时间" prop="collectionStartTime" label-width="120px")
          kalix-date-picker(v-model="formModel.collectionStartTime" readonly style="width:100%")
        div.dd
        el-form-item.s-flex_item(label="征集结束时间" prop="collectionEndTime" label-width="120px")
          kalix-date-picker(v-model="formModel.collectionEndTime" readonly style="width:100%")
      div.s-flex
        el-form-item.s-flex_item(label="初评开始时间" prop="preEvalStartTime" label-width="120px")
          kalix-date-picker(v-model="formModel.preEvalStartTime" readonly style="width:100%")
        div.dd
        el-form-item.s-flex_item(label="初评结束时间" prop="preEvalEndTime" label-width="120px")
          kalix-date-picker(v-model="formModel.preEvalEndTime" readonly style="width:100%")
      div.s-flex
        el-form-item.s-flex_item(label="终评开始时间" prop="lastEvalStartTime" label-width="120px")
          kalix-date-picker(v-model="formModel.lastEvalStartTime" readonly style="width:100%")
        div.dd
        el-form-item.s-flex_item(label="终评结束时间" prop="lastEvalEndTime" label-width="120px")
          kalix-date-picker(v-model="formModel.lastEvalEndTime" readonly style="width:100%")
      div.s-flex
        el-form-item.s-flex_item(label="展览开始时间" prop="compStartTime" label-width="120px")
          kalix-date-picker(v-model="formModel.compStartTime" readonly style="width:100%")
        div.dd
        el-form-item.s-flex_item(label="展览结束时间" prop="compEndTime" label-width="120px")
          kalix-date-picker(v-model="formModel.compEndTime" readonly style="width:100%")
      div.s-flex
        el-form-item.s-flex_item(label="作品内容要求" prop="contentNeed" label-width="120px")
          el-input(type="textarea" v-model="formModel.contentNeed" readonly style="width:100%")
        div.dd
        el-form-item.s-flex_item(label="作品技术要求" prop="technologyNeed" label-width="120px")
          el-input(type="textarea" v-model="formModel.technologyNeed" readonly style="width:100%")
      div.s-flex
        el-form-item.s-flex_item(label="作品详细信息" prop="detail" label-width="120px")
          el-input(type="textarea" v-model="formModel.detail" readonly style="width:100%")
        div.dd
        el-form-item.s-flex_item(label="作品备注说明" prop="remark" label-width="120px")
          el-input(type="textarea" v-model="formModel.remark" readonly style="width:100%")
      div.s-flex
        el-form-item.s-flex_item(label="报名表样式" prop="signupStyle" label-width="120px")
          kalix-upload(v-model="formModel.signupStyle" v-bind:isImage="false" readonly style="width:100%")
</template>
<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'
  import DatePicker from '@/components/biz/date/datepicker.vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel)
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixDatePicker: DatePicker
    }
  }
</script>
