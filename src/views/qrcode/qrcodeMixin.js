import KalixQrcode from './qrcode.vue'

export const QrcodeMixin = {
  data() {
    return {
      origin: window.location.origin
    }
  },
  components: {
    KalixQrcode
  },
  methods: {
    QrcodeRequestUrl(url) {
      return this.origin + url
    }
  }
}
