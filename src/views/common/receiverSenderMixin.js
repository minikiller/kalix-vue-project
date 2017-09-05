import Message from 'common/message'

export const receiverSenderMixin = {
  methods: {
    onDeleteChecked() {
      // 删除选中
      if (this.deleteList && this.deleteList.length > 0) {
        let ids = []
        this.deleteList.forEach(item => {
          ids.push(item.id)
        })
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return this.axios.request({
            method: 'DELETE',
            url: this.batchDeleteUrl,
            params: {
              ids: ids.join(':')
            }
          })
        }).then(response => {
          Message.success(response.data.msg)
          this.$refs.kalixTable.getData()
        }).catch(() => {
        })
      }
    },
    onTableSelectionChange(val) {
      this.deleteList = val
    },
    customToolBar(btnId) {
      switch (btnId) {
        case 'deleteChecked':
          this.onDeleteChecked()
          break
      }
    }
  }
}
