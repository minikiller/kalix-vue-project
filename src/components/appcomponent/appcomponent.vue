<!--
描述：显示系统应用组件
     显示系统应用名
开发人：zangyanming
开发日期：2017年9月1日
-->
<template>
  <el-select
    v-model='currentValue'
    remote
    :remote-method='remoteMethod'
    :loading='loading' v-on:change="onChange">
    <el-option
      v-for='app in appList'
      :key='app.id'
      :label='app.text'
      :value='app.id'>
    </el-option>
  </el-select>
</template>

<script>
  //  import {strToUnicode} from 'common/unicode-convert'
  import {appsURL} from 'views/admin/config.toml'

  export default {
    props: {
      value: {
        required: true
      }   // 用于绑定v-model
    },
    data() {
      return {
        appList: [],
        loading: false,
        currentValue: this.value,
        selectApp: {}
      }
    },
    mounted() {
    },
    methods: {
      onChange(value) {
        let apps = this.appList.filter((item) => {
          return item.id === value
        })
        this.selectApp = apps[0] || {}
        console.log(`[kalix]-[appselect.vue] current app is `, this.selectApp)
        this.$emit('appSelected', this.selectApp)  // 发送事件
      },
      remoteMethod(query) {
        if (query !== '') {
          this.$emit('input', this.currentValue)  // 设置model的数值
          this.loading = true
          setTimeout(() => {
            this.loading = false
            let _data = {
              page: 1,
              start: 0,
              limit: 200
            }
            this.axios.get(appsURL, {
              params: _data
            }).then(response => {
              this.appList = response.data.data
            })
          }, 100)
        } else {
          this.appList = []
        }
      }
    }
  }
</script>


