<template lang="pug">
  kalix-search(v-bind:bizKey="bizKey" title="字典查询" v-bind:searchForm="formModel")
    div(slot="searchFormSlot")
      el-form-item(label="类型" v-bind:class="bindCls('type')" data-type="string")
        el-input(v-model.trim="formModel.type" placeholder="请输入类型名" auto-complete="off")
      el-form-item(label="日期")
        el-date-picker(v-model="beginDate_begin" v-on:change="beginChange" type="date"  v-bind:class="bindCls('beginDate_begin')" field="beginDate:begin:gt" placeholder="选择日期")
      el-form-item(label="-")
        el-date-picker(v-model="beginDate_end" v-on:change="endChange" type="date"  v-bind:class="bindCls('beginDate_end')" field="beginDate:end:lt" placeholder="选择日期")
      el-form-item(label="cascader")
        el-cascader(v-bind:options="options" v-bind:class="bindCls('selectedOptions')" data-type="number" v-model="formModel.selectedOptions")
      el-form-item(label="SELECT")
        el-select(v-model="formModel.selectedA" v-bind:class="bindCls('selectedA')" data-type="number" placeholder="请选择")
          el-option(v-for="item in optionsA" v-bind:key="item.value" v-bind:label="item.label" v-bind:value="item.value")
      el-form-item(label="备选项")
        el-checkbox(v-model="formModel.checked") 备选项
      el-form-item(label="复选框")
        el-checkbox-group(v-model="formModel.checkList")
          el-checkbox(label="复选框 A")
          el-checkbox(label="复选框 B")
          el-checkbox(label="复选框 C")
</template>
<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'

  export default {
    data() {
      return {
        bizKey: 'scheduledict',
        formModel: {
          type: '',
          selectedOptions: [],
          selectedA: '',
          checked: false,
          checkList: [],
          beginDate_begin: '',
          beginDate_end: ''
        },
        searchFieldsDataType: {
          type: 'string'
        },
        searchFields: [
          {label: '类型', prop: 'type'}
        ],
        rules: {
          type: [
            {required: true, message: '请输入类型', trigger: 'blur'}
          ]
        },
        optionsA: [
          {
            value: '1',
            label: '黄金糕'
          },
          {
            value: '2',
            label: '双皮奶'
          },
          {
            value: '3',
            label: '蚵仔煎'
          },
          {
            value: '4',
            label: '龙须面'
          },
          {
            value: '5',
            label: '北京烤鸭'
          }
        ],
        options: [
          {
            value: '1',
            label: '指南',
            children: [
              {
                value: '11',
                label: '设计原则',
                children: [
                  {
                    value: '111',
                    label: '一致'
                  }, {
                    value: '112',
                    label: '反馈'
                  }, {
                    value: '113',
                    label: '效率'
                  },
                  {
                    value: '114',
                    label: '可控'
                  }
                ]
              },
              {
                value: '12',
                label: '导航',
                children: [
                  {
                    value: '121',
                    label: '侧向导航'
                  },
                  {
                    value: '122',
                    label: '顶部导航'
                  }
                ]
              }
            ]
          },
          {
            value: '2',
            label: '组件',
            children: [
              {
                value: '21',
                label: 'Basic',
                children: [
                  {
                    value: '211',
                    label: 'Layout 布局'
                  }, {
                    value: '212',
                    label: 'Color 色彩'
                  }, {
                    value: '213',
                    label: 'Typography 字体'
                  }, {
                    value: '214',
                    label: 'Icon 图标'
                  }, {
                    value: '215',
                    label: 'Button 按钮'
                  }
                ]
              }, {
                value: '22',
                label: 'Form',
                children: [
                  {
                    value: '221',
                    label: 'Radio 单选框'
                  }, {
                    value: '222',
                    label: 'Checkbox 多选框'
                  }, {
                    value: '223',
                    label: 'Input 输入框'
                  }, {
                    value: '224',
                    label: 'InputNumber 计数器'
                  }, {
                    value: '225',
                    label: 'Select 选择器'
                  }, {
                    value: '226',
                    label: 'Cascader 级联选择器'
                  }, {
                    value: '227',
                    label: 'Switch 开关'
                  }, {
                    value: '228',
                    label: 'Slider 滑块'
                  }, {
                    value: '229',
                    label: 'TimePicker 时间选择器'
                  }, {
                    value: '230',
                    label: 'DatePicker 日期选择器'
                  }, {
                    value: '231',
                    label: 'DateTimePicker 日期时间选择器'
                  }, {
                    value: '232',
                    label: 'Upload 上传'
                  }, {
                    value: '233',
                    label: 'Rate 评分'
                  }, {
                    value: '234',
                    label: 'Form 表单'
                  }
                ]
              }
            ]
          }
        ],
        beginDate_begin: '',
        beginDate_end: ''
      }
    },
    methods: {
      bindCls(label) {
        return label.length > 0 ? `${this.bizKey}-${label}` : ''
      },
      formatDate(_date) {
        return `${_date.getFullYear()}-${_date.getMonth() + 1}-${_date.getDate()}`
      },
      beginChange(val) {
        this.formModel.beginDate_begin = val
      },
      endChange(val) {
        this.formModel.beginDate_end = val
      }
    },
    components: {
      KalixSearch: BaseSearch
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
