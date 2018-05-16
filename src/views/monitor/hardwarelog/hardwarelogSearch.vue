<!--
描述：人员管理-学生维护-查詢组件
开发人：fj
开发日期：2017年8月22日
-->

<template lang="pug">
  div.kalix-search
    div.kalix-search-hd
      i.iconfont.icon-query
      | 硬件信息查询
    div.kalix-search-bd
      el-form.search-container(ref="searchForm" v-bind:model="form" v-bind:inline="true")
        el-form-item(v-for="item in searchFields" v-bind:label="item.label" v-bind:prop="item.prop" v-bind:key="item.prop")
          el-select(v-if="item.type==='select'" v-model="form[item.prop]" v-bind:class="bindCls(item.cls)" v-bind:data-type="item.dataType" v-bind:clearable="item.clearable")
            el-option(v-for="option in item.options" v-bind:key="option.value" v-bind:label="option.label" v-bind:value="option.value")
        el-form-item
          el-input(v-model="searchValue")
        el-form-item
          el-button(type="primary" v-on:click="onSubmitClick")
            i.iconfont.icon-query
            | 查询
          el-button(type="success" v-on:click="onResetClick")
            i.iconfont.icon-reset
            | 重置
</template>
<script type="text/ecmascript-6">
  import EventBus from 'common/eventbus'
  import {isEmptyObject} from 'common/util'
  import {strToUnicode} from 'common/unicode-convert'
  import {ON_SEARCH_BUTTON_CLICK} from './event.toml'

  export default {
    data() {
      return {
        searchFields: [
          {
            label: '类型',
            type: 'select',
            prop: 'type',
            options: [
              {value: 'barcode', label: '条形码'},
              {value: 'offline', label: '离线机器'}
            ],
            clearable: true
          }
        ],
        form: {},
        isSearch: false,
        queryStrs: {},
        searchValue: ''
      }
    },
    mounted() {
      this._currentForm()
    },
    methods: {
      bindFormDataType(e) {
        this.formDataType[e.prop] = e.dataType || e.type || 'string'
        this.formDataField[e.prop] = e.field || null
      },
      _currentForm() {
        this.isSearchFrom = false
        this.formDataType = {}
        this.formDataField = {}
        if (!isEmptyObject(this.searchForm)) {  // 是否传入 searchForm
          this.form = this.searchForm
          this.isSearchFrom = true
        } else {
          this.searchFields.forEach(item => {
            console.log('item', item)
            this.bindFormDataType(item)
            if (item.defaultVal) {
              this.$set(this.form, item.prop, item.defaultVal)
            } else {
              this.$set(this.form, item.prop, null)
            }
          })
        }
      },
      bindCls(label) {
        if (label) {
          return label.length > 0 ? `${this.bizKey}-${label}` : ''
        }
        return ''
      },
      onSubmitClick() {
        this.$refs.searchForm.validate((valid) => {
          if (valid) {
//            todo: 增加查询组成json串
            let requestDatas = []
            for (let item in this.form) {
              const itemVal = this.form[item]
              if (this.isSearchFrom) {  // 如果有 SearchFrom 传入
                let dataType = typeof itemVal
                let field = item
                let docItems = document.getElementsByClassName(`${this.bizKey}-${item}`)  //  根据 bizKey 和 v-model名 查找 dom 标签
                if (docItems && docItems.length === 1) {
                  //  如果 docItems 存在并且只有一个，获取当前字段的数据类型并赋值给 dataType
                  let docItem = docItems[0]
                  dataType = docItem.getAttribute('data-type')
                  field = docItem.getAttribute('field')
                  if (field && itemVal.length) {
                    let key = `"${field}"`   //  绑定 查询 key
                    let val = `${itemVal}`   //  绑定 查询 value
                    switch (dataType) {
                      case 'string':
                        //  如果 dataType 是 String 格式，key 和 val 增加双引号
                        key = `"%${field}%"`
                        if (this.isChinese(itemVal)) {
                          val = `"${strToUnicode(itemVal)}"`
                        } else {
                          val = `"${itemVal}"`
                        }
                        break
                      case 'datetime':
                        //  如果 dataType 是 Datetime 格式，val 增加双引号
                        key = `"${field}"`
                        val = `"${itemVal}"`
                        break
                      case 'orgTree':
                        val = `${itemVal}`
                        break
                    }
                    requestDatas.push(`${key}: ${val}`)
                  }
                }
              } else {
                if (itemVal) {
                  let field = item
                  let key = `"${field}"`   //  绑定 查询 key
                  let val = `"${itemVal}"`   //  绑定 查询 value
                  if (this.formDataField[item]) {
                    key = `"${this.formDataField[item]}"`
                  } else if (this.formDataType[item] === 'string') {
                    key = `"%${field}%"`
                  }
                  switch (this.formDataType[item]) {
                    case 'string':
                      if (this.isChinese(itemVal)) {
                        val = `"${strToUnicode(itemVal)}"`
                      }
                      break
                    case 'number':
                      val = `${itemVal}`
                      break
                  }
                  let strRlu = ''
                  let strKey = ''
                  console.log('searchValue-------------->', this.searchValue)
                  console.log('val-------------->', key)
                  if (val === 'offline') {
                    strKey =
                      strRlu = `"to_number(to_char(age(to_timestamp(to_char(t.creationdate,'yyyy-mm-dd'),'yyyy-mm-dd')),'dd'),'9999.99')>=7"`
                  } else {
                    strKey = `"%${itemVal}%"`
                    strRlu = `"${this.searchValue}"`
                  }
                  requestDatas.push(`${strKey}: ${strRlu}`)
                }
              }
            }
            let searchObj = {}
            if (requestDatas.length > 0) {
              searchObj.jsonStr = `{${requestDatas.join(',')}}`
//              console.log('[Search]', `{${requestDatas.join(',')}}`)
            }
            this.isSearch = true
            // 兼容多个basetable查询情况
            let searchObjAll = {}
            if (this.bizKey) {
              searchObjAll.searchObj = searchObj
              searchObjAll.bizKey = this.bizKey
            } else {
              searchObjAll = searchObj
            }
            // EventBus.$emit(ON_SEARCH_BUTTON_CLICK, searchObj)
            EventBus.$emit(ON_SEARCH_BUTTON_CLICK, searchObjAll)
          } else {
            console.log('ERR')
          }
        })
      },
      // 重置搜索框
      onResetClick() {
        this.$refs.searchForm.resetFields()
        if (this.isSearch) {
          EventBus.$emit(ON_SEARCH_BUTTON_CLICK, {})
          this.isSearch = false
        }
      }
    },
    components: {
    }
  }
</script>

<style lang='stylus' type='text/stylus'>
  @import "~@/assets/stylus/color.styl"
  @import "~@/assets/stylus/kalix-color.styl"
  .kalix-search
    margin 10px
    background-color $background-color-1
    .kalix-search-hd
      background-color $plank-title-background-color
      color $plank-title-color
      line-height 44px
      padding 0 15px
      text-align left
    .kalix-search-bd
      border-top 1px solid border-color_1
      font-size 0
      padding 8px 12px
      text-align left
      .search-container
        margin-bottom -12px
    .el-form-item
      margin-right 12px
      margin-bottom 12px
    .el-button
      .iconfont
        font-size 14px
</style>
