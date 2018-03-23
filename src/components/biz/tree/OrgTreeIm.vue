<!--
描述：组织结构树组件的二次封装
开发人：sunlf
开发日期：2017年11月08日
-->
<template lang="pug">
  div
    el-input(placeholder="输入关键字进行过滤" v-model="filterText")
    el-collapse()
      el-collapse-item(v-bind:title="item.groupName" v-bind:key="item.id" v-for="(item,index) in treeData")
        div(v-if="item.addressBeanList.length" v-for="(user,i) in item.addressBeanList")
          div(onclick="") {{user.name}}
</template>
<script type="text/ecmascript-6">
  import Cache from 'common/cache'
  import EventBus from 'common/eventbus'
  let _data = {
    jsonStr: '{"userId":' + Cache.get('id') + '}'
  }
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
        // this.orgId = data.id
        // this.orgName = data.name
        // this.$emit('orgTreeClick', data) // 发送事件供外部调用
        // console.log('org tree data is ', data.id)
      },
      getData() {
        let url = '/camel/rest/addressgroups/all'
        this.axios.request({
          method: 'GET',
          url: url,
          params: _data
        }).then(res => {
          console.log('treeData:', res.data)
          this.treeData = res.data.data
//          this.analyze(res.data.data)
        })
        const currentTreeListItem = JSON.parse(Cache.get('currentTreeListItem'))
        if (currentTreeListItem) {
          this.iconCls = currentTreeListItem.iconCls
        }
      },
      /**
       * 分解对象
       * @param arr
       */
      analyze(arr) {
        if (arr && arr.length > 0) {
          arr.forEach(item => {
            console.log(item)
            this.$set(item, 'active', false)
            this.treeData.push(item)
            this.analyze(item)
          })
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
  .im-org-tree
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
