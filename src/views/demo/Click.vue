<template lang="pug">
  div
    span.init-num 初始值为{{ InitNum }}
    br
    span.click-num 点击了{{ ClickNum }}次
    br
    span.result-num 最终结果为{{ ResultNum }}
    br
    button(@click="add") 累加{{ AddNum }}
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Click',
    props: {
      AddNum: {
        type: Number,
        default: 1
      },
      InitNum: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        ClickNum: 0,
        ResultNum: 0
      }
    },
    mounted() {
      this.ResultNum = this.InitNum
    },
    methods: {
      add() {
        this.ResultNum += this.AddNum
        this.ClickNum++
        this.$emit('result', {
          ClickNum: this.ClickNum,
          ResultNum: this.ResultNum
        })
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
