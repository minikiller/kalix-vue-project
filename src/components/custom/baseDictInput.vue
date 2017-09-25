<template lang="pug">
  el-input(v-model='currentValue' readonly)
</template>

<script type="text/ecmascript-6">
  import Cache from 'common/cache'

  export default {
    props: {
      value: {
        required: true
      },
      appName: {
        required: true,
        default: 'OA'
      },
      dictModel: {
        default: 'OA'
      },
      dictType: {
        required: true
      }
    },
    data() {
      return {
        currentValue: this.value
      }
    },
    mounted() {
//      console.log('this is new dict [this.value]', this.value)
//      this.currentValue = this.value
      let dict = this.getDictTypeName(this.currentValue)
      console.log('this is new dict [currentValue]', this.value)
      this.$emit('input', dict)  // 设置model的数值
    },
    watch: {
      currentValue(newValue) {
//        let dict = this.getDictTypeName(newValue)
//        console.log('this is new dict ', dict)
//        this.$emit('input', dict)  // 设置model的数值
      }
    },
    methods: {
      getDictTypeName(value) {
        console.log('this is new dict [getDictTypeName]', value)
        const dict = JSON.parse(Cache.get(this.appName + '-DICT-KEY'))
        let item = dict.find(e => {
          return e.type === this.dictType && e.value === value
        })
        if (item) {
          return item.label
        }
        return ''
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
