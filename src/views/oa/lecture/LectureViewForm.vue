<!--
描述：办公自动化-试讲管理-查看组件
开发人：hqj
开发日期：2017年11月2日
-->

<template lang="pug">
  div.el-form
    div.s-flex
      div.s-flex_item
        el-form-item(label="应聘者姓名" prop="xm" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.xm" readonly)
        el-form-item(label="试讲题目" prop="subject" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.subject" readonly)
      el-form-item.s-flex_item(label="问题及回答" prop="qa" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.qa" type="textarea" v-bind:rows=4 readonly)
    div.s-flex
      div.s-flex_item
        el-form-item(label="授课内容" prop="content" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.content" readonly)
        el-form-item(label="教学论点分数" prop="argumentScore" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.argumentScore" readonly)
      el-form-item.s-flex_item(label="评语" prop="comment" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.comment" type="textarea" v-bind:rows=4 readonly)
    div.s-flex
      div.s-flex_item
        el-form-item(label="板书或课件分数" prop="coursewareScore" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.coursewareScore" readonly)
        el-form-item(label="语言表达分数" prop="expressionScore" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.expressionScore" readonly)
      el-form-item.s-flex_item(label="聘用意见" prop="suggestion" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.suggestion" type="textarea" v-bind:rows=4 readonly)
    div.s-flex
      el-form-item.s-flex_item(label="教态分数" prop="attitudeScore" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.attitudeScore" readonly)
      el-form-item.s-flex_item(label="听课人" prop="participant" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.participant" readonly)
    div.s-flex
      el-form-item.s-flex_item(label="教学效果分数" prop="effectScore" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.effectScore" readonly)
      el-form-item.s-flex_item(label="试讲结果" prop="pass" v-bind:label-width="labelWidth")
        // el-checkbox(v-model="formModel.pass" disabled) 是否通过
        el-switch.s-flex_item(v-model="formModel.pass" active-text="通过" inactive-text="不通过" disabled)
</template>

<script type="text/ecmascript-6">
  import {LectureURL} from '../config.toml'
  import Vue from 'vue'

  export default {
    props: {
      formModel: {},
      isRequest: {
        type: Boolean,
        default: false
      },
      bizId: null
    },
    data() {
      return {
        labelWidth: '110px'
      }
    },
    components: {},
    mounted() {
      if (this.isRequest) {
        this.getBizData()
      }
    },
    methods: {
      // 获取业务数据
      getBizData() {
        if (this.bizId) {
          // let bizDataUrl = LectureURL + '/' + this.bizId
          let bizDataUrl = LectureURL
          let params = {
            params: {
              'jsonStr': {'candidateId': this.bizId},
              'page': 1,
              'limit': 10
            }
          }
          Vue.axios.get(bizDataUrl, params).then((response) => {
            if (response.data.success === undefined) {
              if (response.data.totalCount > 0) {
                this.$emit('update:formModel', response.data.data[0]) // 设置sync才有效
              }
            }
          })
        }
      }
    }
  }
</script>
