<!--
描述：Tree 树形控件
开发人：hqj
开发日期：2017年8月23日
-->

<template lang="pug">
  div
    el-input(placeholder="输入关键字进行过滤" v-model="filterText")
    el-tree.filter-tree(:data="data2" v-bind:props="defaultProps" default-expand-all :filter-node-method="filterNode" ref="tree2")
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import {orgsURL} from 'config/global.toml'

  export default {
    watch: {
      filterText (val) {
        this.$refs.tree2.filter(val)
      }
    },
    mounted () {
      this.fentch()
    },

    methods: {
      filterNode (value, data) {
        if (!value) {
          return true
        } else {
          return data.label.indexOf(value) !== -1
        }
      },
      fentch () {
        Vue.axios.get(orgsURL).then((response) => {
          this.data2 = response.data
          console.log('optionOrgTree is ', response.data)
        })
      }
    },

    data () {
      return {
        filterText: '',
        data2: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    }
  }
</script>
