<!--
描述：人员管理-教师维护-查詢组件
开发人：sunlf
开发日期：2017年8月17日
-->
<template lang="pug">
  kailx-search(title="教师查询" v-on:onSearch="onSearch"
  v-bind:filters="filters" v-bind:form-rules="rules")
</template>
<script type="text/ecmascript-6">
  import BaseSearch from '../../../components/custom/baseSearch.vue'
  import {isEmptyObject} from 'common/util'

  export default {
    data() {
      return {
        filters: [
          {label: '登录名', prop: 'loginName'},
          {label: '姓名', prop: 'name'}
        ],
        rules: {
          loginName: [
            {required: true, message: '请输入登录名', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.tempFormModel = JSON.stringify(Object.assign({}, this.formModel))
    },
    components: {
      KailxSearch: BaseSearch
    },
    methods: {
      resetFromModel() {
        this.formModel = JSON.parse(this.tempFormModel)
      },
      onSearch(_requestData) {
        this.$emit('onSearch', _requestData)
        if (isEmptyObject(_requestData)) {
          this.resetFromModel()
        }
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
