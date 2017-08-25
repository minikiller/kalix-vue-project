<!--
描述：支持远程查询的用户select组件
开发人：sunlf
开发日期：2017年8月17日
-->
<template>
  <div>
    <el-option
      v-for='user in userList'
      :key='user.id'
      :label='user.name'
      :value='user.id'>
    </el-option>
  </div>
</template>

<script>
  export default {
    props: {
      userList: String
    },
    watch: {
      userList(v) {
        console.log('option is :' + this.$parent.$data.userList)
      }
    }
  }
</script>

