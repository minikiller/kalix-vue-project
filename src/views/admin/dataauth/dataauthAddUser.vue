<template lang="pug">
  el-transfer(v-model="value4")
</template>

<script>
  export default {
    data() {
      const generateData3 = _ => {
        const data = []
        for (let i = 1; i <= 15; i++) {
          data.push({
            value: i,
            desc: '',
            disabled: i % 4 === 0
          })
        }
        return data
      }
      return {
        data3: generateData3(),
        value4: []
      }
    }
  }
</script>

<style scoped>

</style>
