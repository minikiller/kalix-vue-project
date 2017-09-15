<!--
描述：报名信息组件
开发人：fj
开发日期：2017年9月13日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="signup"
  ref="kalixBizDialog" v-bind:form-model="formModel" v-bind:targetURL="targetURL"
  v-bind:isView="readonly")
    div.el-form.kalix-form-table(slot="dialogFormSlot")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="姓名" prop="name" label-width="140px")
          el-input(v-model="formModel.name" v-bind:readonly="readonly")
        el-form-item.s-flex_item.kalix-form-table-td(label="拼音" prop="phoneticize" label-width="140px")
          el-input(v-model="formModel.phoneticize" v-bind:readonly="readonly")
        el-form-item.s-flex_item.kalix-form-table-td(label="笔名" prop="penName" label-width="140px")
          el-input(v-model="formModel.penName" v-bind:readonly="readonly")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="展赛" prop="competitionId" label-width="140px" )
          kalix-competition-select(style="width:100%"  v-model="formModel.competitionId" v-bind:multiple="false"
          v-on:competitionSelected="onCompetitionSelected" v-bind:readonly="readonly")
        el-form-item.s-flex_item.kalix-form-table-td(label="性别" prop="sex" label-width="140px")
          el-radio-group(v-model="formModel.sex" v-bind:readonly="readonly")
            el-radio(label="男")
            el-radio(label="女")
        el-form-item.s-flex_item.kalix-form-table-td(label="年龄" prop="age" label-width="140px")
          el-input(v-model="formModel.age" v-bind:readonly="readonly")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="省份" prop="province" label-width="140px")
          el-input(v-model="formModel.province" v-bind:readonly="readonly")
        el-form-item.s-flex_item.kalix-form-table-td(label="城市" prop="city" label-width="140px")
          el-input(v-model="formModel.city" v-bind:readonly="readonly")
        el-form-item.s-flex_item.kalix-form-table-td(label="地址" prop="postalAddress" label-width="140px")
          el-input(v-model="formModel.postalAddress" v-bind:readonly="readonly")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="出生年月" prop="birthday" label-width="140px")
          el-input(v-model="formModel.birthday" v-bind:readonly="readonly")
        el-form-item.s-flex_item.kalix-form-table-td(label="身份证号" prop="identificationCard" label-width="140px")
          el-input(v-model="formModel.identificationCard" v-bind:readonly="readonly")
        el-form-item.s-flex_item.kalix-form-table-td(label="国籍" prop="nationality" label-width="140px")
          el-input(v-model="formModel.nationality" v-bind:readonly="readonly")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="移动电话" prop="mobilePhone" label-width="140px")
          el-input(v-model="formModel.mobilePhone" v-bind:readonly="readonly")
        el-form-item.s-flex_item.kalix-form-table-td(label="固定电话" prop="fixedPhone" label-width="140px")
          el-input(v-model="formModel.fixedPhone" v-bind:readonly="readonly")
        el-form-item.s-flex_item.kalix-form-table-td(label="其他联系方式" prop="otherContactWay" label-width="140px")
          el-input(v-model="formModel.otherContactWay" v-bind:readonly="readonly")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="电子邮箱" prop="email" label-width="140px")
          el-input(v-model="formModel.email" v-bind:readonly="readonly")
        el-form-item.s-flex_item.kalix-form-table-td(label="邮政编码" prop="postalCode" label-width="140px")
          el-input(v-model="formModel.postalCode" v-bind:readonly="readonly")
        el-form-item.s-flex_item.kalix-form-table-td(label="网址" prop="url" label-width="140px")
          el-input(v-model="formModel.url" v-bind:readonly="readonly")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="QQ" prop="qq" label-width="140px")
          el-input(v-model="formModel.qq" v-bind:readonly="readonly")
        el-form-item.s-flex_item.kalix-form-table-td(label="传真" prop="fax" label-width="140px")
          el-input(v-model="formModel.fax" v-bind:readonly="readonly")
        el-form-item.s-flex_item.kalix-form-table-td(label="微博" prop="microBlog" label-width="140px")
          el-input(v-model="formModel.microBlog" v-bind:readonly="readonly")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="所在学校" prop="school" label-width="140px")
          el-input(v-model="formModel.school" v-bind:readonly="readonly")
        el-form-item.s-flex_item.kalix-form-table-td(label="专业/班级" prop="majorclass" label-width="140px")
          el-input(v-model="formModel.majorclass" v-bind:readonly="readonly")
        el-form-item.s-flex_item.kalix-form-table-td(label="指导教师" prop="tutor" label-width="140px")
          el-input(v-model="formModel.tutor" v-bind:readonly="readonly")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="作者简介" prop="authorIntroduction" label-width="140px")
          el-input(v-model="formModel.authorIntroduction" v-bind:readonly="readonly")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="团队中文名称" prop="teamCnName" label-width="140px")
          el-input(v-model="formModel.teamCnName" v-bind:readonly="readonly")
        el-form-item.s-flex_item.kalix-form-table-td(label="团队英文名称" prop="teamEnName" label-width="140px")
          el-input(v-model="formModel.teamEnName" v-bind:readonly="readonly")
        el-form-item.s-flex_item.kalix-form-table-td(label="团队联系人" prop="teamContacter" label-width="140px")
          el-input(v-model="formModel.teamContacter" v-bind:readonly="readonly")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="主创人员" prop="creator" label-width="140px")
          el-input(v-model="formModel.creator" v-bind:readonly="readonly")
        el-form-item.s-flex_item.kalix-form-table-td(label="版权所有者" prop="copyrightOwner" label-width="140px")
          el-input(v-model="formModel.copyrightOwner" v-bind:readonly="readonly")
        el-form-item.s-flex_item.kalix-form-table-td(label="团队所在地" prop="teamAddress" label-width="140px")
          el-input(v-model="formModel.teamAddress" v-bind:readonly="readonly")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="作品中文名称" prop="worksCnName" label-width="140px")
          el-input(v-model="formModel.worksCnName" v-bind:readonly="readonly")
        el-form-item.s-flex_item.kalix-form-table-td(label="作品英文名称" prop="worksEnName" label-width="140px")
          el-input(v-model="formModel.worksEnName" v-bind:readonly="readonly")
        el-form-item.s-flex_item.kalix-form-table-td(label="作品出品国家" prop="country" label-width="140px")
          el-input(v-model="formModel.country" v-bind:readonly="readonly")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="作品介绍" prop="worksIntroduction" label-width="140px")
          el-input(v-model="formModel.worksIntroduction" v-bind:readonly="readonly")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="获奖情况" prop="award" label-width="140px")
          el-input(v-model="formModel.award" v-bind:readonly="readonly")
        el-form-item.s-flex_item.kalix-form-table-td(label="播出情况" prop="broadcasting" label-width="140px")
          el-input(v-model="formModel.broadcasting" v-bind:readonly="readonly")
        el-form-item.s-flex_item.kalix-form-table-td(label="制作完成时间" prop="finishingDate" label-width="140px")
          el-input(v-model="formModel.finishingDate" v-bind:readonly="readonly")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="作品时长" prop="lengthOfWork" label-width="140px")
          el-input(v-model="formModel.lengthOfWork" v-bind:readonly="readonly")

      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="作者签名" prop="authorSignature" label-width="140px")
          el-input(v-model="formModel.authorSignature" v-bind:readonly="readonly")
        el-form-item.s-flex_item.kalix-form-table-td(label="出品单位" prop="unit" label-width="140px")
          el-input(v-model="formModel.unit" v-bind:readonly="readonly")
        el-form-item.s-flex_item.kalix-form-table-td(label="出品单位联系人" prop="unitContacter" label-width="140px")
          el-input(v-model="formModel.unitContacter" v-bind:readonly="readonly")

</template>
<script type="text/ecmascript-6">
  import Dialog from '@/components/custom/baseDialog.vue'
  import {CompetitionInfoURL} from '../config.toml'
  import CompetitionSelect from '@/components/biz/competitionselect/competitionselect'
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
        rules: {
          cName: [{required: true, message: '请输入 name', trigger: 'blur'}]
        },
        targetURL: CompetitionInfoURL,
        readonly: true
      }
    },
    created() {
    },
    components: {
      KalixDialog: Dialog,
      KalixCompetitionSelect: CompetitionSelect
    },
    methods: {
      onCompetitionSelected(competition) {
        EventBus.$emit('updateSignupModel', competition)
      }
    }
  }
</script>
