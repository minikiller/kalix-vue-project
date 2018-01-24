<template lang="pug">
  div.user-avatar(v-on:click="click" v-bind:class="cls")
    div.avatar(v-bind:style="styleObject")
    div.user-name {{user.userName}}
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      user: {
        type: Object,
        default: {
          userName: '',
          avatar: ''
        }
      },
      cls: {
        type: String,
        default: 'comm'
      }
    },
    methods: {
      styleObject() {
        let style = {}
        if (this.user.avatar) {
          style = {
            backgroundImage: `url('${this.user.avatar}')`
          }
        }
        return style
      },
      click() {
        this.$emit('click')
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .user-avatar
    display flex
    justify-content flex-start
    align-items center
    font-size 0
    padding 0 14px
    .avatar
      position relative
      display block
      border-radius 50%
      overflow hidden
      background url('./default_user.png') 50% 50% no-repeat
      background-size cover
    &.comm
      cursor pointer
      .avatar
        width 30px
        height 30px
        margin-right 9px
        border 1px solid #ffffeb
      .user-name
        font-size 14px
        color #ffffff
    &.operation
      .avatar
        margin 8px !important
        width 40px
        height 40px
      .user-name
        font-size 22px
        line-height 22px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
</style>
