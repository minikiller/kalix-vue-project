<!--
描述：办公自动化-红头文件申请-审批查看组件
开发人：sunlf
开发日期：2017年12月20日
-->

<template lang="pug">
  div.el-form.kalix-form-table(slot="dialogFormSlot")
    div.table-title 吉林动画学院红头文件申请表
    div
      el-form-item.kalix-form-table-td(label="名称" prop="title" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.title" readonly)
          el-button(type="primary" icon="el-icon-search" slot="append" v-on:click="onPreview") 预览
    div
      el-form-item.kalix-form-table-td(label="创建时间" prop="creationDate" v-bind:label-width="labelWidth")
        kalix-date-time-picker(v-model="formModel.creationDate" style="width:100%" readonly)
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="申请部门" prop="orgName" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.orgName" readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label="申请时间" prop="applyDate" v-bind:label-width="labelWidth")
        kalix-date-time-picker(v-model="formModel.applyDate" style="width:100%" readonly)
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="文号" prop="businessNo" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.businessNo")
      el-form-item.s-flex_item.kalix-form-table-td(label="文号类型" prop="docType" v-bind:label-width="labelWidth")
        el-input(v-bind:value="formModel.docType|getDictName('OA','文号类型')" readonly)
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="文件状态" prop="docStatus" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.docStatus" readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label="申请人" prop="createBy" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.createBy" readonly)
    div
      el-form-item.kalix-form-table-td(label="发文内容" prop="docContent" v-bind:label-width="labelWidth")
        div.doc-content(v-html="formModel.docContent")
    div
      el-form-item.kalix-form-table-td(label="审批选项" prop="needHeader" v-bind:label-width="labelWidth")
        div(style="text-align:center")
          el-switch(v-model="formModel.needHeader" active-text="需要校领导审批" inactive-text="不需要校领导审批" disabled)
    template(v-if="formModel.needHeader")
      div
        el-form-item.kalix-form-table-td(label="校领导审批名单" prop="needManagerUser" v-bind:label-width="labelWidth")
          <!--kalix-checkbox(v-model="formModel.managerUser" v-bind:dataUrl="managerUsersURL" disabled)-->
          el-input(v-model="formModel.needManagerUser" readonly)
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="部门负责人签字" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.depUser" readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label="校务部签字" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.schoolUser" readonly)
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="校领导签字" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.managerUser" readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label="董事长签字" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.chairmanUser" readonly)
</template>

<script type="text/ecmascript-6">
  import DateTimePicker from '@/components/biz/date/datetimepicker.vue'
  import {RedheadApplyURL} from '../config.toml'
  import {baseURL} from 'config/global.toml'
  import Message from 'common/message'
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
        labelWidth: '140px'
      }
    },
    components: {
      KalixDateTimePicker: DateTimePicker
    },
    mounted() {
      if (this.isRequest) {
        this.getBizData()
      }
    },
    watch: {
      bizId(newVal) {
        if (this.isRequest) {
          this.getBizData()
        }
      }
    },
    methods: {
      // 获取业务数据
      getBizData() {
        if (this.bizId) {
          let bizDataUrl = RedheadApplyURL + '/' + this.bizId
          let params = {
            params: {}
          }
          Vue.axios.get(bizDataUrl, params).then((response) => {
            if (response.data.success === undefined) {
              if (response.data) {
                this.$emit('update:formModel', response.data) // 设置sync才有效
              }
            }
          })
        }
      },
      // 预览
      onPreview() {
        if (this.bizId) {
          window.open(baseURL + '/camel/servlet/download?beanname=RedheadApply&id=' + this.bizId + '&filetype=html')
        } else {
          if (this.formModel.id) {
            window.open(baseURL + '/camel/servlet/download?beanname=RedheadApply&id=' + this.formModel.id + '&filetype=html')
          } else {
            Message.warning('文号未关联红头文件,无法进行预览!')
          }
        }
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .doc-content
    max-height 500px
    overflow auto
</style>
