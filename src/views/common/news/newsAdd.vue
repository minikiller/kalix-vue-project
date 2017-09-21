<!--
描述：我的首页-公司新闻-新增组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="news"
  ref="kalixBizDialog" v-bind:form-model="formModel" v-bind:targetURL="targetURL"
  )
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="标题" prop="title" v-bind:rules="rules.title")
        el-input(v-model="formModel.title")
      el-form-item(label="内容" prop="content" v-bind:rules="rules.content")
        el-input(v-model="formModel.content" type="area")
      el-form-item(label="发布日期")
        el-date-picker(v-model="formModel.publishDate" type="date" v-on:change="onPublishDate")
</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/custom/baseDialog.vue'
  import {NewsURL} from '../config.toml'
  import {formatDate} from 'common/typeFormat'

  export default {
//    props: {
//      formModel: {
//        type: Object,
//        required: true
//      }
//    },
    mounted() {
      console.log('this formmodel is ', this.formModel)
    },
    data() {
      return {
        formModel: {
          title: '',
          content: '',
          publishPeople: '',
          publishDate: ''
        },
        rules: {
          title: [{required: true, message: '请输入标题', trigger: 'blur'}],
          content: [{required: true, message: '请输入内容', trigger: 'blur'}]
        },
        targetURL: NewsURL
      }
    },
    components: {
      KalixDialog: Dialog
    },
    methods: {
      onPublishDate(value) {
        if (value) {
          this.formModel.publishDate = formatDate(new Date(value), 'yyyy-MM-dd hh:mm:ss')
        }
      }
    }
  }
</script>

