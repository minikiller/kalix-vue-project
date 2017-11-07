<!--
描述：办公自动化-面试管理-查看组件
开发人：hqj
开发日期：2017年11月2日
-->

<template lang="pug">
  div.el-form
    el-form-item.s-flex_item(label="应聘者姓名" prop="xm" v-bind:label-width="labelWidth")
      el-input(v-model="formModel.xm" readonly)
    div.s-flex
      el-form-item.s-flex_item(label="初试时间" prop="dateFirst" v-bind:label-width="labelWidth")
        kalix-date-picker(v-model="formModel.dateFirst" style="width:100%" readonly)
      el-form-item.s-flex_item(label="复试时间" prop="dateSecond" v-bind:label-width="labelWidth")
        kalix-date-picker(v-model="formModel.dateSecond" style="width:100%" readonly)
    div.s-flex
      el-form-item.s-flex_item(label="初试面试官" prop="interviewerFirst" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.interviewerFirst" readonly)
      el-form-item.s-flex_item(label="复试面试官" prop="interviewerSecond" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.interviewerSecond" readonly)
    div.s-flex
      el-form-item.s-flex_item(label="初试面试内容" prop="interviewContentFirst" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.interviewContentFirst" readonly)
      el-form-item.s-flex_item(label="复试面试内容" prop="interviewContentSecond" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.interviewContentSecond" readonly)
    div.s-flex
      el-form-item.s-flex_item(label="初试面试结果" prop="passFirst" v-bind:label-width="labelWidth")
        // el-checkbox(v-model="formModel.passFirst" disabled) 初试是否通过
        el-switch.s-flex_item(v-model="formModel.passFirst" active-text="通过" inactive-text="不通过" disabled)
      el-form-item.s-flex_item(label="复试面试结果" prop="passSecond" v-bind:label-width="labelWidth")
        // el-checkbox(v-model="formModel.passSecond" disabled) 复试是否通过
        el-switch.s-flex_item(v-model="formModel.passSecond" active-text="通过" inactive-text="不通过" disabled)
</template>

<script type="text/ecmascript-6">
  import DatePicker from '@/components/biz/date/datepicker.vue'
  import {InterviewURL} from '../config.toml'
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
    components: {
      KalixDatePicker: DatePicker
    },
    mounted() {
      if (this.isRequest) {
        this.getBizData()
      }
    },
    watch: {
      bizId(newVal) {
        if (this.isRequest) {
          this.getBizData()
        }
      }
    },
    methods: {
      // 获取业务数据
      getBizData() {
        if (this.bizId) {
          // let bizDataUrl = InterviewURL + '/' + this.bizId
          let bizDataUrl = InterviewURL
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
