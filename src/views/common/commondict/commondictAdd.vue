<!--
描述：我的首页-数据字典-新增组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  kalix-basedict-add(ref="kalixBizDialog" v-bind:targetURL="targetURL" v-bind:dictTypesListURL="dictTypesListURL")
</template>

<script type="text/ecmascript-6">
  import BasedictAdd from '@/components/biz/dict/basedictAdd'
  import {CommonDictURL, CommonDictsTypesListURL} from '../config.toml'

  //  const DIALOG_FORM_TYPES_KEY = 'CommonDictDialogFormTypes'

  export default {
    methods: {},
    data() {
      return {
        targetURL: CommonDictURL,
        dictTypesListURL: CommonDictsTypesListURL
      }
    },
    created() {
    },
    components: {
      KalixBasedictAdd: BasedictAdd
    }
  }
</script>

<style scoped lang="scss" type="text/scss">
</style>
