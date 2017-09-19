<!--
描述：人员管理-科研人员维护-查询组件
开发人：hqj
开发日期：2017年8月22日
-->

<template lang="pug">
  kalix-search(title="科研人员查询" v-bind:searchForm="formModel" v-bind:targetURL="targetURL")
    div(slot="searchFormSlot")
      el-form-item(label="姓名")
        el-input(v-model="formModel.name")
      el-form-item(label="所属机构")
        org-tree.inline(v-model.sync="formModel.orgid" v-bind:isAll="false")
      // el-form-item {{formModel.orgid}}
</template>

<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'
  import {WorkerURL} from '../config.toml'

  export default {
    data() {
      return {
        searchFields: [
          {label: '姓名', prop: 'name'},
          {label: '机构', prop: 'orgid'}
        ],
        formModel: {
          name: '',
          orgid: ''
        },
        targetURL: WorkerURL
      }
    },
    created() {
    },
    components: {
      KalixSearch: BaseSearch
    },
    methods: {},
    watch: {
      formModel(nVal) {
        console.log('formModel', nVal)
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  .inline
    display inline-block
    margin-right 8px
    position relative
</style>
