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
    :multiple="multiple"
    :placeholder='placeholder'
    :remote-method='remoteMethod'
    :loading='loading'>
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
      placeholder: {
        type: String,
        default: '请输入用户名称'
      },
      value: {
        required: true
      },   // 用于绑定v-model
      multiple: { // 是否允许多选
        type: Boolean,
        default: false
      },
      params: {}, // 附加搜索参数
      defaultOptions: {},
      defaultIds: '',     // 已选择的 id 逗号分隔字符串,
      userNames: ''
    },
    data() {
      return {
        userList: [],
        loading: false,
        currentValue: this.value,
        selectUser: {}
      }
    },
    created() {
      if (this.defaultIds) {
        // 如果有传入 defaultIds
        let _data = {
          id: this.defaultIds,
          page: 1,
          start: 0,
          limit: 200
        }
        this.axios.get(usersURL, {
          params: _data
        }).then(response => {
          this.userList = response.data.data
          this.users = response.data.data
          if (this.multiple) {
            let _defaultIds = this.defaultIds.toString().split(',') // 将 defaultIds 转换为 数组
            let _defaultIdsInt = _defaultIds.map(item => {    // 将 _defaultIds 字符串数组转化为 数字
              return item * 1
            })
            this.currentValue = _defaultIdsInt  // 用户ID集合 赋给 currentValue
          } else {
            this.currentValue = this.defaultIds * 1
          }
          let that = this
          setTimeout(() => {  // 清空 下拉列表
            that.userList = []
          }, 20)
        })
      }
    },
    methods: {
      onChange(value) {
        let _selectUser = {}
        if (this.multiple) {  // 多选
          let uList = this.users || this.userList
          let users = uList.filter((item) => {
            return (value.indexOf(item.id) > -1)
          })
          _selectUser = users || []
        } else {  // 单选
          let users = this.userList.filter((item) => {
            return item.id === value
          })
          _selectUser = users[0] || {}
        }
        let users = null
        if (Array.isArray(_selectUser)) {
          users = []
          _selectUser.forEach(e => {
            users.push(e.name)
          })
          users = users.join(',')
        } else {
          users = _selectUser.name
        }
        this.selectUser = _selectUser
        this.$emit('update:userNames', users)
        this.$emit('userSelected', _selectUser)  // 发送事件
      },
      remoteMethod(query) {
        if (query && query !== '') {
//          this.$emit('input', this.currentValue)  // 设置model的数值
          this.loading = true
          setTimeout(() => {
            this.loading = false
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
    },
    watch: {
      currentValue(newValue) {
        this.$emit('input', newValue)  // 设置model的数值
        this.onChange(newValue)
      }
    }
  }

</script>


