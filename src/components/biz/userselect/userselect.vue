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
      defaultIds: {},     // 已选择的 id 逗号分隔字符串
      defaultNames: {}    // 已选择的 name 逗号分隔字符串
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
      if (this.defaultIds && this.defaultNames) {
        // 如果有传入 defaultIds 和 defaultNames
        let _defaultIds = this.defaultIds.split(',') // 将 defaultIds 转换为 数组
        let _defaultNames = this.defaultNames.split(',') // 将 defaultNames 转换为 数组
        let _defaultIdsInt = _defaultIds.map(item => {  // 将 _defaultIds 字符串数组转化为 数字
          return item * 1
        })
        let defaultUsersObj = []  // 保存默认用户对象集合
        for (let i = 0; i < _defaultIds.length; i++) { // 如果 _defaultIds 不为空，将用户对象插入 defaultUsersObj
          defaultUsersObj.push({
            id: _defaultIdsInt[i],
            name: _defaultNames[i]
          })
        }
        console.log('meetingSummaryPersons', defaultUsersObj)
        this.userList = defaultUsersObj // 绑定输入框默认值
        this.userListDefault = defaultUsersObj // 备份输入框默认值
        this.currentValue = _defaultIdsInt  // 用户ID集合 赋给 currentValue
        this.flag = false   // 标记是否是打开文本框
        let that = this
        setTimeout(() => {  // 清空下拉菜单 防止单击文本框后 自动弹出下拉列表
          that.userList = []
        }, 20)
      }
    },
    methods: {
      onChange(value) {
        if (this.multiple) {  // 多选
          let users = this.userList.filter((item) => {
            return (value.indexOf(item.id) > -1)
          })
          let _selectUser = users || []
          if (this.flag && this.userListDefault.length) { // 如果不是第一次打开并且默认用户不为空
            let usersDef = this.userListDefault.filter((item) => { // 查找 value 是否存在输入框默认值
              return (value.indexOf(item.id) > -1)
            })
            if (usersDef.length) {  // 如果默认用户，将新用户和默认用户和并
              _selectUser = users.concat(usersDef)
            }
          }
          this.selectUser = this.arrayUnique(_selectUser) // 去掉重复用户
        } else {  // 单选
          let users = this.userList.filter((item) => {
            return item.id === value
          })
          this.selectUser = users[0] || {}
        }
        this.flag = true
        console.log(`[kalix]-[userselect.vue] ${this.placeholder} this.userList is `, this.userList)
        console.log(`[kalix]-[userselect.vue] ${this.placeholder} value is `, value)
        console.log(`[kalix]-[userselect.vue] ${this.placeholder} currentValue is `, this.currentValue)
        console.log(`[kalix]-[userselect.vue] ${this.placeholder} current user is `, this.selectUser)
        this.$emit('userSelected', this.selectUser)  // 发送事件}
      },
      remoteMethod(query) {
        if (query !== '') {
//          this.$emit('input', this.currentValue)  // 设置model的数值
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
      },
      arrayUnique(arr) {
        // 用户对象去重
        let res = []
        if (arr.length > 0) {
          res = [arr[0]]
          for (let i = 1; i < arr.length; i++) {
            let repeat = false
            for (let j = 0; j < res.length; j++) {
              if (arr[i].id === res[j].id) {
                repeat = true
                break
              }
            }
            if (!repeat) {
              res.push(arr[i])
            }
          }
        }
        return res
      }
    },
    watch: {
      currentValue(newValue) {
        this.$emit('input', newValue)  // 设置model的数值
      }
    }
  }

</script>


