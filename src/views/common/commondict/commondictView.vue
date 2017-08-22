<!--
描述：我的首页-数据字典-查看组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  kalix-basedict-view(v-bind:targetURL="targetURL")
</template>

<script type="text/ecmascript-6">
  import {CommonDictURL} from '../config.toml'
  import BasedictView from '@/components/biz/dict/basedictView'

  export default {
    data() {
      return {
        targetURL: CommonDictURL
      }
    },
    components: {
      KalixBasedictView: BasedictView
    },
    methods: {}
  }
</script>

