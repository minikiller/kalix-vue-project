<!--
描述：通讯录编辑
开发人：yangz
开发日期：2018年03月9日
-->
<template lang="pug">
  kalix-dialog.user-add(title='查看' bizKey="address" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      input(v-model="formModel.userId" type="hidden")
      input(v-model="formModel.addressUserId" type="hidden")
      el-form-item(label="姓名" prop="name" v-bind:label-width="labelWidth" )
        el-input(v-model="formModel.name" readonly)
      el-form-item(label="性别" prop="sex" v-bind:label-width="labelWidth")
        el-radio-group(v-model="formModel.sex")
          el-radio(label="男" disabled)
          el-radio(label="女" disabled )
      el-form-item(label="昵称" prop="nickName" v-bind:label-width="labelWidth" )
        el-input(v-model="formModel.nickName" readonly)
      el-form-item(label="电话" prop="phone" v-bind:label-width="labelWidth" v-bind:rules="rules.phone")
        el-input(v-model="formModel.phone" readonly)
      el-form-item(label="邮箱" prop="email" v-bind:label-width="labelWidth" v-bind:rules="rules.email")
        el-input(v-model="formModel.email" readonly)
      el-form-item(label="QQ" prop="qqNum" v-bind:label-width="labelWidth" v-bind:rules="rules.qqNum")
        el-input(v-model="formModel.qqNum" readonly)
      el-form-item(label="通讯地址" prop="address" v-bind:label-width="labelWidth" )
        el-input(v-model="formModel.address" readonly)
      el-form-item(label="所在组" prop="groupId" v-bind:label-width="labelWidth" v-bind:rules="rules.groupId")
        kalix-select(v-model="formModel.groupId" v-bind:requestUrl="groupURL"
        appName="addressGroup" label="groupName" placeholder="请选择分组"
        v-bind:paramObj="groupParam" v-bind:disabled="true")
      el-form-item(label="头像" prop="icon" v-bind:label-width="labelWidth")
        kalix-upload(v-model="formModel.icon" v-bind:isImage="true" style="width:100%" readonly)
      el-form-item(label="备注" prop="remark" v-bind:label-width="labelWidth")
        el-input(type="textarea" v-model="formModel.remark" v-bind:rows="3" readonly)
</template>

<script type="text/ecmascript-6">
  import FormModel from './addressModel'
  import Dialog from '@/components/custom/baseDialog.vue'
  import BaseUpload from '@/components/custom/baseUpload'
  import BaseSelect from '@/components/custom/baseSelect'
  // import UserSelect from '@/components/biz/userselect/userselect'
  import {AddressGroupURL} from '../config.toml'

  export default {
    data() {
      var validatePhone = (rule, value, callback) => {
        if (value !== undefined && value !== null && value !== '') {
          let valTrim = value.replace(/^\s+|\s+$/g, '')
          let mobile = /^1[3|5|8]\d{9}$/
          let phone = /^0\d{2,3}-?\d{7,8}$/
          if (mobile.test(valTrim) || phone.test(valTrim)) {
            callback()
          } else {
            callback(new Error('请输入正确的电话号，入是座机请输入"区号-座机号"'))
          }
        } else {
          callback()
        }
      }
      var validateEmail = (rule, value, callback) => {
        if (value !== undefined && value !== null && value !== '') {
          let valTrim = value.replace(/^\s+|\s+$/g, '')
          let email = /^(?:\w+\.?)*\w+@(?:\w+\.)*\w+$/
          if (email.test(valTrim)) {
            callback()
          } else {
            callback(new Error('请输入正确的邮箱'))
          }
        } else {
          callback()
        }
      }
      var validateQQ = (rule, value, callback) => {
        if (value !== undefined && value !== null && value !== '') {
          let valTrim = value.replace(/^\s+|\s+$/g, '')
          let qq = /^[1-9][0-9]{4,10}$/
          if (qq.test(valTrim)) {
            callback()
          } else {
            callback(new Error('请输入正确的QQ'))
          }
        } else {
          callback()
        }
      }
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '140px',
        rules: {
          groupId: [{required: true, message: '请选择组', trigger: 'blur'}],
          phone: [{required: false, validator: validatePhone, trigger: 'blur'}],
          email: [{required: false, validator: validateEmail, trigger: 'blur'}],
          qqNum: [{required: false, validator: validateQQ, trigger: 'blur'}]
        },
        groupURL: AddressGroupURL + '/all',
        groupParam: undefined,
        userParams: {},
        addressUsers: []
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixUpload: BaseUpload,
      KalixSelect: BaseSelect
      // KalixUserSelect: UserSelect
    },
    methods: {
      init(dialogOption) {
        this.formModel.userId = dialogOption.userId
        this.groupParam = {
          jsonStr: `{'userId': ` + this.formModel.userId + `}`
        }
        // this.addressUsers = dialogOption.addressUsers
        // console.log('this.addressUsers================', this.addressUsers)
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
</style>
