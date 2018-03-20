<!--
描述：当前登录用户的所在部门的下拉列表
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  kalix-select(v-model="currentValue" placeholder="请选择申请部门" v-bind:clearable="clearable" style="width:100%"
    v-bind:disabled="disabled" appName="USERORGS" v-on:selectChange="onChange" v-bind:requestUrl="requestUrl" warnMsg="当前登录用户无法找到组织机构！")
</template>
<script type="text/ecmascript-6">
  import {SelectMixin} from './SelectMixin'
  import Cache from 'common/cache'

  const UserOrgsURL = '/camel/rest/users/[usersId]/orgs'

  export default {
    mixins: [SelectMixin],
    props: {
      clearable: {
        type: Boolean,
        default: true
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        requestUrl: UserOrgsURL.replace('[usersId]', Cache.get('id'))
      }
    },
    created() {
//      this._initDict(`${'UserOrgs'.toUpperCase()}-KEY`, UserOrgsURL.replace('[usersId]', Cache.get('id')))
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
