<template lang="pug">
  im-box
    user-avatar(slot="imHeader")
    div.group_list(slot="imBody")
      org-list-item(v-for="(item,index) in treeData" v-bind:key="item.id" v-bind:item="item")
</template>
<script type="text/ecmascript-6">
  import ImBox from './imBox'
  import UserAvatar from './userAvatar'
  import OrgListItem from './orgListItem'

  export default {
    props: {},
    data() {
      return {
        treeData: []
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      /**
       * 获取组织机构
       *
       */
      getData() {
        let url = '/camel/rest/orgs?node=root'
        this.axios.request({
          method: 'GET',
          url: url,
          params: {}
        }).then(res => {
          this.analyze(res.data.children[0])
        })
      },
      /**
       * 分解对象
       * @param arr
       */
      analyze(arr) {
        if (arr.children && arr.children.length > 0) {
          arr.children.forEach(item => {
            this.$set(item, 'active', false)
            this.treeData.push(item)
            this.analyze(item)
          })
        }
      }
    },
    components: {
      ImBox,
      UserAvatar,
      OrgListItem
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">

</style>
