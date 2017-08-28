<template>
  <el-select
    v-model='currentValue'
    filterable
    remote
    placeholder='请输入用户名称'
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
  import {strToUnicode} from 'common/unicode-convert'
  import {usersURL} from '../config.toml'

  export default {
    props: {
      dataModel: String,
      value: Number
    },
    data() {
      return {
        userList: [],
        value9: [],
        loading: false,
        currentValue: this.value ? '' : ''
      }
    },
    mounted() {
    },
    methods: {
      remoteMethod(query) {
        console.log('this.currentValue', this.currentValue)
        if (query !== '') {
          this.$emit('input', this.currentValue)
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
    watch: {
      value(newVal) {
        this.currentValue = newVal
      }
    },
    computed: {}

  }
</script>
