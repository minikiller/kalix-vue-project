<!--
描述：通讯录-组添加
开发人：yangz
开发日期：2018年03月6日
-->
<template lang="pug">
  kalix-dialog.user-add(title='添加' bizKey="addressGroup" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      input(v-model="formModel.userId" type="hidden")
      el-form-item(label="分组名" prop="groupName" v-bind:label-width="labelWidth" v-bind:rules="rules.groupName")
        el-input(v-model="formModel.groupName")
      el-form-item(label="分组描述" prop="describe" v-bind:label-width="labelWidth")
        el-input(type="textarea" v-model="formModel.describe" v-bind:rows="3")
</template>

<script type="text/ecmascript-6">
  import FormModel from './groupModel'
  import Dialog from '@/components/custom/baseDialog.vue'
  import {AddressGroupURL} from '../config.toml'

  export default {
    data() {
      var validateExistGroup = (rule, value, callback) => {
        if (value === undefined) {
          callback(new Error('请输入分组名'))
        }
        let valTrim = value.replace(/^\s+|\s+$/g, '')
        if (valTrim === '') {
          callback(new Error('请输入分组名'))
        } else {
          let isExist = false
          if (this.groupNames.length) {
            for (let i = 0; i < this.groupNames.length; i++) {
              if (valTrim === this.groupNames[i]) {
                isExist = true
                break
              }
            }
            if (isExist === true) {
              callback(new Error('分组已存在，请输入其他分组名'))
            } else {
              callback()
            }
          }
        }
      }
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '140px',
        rules: {
          groupName: [{required: true, validator: validateExistGroup, trigger: 'blur'}]
        },
        targetURL: AddressGroupURL,
        groupNames: []
      }
    },
    components: {
      KalixDialog: Dialog
    },
    methods: {
      init(dialogOption) {
        this.formModel.userId = dialogOption.userId
        this.groupNames = dialogOption.groupNames
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
</style>
