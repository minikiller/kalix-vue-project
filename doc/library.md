## add axios
### How to install:
```xml
yarn add vue-axios axios
```
And in your entry file:
```
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
```

### Usage:
This wrapper bind `axios` to `Vue` or `this` if you're using single file component.

You can `axios` like this:
```
Vue.axios.get(api).then((response) => {
  console.log(response.data)
})

this.axios.get(api).then((response) => {
  console.log(response.data)
})

this.$http.get(api).then((response) => {
  console.log(response.data)
})
```

## add vuex
```xml
yarn add vuex
```
## add pug
```xml
yarn add pug -D
```

