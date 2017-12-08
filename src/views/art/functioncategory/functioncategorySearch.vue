<!--
描述：艺术中心-专业课程设置-查询组件
开发人：hqj
开发日期：2017年11月30日
-->

<template lang="pug">
  kalix-search(title="职能分类查询" v-bind:searchFields="searchFields")
</template>

<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch'

  export default {
    data() {
      return {
        searchFields: [
          {label: '职能名称', prop: 'name'}
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
