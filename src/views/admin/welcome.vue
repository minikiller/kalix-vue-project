<!--
描述：admin welcome 组件
开发人：桑杨
开发日期：2017年7月14日
-->
<template lang="pug">
  div#welcome
    div Welcome to &nbsp;
      b {{name}}
</template>

<script>
  import Cache from 'common/cache'

  export default {
    data() {
      return {
        name: 'admin'
      }
    },
    mounted() {
      this.fetchData()
    },
    watch: {'$route': 'fetchData'},
    methods: {
      fetchData() {
        if (this.$route.name === 'login' || this.$route.name === 'workflow') {
          return
        }
        this.name = this.$route.params.app || this.name
        this.getDict()

//        console.log(this.$route.params.name);
      },
      getDict() {
        const DictURL = `/camel/rest/${this.name}/dicts`
        const DictKey = `${this.name.toUpperCase()}-DICT-KEY`
        if (!Cache.get(DictKey)) {
          const data = {
            page: 1,
            start: 0,
            limit: 200
          }
          this.axios.get(DictURL, {
            params: data
          }).then(response => {
            if (response.data) {
              Cache.save(DictKey, JSON.stringify(response.data.data))
              console.log(`dict cached under key ${DictKey}`, response.data)
            }
          })
        }
      }
    },
    components: {},
    computed: {}
  }
</script>
