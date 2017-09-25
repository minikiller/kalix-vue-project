<!--
描述：支持yyyy-MM-dd hh:mm:ss 格式的日期组件
开发人：sunlf
开发日期：2017年9月21日
-->
<template lang="pug">
  el-date-picker(v-model='currentValue' v-bind:type="type" v-bind:readonly="readonly")
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      value: {
        required: true
      },
      type: {
        default: 'date'
      },
      readonly: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        currentValue: this.value
      }
    },
    watch: {
      currentValue(newValue) {
        this.$emit('input', this.GMTToStr(newValue))  // 设置model的数值
      }
    },
    methods: {
      GMTToStr(time) {
        let date = new Date(time)
        let Str = date.getFullYear() + '-' +
          (date.getMonth() + 1) + '-' +
          date.getDate() + ' ' +
          date.getHours() + ':' +
          date.getMinutes() + ':' +
          date.getSeconds()
        return Str
      }
    }
  }
</script>

