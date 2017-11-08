<!--
描述：办公自动化-应聘人员管理-查询组件
开发人：hqj
开发日期：2017年10月30日
-->

<template lang="pug">
  kalix-search(title="职务查询" v-bind:searchFields="searchFields")
</template>

<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch'

  export default {
    data() {
      return {
        searchFields: [
          {label: '职务名称', prop: 'name'}
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
