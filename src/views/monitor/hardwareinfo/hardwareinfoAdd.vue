<!--
描述：人员管理-学生维护-新增组件
开发人：fj
开发日期：2017年8月22日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="hardwareinfo" ref="kalixBizDialog" v-bind:form-model.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      div.s-flex
        el-form-item.s-flex_item(label="MAC地址" prop="mac" label-width="120px")
          el-input(v-model="formModel.mac")
        el-form-item.s-flex_item(label="IP地址" prop="ip" label-width="120px")
          el-input(v-model="formModel.ip")
      div.s-flex
        el-form-item.s-flex_item(label="cpu" prop="cpu" label-width="120px")
          el-input(v-model="formModel.cpu")
        el-form-item.s-flex_item(label="内存" prop="memory" label-width="120px")
          el-input(v-model="formModel.memory")
      div.s-flex
        el-form-item.s-flex_item(label="计算机描述" prop="computer" label-width="120px")
          el-input(v-model="formModel.computer")
      div.s-flex
        el-form-item.s-flex_item(label="网络适配器" prop="networkAdapter" label-width="120px")
          el-input(v-model="formModel.networkAdapter")
        el-form-item.s-flex_item(label="显卡" prop="videoCard" label-width="120px")
          el-input(v-model="formModel.videoCard")
      div.s-flex
        el-form-item.s-flex_item(label="主板信息" prop="bois" label-width="120px")
          el-input(v-model="formModel.bios")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {HardwareInfoURL} from '../config.toml'
  import Dialog from '@/components/custom/baseDialog.vue'
//  import UserSelect from '@/components/biz/userselect/userselect'
//  import BaseDictSelect from '@/components/custom/baseDictSelect'
//  import DatePicker from '@/components/biz/date/datepicker.vue'

  export default {
    data() {
      return {
        user: null,
        formModel: Object.assign({}, FormModel),
        rules: {
        //  userId: [{type: 'number', required: true, message: '请输入学生姓名', trigger: 'change'}]
        },
        targetURL: HardwareInfoURL,
        params: {userType: 1}
      }
    },
    components: {
      KalixDialog: Dialog
     // KalixUserSelect: UserSelect,
     // KalixDictSelect: BaseDictSelect,
     // KalixDatePicker: DatePicker
    },
    created() {
      console.log('[teacherAdd.vue created] this.formModel:', this.formModel)
    },
    methods: {
//      onUserSelected(user) {
//        this.formModel.sex = user.sex
//        this.formModel.homePhone = (user.mobile == null ? user.phone : user.mobile)
//      }
    }
  }
</script>
<style scoped lang="stylus">
  .el-form
    padding 30px 70px 30px 20px
</style>
