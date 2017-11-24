<template lang="pug">
  div.qrcode
    div.title 吉林动画学院用章申请表
    kalix-qrcode.kalix-qrcode(value="http://192.168.1.109:8282/demo/qrcodelogin")
</template>

<script type="text/ecmascript-6">
  import KalixQrcode from '@/components/qrcode/qrcode'

  export default {
    components: {
      KalixQrcode
    }
  }
</script>

<style scoped lang="stylus">
  .qrcode
    text-align center
    padding 150px
    .title
      font-size 24px
      margin-bottom 50px
    .kalix-qrcode
      display inline-block
      border 1px solid #ededed
      padding 10px
</style>
