<template lang="pug">
  kalix-select(v-model="currentValue" placeholder="请选择会议地点" style="width:100%"
  appName="MEETINGROOMS" v-on:selectChange="onChange" v-bind:requestUrl="requestUrl")
</template>
<script type="text/ecmascript-6">
  import {SelectMixin} from './SelectMixin'

  const MeetingRoomsURL = '/camel/rest/meetingrooms'
  export default {
    mixins: [SelectMixin],
    data() {
      return {
        requestUrl: MeetingRoomsURL
      }
    },
    created() {
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
