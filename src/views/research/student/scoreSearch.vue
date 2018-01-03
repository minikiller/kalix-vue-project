<!--
描述：科研管理-人员管理-学生信息-学生成绩-查询组件
开发人：hqj
开发日期：2017年12月20日
-->

<template lang="pug">
  kalix-search(title="学生成绩查询" v-bind:searchFields="searchFields")
</template>

<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'

  export default {
    data() {
      return {
        searchFields: [
          {label: '学号', prop: 'code'}
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
