<!--
描述：展赛详细信息组件
开发人：fj
开发日期：2017年9月05日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="competitioninfo"
  ref="kalixBizDialog" v-bind:form-model="formModel" v-bind:targetURL="targetURL"
  v-bind:isView="readonly")
    div.el-form(slot="dialogFormSlot")
      div.s-flex
        el-form-item.s-flex_item(label="展赛名称" prop="name" label-width="140px")
          el-input(v-model="formModel.name" v-bind:readonly="readonly")
        div.dd
        el-form-item.s-flex_item(label="展赛地址" prop="address" label-width="140px")
          el-input(v-model="formModel.address" v-bind:readonly="readonly" )
      div.s-flex
        el-form-item.s-flex_item(label="展赛类别" prop="type" label-width="140px")
          el-input(v-model="formModel.type" v-bind:readonly="readonly" )
        div.dd
        el-form-item.s-flex_item(label="联系人" prop="contactor" label-width="140px")
          el-input(v-model="formModel.contactor" v-bind:readonly="readonly")
      div.s-flex
        el-form-item.s-flex_item(label="联系人电话" prop="phone" label-width="140px")
          el-input(v-model="formModel.phone" v-bind:readonly="readonly")
        div.dd
        el-form-item.s-flex_item(label="联系人邮箱" prop="email" label-width="140px")
          el-input(v-model="formModel.email" v-bind:readonly="readonly")
      div.s-flex
        el-form-item.s-flex_item(label="作品征集开始时间" prop="collectionStartTime" label-width="140px")
          el-input(v-model="formModel.collectionStartTime" v-bind:readonly="readonly")
        div.dd
        el-form-item.s-flex_item(label="作品征集结束时间" prop="collectionEndTime" label-width="140px")
          el-input(v-model="formModel.collectionEndTime" v-bind:readonly="readonly")
      div.s-flex
        el-form-item.s-flex_item(label="初评开始时间" prop="preEvalStartTime" label-width="140px")
          el-input(v-model="formModel.preEvalStartTime" v-bind:readonly="readonly")
        div.dd
        el-form-item.s-flex_item(label="初评结束时间" prop="preEvalEndTime" label-width="140px")
          el-input(v-model="formModel.preEvalEndTime" v-bind:readonly="readonly")
      div.s-flex
        el-form-item.s-flex_item(label="终评开始时间" prop="lastEvalStartTime" label-width="140px")
          el-input(v-model="formModel.lastEvalStartTime" v-bind:readonly="readonly")
        div.dd
        el-form-item.s-flex_item(label="终评结束时间" prop="lastEvalEndTime" label-width="140px")
          el-input(v-model="formModel.lastEvalEndTime" v-bind:readonly="readonly")
      div.s-flex
        el-form-item.s-flex_item(label="作品内容要求" prop="contentNeed" label-width="140px")
          el-input(type="textarea" v-model="formModel.contentNeed" v-bind:readonly="readonly")
        el-form-item.s-flex_item(label="作品技术要求" prop="technologyNeed" label-width="140px")
          el-input(type="textarea" v-model="formModel.technologyNeed" v-bind:readonly="readonly")
</template>
<script type="text/ecmascript-6">
  import Dialog from '@/components/custom/baseDialog.vue'
  import {CompetitionInfoURL} from '../config.toml'

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
        rules: {
          name: [{required: true, message: '请输入 name', trigger: 'blur'}]
        },
        targetURL: CompetitionInfoURL,
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
