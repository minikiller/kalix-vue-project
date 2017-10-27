<template lang="pug">
  kalix-dialog.dataauth-addUser(bizKey="dataauth" ref="kalixBizDialog"
  style="width:1100px;left:20%")
   div.el-dialog__header(style="#5fa2dd")
   div.el-form(slot="dialogFormSlot" )
    el-transfer(v-model="value3" style="width:100%" filterable
    v-bind:left-default-checked="[2, 3]"
    v-bind:right-default-checked="[1]"
    v-bind:titles="['可选项', '已选项']"
    v-bind:footer-format="{noChecked: '${total}', hasChecked: '${checked}/${total}'}"
    v-bind:data="data2")
</template>

<script>
  import Dialog from '@/components/custom/baseDialog.vue'
  export default {
    data() {
      const generateData = _ => {
        console('11111222222233333333')
        const DictKey = '$USER-KEY'
        console('DictKey', DictKey)
        const data = []
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: '备选项',
            disabled: i % 4 === 0
          })
        }
        return data
      }
      return {
        data2: generateData(),
        value3: [1]
      }
    },
    components: {
      KalixDialog: Dialog
    }
  }
</script>

<style scoped>
  .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
</style>
