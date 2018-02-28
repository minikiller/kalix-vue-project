<!--
描述：组织结构树组件的二次封装
开发人：sunlf
开发日期：2017年11月08日
-->
<template lang="pug">
  div.kalix-search
    div.kalix-search-hd
      i.tit_icon.iconfont.icon-organization
      | {{treeTitle}}
    div.kalix-search-bd
      el-input(placeholder="输入关键字进行过滤" v-model="filterText")
      div.kalix-tree-wrapper
        el-tree.filter-tree.org(v-bind:data="treeData"
        v-bind:props="defaultProps" accordion
        node-key="id" highlight-current
        v-bind:filter-node-method="filterNode" v-on:node-click="handleNodeClick"
        ref="orgTree")
</template>
<script type="text/ecmascript-6">
  import Cache from 'common/cache'
  import EventBus from 'common/eventbus'

  export default {
    activated() {
      console.log('orgTree component is activated')
      EventBus.$on('refreshData', this.getData)
    },
    deactivated() {
      console.log('orgTree component is deactivated')
      EventBus.$off('refreshData')
    },
    props: {
      placeholder: {
        default: '请选择职务'
      },
      value: null,
      organizationId: {
        default: -1
      }
    },
    data() {
      return {
        currentValue: this.value,
        input: '',
        treeTitle: '组织机构树',
        iconCls: '',
        filterText: '',
        treeData: [],
        targetURL: '',
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        jsonStr: {},
        tableHeight: 0 //  列表组件高度
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true
        return data.name.indexOf(value) !== -1
      },
      handleNodeClick(data) {
        this.orgId = data.id
        this.orgName = data.name
        this.$emit('orgTreeClick', data) // 发送事件供外部调用
      },
      getData() {
        let url = ''
        if (this.organizationId === -1) {
          url = '/camel/rest/orgs?node=root'
        } else {
          url = '/camel/rest/orgs/' + this.organizationId
        }
        this.axios.request({
          method: 'GET',
          url: url,
          params: {}
        }).then(res => {
          this.treeData = res.data.children
          // 加载数据后自动选中第一个节点
          this.$nextTick(() => {
            const firstNode = document.querySelector('.filter-tree.org>.el-tree-node')
            this.$myConsoleLog('firstNode', firstNode)
            if (firstNode) {
              firstNode.click()
            }
          })
//          this._getTableHeight()
        })
        const currentTreeListItem = JSON.parse(Cache.get('currentTreeListItem'))
        if (currentTreeListItem) {
          this.iconCls = currentTreeListItem.iconCls
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.orgTree.filter(val)
      },
      orgId(val) {
        this.targetURL = `/camel/rest/orgs/${this.orgId}/dutys`
      }
    },
    components: {},
    computed: {}

  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "~@/assets/stylus/baseTable"
  @import "~@/assets/stylus/color.styl"
  .kalix-search
    position relative
    border 1px solid border-color_1
    box-sizing border-box
    display flex
    flex-flow column
    height 100%
    overflow auto
    .kalix-search-hd
      color txt-color_1
      line-height 44px
      padding 0 15px
      text-align left
    .kalix-search-bd
      border-top 1px solid border-color_1
      font-size 0
      padding 5px 15px
      text-align left
      width 100%
      box-sizing border-box
      flex 1
      display flex
      flex-flow column
      .kalix-search-input
        border-radius: 4px;
        box-sizing: border-box;
        overflow: hidden;
      .search-container
        display flex
      .kalix-tree-wrapper
        flex 1
        padding-right 16px
        box-sizing border-box
        overflow auto
        margin-right -15px
        margin-top 10px

      .filter-tree
        background-color transparent
    .el-button
      .iconfont
        font-size 14px

  /*
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
        box-sizing border-box*/
</style>

<style lang="stylus" type="text/stylus">
  .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content
    background-color transparent
    font-weight 700

  .el-tree-node:focus > .el-tree-node__content, .el-tree-node__content:hover
    background-color transparent
</style>
