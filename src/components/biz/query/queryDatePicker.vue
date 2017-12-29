<template lang="pug">
  span
    kalix-query-date-picker(v-model="beginValue")
    span(style="margin:0 8px;") -
    kalix-query-date-picker(v-model="endValue")
</template>
<script type="text/ecmascript-6">
  import QueryDatepicker from 'components/biz/date/datepicker'

  export default {
    props: ['value'],
    data() {
      return {
        currentDisplayValue: this.value,
        beginValue: '',
        endValue: ''
      }
    },
    components: {
      KalixQueryDatePicker: QueryDatepicker
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
