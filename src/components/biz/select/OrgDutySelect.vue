<!--
描述：职务组件的二次封装
开发人：sunlf
开发日期：2017年8月17日
-->
<template lang="pug">
  div.kalix-select-dutys
    el-input(v-bind:placeholder="placeholder" v-model="currentValue" readonly)
      el-button(slot="append" icon="el-icon-search" v-on:click="onClick")
    el-dialog(title="选择职务" v-bind:visible.sync="dialogVisible" v-on:before-close="handleClose" v-bind:modal="false")
      div.kalix-article
        el-row.duty-row(:gutter="0")
          el-col.duty-col(:span="8")
            div.kalix-search
              div.kalix-search-hd
                i.tit_icon.iconfont.icon-organization
                | {{treeTitle}}
              div.kalix-search-bd
                el-input.kalix-search-input(placeholder="输入关键字进行过滤" v-model="filterText")
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
                  kalix-paged-table(ref="kalixPagedTable" v-bind:targetURL="targetURL" v-bind:jsonStr="jsonStr"
                  v-bind:tableHeight="tableHeight"
                  v-on:rowClick="selectRow"
                  v-bind:stripe="false"
                  highlight-current-row)
                    template(slot="tableColumnSlot" slot-scope="item")
                      el-table-column(prop="name" label="职务名称" v-on:click="selectItem(item)" )
                      el-table-column(prop="comment" label="职务描述" v-on:click="selectItem(item)")
      span.dialog-footer(slot="footer")
        el-button(v-on:click="handleClose") 取 消
        el-button(type="primary" v-on:click="onConfirm") 确 定
</template>
<script type="text/ecmascript-6">
  import DateColumn from 'views/oa/comp/dateColumn'
  import Cache from 'common/cache'
  import Message from 'common/message'

  export default {
    activated() {
      console.log('base dialog orgDuty is activated')
    },
    deactivated() {
      console.log('base dialog orgDuty is deactivated')
    },
    props: {
      placeholder: {
        default: '请选择职务'
      },
      value: null
    },
    data() {
      return {

        currentValue: this.value,
        input: '',
        dialogVisible: false,
        treeTitle: '组织机构树',
        tableTitle: '职务列表',
        iconCls: '',
        filterText: '',
        data2: [],
        orgId: '',
        orgName: '',
        dutyId: '',
        dutyName: '',
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
    },
    methods: {
      onClick() {
        this.dialogVisible = true
        this.targetURL = ''
        this.getData()
      },
      handleClose() {
        this.$refs.kalixPagedTable.clearData()
        this.dialogVisible = false
      },

      filterNode(value, data) {
        if (!value) return true
        return data.name.indexOf(value) !== -1
      },
      handleNodeClick(data) {
        this.orgId = data.id
        this.orgName = data.name
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
      },
      selectRow(row, event, column) {
        this.dutyId = row.id
        this.dutyName = row.name
      },
      onConfirm() {
        if (this.orgName === '') {
          Message.warning('请选择一个部门')
          return
        }
        if (this.dutyName === '') {
          Message.warning('请选择一个职务')
          return
        }
        this.currentValue = `${this.orgName}::${this.dutyName}`
        this.dialogVisible = false
        this.orgName = ''
        this.dutyName = ''
        this.targetURL = ''
        this.$refs.kalixPagedTable.clearData()
        this.$emit('input', this.currentValue)
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val)
      },
      orgId(val) {
        this.targetURL = `/camel/rest/orgs/${this.orgId}/dutys`
      },
      value(nv) {
        this.currentValue = this.value
      }
    },
    components: {
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
