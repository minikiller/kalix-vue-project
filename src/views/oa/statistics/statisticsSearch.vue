<template lang="pug">
  keep-alive
    Kalix-Search(:searchFields="searchFields" title="统计查询" v-on:getProp="getProp" v-on:selectVal="getWorkflowType" ref="statisticSearchRef")
</template>

<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'
  import {WorkflowAllDefineURL} from '../config.toml'

  export default {
    components: {
      KalixSearch: BaseSearch
    },
    data() {
      return {
        searchFields: [
          {label: '统计时间', prop: 'dateBegin', type: 'date', field: 'creationDate:begin:gt'},
          {label: '-', prop: 'dateEnd', type: 'date', field: 'creationDate:end:lt'},
          {label: '流程', prop: 'keyType', type: 'map', field: 'selectValue', selectUrl: WorkflowAllDefineURL, appName: 'statistic'},
          {label: '分组',
            prop: 'groupType',
            type: 'select',
            field: 'groupSelectValue',
            options: [
              {value: '0', label: '部门'},
              {value: '1', label: '审批状态'},
              {value: '2', label: '审批结果'}
            ],
            defaultVal: '0'
          },
          {label: '图表',
            prop: 'chartType',
            type: 'select',
            field: 'chartSelectValue',
            options: [
              {value: '0', label: '柱状图'},
              {value: '1', label: '折线图'},
              {value: '2', label: '饼图'}
            ],
            defaultVal: '0'
          }
        ]
      }
    },
    mounted() {
    },
    methods: {
      getProp(val) {
        this.$emit('getProp', val)
      },
      getWorkflowType(val) {
        this.$emit('selectVal', val)
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
