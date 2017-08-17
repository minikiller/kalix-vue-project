<template lang="pug">
  el-pagination(slot="pagination"
  v-if="totalCount"
  v-on:size-change="pagerSizeChange"
  v-on:current-change="pagerCurrentChange"
  v-bind:current-page="currentPage"
  v-bind:page-sizes="pageSizes"
  v-bind:page-size="1"
  layout="total, sizes, prev, pager, next, jumper"
  v-bind:total="totalCount")
</template>

<script type="text/ecmascript-6">
  import {PageConfig} from 'config/global.toml'

  export default {
    props: {
      totalCount: {
        type: Number,
        default: 0
      },
      currentPage: {
        type: Number,
        default: 1
      },
      pageSizes: {
        default: () => {
          return PageConfig.sizes
        }
      },
      limit: {
        default: () => {
          PageConfig.sizes[0]
        }
      },
      start: {
        default: 0
      }
    },
    mounted() {
    },
    methods: {
      pagerSizeChange(val) {
        this.$emit('pagerSizeChange', val)
      },
      pagerCurrentChange(val) {
        this.$emit('pagerCurrentChange', val)
      }
    }
  }
</script>

<style scoped lang='stylus' type='text/stylus'>
</style>
