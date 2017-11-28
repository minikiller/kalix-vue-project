<!--
描述：数据字典select组件
开发人：sunlf
开发日期：2017年8月24日
-->
<template lang="pug">
  el-select(v-model='currentValue' v-on:input="change($event)" v-bind:disabled="disabled"
  v-bind:placeholder='placeholder')
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
      value: null
    },
    mounted() {
      this.getDict()
    },
    methods: {
      change: function (val) {
        this.$emit('input', val)
      },
      getDict() {
        this.name = this.appName.toUpperCase()
        if (this.name) {
          const DictURL = `/camel/rest/${this.name}/dicts`
          const DictKey = `${this.name.toUpperCase()}-DICT-KEY`
          if (!Cache.get(DictKey)) {
            const data = {
              page: 1,
              start: 0,
              limit: 200
            }
            this.axios.get(DictURL, {
              params: data
            }).then(response => {
              if (response.data) {
                Cache.save(DictKey, JSON.stringify(response.data.data))
                this.initItems(response.data.data)
              }
            })
          } else {
            this.visibleChange()
          }
        }
      },
      visibleChange() {
        const DictKey = `${this.appName.toUpperCase()}-DICT-KEY`
        let data_ = JSON.parse(Cache.get(DictKey)) // get data from cache
        this.initItems(data_)
      },
      initItems(data_) {
        this.items = data_.filter(item => {
          return item.type === this.dictType
        })
      }
    },
    data() {
      return {
        items: [],
        currentValue: this.value
      }
    },
    watch: {
      value(nv, ov) {
        this.currentValue = nv
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
