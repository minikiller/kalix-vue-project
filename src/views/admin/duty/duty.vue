<template lang="pug">
  kalix-comm-panel(title="职务管理")
    template(slot="panelSlot")
      keep-alive
        div.duty-row
          div.duty-tree
            kalix-org-tree(v-on:orgTreeClick="onOrgTreeClick")
          div.duty-col
            kalix-base-table-original.duty-wrapper(ref="kalixBaseTable"
            bizKey='duty' title='职务列表' v-bind:targetURL='targetURL'
            v-bind:bizDialog='bizDialog' bizSearch='AdminDutySearch' v-bind:btnList='btnList' v-bind:customRender="customRender"
            v-bind:isFixedColumn="isFixedColumn" v-bind:dialogOptions="dialogOptions"
            v-bind:customTableTool="customTableTool")
              template(slot="tableColumnSlot")
                el-table-column(prop="name"  label="职务名称")
                el-table-column(prop="comment" label="职务描述")
                el-table-column(prop="orgNameCol" label="组织机构")
                el-table-column(prop="createBy" label="创建人")
                kalix-date-column(prop="creationDate" label="创建日期")
</template>

<script>
  import BaseTableOriginal from '@/components/custom/baseTableOriginal'
  import DateColumn from 'views/oa/comp/dateColumn'
  import OrgTree from '@/components/biz/tree/OrgTree'
  import {DutyComponent, DutyButtonList} from '../config.toml'
  import {registerComponent} from '@/api/register'
  import KalixCommPanel from '@/components/panel/commPanel.vue'

  // 注册全局组件
  registerComponent(DutyComponent)

  export default {
    watch: {},

    methods: {
      customTableTool(row, btnId, that) {
        switch (btnId) {
          case 'addUser':  // 增加用户
            that.whichBizDialog = ''
            let dig =
              that.bizDialog.filter((item) => {
                return item.id === 'addUser'
              })
            that.whichBizDialog = dig[0].dialog
            setTimeout(() => {
              that.$refs.kalixDialog.$refs.kalixBizDialog.open('添加用户', false, row)
            }, 20)
            break
        }
      },
      onOrgTreeClick(data) {
        this.$myConsoleLog('org data is', data.id, '#550000')
        console.log('org data is ', data.id)
        this.orgId = data.id
        this.orgName = data.name
        this.targetURL = `/camel/rest/orgs/${data.id}/dutys`
        this.dialogOptions = {
          orgId: this.orgId,
          orgName: this.orgName,
          targetURL: this.targetURL
        }
        console.log('org targetURL data is ', this.targetURL)
//        this.$refs.kalixBaseTable.getData()
      },
      customRender(_data) {
        let that = this
        console.log('org _data data is ', _data)
        _data.forEach(function (e) {
          e.orgNameCol = that.orgName
        })
        console.log('org _data data is ', _data)
      }
    },

    data() {
      return {
        dialogOptions: {},
        isFixedColumn: true,
        btnList: DutyButtonList,
        targetURL: '',
        orgId: -1,
        orgName: '',
        bizDialog: [
          {id: 'view', dialog: 'AdminDutyView'},
          {id: 'edit', dialog: 'AdminDutyAdd'},
          {id: 'add', dialog: 'AdminDutyAdd'},
          {id: 'addUser', dialog: 'AdminDutyAddUser'}
        ],
        tableHeight: 0 //  列表组件高度
      }
    },
    mounted() {
//      this.getData()
    },
    components: {
      KalixBaseTableOriginal: BaseTableOriginal,
      KalixDateColumn: DateColumn,
      KalixOrgTree: OrgTree,
      KalixCommPanel
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
  .kalix-article
    height 100%

  .duty-row
    height 100%
    display flex
    padding 5px
    .duty-tree
      padding 5px
      width 280px
      box-sizing border-box
    .duty-col
      padding 5px
      flex 1
      box-sizing border-box
      overflow hidden

</style>
