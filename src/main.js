// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import AMap from 'vue-amap';

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.use(AMap);
AMap.initAMapApiLoader({
  key: 'e240b16ddfd335b79088715ff52fc16e',
  // plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType']
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
