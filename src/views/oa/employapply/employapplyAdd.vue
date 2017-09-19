<template lang="pug">
  div(v-if="isVisible")
    el-button(v-on:click="close") 关闭
    div
      kalix-user-select(v-bind:params="params" style="width:100%"
      v-on:userSelected="onImportantAttendeesSelected"
      v-model="importantAttendees" v-bind:multiple="multiple" placeholder="请输入重要出席人")
    div importantAttendees : {{importantAttendees}}
</template>
<script type="text/ecmascript-6">
  import UserSelect from '@/components/biz/userselect/userselect'

  export default {
    data() {
      return {
        multiple: true,
        isVisible: false,
        importantAttendees: [],
        params: {}
      }
    },
    methods: {
      open() {
        this.isVisible = true
      },
      close() {
        this.isVisible = false
        this.$emit('selected', this.importantAttendees)
      },
      onImportantAttendeesSelected() {
      }
    },
    components: {
      KalixUserSelect: UserSelect
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
