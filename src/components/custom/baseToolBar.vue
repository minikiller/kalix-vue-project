<!--
描述：table上方工具栏组件的二次封装
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  div.kalix-base-tool-bar
    slot(name="toolBarSlot")
      el-button(v-on:click="onAddClick" type="primary")
        i.iconfont.icon-add
        | 添加
      el-button(v-on:click="onRefreshClick" type="primary")
        i.iconfont.icon-refresh
        | 刷新
</template>

<script type="text/ecmascript-6">
  import {ON_ADD_BUTTON_CLICK, ON_REFRESH_BUTTON_CLICK} from './event.toml'

  export default {
    methods: {
      onAddClick() {
        this.$emit(ON_ADD_BUTTON_CLICK)
      },
      onRefreshClick() {
        this.$emit(ON_REFRESH_BUTTON_CLICK)
      }
    }
  }
</script>
