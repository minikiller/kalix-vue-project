<template lang="pug">
  im-box
    user-avatar(slot="imHeader")
    kalix-org-tree-im(slot="imBody" v-on:orgTreeClick="onOrgTreeClick")
</template>
<script type="text/ecmascript-6">
  import ImBox from './imBox'
  import UserAvatar from './userAvatar'
  import OrgListItem from './orgListItem'
  import KalixOrgTreeIm from '@/components/biz/tree/OrgTreeIm'

  export default {
    props: {},
    data() {
      return {
        tData: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        treeData: []
      }
    },
    mounted() {
    },
    methods: {
      onOrgTreeClick(data) {
      },
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
          this.tData = res.data.children
          console.log(' ===== this.tData: ===== ', this.tData)
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
      OrgListItem,
      KalixOrgTreeIm
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">

</style>
