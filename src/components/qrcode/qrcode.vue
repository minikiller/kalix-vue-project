<!--
描述：封装了统一的二维码组件
开发人：sunlf
开发日期：2017年11月23日
-->

<template lang="pug">
  div
    qrcode-vue(
    v-bind:size="size"
    v-bind:value="value"
    v-bind:logo="logo"
    v-bind:bgColor="bgColor"
    v-bind:fgColor="fgColor")
</template>

<script type="text/ecmascript-6">
  import qrcodeVue from 'qrcode-vue'

  export default {
    props: {
      size: { // 二维码尺寸
        type: Number,
        default: 128
      },
      value: { // 二维码地址
        type: String,
        required: true
      }
    },
    data() {
      return {
        bgColor: '#fff',
        fgColor: '#000',
        logo: '/static/images/logo.png'
      }
    },
    components: {qrcodeVue}
  }
</script>

<style scoped lang="stylus">

</style>
