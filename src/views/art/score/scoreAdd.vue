<!--
描述：艺术中心-系统管理-学生信息-学生成绩-新增组件
开发人：hqj
开发日期：2017年12月20日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="artScore" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form.kalix-form-table(slot="dialogFormSlot")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="学号" prop="code" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.code" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="姓名" prop="name" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.name" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="专业课程" prop="majorCourseId" v-bind:rules="rules.majorCourseId" v-bind:label-width="labelWidth")
          kalix-major-course-select2(v-model="formModel.majorCourseId" v-bind:objectsUrl="majorCourseURL" v-bind:jsonStr="majorCourseJsonStr")
        el-form-item.s-flex_item.kalix-form-table-td(label="成绩" prop="score" v-bind:rules="rules.score" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.score")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {MajorCourseURL} from '../config.toml'
  import Dialog from '@/components/custom/baseDialog.vue'
  import MajorCourseSelect2 from '@/components/custom/baseObjectSelect2'
  import Vue from 'vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        rules: {
          majorCourseId: [{required: true, type: 'number', message: '请选择专业课程', trigger: 'change'}],
          score: [{required: true, message: '请输入成绩', trigger: 'blur'}]
        },
        targetURL: '',
        majorCourseURL: MajorCourseURL,
        majorCourseJsonStr: '',
        labelWidth: '110px'
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixMajorCourseSelect2: MajorCourseSelect2
    },
    watch: {
      formModel: {
        handler: 'watchFormModel'
      }
    },
    methods: {
      getMajorCourses() {
        let majorId = this.formModel.majorId
        if (majorId) {
          let params = {
            params: {
              'jsonStr': null,
              'page': 1,
              'limit': 50,
              'sort': null
            }
          }
          let url = '/camel/rest/orgs/' + majorId + '/majorcourses'
          Vue.axios.get(url, params).then((response) => {
            if (response.data.data && response.data.data.length > 0) {
              let rec = response.data.data[0]
              /* this.$nextTick(() => {
               this.formModel = Object.assign({}, rec)
               }) */
              // this.$set(this.formModel, 'majorId', rec.majorId)
              this.formModel.name = rec.name
            }
          })
        } else {
          alert('请输入学号')
        }
      },
      watchFormModel(newValue) {
        if (newValue.targetURL) {
          this.targetURL = newValue.targetURL
        }
        if (newValue.majorId) {
          this.majorCourseJsonStr = JSON.stringify({'orgid': newValue.majorId})
        }
      }
    }
  }
</script>
