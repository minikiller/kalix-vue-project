# develop rules
> 这里明确规定了各种方法的调用方式，用于开发人员

## ajax call
```xml
  this.$http.get(api).then((resp) => {
    console.log(resp.data)
  }).catch((err) => {
              console.log(err.message)
            })
```

## vue template
```xml
  <template lang="pug">
      div
  </template>
  
  <script type="text/ecmascript-6">
      export default {
      }
  </script>
  
  <style scoped lang="stylus">
  
  </style>
```
