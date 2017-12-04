<template lang="pug">
  kalix-qrcode(title="企业信息登记表" v-bind:resUrl="QrcodeRequestUrl('/qrcode/login/com')")
</template>
<script type="text/ecmascript-6">
  import {QrcodeMixin} from './qrcodeMixin'

  export default {
    mixins: [QrcodeMixin]
  }
</script>
