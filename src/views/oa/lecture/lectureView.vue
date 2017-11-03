<!--
描述：办公自动化-试讲管理-查看组件
开发人：hqj
开发日期：2017年11月2日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="lecture" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      div.s-flex
        div.s-flex_item
          el-form-item(label="应聘者姓名" prop="xm" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.xm" readonly)
          el-form-item(label="试讲题目" prop="subject" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.subject" readonly)
        el-form-item.s-flex_item(label="问题及回答" prop="qa" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.qa" type="textarea" rows="4" readonly)
      div.s-flex
        div.s-flex_item
          el-form-item(label="授课内容" prop="content" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.content" readonly)
          el-form-item(label="教学论点分数" prop="argumentScore" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.argumentScore" readonly)
        el-form-item.s-flex_item(label="评语" prop="comment" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.comment" type="textarea" rows="4" readonly)
      div.s-flex
        div.s-flex_item
          el-form-item(label="板书或课件分数" prop="coursewareScore" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.coursewareScore" readonly)
          el-form-item(label="语言表达分数" prop="expressionScore" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.expressionScore" readonly)
        el-form-item.s-flex_item(label="聘用意见" prop="suggestion" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.suggestion" type="textarea" rows="4" readonly)
      div.s-flex
        el-form-item.s-flex_item(label="教态分数" prop="attitudeScore" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.attitudeScore" readonly)
        el-form-item.s-flex_item(label="听课人" prop="participant" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.participant" readonly)
      div.s-flex
        el-form-item.s-flex_item(label="教学效果分数" prop="effectScore" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.effectScore" readonly)
        el-form-item.s-flex_item(label="试讲结果" prop="pass" v-bind:label-width="labelWidth")
          el-checkbox(v-model="formModel.pass" disabled) 是否通过
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '110px'
      }
    },
    components: {
      KalixDialog: Dialog
    }
  }
</script>
