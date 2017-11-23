<template lang="pug">
  div.chat_avatar
    img.avatar(v-bind:src="avatar")
    div.text {{text}}
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      avatar: '',
      text: ''
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .chat_avatar
    display flex
    justify-content flex-start
    align-items center
    font-size 0
    cursor pointer
    .avatar
      display block
      width 30px
      height 30px
      border-radius 50%
      overflow hidden
      margin-right 9px
    .text
      display block
      font-size 14px
      color #ffffff
</style>
