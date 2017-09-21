<!--
描述：我的首页-公司新闻-查看组件
开发人：sunlf
开发日期：2017年8月17日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="news"
  ref="kalixBizDialog" v-bind:formModel="formModel"
  isView)
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="标题" prop="title")
        el-input(v-model="formModel.title" readonly)
      el-form-item(label="内容" prop="content")
        el-input(v-model="formModel.content" type="area" readonly)
      el-form-item(label="发布人" prop="publishPeople")
        el-input(v-model="formModel.publishPeople" readonly)
      el-form-item(label="发布时间" prop="publishDate" )
        el-input(v-model="formModel.publishDate" readonly)
</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/custom/baseDialog.vue'

  export default {
    data() {
      return {
        formModel: {
          title: '',
          content: '',
          publishPeople: '',
          publishDate: ''
        }
      }
    },
    components: {
      KalixDialog: Dialog
    },
    methods: {
    }
  }
</script>

