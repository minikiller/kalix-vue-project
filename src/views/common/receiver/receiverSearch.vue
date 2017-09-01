<!--
描述：我的首页-收件箱组件-查詢组件
开发人：桑杨
开发日期：2017年8月30日
-->

<template lang="pug">
  kalix-search(title="收件查询"
  v-bind:bizKey="bizKey" v-bind:searchForm="formModel"
  v-bind:form-rules="rules")
    div(slot="searchFormSlot")
      el-form-item(label="发件人" prop="senderName")
        el-input(v-model.trim="formModel.senderName" placeholder="请输入类型名" auto-complete="off"
        v-bind:class="bindCls('senderName')" field="senderName" data-type="string")
      el-form-item(label="消息主题" prop="title")
        el-input(v-model.trim="formModel.title" placeholder="请输入类型名" auto-complete="off"
        v-bind:class="bindCls('title')" field="title"  data-type="string")
      el-form-item(label="收件时间" prop="beginDate_begin")
        el-date-picker(v-model="formModel.beginDate_begin" v-on:change="beginChange" placeholder="选择日期"
        type="date" data-type="datetime" v-bind:class="bindCls('beginDate_begin')" field="creationDate:begin:gt")
      el-form-item(label="-" prop="beginDate_end")
        el-date-picker(v-model="formModel.beginDate_end" v-on:change="endChange" placeholder="选择日期"
        type="date" data-type="datetime" v-bind:class="bindCls('beginDate_end')" field="creationDate:end:lt" )
</template>

<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'
  import {SearchDataMixin} from '@/common/searchmixin'

  export default {
    mixins: [SearchDataMixin],
    data() {
      return {
        formModel: {
          senderName: '',
          title: '',
          beginDate_begin: '',
          beginDate_end: ''
        },
        rules: {
          senderName: [],
          title: [],
          beginDate_begin: [],
          beginDate_end: []
        },
        bizKey: 'receiver'
      }
    },
    created() {
    },
    components: {
      KalixSearch: BaseSearch
    },
    methods: {}
  }
</script>

<style scoped lang="stylus" type="text/stylus">
</style>
