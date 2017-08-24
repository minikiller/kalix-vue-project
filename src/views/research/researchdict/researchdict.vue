<!--
描述：科研管理-字典维护组件
开发人：sunlf
开发日期：2017年8月17日
-->
<template lang="pug">
  div
    el-select(v-on:visible-change="visibleChange")
      el-option(v-for="item in items" v-bind:key="item.name" v-bind:label="item.label" v-bind:value="item.value")

</template>

<script type="text/ecmascript-6">
  import Cache from 'common/cache'

  export default {
    methods: {
      visibleChange() {
        const DictKey = `OA-DICT-KEY`
        let mydata = JSON.parse(Cache.get(DictKey))
        console.log(mydata)
        this.items = mydata.filter(item => {
          return item.type === this.dictType
        })
        console.log(this.items)
      }
    },
    data() {
      return {
        dictType: '印章类型',
        items: []
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
