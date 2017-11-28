<!--
描述：数据字典select组件
开发人：sunlf
开发日期：2017年8月24日
-->
<template lang="pug">
  div(v-if="multiple")
    el-select(v-model='selectedOptions' v-bind:disabled="disabled"
    v-bind:placeholder='placeholder' v-bind:multiple="multiple")
      el-option(v-for="item in items" v-bind:key="item.value" v-bind:label="item.label" v-bind:value="item.value")
  div(v-else)
    el-select(v-model='currentValue' v-on:input="change($event)" v-bind:disabled="disabled"
    v-bind:placeholder='placeholder' v-bind:multiple="multiple")
      el-option(v-for="item in items" v-bind:key="item.value" v-bind:label="item.label" v-bind:value="item.value")
</template>

<script type="text/ecmascript-6">
  import Cache from 'common/cache'

  export default {
    props: {
      placeholder: {
        type: String,
        default: '请选择'
      },
      appName: {  // 应用名称
        type: String,
        required: true
      },
      dictType: { // 数据字典类别
        type: String,
        required: true
      },
      disabled: Boolean, // 是否禁止
      value: null,
      multiple: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        items: [],
        currentValue: this.value,
        selectedOptions: []
      }
    },
    mounted() {
      this.visibleChange()
    },
    methods: {
      change: function (val) {
        this.$emit('input', val)
      },
      visibleChange() {
        const DictKey = `${this.appName.toUpperCase()}-DICT-KEY`
        let data_ = JSON.parse(Cache.get(DictKey)) // get data from cache
        this.items = data_.filter(item => {
          return item.type === this.dictType
        })
        if (this.multiple) {
          this.selectedOptions = JSON.parse('[' + this.value + ']')
        }
      }
    },
    watch: {
      value(nv, ov) {
        if (this.multiple) {
          this.selectedOptions = JSON.parse('[' + nv + ']')
        } else {
          this.currentValue = nv
        }
      },
      selectedOptions(nv) {
        let rtn = nv.join(',')
        this.$emit('input', rtn)
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
