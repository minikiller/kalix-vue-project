<!--
描述：艺术中心-公司招聘-新增组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="recruit"
  ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL"
  )
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="标题" prop="title" v-bind:rules="rules.title")
        el-input(v-model="formModel.title")
      el-form-item(label="内容" prop="content" v-bind:rules="rules.content")
        el-input(v-model="formModel.content" type="area")
      el-form-item(label="发布日期")
        kalix-date-picker(v-model="formModel.publishDate")
        <!--el-date-picker(v-model="formModel.publishDate" type="date")-->
</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/custom/baseDialog.vue'
  import {RecruitURL} from '../config.toml'
  import {formatDate} from 'common/typeFormat'
  import {FormModel} from './model.toml'
  import DatePicker from '@/components/biz/date/datepicker.vue'

  export default {
//    props: {
//      formModel: {
//        type: Object,
//        required: true
//      }
//    },
    mounted() {
    },
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        rules: {
          title: [{required: true, message: '请输入标题', trigger: 'blur'}],
          content: [{required: true, message: '请输入内容', trigger: 'blur'}]
        },
        targetURL: RecruitURL
      }
    },
    watch: {
//      formModel: {
//        handler: function (val, oldVal) {
//          if (val.publishDate) {
//            this.formModel.publishDate = this.GMTToStr(val.publishDate)
//            console.log('form model', this.formModel.publishDate)
//          }
//        },
//        deep: true
//      }
    },
    components: {
      KalixDialog: Dialog,
      KalixDatePicker: DatePicker
    },
    methods: {
      GMTToStr(time) {
        let date = new Date(time)
        let Str = date.getFullYear() + '-' +
          (date.getMonth() + 1) + '-' +
          date.getDate() + ' ' +
          date.getHours() + ':' +
          date.getMinutes() + ':' +
          date.getSeconds()
        return Str
      },
      onPublishDate(value) {
        if (value) {
          this.formModel.publishDate = formatDate(new Date(value), 'yyyy-MM-dd hh:mm:ss')
        }
      }
    }
  }
</script>

