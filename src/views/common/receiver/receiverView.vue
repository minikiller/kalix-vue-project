<!--
描述：我的首页-收件箱组件-查看组件
开发人：桑杨
开发日期：2017年8月30日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="receiver"
    ref="kalixBizDialog" v-bind:formModel.sync="formModel"
    size="tiny" v-bind:title="title"
    v-bind:isView="readonly")
    <!--v-bind:targetURL="targetURL"-->
    div.el-form(slot="dialogFormSlot" style="padding-right: 40px;")
      el-form-item(label="标题")
        el-input(v-model="formModel.title" v-bind:readonly="readonly")
      el-form-item(label="内容")
        el-input(v-model="formModel.content"
        type="textarea" v-bind:readonly="readonly"
        v-bind:autosize="{ minRows: 4, maxRows: 8}")
      el-form-item.s-flex_item(label="发布人")
        el-input(v-model="formModel.senderName" v-bind:readonly="readonly")
      el-form-item.s-flex_item(label="发布时间" )
        el-input(v-model="formModel.creationDate" v-bind:readonly="readonly")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'
  // import {NoteURL} from '../config.toml'

  export default {
    props: {
      // formModel: {
      //   type: Object,
      //   required: true
      // },
      formRules: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        title: '查看',
        // targetURL: NoteURL,
        readonly: true,
        formModel: Object.assign({}, FormModel)
      }
    },
    created() {
    },
    components: {
      KalixDialog: Dialog
    },
    methods: {},
    mounted() {
      console.log('this.formModel============', this.formModel)
    }
  }
</script>
