<template lang="pug">
  keep-alive
    Kalix-Search(:searchFields="searchFields" title="统计查询"   ref="statisticSearchRef")
</template>

<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'
  export default {
    components: {
      KalixSearch: BaseSearch
    },
    data() {
      return {
        searchFields: [
          {label: '统计时间', prop: 'dateBegin', type: 'date', field: 'creationDate:begin:gt'},
          {label: '-', prop: 'dateEnd', type: 'date', field: 'creationDate:end:lt'},
          {label: '统计分类',
            prop: 'chartType',
            type: 'select',
            field: 'chartSelectValue',
            options: [
              {value: '3', label: '异常信息统计'},
              {value: '1', label: '异常趋势统计'},
              {value: '2', label: '硬件信息统计'}
            ],
            defaultVal: '3'
          },
          {label: '硬件分类',
            prop: 'hardwareType',
            type: 'select',
            field: 'hardwareSelectValue',
            options: [
              {value: '0', label: '硬盘'},
              {value: '1', label: '操作系统'},
              {value: '2', label: '内存'}
            ],
            defaultVal: '0'
          }
        ]
      }
    },
    mounted() {
    },
    methods: {
    },
    watch: {
      options:
        function(val) {
          console.log('111111111111111111')
        }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>

