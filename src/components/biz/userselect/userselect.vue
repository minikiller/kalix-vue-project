<!--
描述：支持远程查询的用户select组件
     显示用户名，保存的是用户id
开发人：sunlf
开发日期：2017年8月25日
-->
<template>
  <el-select
    v-model='currentValue'
    filterable
    remote
    multiple="multiple"
    placeholder='请输入用户名称'
    :remote-method='remoteMethod'
    :loading='loading' v-on:change="onChange">
    <el-option
      v-for='user in userList'
      :key='user.id'
      :label='user.name'
      :value='user.id'>
    </el-option>
  </el-select>
</template>

<script>
  //  import {strToUnicode} from 'common/unicode-convert'
  import {usersURL} from 'views/admin/config.toml'

  export default {
    props: {
      value: String,   // 用于绑定v-model
      multiple: Boolean, // 是否允许多选
      params: {} // 附加搜索参数
    },
    data() {
      return {
        userList: [],
        loading: false,
        currentValue: this.value,
        selectUser: {}
      }
    },
    mounted() {
    },
    methods: {
      onChange(value) {
        let users = this.userList.filter((item) => {
          return item.id === value
        })
        this.selectUser = users[0] || {}
        console.log(`[kalix]-[userselect.vue] current user is `, this.selectUser)
        this.$emit('userSelected', this.selectUser)  // 发送事件
      },
      remoteMethod(query) {
        if (query !== '') {
          this.$emit('input', this.currentValue)  // 设置model的数值
          this.loading = true
          setTimeout(() => {
            this.loading = false
//            let val = strToUnicode(query)
            let _jsonStr = {'%name%': query}
            _jsonStr = Object.assign(_jsonStr, this.params)
            let _data = {
              jsonStr: JSON.stringify(_jsonStr),
              page: 1,
              start: 0,
              limit: 200
            }
            this.axios.get(usersURL, {
              params: _data
            }).then(response => {
              this.userList = response.data.data
            })
          }, 100)
        } else {
          this.userList = []
        }
      }
    }
  }
</script>


