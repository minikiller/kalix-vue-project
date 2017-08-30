<template lang="pug">
  kalix-search(title="用户组查询" v-bind:searchFields="searchFields" v-bind:form-rules="rules")
</template>
<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'

  export default {
    data() {
      return {
        searchFields: [
          {label: '组名称', prop: 'name'}
        ],
        rules: {
          groupName: [
            {required: true, message: '请输入组名称', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
    },
    methods: {
    },
    components: {
      KalixSearch: BaseSearch
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
