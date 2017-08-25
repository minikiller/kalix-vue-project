<!--
描述：数据字典select组件
开发人：sunlf
开发日期：2017年8月24日
-->
<template lang="pug">
  div
    el-option(v-for="item in items" v-bind:key="item.value" v-bind:label="item.label" v-bind:value="item.value")
</template>

<script type="text/ecmascript-6">
  import Cache from 'common/cache'

  export default {
    props: {
      appName: '',   // 应用名称
      dictType: ''   // 数据字典类别
    },
    mounted() {
      this.visibleChange()
    },
    methods: {
      visibleChange() {
        const DictKey = `${this.appName.toUpperCase()}-DICT-KEY`
        let data_ = JSON.parse(Cache.get(DictKey)) // get data from cache
        this.items = data_.filter(item => {
          return item.type === this.dictType
        })
      }
    },
    data() {
      return {
        items: []
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
