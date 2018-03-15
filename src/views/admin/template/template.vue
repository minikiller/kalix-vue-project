<!--
描述：系统应用-模板管理
开发人：yangz
开发日期：2018年02月01日
-->
<template lang="pug">
  div(style="height:100%")
    el-row.function-row(:gutter="0" style="height:100%;display:flex;align-items:center;")
      el-col.function-col(:span="10" style="position:relative;height:100%;")
        keep-alive
          base-table(bizKey="template" title="模板列表" v-bind:targetURL="templateURL"
            v-bind:bizDialog="templateDialog" bizSearch="AdminTemplateSearch"
            v-bind:btnList="templateBtnList" v-bind:dialogOptions="dialogOptionsTemplate"
            v-bind:isAfterSearch="templateAfterSearch" v-bind:customTableTool="callCustomTableTool"
            v-on:onTableRowClick="onTemplateRowClick" v-on:handleAfterSearch="afterTemplateSearch"
            ref="templateTable")
            <!--v-on:afterDelete="afterTemplateDelete"-->
            template(slot="tableColumnSlot")
              el-table-column(prop="name" label="模板名称" align="center")
              el-table-column(prop="desc" label="模板描述" align="center")
      el-col.function-col(:span="14" style="height:100%;padding: 20px 0 0;box-sizing: border-box;")
        div(style="position:relative;height: 50%;padding-left:0px;")
          keep-alive
            base-table(bizKey="templateConfig" title="模板属性列表" v-bind:targetURL="templateConfigURL"
              v-bind:bizDialog="templateConfigDialog" v-bind:jsonStr="templateConfigJsonStr"
              v-bind:toolbarBtnList="templateConfigBtnList"
              v-bind:btnList="configBtnList" v-bind:noSearchParam="true" v-bind:dialogOptions="dialogOptions"
              ref="templateConfigTable")
              template(slot="tableColumnSlot")
                el-table-column(prop="fieldName" label="属性名" align="center")
                el-table-column(prop="fieldValue" label="属性值" align="center")
                el-table-column(prop="fieldDesc" label="属性描述" align="center")
        div(style="position:relative;height: 50%;padding-left:0px;")
          keep-alive
            base-table(bizKey="templateContent" title="模板内容列表" v-bind:targetURL="templateContentURL"
            v-bind:bizDialog="templateContentDialog" v-bind:jsonStr="templateContentJsonStr"
            v-bind:toolbarBtnList="templateConfigBtnList" v-bind:dictDefine="dictDefine"
            v-bind:isAfterSearch="templateAfterSearch" v-bind:customTableTool="callCustomTableTool"
            v-on:handleAfterSearch="afterTemplateSearch"
            v-bind:btnList="contentBtnList" v-bind:noSearchParam="true" v-bind:dialogOptions="dialogOptions"
            ref="templateContentTable")
              template(slot="tableColumnSlot")
                el-table-column(prop="templateTypeDesc" label="模板类型" align="center")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {templateURL, templateConfigURL, templateContentURL, TemplateComponent} from '../config.toml'
  import {registerComponent} from '@/api/register'
  import {templateBtnList} from '../template/index'
  import {configBtnList} from '../template/indexConfig'
  import {contentBtnList} from '../template/indexContent'

  registerComponent(TemplateComponent)
  export default {
    components: {
      BaseTable
    },
    data() {
      return {
        dialogOptionsTemplate: {
          row: {}
        },
        dialogOptions: {},
        templateURL: templateURL,
        templateAfterSearch: true,
        templateConfigURL: templateConfigURL,
        templateConfigAddDisable: true,
        templateConfigJsonStr: '',
        templateContentJsonStr: '',
        templateBtnList: templateBtnList,
        configBtnList: configBtnList,
        templateContentURL: templateContentURL,
        contentBtnList: contentBtnList,
        templateDialog: [
          {id: 'add', dialog: 'AdminTemplateAdd'},
          {id: 'view', dialog: 'AdminTemplateView'},
          {id: 'edit', dialog: 'AdminTemplateEdit'}
        ],
        templateConfigDialog: [
          {id: 'add', dialog: 'AdminTemplateConfigAdd'},
          {id: 'view', dialog: 'AdminTemplateConfigView'},
          {id: 'edit', dialog: 'AdminTemplateConfigEdit'}
        ],
        templateContentDialog: [
          {id: 'add', dialog: 'AdminTemplateContentAdd'},
          {id: 'view', dialog: 'AdminTemplateContentView'},
          {id: 'edit', dialog: 'AdminTemplateContentEdit'},
          {id: 'preview', dialog: 'AdminTemplatePreview'}
        ],
        dictDefine: [{ // 定义数据字典的显示
          cacheKey: 'ADMIN-DICT-KEY',
          type: '模板类型',
          targetField: 'templateTypeDesc',
          sourceField: 'templateType'
        }],
        templateId: undefined,
        templateTypes: []
      }
    },
    computed: {
      templateConfigBtnList() {
        return [
          {id: 'add', isShow: true, type: 'default', isDisable: this.templateConfigAddDisable}
        ]
      }
    },
    mounted() {
      this.templateConfigJsonStr = `{'templateId': '-1', '%fieldName%': ''}`
      this.templateContentJsonStr = `{'templateId': '-1'}`
      // this.$refs.templateTable.setCurrent(tableData[0])
    },
    methods: {
      onTemplateRowClick(row, event, column) {
        this.templateTypes = []
        this.searchConfigs(row.id)
        this.dialogOptions = {
          templateId: row.id,
          templateTypes: this.templateTypes
        }
      },
      isInArray(arr, value) {
        if (arr.indexOf && typeof (arr.indexOf) === 'function') {
          var index = arr.indexOf(value)
          if (index >= 0) {
            return true
          }
        }
        return false
      },
      afterTemplateSearch(bizKey, tableData) {
        if (bizKey === 'templateContent') {
          if (tableData.length > 0) {
            tableData.forEach(row => {
              if (this.isInArray(this.templateTypes, row.templateType) === false) {
                this.templateTypes.push(row.templateType)
              }
            })
          }
        }
        if (bizKey === 'template') {
          this.templateTypes = []
          if (tableData.length > 0) {
            this.$nextTick(() => {
              this.$refs.templateTable.setCurrent(tableData[0])
            })
            this.searchConfigs(tableData[0].id)
            this.templateConfigAddDisable = false
            this.dialogOptions = {
              templateId: tableData[0].id,
              templateTypes: this.templateTypes
            }
          } else {
            this.searchConfigs()
            this.templateConfigAddDisable = true
          }
        }
      },
      searchConfigs(templateId) {
        if (templateId) {
          this.templateConfigJsonStr = `{'templateId': '` + templateId + `', '%fieldName%': ''}`
          this.templateContentJsonStr = `{'templateId': '` + templateId + `'}`
        } else {
          this.templateConfigJsonStr = `{'templateId': '-1', '%fieldName%': ''}`
          this.templateContentJsonStr = `{'templateId': '-1'}`
        }
        this.$refs.templateConfigTable.getData()
        this.$refs.templateContentTable.getData()
      },
      callCustomTableTool(row, btnId, that) {
        switch (btnId) {
          case 'preview': {
            that.whichBizDialog = ''
            let dig =
              that.bizDialog.filter((item) => {
                return item.id === 'preview'
              })
            that.whichBizDialog = dig[0].dialog
            setTimeout(() => {
              that.$refs.kalixDialog.open(row)
            }, 20)
            break
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
