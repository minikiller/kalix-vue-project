<template lang="pug">
  el-select(v-model="currentValue" v-bind:placeholder="placeholder" v-on:change="onChange")
    el-option(v-for="item in options"
    v-bind:key="item.id"
    v-bind:label="item.name"
    v-bind:value="item.id")
</template>
<script type="text/ecmascript-6">
  import Cache from 'common/cache'

  export default {
    props: ['requestUrl', 'placeholder', 'value', 'appName'],
    data() {
      return {
        currentValue: this.value,
        options: []
      }
    },
    created() {
      this.initOptions()
    },
    methods: {
      initOptions() {
        const DictKey = `${this.appName.toUpperCase()}-KEY`
        if (!Cache.get(DictKey)) {
          this.$http
            .get(this.requestUrl, {
              params: {page: 1, start: 0, limit: 20}
            })
            .then(res => {
              this.options = res.data.data
              Cache.save(DictKey, JSON.stringify(this.options))
            })
        } else {
          this.options = JSON.parse(Cache.get(DictKey))
        }
      },
      onChange(value) {
        let item = this.options.find(e => {
          return e.id === value
        })
        this.$emit('selectChange', item)
      }
    },
    watch: {
      currentValue(newValue, oldValue) {
        console.log('newValue:', newValue)
        this.$emit('input', newValue)
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
