<template lang="pug">
  div
    kalix-qrcode(:value="'http://baidu.com'")
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

</style>
