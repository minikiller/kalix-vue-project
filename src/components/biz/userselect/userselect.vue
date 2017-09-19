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
      defaultIds: {},
      defaultNames: {}
    },
    data() {
      return {
        userList: [],
        loading: false,
        currentValue: this.value,
        selectUser: {},
        userListDefault: []
      }
    },
    mounted() {
      if (this.defaultIds && this.defaultNames) {
        let _defaultIds = this.defaultIds.split(',')
        let _defaultNames = this.defaultNames.split(',')
        let meetingSummaryPersons = []
        let len = _defaultIds.length
        let _defaultIdsInt = _defaultIds.map(item => {
          return item * 1
        })
        for (let i = 0; i < len; i++) {
          meetingSummaryPersons.push({
            id: _defaultIdsInt[i],
            name: _defaultNames[i]
          })
        }
        console.log('meetingSummaryPersons', meetingSummaryPersons)
        this.userList = meetingSummaryPersons
        this.userListDefault = meetingSummaryPersons
        this.currentValue = _defaultIdsInt
        let that = this
        setTimeout(() => {
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
          this.selectUser = users || []
//          let usersDef = this.userListDefault.filter((item) => {
//            return (value.indexOf(item.id) > -1)
//          })
//          console.log(`[kalix]-[userselect.vue] usersDef `, users.push(usersDef))
//          this.selectUser = users.push(usersDef) || []
        } else {  // 单选
          let users = this.userList.filter((item) => {
            return item.id === value
          })
          this.selectUser = users[0] || {}
        }
//        ss
        console.log(`[kalix]-[userselect.vue] this.userList is `, this.userList)
        console.log(`[kalix]-[userselect.vue] value is `, value)
        console.log(`[kalix]-[userselect.vue] currentValue is `, this.currentValue)
        console.log(`[kalix]-[userselect.vue] current user is `, this.selectUser)
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
      }
    },
    watch: {
      currentValue(newValue) {
        this.$emit('input', newValue)  // 设置model的数值
      }
    }
  }
</script>


