<!--
描述：人员管理-科研人员信息维护-新增组件
开发人：hqj
开发日期：2017年8月22日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="worker"
  ref="kalixBizDialog" v-bind:form-model="formModel" v-bind:targetURL="targetURL"
  )
    div.el-form(slot="dialogFormSlot")
      div.s-flex
        el-form-item.s-flex_item(label="姓名" prop="name" v-bind:rules="rules.name" label-width="200px")
          kalix-user-select(v-bind:params="params" style="width:100%" v-model="formModel.name" v-bind:multiple="false"
          v-on:userSelected="onUserSelected")
        el-form-item.s-flex_item(label="身份证号" prop="identificationCard" v-bind:rules="rules.identificationCard" label-width="200px")
          el-input(v-model="formModel.identificationCard")

      div.s-flex
        el-form-item.s-flex_item(label="性别" prop="sex" v-bind:rules="rules.sex" label-width="200px")
         el-radio-group(v-model="formModel.sex")
          el-radio(label="男")
          el-radio(label="女")
        el-form-item.s-flex_item(label="籍贯" prop="placeOfOrigin" label-width="200px")
         el-input(v-model="formModel.placeOfOrigin")
      div.s-flex
        el-form-item.s-flex_item(label="民族" prop="nation" label-width="200px")
         el-input(v-model="formModel.nation")
        el-form-item.s-flex_item(label="电子邮件" prop="email" label-width="200px")
         el-input(v-model="formModel.email")
      div.s-flex
        el-form-item.s-flex_item(label="年龄" prop="age" label-width="200px")
         el-input(v-model="formModel.age")
        el-form-item.s-flex_item(label="联系电话" prop="phone" label-width="200px")
         el-input(v-model="formModel.phone")
      div.s-flex
        el-form-item.s-flex_item(label="最初职称" prop="firstTitle" label-width="200px")
         el-input(v-model="formModel.firstTitle")
        el-form-item.s-flex_item(label="最初职称评定时间" prop="firstEvaluateDate" label-width="200px")
         el-input(v-model="formModel.firstEvaluateDate")
      div.s-flex
        el-form-item.s-flex_item(label="最后职称" prop="lastTitle" label-width="200px")
         el-input(v-model="formModel.lastTitle")
        el-form-item.s-flex_item(label="最后职称评定时间" prop="lastEvaluateDate" label-width="200px")
         el-input(v-model="formModel.lastEvaluateDate")
      div.s-flex
        el-form-item.s-flex_item(label="最后学历" prop="education" label-width="200px")
         el-input(v-model="formModel.education")
        el-form-item.s-flex_item(label="最后学位" prop="degree" label-width="200px")
         el-input(v-model="formModel.degree")
      div.s-flex
        el-form-item.s-flex_item(label="毕业院校" prop="school" label-width="200px")
         el-input(v-model="formModel.school")
        el-form-item.s-flex_item(label="研究方向" prop="direction" label-width="200px")
         el-input(v-model="formModel.direction")
      div.s-flex
        el-form-item.s-flex_item(label="个人简历" prop="resume" label-width="200px")
         el-input(type="textarea" v-model="formModel.resume")
        el-form-item.s-flex_item(label="个人说明" prop="introduction" label-width="200px")
         el-input(type="textarea" v-model="formModel.introduction")
</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/custom/baseDialog.vue'
  import {WorkerURL} from '../config.toml'
  import UserSelect from '@/components/biz/userselect/userselect'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  import EventBus from 'common/eventbus'
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
        params: {userType: 2},
        rules: {
          name: [{required: true, message: '请输入 name', trigger: 'blur'}],
          sex: [{required: true, message: '请输入 sex', trigger: 'blur'}]
        },
        targetURL: WorkerURL
      }
    },
    created() {
      console.log('this.formRules.name:', this.formRules.name)
      console.log('[workerAdd.vue created] this.formModel:', this.formModel)
    },
    components: {
      KalixDialog: Dialog,
      KalixDictSelect: BaseDictSelect,
      KalixUserSelect: UserSelect
    },
    methods: {
      onUserSelected(user) {
        EventBus.$emit('updateWorkerModel', user)
      }
    }
  }
</script>


