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
        el-form-item.s-flex_item(label="展赛名称" prop="cname" label-width="200px")
          el-input(v-model="formModel.cname" v-bind:readonly="readonly")
        el-form-item.s-flex_item(label="展赛地址" prop="caddress" label-width="200px")
          el-input(v-model="formModel.caddress" v-bind:readonly="readonly" )
      div.s-flex
        el-form-item.s-flex_item(label="展赛类别" prop="ctype" label-width="200px")
          el-input(v-model="formModel.ctype" v-bind:readonly="readonly" )
        el-form-item.s-flex_item(label="联系人" prop="contactor" label-width="200px")
          el-input(v-model="formModel.contactor" v-bind:readonly="readonly")
      div.s-flex
        el-form-item.s-flex_item(label="联系人电话" prop="phone" label-width="200px")
          el-input(v-model="formModel.phone" v-bind:readonly="readonly")
        el-form-item.s-flex_item(label="联系人邮箱" prop="email" label-width="200px")
          el-input(v-model="formModel.email" v-bind:readonly="readonly")
      div.s-flex
        el-form-item.s-flex_item(label="作品内容要求" prop="contentneed" label-width="200px")
          el-input(type="textarea" v-model="formModel.contentneed" v-bind:readonly="readonly")
        el-form-item.s-flex_item(label="作品技术要求" prop="technologyneed" label-width="200px")
          el-input(type="textarea" v-model="formModel.technologyneed" v-bind:readonly="readonly")
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
          cname: [{required: true, message: '请输入 name', trigger: 'blur'}]
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
