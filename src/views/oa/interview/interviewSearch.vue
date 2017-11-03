<!--
描述：办公自动化-面试管理-查询组件
开发人：hqj
开发日期：2017年11月1日
-->

<template lang="pug">
  kalix-search(title="面试人员查询" v-bind:searchFields="searchFields")
</template>

<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'
  import {CandidateURL} from '../config.toml'

  export default {
    data() {
      return {
        searchFields: [
          {label: '应聘者姓名', prop: 'candidateId', type: 'objectDict', objectsUrl: CandidateURL, fieldName: 'xm'}
        ]
      }
    },
    components: {
      KalixSearch: BaseSearch
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
</style>
