<template lang="pug">
  kalix-search(title="用户查询" v-bind:searchFields="searchFields" v-bind:form-rules="rules")
</template>
<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'

  export default {
    data() {
      return {
        searchFields: [
//          {label: '登录名', prop: 'loginName'},
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
