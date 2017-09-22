<!--
描述：basetree 树形控件
开发人：hqj
开发日期：2017年8月23日
-->

<template lang="pug">
  div
    el-input(placeholder="输入关键字进行过滤" v-model="filterText")
    el-tree.filter-tree(:data="data2" v-bind:props="defaultProps" v-bind:filter-node-method="filterNode" ref="tree2"
    v-on:node-click="handleNodeClick")
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import {orgURL} from 'config/global.toml'

  export default {
    data () {
      return {
        filterText: '',
        data2: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },
    mounted () {
      this.fentch()
    },
    watch: {
      filterText (val) {
        this.$refs.tree2.filter(val)
      }
    },
    methods: {
      fentch () {
        Vue.axios.get(orgURL).then((response) => {
          this.data2 = response.data
          console.log('optionOrgTree is ', response.data)
        })
      },
      filterNode (value, data) {
        if (!value) {
          return true
        } else {
          return data.name.indexOf(value) !== -1
        }
      },
      handleNodeClick (data) {
        this.$emit('nodeClick', data)
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  .el-tree
    position absolute
    z-index 99
    min-width 100%
</style>
