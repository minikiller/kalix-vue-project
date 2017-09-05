<!--
描述：table上方工具栏组件的二次封装
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  div.kalix-base-tool-bar
    slot(name="toolBarSlot")
      template(v-for="btn in defaultBtnList")
        el-button(v-if="btn.isShow" v-on:click="toggle(btn.id)" type="primary")
          i.iconfont(v-bind:class="btn.icon")
          | {{btn.title}}
</template>

<script type="text/ecmascript-6">
  import {ON_TOOLBAR_CLICK} from './event.toml'
  import {GlobalToolBarButtonList} from 'config/global.toml'

  export default {
    props: {
      toolBarbtnList: {
        type: Array
      }
    },
    data() {
      return {
        defaultBtnList: []
      }
    },
    created() {
      this.initToolBtnList()
    },
    methods: {
      initToolBtnList() {
        let defaultToolBarBtnList = JSON.parse(JSON.stringify(GlobalToolBarButtonList))
        if (this.toolBarbtnList.length > 0) {
          this.toolBarbtnList.forEach(item => {
            let item2 = defaultToolBarBtnList.find(e => {
              if (e.id === item.id) {
                defaultToolBarBtnList.push(Object.assign(e, item))
                return true
              }
              return false
            })
            if (!item2) {
              defaultToolBarBtnList.push(item)
            }
          })
        }
        this.defaultBtnList = defaultToolBarBtnList
      },
      toggle(row, btnId) { // toolbar click event
        this.$emit(ON_TOOLBAR_CLICK, row, btnId)
      }
    }
  }
</script>
