<!--
描述：系统应用-系统管理-审计管理
开发人：杨泽
开发日期：2018年1月31日
-->
<template lang="pug">
  kalix-search(title="审计查询" bizKey="audit"
    v-bind:searchForm="formModel" v-bind:form-rules="rules")
    div(slot="searchFormSlot")
      el-form-item(label="应用名称" prop="appName")
        el-input(v-model.trim="formModel.appName" placeholder="请输入应用名称" auto-complete="off"
        v-bind:class="bindCls('appName')" field="appName" data-type="string")
      el-form-item(label="功能名称" prop="funName")
        el-input(v-model.trim="formModel.funName" placeholder="请输入功能名称" auto-complete="off"
        v-bind:class="bindCls('funName')" field="funName" data-type="string")
      el-form-item(label="操作人" prop="actor")
        el-input(v-model.trim="formModel.actor" placeholder="请输入操作人" auto-complete="off"
        v-bind:class="bindCls('actor')" field="actor" data-type="string")
      el-form-item(label="操作时间" prop="beginDate_begin")
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
    created() {
    },
    data() {
      return {

      }
    },
    components: {
      KalixSearch: BaseSearch
    },
    methods: {}
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
