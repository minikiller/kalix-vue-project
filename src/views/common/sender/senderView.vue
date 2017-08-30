<!--
描述：我的首页-发件箱组件-查看组件
开发人：桑杨
开发日期：2017年8月29日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="note"
  ref="kalixBizDialog" v-bind:form-model="formModel" v-bind:targetURL="targetURL" v-bind:isView="readonly")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="标题" prop="title" v-bind:rules="rules.title")
        el-input(v-model="formModel.title" v-bind:readonly="readonly")
      el-form-item(label="内容" prop="content" v-bind:rules="rules.content")
        el-input(v-model="formModel.content" type="area" v-bind:readonly="readonly")
      el-form-item(label="发布人" prop="publishPeople" v-bind:rules="rules.publishPeople")
        el-input(v-model="formModel.publishPeople" v-bind:readonly="readonly")
      el-form-item(label="发布时间" prop="publishDate" v-bind:rules="rules.publishDate")
        el-input(v-model="formModel.publishDate" v-bind:readonly="readonly")
</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/custom/baseDialog.vue'
  import {NoteURL} from '../config.toml'

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
          title: [{required: true, message: '请输入标题', trigger: 'blur'}],
          content: [{required: true, message: '请输入内容', trigger: 'blur'}]
        },
        targetURL: NoteURL,
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
