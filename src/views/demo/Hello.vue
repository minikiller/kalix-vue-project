<template lang="pug" src="./Hello.pug">
</template>

<script type="text/ecmascript-6">
  import {msg} from './Hello.toml'
  import {PageConfig} from 'config/global.toml'
  import DemoColumn from './demoColumn.vue'
  import DemoForm from './demoForm.vue'
  //  import '../../mock/index'
  let mockData = {
    name: 'sunlf',
    label: 'dfd'
  }
  export default {
    name: 'hello',
    data() {
      return {
        msg: msg,
        formModel: {},
        formRules: {
          name: [
            {required: true, message: '请输入 name', trigger: 'blur'}
          ],
          label: [
            {required: true, message: '请输入 label', trigger: 'blur'}
          ]
        }
      }
    },
    mounted() {
      this.getData()
      this.formModel = mockData
    },
    components: {
      KalixDemoColumn: DemoColumn,
      KalixDemoForm: DemoForm
    },
    methods: {
      changeMsg() {
        this.msg = 'hello'
      },
      onSubmit(data) {
        alert(data)
      },
      getData() {
        console.log(PageConfig)
//        setTimeout(() => {
//          this.$http.get('/camel/rest/roles').then((resp) => {
//            console.log(resp.data.data)
//          }).catch((err) => {
//            console.log(err.message)
//          })
//        }, 5000)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  @import 'Hello.styl'
</style>
