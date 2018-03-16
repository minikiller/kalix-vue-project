<template lang="pug">
  el-transfer.kalix-transfer(data-kalix-transfer="kalix-transfer"
  v-bind:targetURL="targetURL"
  v-bind:sourceURL="sourceURL"
  v-bind:targetID="targetID"
  v-bind:sourceType="sourceType"
  v-model="userChecked"
  style="width:100%" filterable
  v-bind:titles="['可选项', '已选项']"
  v-bind:footer-format="{noChecked: '${total}', hasChecked: '${checked}/${total}'}"
  v-bind:data="dataList"
  v-on:change="handleChange")
</template>

<script>
  export default {
    props: {
      targetURL: {
        type: String
      },
      sourceURL: {
        type: String
      },
      targetID: {
        type: Number
      },
      sourceType: {
        type: String
      }
    },
    data() {
      return {
        userList: [],
        dataList: [],
        userIds: [],
        ids: [],
        centerDialogVisible: false,
        userChecked: []
      }
    },
    created() {
    },
    mounted() {
      // 调用初始化数据的方法
      this.getData()
    },
    components: {},
    methods: {
      // 初始化数据
      getData() {
        this.axios.get(this.sourceURL, {}).then(response => {
          this.userList = response.data.data
          for (let i = 0; i < this.userList.length; i++) {
            this.dataList.push({
              key: this.userList[i].id,
              label: this.userList[i].name
            })
          }
          this.ids[0] = this.targetID.toString()
          this.getCheckedUsers()
        })
      },
      // 获取已有记录的id
      getCheckedUsers() {
        let userCheckedUrl = this.targetURL + '/' + this.targetID + '/' + this.sourceType + '/ids'
        this.axios.get(userCheckedUrl, {}).then(response => {
          if (response.data && response.data.length) {
            this.userChecked = response.data
            this.userIds = this.userChecked
          }
        })
      },
      // 选取用户之后调用的方法
      handleChange(value, direction, movedKeys) {
        if (direction === 'right') {
          this.userIds = this.userIds.concat(movedKeys)
//          this.userIds = this.userIds + ','
//          for (let i = 0; i < movedKeys.length; i++) {
//            this.userIds = this.userIds + movedKeys[i] + ','
//          }
        } else if (direction === 'left') {
          let tempId = []
          let m = 0
          for (let i = 0; i < this.userIds.length; i++) {
            let isHave = false
            for (let j = 0; j < movedKeys.length; j++) {
              if (this.userIds[i] === movedKeys[j]) {
                isHave = true
              }
            }
            if (!isHave) {
              tempId[m] = this.userIds[i]
              m++
            }
          }
          this.userIds = tempId
        }
      }
    }
  }
</script>

<style lang="stylus">
  .kalix-transfer
    text-align center
    .el-checkbox
      display block
      text-align left
      & + .el-checkbox
        margin-left 0
    .el-transfer-panel__filter
      width auto !important

  .transfer-footer
    margin-left: 20px;
    padding: 6px 5px;

  .el-transfer__button
    color #fff
    background-color #409eff
    &.is-disabled
    &:hover
      border 1px solid #dcdfe6
      background-color #f5f7fa
      color #c0c4cc

  .kalix-transfer[data-kalix-transfer]
    .el-transfer__button
      color #fff
      background-color #409eff
      &.is-disabled
      &:hover
        border 1px solid #dcdfe6
        background-color #f5f7fa
        color #c0c4cc
</style>
