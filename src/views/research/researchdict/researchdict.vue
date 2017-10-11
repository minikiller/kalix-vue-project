<!--
描述：科研管理-数据字典组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  keep-alive
    kalix-base-dict(ref="baseTableRef" v-bind:bizKey="bizKey" v-bind:bizDialog="bizDialog" v-bind:dictComponent="dictComponent"
    v-bind:targetURL="targetURL" v-bind:dialogOptions="dialogOptions")
</template>

<script type="text/ecmascript-6">
  import BaseDict from '@/components/biz/dict/basedict'
  import {ResearchDictsURL, ResearchDictComponent, ResearchDictsTypesListURL} from '../config.toml'

  export default {
    data() {
      return {
        dialogOptions: {
          targetURL: ResearchDictsURL,
          dictTypesListURL: ResearchDictsTypesListURL,
          bizKey: 'dict'
        },
        bizKey: 'dict',
        dictComponent: ResearchDictComponent,
        targetURL: ResearchDictsURL,
        bizDialog: [
          {id: 'view', dialog: 'basedictView'},
          {id: 'edit', dialog: 'basedictAdd'},
          {id: 'add', dialog: 'basedictAdd'}
        ]
      }
    },
    components: {
      KalixBaseDict: BaseDict
    },
    created() {
    },
    methods: {

    }
  }
</script>

<style scoped lang="stylus">

</style>
