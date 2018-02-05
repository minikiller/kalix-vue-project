<!--
描述：系统应用-系统管理-审计管理
开发人：杨泽
开发日期：2018年1月31日
-->
<template lang="pug">
  kalix-search(title="审计查询"
    v-bind:bizKey="bizKey" v-bind:searchForm="formModel"
    v-bind:form-rules="rules")
    div(slot="searchFormSlot")
      el-form-item(label="应用名称" prop="appName")
        el-input(v-model.trim="formModel.appName" placeholder="请输入应用名称" auto-complete="off"
        v-bind:class="bindCls('appName')" field="appName" data-type="string")
</template>

<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'
  import {SearchDataMixin} from '@/common/searchmixin'
  export default {
    mixins: [SearchDataMixin],
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
