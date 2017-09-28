<template lang="pug">
  kalix-select(v-model="currentValue" placeholder="请选择申请部门" style="width:100%"
  appName="USERORGS" v-on:selectChange="onChange" v-bind:requestUrl="requestUrl")
</template>
<script type="text/ecmascript-6">
  import {SelectMixin} from './SelectMixin'
  import Cache from 'common/cache'

  const UserOrgsURL = '/camel/rest/users/[usersId]/orgs'

  export default {
    mixins: [SelectMixin],
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
