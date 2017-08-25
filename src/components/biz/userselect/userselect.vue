<!--
描述：支持远程查询的用户select组件
开发人：sunlf
开发日期：2017年8月17日
-->
<template>
  <el-select
    filterable
    remote
    placeholder='请输入用户名称'
    :remote-method='remoteMethod'
    :loading='loading'>
  </el-select>
</template>

<script>
  import {strToUnicode} from 'common/unicode-convert'
  import {usersURL} from 'views/admin/config.toml'
  import UserOption from './useroption.vue'

  export default {
    data() {
      return {
        userList: [],
        loading: false
      }
    },
    mounted() {
    },
    methods: {
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            let val = strToUnicode(query)
            let _data = {
              jsonStr: `{"%name%": "` + val + `"}`,
              page: 1,
              start: 0,
              limit: 200
            }
            this.axios.get(usersURL, {
              params: _data
            }).then(response => {
              this.userList = response.data.data
              console.log(`option4 is`, this.userList)
            })
          }, 200)
        } else {
          this.userList = []
        }
      }
    },
    components: {
      UserOption
    }
  }
</script>

