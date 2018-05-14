<!--
描述：人员管理-学生维护-查詢组件
开发人：fj
开发日期：2017年8月22日
-->

<template lang="pug">
  kalix-search(title="硬件查询" v-bind:searchFields="searchFields")
</template>

<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'

  export default {
    data() {
      return {
        searchFields: [
          {label: '条形码', prop: 'barcode'}
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
