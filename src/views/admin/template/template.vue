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
            v-on:onTableRowClick="onTemplateRowClick" v-on:afterSearch="afterTemplateSearch" v-on:afterDelete="afterTemplateDelete"
            ref="templateTable" )
            template(slot="tableColumnSlot")
              el-table-column(prop="name" label="模板名称" align="center")
              el-table-column(prop="desc" label="模板描述" align="center")
      el-col.function-col(:span="14" style="height:100%;padding: 20px 0 0;box-sizing: border-box;")
        div(style="position:relative;height: 100%;padding-left:0px;")
          keep-alive
            base-table(bizKey="templateConfig" title="模板属性列表" v-bind:targetURL="templateConfigURL"
              v-bind:bizDialog="templateConfigDialog" v-bind:jsonStr="templateConfigJsonStr"
              v-bind:btnList="templateBtnList" v-bind:noSearchParam="true" v-bind:dialogOptions="dialogOptions"
              ref="templateConfigTable" )
              template(slot="tableColumnSlot")
                el-table-column(prop="fieldName" label="属性名" align="center")
                el-table-column(prop="fieldDesc" label="属性描述" align="center")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {templateURL, templateConfigURL, TemplateComponent} from '../config.toml'
  import {registerComponent} from '@/api/register'
  import {templateBtnList} from '../template/index'
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
        templateConfigURL: templateConfigURL,
        templateConfigJsonStr: '',
        templateBtnList: templateBtnList,
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
        templateId: undefined
      }
    },
    mounted() {
      this.templateConfigJsonStr = `{'templateId': '-1', '%fieldName%': ''}`
    },
    methods: {
      onTemplateRowClick(row, event, column) {
        this.dialogOptions = {
          templateId: row.id
        }
        this.searchConfigs(row.id)
      },
      afterTemplateSearch(val) {
        if (val === 'template') {
          this.searchConfigs()
        }
      },
      afterTemplateDelete() {
        this.searchConfigs()
      },
      searchConfigs(templateId) {
        if (templateId) {
          this.templateConfigJsonStr = `{'templateId': '` + templateId + `', '%fieldName%': ''}`
        } else {
          this.templateConfigJsonStr = `{'templateId': '-1', '%fieldName%': ''}`
        }
        this.$refs.templateConfigTable.getData()
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
