<!--
描述：支持远程查询的用户select组件
     显示用展赛名称，保存的是展赛id
开发人：fj
开发日期：2017年9月14日
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
      v-for='competitionInfo in competitionInfoList'
      :key='competitionInfo.id'
      :label='competitionInfo.name'
      :value='competitionInfo.id'>
    </el-option>
  </el-select>
</template>

<script>
  //  import {strToUnicode} from 'common/unicode-convert'
  import {CompetitionInfoURL} from 'views/research/config.toml'
  export default {
    props: {
      placeholder: {
        type: String,
        default: '请输入展赛名称'
      },
      value: {
        required: true
      },   // 用于绑定v-model
      multiple: { // 是否允许多选
        type: Boolean,
        default: false
      },
      params: {} // 附加搜索参数
    },
    data() {
      return {
        competitionInfoList: [],
        loading: false,
        currentValue: this.value,
        selectCompetition: {}
      }
    },
    mounted() {
    },
    methods: {
      onChange(value) {
        if (this.multiple) {  // 多选
          let competitionInfos = this.competitionInfoList.filter((item) => {
            return (value.indexOf(item.id) > -1)
          })
          this.selectCompetition = competitionInfos || []
        } else {  // 单选
          let competitionInfos = this.competitionInfoList.filter((item) => {
            return item.id === value
          })
          this.selectCompetition = competitionInfos[0] || {}
        }
        console.log(`[kalix]-[competitionselect.vue] current competition is `, this.selectCompetition)
        this.$emit('competitionSelected', this.selectCompetition)  // 发送事件}
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
            this.axios.get(CompetitionInfoURL, {
              params: _data
            }).then(response => {
              this.competitionInfoList = response.data.data
            })
          }, 100)
        } else {
          this.competitionInfoList = []
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


