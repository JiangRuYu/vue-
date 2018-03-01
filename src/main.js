import Vue from 'vue'

import App from './component/App.vue'

import vueRouter from './router'  // 自动导入该目录下的index.js

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'normalize.css'
// 不是vue插件，导入之后只能再当前模块使用
import axios from 'axios'
import api,{domain} from './js/api.js'
import './less/index.less'

Vue.use(ElementUI)
// 配置默认域名, 这样请求的时候就不用在url里加域名了
axios.defaults.baseURL = domain;
// 我们是跨域请求的接口, 默认不会携带cookie等信息, 后端需要这些信息来判断登陆状态, 所以要设为true
axios.defaults.withCredentials = true;
// 导入axios与接口域名
// 3.1 导入配置后的axios与api, 并注入到Vue原型中 将来在实例通过this.$http调用
Vue.prototype.$http =axios;
Vue.prototype.$api = api;

new Vue({
    el: '#app',
    // 下面使用的箭头函数也是es6语法
    render: createElement => createElement(App),
    router: vueRouter
})