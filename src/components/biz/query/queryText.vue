<template lang="pug">
  el-input(v-model="currentValue")
</template>
<script type="text/ecmascript-6">
  import {strToUnicode} from 'common/unicode-convert'

  export default {
    props: ['value', 'field', 'querystr'],
    data() {
      return {
        currentDisplayValue: this.value
      }
    },
    watch: {
      currentValue(newValue) {
        this.$emit('input', newValue)
        if (newValue.length) {
          this.$emit('update:querystr', `"%${this.field}%":"${strToUnicode(newValue)}"`)
        } else {
          this.$emit('update:querystr', null)
        }
      },
      value(newValue, oldValue) {
        this.currentDisplayValue = newValue || ''
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
