<!--
描述：报名信息组件
开发人：fj
开发日期：2017年9月13日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="signup" ref="kalixBizDialog" v-bind:form-model.sync="formModel" isView)
    div.el-form.kalix-form-table(slot="dialogFormSlot")
     el-collapse(v-model="activeNames")
      el-collapse-item(title="个人信息" name="1")
        div.s-flex
          el-form-item.s-flex_item(label="展赛名称" prop="competitionName" label-width="120px")
            el-input(v-model="formModel.competitionName" readonly)
          el-form-item.s-flex_item.kalix-form-table-td(label="姓名" prop="name" label-width="120px")
            el-input(v-model="formModel.name" readonly)
          el-form-item.s-flex_item.kalix-form-table-td(label="拼音" prop="phoneticize" label-width="120px")
            el-input(v-model="formModel.phoneticize" readonly)
        div.s-flex
          el-form-item.s-flex_item.kalix-form-table-td(label="性别" prop="sex" label-width="120px")
            el-radio-group(v-model="formModel.sex" disabled)
              el-radio(label="男")
              el-radio(label="女")
          el-form-item.s-flex_item.kalix-form-table-td(label="出生日期" prop="birthday" label-width="120px")
            kalix-date-picker(v-model="formModel.birthday" readonly)
          el-form-item.s-flex_item.kalix-form-table-td(label="国籍" prop="nationality" label-width="120px")
            el-input(v-model="formModel.nationality" readonly)
        div.s-flex
          el-form-item.s-flex_item.kalix-form-table-td(label="身份证号" prop="identificationCard" label-width="120px")
            el-input(v-model="formModel.identificationCard" readonly)
          el-form-item.s-flex_item.kalix-form-table-td(label="省份" prop="province" label-width="120px")
            el-input(v-model="formModel.province" readonly)
          el-form-item.s-flex_item.kalix-form-table-td(label="城市" prop="city" label-width="120px")
            el-input(v-model="formModel.city" readonly)
        div.s-flex
          el-form-item.s-flex_item.kalix-form-table-td(label="笔名" prop="penName" label-width="120px")
            el-input(v-model="formModel.penName" readonly)
          el-form-item.s-flex_item.kalix-form-table-td(label="作者简介" prop="authorIntroduction" label-width="120px")
            el-input(type="textarea" v-model="formModel.authorIntroduction" readonly)
          el-form-item.s-flex_item.kalix-form-table-td(label="通讯地址" prop="postalAddress" label-width="120px")
            el-input(v-model="formModel.postalAddress" readonly)
        div.s-flex
          el-form-item.s-flex_item.kalix-form-table-td(label="邮政编码" prop="postalCode" label-width="120px")
            el-input(v-model="formModel.postalCode" readonly)
          el-form-item.s-flex_item.kalix-form-table-td(label="移动电话" prop="mobilePhone" label-width="120px")
            el-input(v-model="formModel.mobilePhone" readonly)
          el-form-item.s-flex_item.kalix-form-table-td(label="固定电话" prop="fixedPhone" label-width="120px")
            el-input(v-model="formModel.fixedPhone" readonly)
        div.s-flex
          el-form-item.s-flex_item.kalix-form-table-td(label="电子邮箱" prop="email" label-width="120px")
            el-input(v-model="formModel.email" readonly)
          el-form-item.s-flex_item.kalix-form-table-td(label="QQ" prop="qq" label-width="120px")
            el-input(v-model="formModel.qq" readonly)
          el-form-item.s-flex_item.kalix-form-table-td(label="传真" prop="fax" label-width="120px")
            el-input(v-model="formModel.fax" readonly)
        div.s-flex
          el-form-item.s-flex_item(label="微博" prop="microBlog" label-width="120px")
            el-input(v-model="formModel.microBlog" readonly)
          el-form-item.s-flex_item(label="其他联系方式" prop="otherContactWay" label-width="120px")
            el-input(v-model="formModel.otherContactWay" readonly)
        div.s-flex
          el-form-item.s-flex_item.kalix-form-table-td(label="所在学校" prop="school" label-width="120px")
            el-input(v-model="formModel.school" readonly)
          el-form-item.s-flex_item.kalix-form-table-td(label="专业/班级" prop="majorclass" label-width="120px")
            el-input(v-model="formModel.majorclass" readonly)
          el-form-item.s-flex_item.kalix-form-table-td(label="网址" prop="url" label-width="120px")
            el-input(v-model="formModel.url" readonly)
        div.s-flex
      el-collapse-item(title="作品信息" name="2")
        div.s-flex
          el-form-item.s-flex_item.kalix-form-table-td(label="作品中文名" prop="worksCnName" label-width="120px")
            el-input(v-model="formModel.worksCnName" readonly)
          el-form-item.s-flex_item.kalix-form-table-td(label="作品英文名" prop="worksEnName" label-width="120px")
            el-input(v-model="formModel.worksEnName" readonly)
          el-form-item.s-flex_item.kalix-form-table-td(label="作品介绍" prop="worksIntroduction" label-width="120px")
            el-input(type="textarea" v-model="formModel.worksIntroduction" readonly)
        div.s-flex
          el-form-item.s-flex_item.kalix-form-table-td(label="出品国家" prop="country" label-width="120px")
            el-input(v-model="formModel.country" readonly)
          el-form-item.s-flex_item.kalix-form-table-td(label="获奖情况" prop="award" label-width="120px")
            el-input(v-model="formModel.award" readonly)
          el-form-item.s-flex_item.kalix-form-table-td(label="播出情况" prop="broadcasting" label-width="120px")
            el-input(v-model="formModel.broadcasting" readonly)
        div.s-flex
          el-form-item.s-flex_item.kalix-form-table-td(label="指导教师" prop="tutor" label-width="120px")
            el-input(v-model="formModel.tutor" readonly)
          el-form-item.s-flex_item.kalix-form-table-td(label="制作完成时间" prop="finishingDate" label-width="120px")
            kalix-date-picker(v-model="formModel.finishingDate" readonly)
          el-form-item.s-flex_item.kalix-form-table-td(label="作品时长" prop="lengthOfWork" label-width="120px")
            el-input(v-model="formModel.lengthOfWork" readonly)
        div.s-flex
          el-form-item.s-flex_item.kalix-form-table-td(label="版权所有者" prop="copyrightOwner" label-width="120px")
            el-input(v-model="formModel.copyrightOwner" readonly)
          el-form-item.s-flex_item.kalix-form-table-td(label="出品单位" prop="unit" label-width="120px")
            el-input(v-model="formModel.unit" readonly)
          el-form-item.s-flex_item.kalix-form-table-td(label="出品单位联系人" prop="unitContacter" label-width="120px")
            el-input(v-model="formModel.unitContacter" readonly)
        div.s-flex
          el-form-item.s-flex_item.kalix-form-table-td(label="主创人员" prop="creator" label-width="120px")
            el-input(v-model="formModel.creator" readonly)
      el-collapse-item(title="团队信息" name="3")
        div.s-flex
          el-form-item.s-flex_item.kalix-form-table-td(label="团队中文名" prop="teamCnName" label-width="100px")
            el-input(v-model="formModel.teamCnName" readonly)
          el-form-item.s-flex_item.kalix-form-table-td(label="团队英文名" prop="teamEnName" label-width="100px")
            el-input(v-model="formModel.teamEnName" readonly)
        div.s-flex
          el-form-item.s-flex_item.kalix-form-table-td(label="团队联系人" prop="teamContacter" label-width="100px")
            el-input(v-model="formModel.teamContacter" readonly)
          el-form-item.s-flex_item.kalix-form-table-td(label="团队所在地" prop="teamAddress" label-width="100px")
            el-input(v-model="formModel.teamAddress" readonly)
</template>
<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'
  import DatePicker from '@/components/biz/date/datepicker.vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        activeNames: ['1']
      }
    },
    created() {
    },
    components: {
      KalixDialog: Dialog,
      KalixDatePicker: DatePicker
    },
    methods: {
    }
  }
</script>
