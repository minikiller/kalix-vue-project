<template lang="pug">
  kalix-search(title="字典查询" v-bind:searchFields="searchFields" v-bind:form-rules="rules")
</template>
<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'

  export default {
    data() {
      return {
        searchFields: [
          {label: '类型', prop: 'type'},
          {label: '签名', prop: 'label', cls: 'label', dataType: 'number'}
        ],
        rules: {
          type: [
            {required: true, message: '请输入类型', trigger: 'blur'}
          ]
        }
      }
    },
    components: {
      KalixSearch: BaseSearch
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
