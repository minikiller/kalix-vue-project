<template lang="pug">
  kalix-table-panel(title="修改个人信息"
  v-bind:formModel="formModel"
  v-bind:targetURL="targetURL"
  v-bind:isEdit="true")
    div.update-info(slot="panelSlot")
      el-form-item(label="用户类型" prop="userType" v-bind:rules="rules.userType" v-bind:label-width="labelWidth")
        kalix-dict-select(v-model="formModel.userType" appName="admin" dictType="用户类型" v-on:input="change($event)" style="width:100%")
      el-form-item(v-if="showIcon" label="头像" prop="icon" v-bind:label-width="labelWidth")
        kalix-upload(v-model="formModel.icon" v-bind:isImage="true" style="width:100%")
      el-form-item(label="登录名" prop="loginName" v-bind:rules="rules.loginName" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.loginName")
      template(v-if="formModel.userType === 0 || formModel.userType === 2")
        el-form-item(label="工号" prop="code" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.code")
        el-form-item(label="岗位" prop="position" v-bind:label-width="labelWidth")
          kalix-dict-select(v-model="formModel.position" appName="admin" dictType="岗位名称" style="width:100%")
        el-form-item(label="姓名" prop="name" v-bind:rules="rules.name" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.name")
        el-form-item(label="性别" prop="sex" v-bind:label-width="labelWidth")
          el-radio-group(v-model="formModel.sex")
            el-radio(label="男")
            el-radio(label="女")
        el-form-item(label="邮箱" prop="email" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.email")
        el-form-item(label="固定电话" prop="phone" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.phone")
        el-form-item(label="手机" prop="mobile" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.mobile")
      template(v-else-if="formModel.userType === 1")
        el-form-item(label="学号" prop="code" v-bind:rules="rules.code_xh" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.code")
        el-form-item(label="姓名" prop="name" v-bind:rules="rules.name" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.name")
        el-form-item(label="性别" prop="sex" v-bind:label-width="labelWidth")
          el-radio-group(v-model="formModel.sex")
            el-radio(label="男")
            el-radio(label="女")
        el-form-item(label="邮箱" prop="email" v-bind:rules="rules.email" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.email")
        el-form-item(label="固定电话" prop="phone" v-bind:rules="rules.phone" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.phone")
        el-form-item(label="手机" prop="mobile" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.mobile")
      template(v-else-if="formModel.userType === 3")
        el-form-item(label="企业组织机构代码" prop="code" v-bind:rules="rules.code_qy" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.code")
        el-form-item(label="公司名称" prop="name" v-bind:rules="rules.name" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.name")
        el-form-item(label="邮箱" prop="email" v-bind:rules="rules.email" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.email")
        el-form-item(label="固定电话" prop="phone" v-bind:rules="rules.phone" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.phone")
        el-form-item(label="手机" prop="mobile" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.mobile")
</template>
<script type="text/ecmascript-6">
  import FormModel from '../user/model'
  import {usersURL} from '../config.toml'
  import {userURL} from 'config/global.toml'
  import Cache from 'common/cache'
  import {getDict} from '../../../api/dict'
  import KalixTablePanel from '@/components/panel/tablePanel.vue'
  import KalixUpload from '@/components/custom/baseUpload'
  import KalixDictSelect from '@/components/custom/baseDictSelect'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        targetURL: usersURL,
        rules: {
          userType: [{type: 'number', required: true, message: '请选择用户类别', trigger: 'change'}],
          code_xh: [{required: true, message: '请输入学生学号', trigger: 'blur'}],
          code_qy: [{required: true, message: '请输入企业组织机构代码', trigger: 'blur'}],
          name: [{required: true, message: '请输入名称', trigger: 'blur'}],
          loginName: [{required: true, message: '请输入登录名', trigger: 'blur'}],
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
          ],
          phone: [{required: true, message: '请输入固定电话', trigger: 'blur'}]
        },
        labelWidth: '140px',
        showIcon: false
      }
    },
    created() {
      // this.dictUserType = getDict('admin', '用户类型')
      this.getDate()
    },
    methods: {
      getDate() {
        let _data = {
          jsonStr: '{"id":' + JSON.stringify(Cache.get('id')) + '}'
        }
        this.$http.request(userURL, {
          params: _data
        }).then(res => {
          console.log(res)
          this.showIcon = false
          if (res.data.data.length) {
            this.formModel = res.data.data[0]
            this.showIcon = true
            this.$myConsoleLog(' [UpdateInfo] this.formModel.icon ', this.formModel.icon, '#5CACEE')
          }
        })
      },
      change(event) {
      }
    },
    components: {
      KalixTablePanel,
      KalixUpload,
      KalixDictSelect
    },
    filters: {
      dictUserType(val) {
        let dict = getDict('admin', '用户类型')
        let item = dict.find(e => {
          return e.value === val
        })
        return item.label
      },
      dictPosition(val) {
        let dict = getDict('admin', '岗位名称')
        let item = dict.find(e => {
          return e.value === val
        })
        return item.label
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
