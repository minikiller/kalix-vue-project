<template lang="pug">
  el-select(v-model="currentValue" v-bind:placeholder="placeholder" v-on:input="change($event)")
    el-option(v-for="item in options"
    v-bind:key="item[id]"
    v-bind:label="item[label]"
    v-bind:value="item[id]")
</template>
<script type="text/ecmascript-6">
  import Cache from 'common/cache'
  import Message from 'common/message'

  export default {
    props: {
      requestUrl: {
        type: String, default: ''
      },
      placeholder: {
        type: String, default: ''
      },
      warnMsg: {
        type: String, default: '数据获得失败!'
      },
      value: null,
      appName: {
        type: String, default: ''
      },
      label: {
        default: 'name'
      },
      id: {
        default: 'id'
      }
    },
    data() {
      return {
        currentValue: this.value,
        options: []
      }
    },
    mounted() {
      this.initOptions()
    },
    methods: {
      initOptions() {
        const DictKey = `${this.appName.toUpperCase()}-KEY`
        if (Cache.get(DictKey) !== undefined) {
//          console.log('this.requestUrl 111:')
          this.$http
            .get(this.requestUrl, {
              params: {page: 1, start: 0, limit: 20}
            })
            .then(res => {
              this.options = res.data
              if (res.data.totalCount === 0) {
                Message.warning(this.warnMsg)
              }
              if (res.data.data) {
                this.options = res.data.data
              }
              Cache.save(DictKey, JSON.stringify(this.options))
            })
        } else {
          this.options = JSON.parse(Cache.get(DictKey))
        }
      },
      change(value) {
        this.$emit('input', value)
        let item = this.options.find(e => {
          return e.id === value
        })
        this.$emit('selectChange', item)
        console.log('newValue:', item)
      }
    },
    watch: {
      value(newValue, oldValue) {
        console.log('newValue:', newValue)
        this.currentValue = newValue
//        this.$emit('input', newValue)
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
