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
yarn add pug pug-loader -D
```

modify build/webpack.base.conf.js file
```xml
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      }
```

## add toml
```xml
yarn add toml-loader -D
```
modify build/webpack.base.conf.js file
```xml
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.toml$/,
        loader: 'toml-loader'
      }
```

## add stylus
```xml
yarn add stylus-loader -D
yarn add stylus
```

modify build/utils.js file
