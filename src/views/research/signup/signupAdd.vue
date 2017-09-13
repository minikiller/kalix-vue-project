<!--
描述：报名信息-新增组件
开发人：fj
开发日期：2017年9月13日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="signup"
  ref="kalixBizDialog" v-bind:form-model="formModel" v-bind:targetURL="targetURL"
  )
    div.el-form(slot="dialogFormSlot")
      div.s-flex
        el-form-item.s-flex_item(label="展赛名称" prop="competitionId" v-bind:rules="rules.competitionId" label-width="140px" )
          kalix-user-select(v-bind:params="params" style="width:100%" v-model="formModel.name" v-bind:multiple="false"
          v-on:userSelected="onUserSelected")
      div.s-flex
        el-form-item.s-flex_item(label="姓名" prop="name" label-width="140px")
          el-input(v-model="formModel.name")
        div.dd
        el-form-item.s-flex_item(label="拼音" prop="phoneticize" label-width="140px")
          el-input(v-model="formModel.phoneticize")
      div.s-flex
        el-form-item.s-flex_item(label="笔名" prop="penName" label-width="140px")
          el-input(v-model="formModel.penName")
        div.dd
        el-form-item.s-flex_item(label="性别" prop="sex" label-width="140px")
          el-input(v-model="formModel.sex")
      div.s-flex
        el-form-item.s-flex_item(label="作者简介" prop="authorIntroduction" label-width="140px")
          el-input(v-model="formModel.authorIntroduction")
      div.s-flex
        el-form-item.s-flex_item(label="国籍" prop="nationality" label-width="140px")
          el-input(v-model="formModel.nationality")
        div.dd
        el-form-item.s-flex_item(label="年龄" prop="age" label-width="140px")
          el-input(v-model="formModel.age")
      div.s-flex
        el-form-item.s-flex_item(label="出生年月" prop="birthday" label-width="140px")
          el-input(v-model="formModel.birthday")
        div.dd
        el-form-item.s-flex_item(label="身份证号" prop="identificationCard" label-width="140px")
          el-input(v-model="formModel.identificationCard")
      div.s-flex
        el-form-item.s-flex_item(label="省" prop="province" label-width="140px")
          el-input(v-model="formModel.province")
        div.dd
        el-form-item.s-flex_item(label="城市" prop="city" label-width="140px")
          el-input(v-model="formModel.city")
      div.s-flex
        el-form-item.s-flex_item(label="通讯地址" prop="postalAddress" label-width="140px")
          el-input(v-model="formModel.postalAddress")
        div.dd
        el-form-item.s-flex_item(label="邮政编码" prop="postalCode" label-width="140px")
          el-input(v-model="formModel.postalCode")
      div.s-flex
        el-form-item.s-flex_item(label="移动电话" prop="mobilePhone" label-width="140px")
          el-input(v-model="formModel.mobilePhone")
        div.dd
        el-form-item.s-flex_item(label="固定电话" prop="fixedPhone" label-width="140px")
          el-input(v-model="formModel.fixedPhone")
      div.s-flex
        el-form-item.s-flex_item(label="电子邮箱" prop="email" label-width="140px")
          el-input(v-model="formModel.email")
        div.dd
        el-form-item.s-flex_item(label="QQ" prop="qq" label-width="140px")
          el-input(v-model="formModel.qq")
      div.s-flex
        el-form-item.s-flex_item(label="传真" prop="fax" label-width="140px")
          el-input(v-model="formModel.fax")
        div.dd
        el-form-item.s-flex_item(label="微博" prop="microBlog" label-width="140px")
          el-input(v-model="formModel.microBlog")
      div.s-flex
        el-form-item.s-flex_item(label="其他联系方式" prop="otherContactWay" label-width="140px")
          el-input(v-model="formModel.otherContactWay")
        div.dd
        el-form-item.s-flex_item(label="所在学校" prop="school" label-width="140px")
          el-input(v-model="formModel.school")
      div.s-flex
        el-form-item.s-flex_item(label="专业/班级" prop="majorclass" label-width="140px")
          el-input(v-model="formModel.majorclass")
        div.dd
        el-form-item.s-flex_item(label="网址" prop="url" label-width="140px")
          el-input(v-model="formModel.url")
      div.s-flex
        el-form-item.s-flex_item(label="团队中文名称" prop="teamCnName" label-width="140px")
          el-input(v-model="formModel.teamCnName")
        div.dd
        el-form-item.s-flex_item(label="团队英文名称" prop="teamEnName" label-width="140px")
          el-input(v-model="formModel.teamEnName")
      div.s-flex
        el-form-item.s-flex_item(label="团队联系人" prop="teamContacter" label-width="140px")
          el-input(v-model="formModel.teamContacter")
        div.dd
        el-form-item.s-flex_item(label="团队所在地" prop="teamAddress" label-width="140px")
          el-input(v-model="formModel.teamAddress")
      div.s-flex
        el-form-item.s-flex_item(label="作品中文名称" prop="worksCnName" label-width="140px")
          el-input(v-model="formModel.worksCnName")
        div.dd
        el-form-item.s-flex_item(label="作品英文名称" prop="worksEnName" label-width="140px")
          el-input(v-model="formModel.worksEnName")
      div.s-flex
        el-form-item.s-flex_item(label="作品介绍" prop="worksIntroduction" label-width="140px")
          el-input(v-model="formModel.worksIntroduction")
        div.dd
        el-form-item.s-flex_item(label="出品国家" prop="country" label-width="140px")
          el-input(v-model="formModel.country")
      div.s-flex
        el-form-item.s-flex_item(label="获奖情况" prop="award" label-width="140px")
          el-input(v-model="formModel.award")
        div.dd
        el-form-item.s-flex_item(label="播出情况" prop="broadcasting" label-width="140px")
          el-input(v-model="formModel.broadcasting")
      div.s-flex
        el-form-item.s-flex_item(label="指导教师" prop="tutor" label-width="140px")
          el-input(v-model="formModel.tutor")
        div.dd
        el-form-item.s-flex_item(label="制作完成时间" prop="finishingDate" label-width="140px")
          el-input(v-model="formModel.finishingDate")
      div.s-flex
        el-form-item.s-flex_item(label="作品时长" prop="lengthOfWork" label-width="140px")
          el-input(v-model="formModel.lengthOfWork")
        div.dd
        el-form-item.s-flex_item(label="版权所有者" prop="copyrightOwner" label-width="140px")
          el-input(v-model="formModel.copyrightOwner")
      div.s-flex
        el-form-item.s-flex_item(label="作者签名" prop="authorSignature" label-width="140px")
          el-input(v-model="formModel.authorSignature")
        div.dd
        el-form-item.s-flex_item(label="出品单位" prop="unit" label-width="140px")
          el-input(v-model="formModel.unit")
      div.s-flex
        el-form-item.s-flex_item(label="出品单位联系人" prop="unitContacter" label-width="140px")
          el-input(v-model="formModel.unitContacter")
        div.dd
        el-form-item.s-flex_item(label="主创人员" prop="creator" label-width="140px")
          el-input(v-model="formModel.creator")

 </template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/custom/baseDialog.vue'
  import {CompetitionInfoURL} from '../config.toml'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
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
          cName: [{required: true, message: '请输入 name', trigger: 'blur'}]
        },
        targetURL: CompetitionInfoURL
      }
    },
    created() {
      console.log('this.formRules.cname:', this.formRules.cname)
    },
    components: {
      KalixDialog: Dialog,
      KalixDictSelect: BaseDictSelect
    },
    methods: {

    }
  }
</script>
<style scoped lang="stylus">
  .dd
    width 50px
</style>
