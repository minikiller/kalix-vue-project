<!--
描述：basetree 树形控件
开发人：hqj
开发日期：2017年8月23日
修改人：hqj
修改日期：2017年12月01日
-->

<template lang="pug">
  div.kalix-search
    div.kalix-search-hd
      i.tit_icon.iconfont.icon-organization
      | {{treeTitle}}
    div.kalix-search-bd
      el-input.kalix-search-input(placeholder="输入关键字进行过滤" v-model="filterText")
      div.kalix-tree-wrapper
        el-tree.filter-tree(v-bind:data="treeData" v-bind:props="defaultProps" node-key="id" accordion highlight-current
        v-bind:filter-node-method="filterNode" v-on:node-click="handleNodeClick" ref="baseTree")
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      treeTitle: {
        default: '组织机构树'
      },
      treeDataURL: {
        default: ''
      },
      parentNodeId: {
        default: -1
      }
    },
    data () {
      return {
        filterText: '',
        treeData: [],
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
        this.$refs.baseTree.filter(val)
      }
    },
    methods: {
      // 初始化
      fentch () {
        this.getData()
      },
      // 获取数据
      getData() {
        if (!this.treeDataURL) {
          return
        }
        let url = ''
        if (this.parentNodeId === -1) {
          url = this.treeDataURL
        } else {
          url = this.treeDataURL + '/' + this.parentNodeId
        }
        this.axios.request({
          method: 'GET',
          url: url,
          params: {}
        }).then(res => {
          this.treeData = res.data.children
          // 加载数据后自动选中第一个节点
          this.$nextTick(() => {
            const firstNode = document.querySelector('.el-tree-node')
            if (firstNode) {
              firstNode.click()
            }
          })
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
  @import "~@/assets/stylus/baseTable"
  @import "~@/assets/stylus/color.styl"
  .kalix-select-dutys
    .kalix-search
      position relative
      margin 5px
      border 1px solid border-color_1
      box-sizing border-box
      .kalix-search-hd
        background-color #5fa2dd
        color txt-color_1
        line-height 44px
        padding 0 15px
        text-align left
      .kalix-search-bd
        position absolute
        border-top 1px solid border-color_1
        font-size 0
        padding 5px 15px
        text-align left
        top 44px
        left 0
        bottom: 0;
        width: 100%;
        box-sizing: border-box;
        .kalix-search-input
          border: 1px solid #b4bccc;
          border-radius: 4px;
          box-sizing: border-box;
          overflow: hidden;
        .search-container
          display flex
        .kalix-tree-wrapper
          position: absolute;
          top 60px
          right 10px
          bottom 10px
          left 10px
          padding-right 16px
          box-sizing border-box
          overflow auto

      .el-button
        .iconfont
          font-size 14px

    .kalix-article
      position: relative;
      height 500px
      margin: -30px 0;
      .kalix-search,
      .kalix-wrapper
        height 100%
        margin 0
        box-sizing border-box
      .kalix-wrapper
        position relative
        top 0
        .kalix-wrapper-hd
          height 44px
        .kalix-wrapper-bd
          position absolute
          top 44px
          bottom 0
          left 0
          width 100%
          box-sizing border-box
          padding 12px
          .kalix-table-container
            position relative
            top 0
            height 100%
            margin 0

    .duty-row
      height 100%
      .duty-col
        height 100%
        padding 5px;
        box-sizing border-box
</style>
