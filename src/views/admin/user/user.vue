<template lang="pug">
  div
    el-table(:data="tableData" style="width: 100%")
      el-table-column(v-for="field in fields" :prop="field.prop" :label="field.label")
    el-pagination(v-if="pager.totalCount"
      @size-change="pagerSizeChange"
        @current-change="pagerCurrentChange"
        :current-page="pager.currentPage"
        :page-sizes="pager.pageSizes"
        :page-size="1"
    layout="total, sizes, prev, pager, next, jumper"
      :total="pager.totalCount")
</template>
<script type="text/ecmascript-6">
  import {PageConfig, usersURL} from 'config/global.toml'

  export default {
    data() {
      return {
        tableData: [],
        totalCount: 0,
        pager: {
          totalCount: 0,
          pageSizes: PageConfig.sizes,
          currentPage: 1,
          limit: PageConfig.sizes[0],
          start: 0
        },
        fields: [
          {prop: 'id', label: '工号'},
          {prop: 'loginName', label: '登录名'},
          {prop: 'name', label: '姓名'},
          {prop: 'sex', label: '性别'},
          {prop: 'workGroup', label: '工作组'}
        ]
      }
    },
    created() {
      this.getData()
    },
    methods: {
      pagerSizeChange(val) {
        //  改变每页记录数
        this.pager.limit = val
        this.getData()
      },
      pagerCurrentChange(val) {
        //  翻页
        this.pager.currentPage = val
        this.getData()
      },
      getData() {
        let _data = {
          jsonStr: '',
//          loginName: that.search.form.loginName,
//          name: that.search.form.name,
          page: this.pager.currentPage,
          start: this.pager.start,
          limit: this.pager.limit
        }
        this.$http.get(usersURL, {
          params: _data
        }).then(response => {
//          if(response.data)
          this.tableData = response.data.data
          this.pager.totalCount = response.data.totalCount
        })
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
