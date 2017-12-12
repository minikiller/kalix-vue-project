module.exports = file => () => import(/* webpackChunkName: "kalix-components" */'@/components/' + file)
