<template lang="pug">
  kalix-comm-panel(title="组织机构图")
    div(id="chart-container" slot="panelSlot")
</template>

<script type="text/ecmascript-6">
  import KalixCommPanel from '@/components/panel/commPanel.vue'
  import OrgChart from '@/third/orgchart/orgchart.js'
  import '@/third/orgchart/orgchart.css'

  export default {
    data() {
      return {
        datascource: {}
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        let url = '/camel/rest/orgs?node=root'
        this.axios.request({
          method: 'GET',
          url: url,
          params: {}
        }).then(res => {
          this.datascource = res.data.children[0]
          /* eslint-disable no-new */
          new OrgChart({
            'chartContainer': '#chart-container',
            'data': this.datascource,
            'nodeContent': 'text',
            'direction': 'l2r',
            'depth': 2,
            'pan': true,
            'zoom': true
          })
        })
      }
    },
    components: {
      KalixCommPanel
    }
  }
</script>

<style scoped lang="stylus">

</style>
