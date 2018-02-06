<template lang="pug">
  keep-alive
    kalix-pop-table(v-bind:bizKey="popData.bizKey" v-bind:placement="popData.placement" v-bind:width="popData.width"
      v-bind:jsonStr="popData.jsonStr" v-bind:trigger="popData.trigger" v-bind:buttonName="popData.buttonName"
      v-bind:targetUrl="popData.targetUrl" v-bind:tableFields="popData.tableFields"
      v-on:onPopoverClick="getPopoverTableRow" ref="kalixPopTable")
</template>

<script type="text/ecmascript-6">
  import BasePopTable from '@/components/custom/basePopTableButton.vue'
  // import EventBus from 'common/eventbus'
  // import {ON_POPOVER_TABLEROW_CLICK} from '@/components/custom/event.toml'
  export default {
    props: {
      popData: {
        type: Object,
        default() {
          return {
            placement: '',
            width: '150px',
            trigger: 'click',
            buttonName: '',
            tableFields: [],
            targetUrl: '',
            bizKey: '',
            jsonStr: ''
          }
        }
      }
    },
    components: {
      KalixPopTable: BasePopTable
    },
    methods: {
      popoverClick(kalixPop) {
        kalixPop.closePopover()
      },
      getPopoverTableRow(row) {
        this.$emit('popoverData', row)
      }
    },
    mounted() {
    },
    activated() {
    },
    deactivated() {
    }
  }
</script>

<style scoped>

</style>
