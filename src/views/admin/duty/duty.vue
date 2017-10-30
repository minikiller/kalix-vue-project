<template lang="pug">
  div.kalix-article
    el-row.duty-row(:gutter="0")
      el-col.duty-col(:span="8")
        div.kalix-search
          div.kalix-search-hd
            i.tit_icon.iconfont.icon-organization
            | {{treeTitle}}
          div.kalix-search-bd
            el-input(placeholder="输入关键字进行过滤" v-model="filterText")
            div.kalix-tree-wrapper
              el-tree.filter-tree(v-bind:data="data2"
              v-bind:props="defaultProps" accordion
              node-key="id" highlight-current
              v-bind:default-expanded-keys="[40810]"
              v-bind:filter-node-method="filterNode" v-on:node-click="handleNodeClick"
              ref="tree2")
      el-col.duty-col(:span="16")
        div.kalix-wrapper
          div.kalix-wrapper-hd
            i(v-bind:class="iconCls")
            | {{tableTitle}}
          div.kalix-wrapper-bd
            div.kalix-table-container(ref="kalixTableContainer" v-bind:style="tableContainerStyle")
              kalix-paged-table(ref="pagedTable" v-bind:targetURL="targetURL" v-bind:jsonStr="jsonStr"
              v-bind:tableHeight="tableHeight")
                template(slot="tableColumnSlot")
                  el-table-column(prop="name"  label="职务名称")
                  el-table-column(prop="comment" label="职务描述")
                  el-table-column(prop="createBy" label="创建人")
                  kalix-date-column(prop="creationDate" label="创建日期")
</template>

<script>
  import PagedTable from '@/components/custom/pagedTable'
  import DateColumn from 'views/oa/comp/dateColumn'
  import Cache from 'common/cache'

  export default {
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val)
      },
      orgId(val) {
        this.targetURL = `/camel/rest/orgs/${this.orgId}/dutys`
      }
    },

    methods: {
      filterNode(value, data) {
        if (!value) return true
        return data.name.indexOf(value) !== -1
      },
      handleNodeClick(data) {
        this.orgId = data.id
      },
      getData() {
        let url = '/camel/rest/orgs?node=root'
        this.axios.request({
          method: 'GET',
          url: url,
          params: {}
        }).then(res => {
          this.data2 = res.data.children
          this._getTableHeight()
        })
        const currentTreeListItem = JSON.parse(Cache.get('currentTreeListItem'))
        if (currentTreeListItem) {
          this.iconCls = currentTreeListItem.iconCls
        }
      },
      _getTableHeight() {
        if (this.$refs.kalixTableContainer && this.$refs.kalixTableContainer.clientHeight) {
          this.tableHeight = this.$refs.kalixTableContainer.clientHeight - 32
        }
        console.log('this.tableHeight', this.$refs.kalixTableContainer.clientHeight)
      }
    },

    data() {
      return {
        treeTitle: '组织机构树',
        tableTitle: '职务列表',
        iconCls: '',
        filterText: '',
        data2: [],
        orgId: '',
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
    components: {
      KalixPagedTable: PagedTable,
      KalixDateColumn: DateColumn
    },
    computed: {
      tableContainerStyle() {
        return {}
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "~@/assets/stylus/baseTable"
  @import "~@/assets/stylus/color.styl"
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
    height 100%
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
