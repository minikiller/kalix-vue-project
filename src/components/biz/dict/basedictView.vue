<!--
描述：我的首页-数据字典-查看组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="dict"
  ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:isView="readonly"
  )
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="类型" prop="type")
        el-input(v-model="formModel.type" v-bind:readonly="readonly" auto-complete="off")
      el-form-item(label="标签名" prop="label")
        input(type="hidden" v-model="formModel.id")
        el-input(v-model="formModel.label"  v-bind:readonly="readonly" placeholder="请输入标签名" auto-complete="off")
      el-form-item(label="备注")
        el-input(v-model="formModel.description" v-bind:readonly="readonly" type="textarea" v-bind:rows="3" placeholder="请输入内容")
</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/custom/baseDialog.vue'
  import {FormModel} from './model.toml'
//  import {CommonDictURL} from '../config.toml'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        readonly: true
      }
    },
    components: {
      KalixDialog: Dialog
    },
    methods: {
    }
  }
</script>

