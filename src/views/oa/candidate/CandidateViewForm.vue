<!--
描述：办公自动化-用车申请-查看组件
开发人：hqj
开发日期：2017年10月19日
-->

<template lang="pug">
  div.el-form
    div.s-flex
      el-form-item.s-flex_item(label="人员类别" prop="personCategory" v-bind:label-width="labelWidth")
        el-input(v-bind:value="formModel.personCategory|getDictName('OA','招聘人员类别')" readonly)
      el-form-item.s-flex_item(label="专业" prop="major" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.major" readonly)
    div.s-flex
      el-form-item.s-flex_item(label="所在部门" prop="orgName" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.orgName" readonly)
      el-form-item.s-flex_item(label="最后学历" prop="education" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.education" readonly)
    div.s-flex
      el-form-item.s-flex_item(label="姓名" prop="xm" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.xm" readonly)
      el-form-item.s-flex_item(label="户口所在地" prop="residence" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.residence" readonly)
    div.s-flex
      el-form-item.s-flex_item(label="性别" prop="sex" v-bind:label-width="labelWidth")
        el-input(v-bind:value="formModel.sex|getDictName('OA','性别')" readonly)
      el-form-item.s-flex_item(label="应聘岗位" prop="position" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.position" readonly)
    div.s-flex
      el-form-item.s-flex_item(label="年龄" prop="age" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.age" readonly)
      el-form-item.s-flex_item(label="期望工资" prop="salary" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.salary" readonly)
    div.s-flex
      el-form-item.s-flex_item(label="联系电话" prop="tel" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.tel" readonly)
      el-form-item.s-flex_item(label="从业经验" prop="experience" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.experience" readonly)
    div.s-flex
      el-form-item.s-flex_item(label="毕业学校" prop="graduateSchool" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.graduateSchool" readonly)
      el-form-item.s-flex_item(label="备注" prop="comment" v-bind:label-width="labelWidth")
        el-input(type="textarea" v-model="formModel.comment" readonly)
</template>

<script type="text/ecmascript-6">
  import {CandidateURL} from '../config.toml'
  import Vue from 'vue'

  export default {
    props: {
      formModel: {},
      isRequest: {
        type: Boolean,
        default: false
      },
      bizId: null
    },
    data() {
      return {
        labelWidth: '110px'
      }
    },
    components: {},
    mounted() {
      if (this.isRequest) {
        this.getBizData()
      }
    },
    methods: {
      // 获取业务数据
      getBizData() {
        if (this.bizId) {
          let bizDataUrl = CandidateURL + '/' + this.bizId
          Vue.axios.get(bizDataUrl).then((response) => {
            // this.formModel = response.data
            if (response.data.success === undefined) {
              this.$emit('update:formModel', response.data) // 设置sync才有效
            }
          })
        }
      }
    }
  }
</script>
