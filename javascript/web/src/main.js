
import Vue                      from "vue"
import App                      from "./App.vue"
import router                   from "./router.js"

// -----------------------> Config <-------------------------- //
Vue.config.productionTip = false
Vue.config.performance = true;
Vue.prototype.$log = console.log.bind( console ); // log from html

import IlseRequire                  from "@/classes/IlseRequire.js"
Vue.prototype.irequire = new IlseRequire()

// import ilse                  from "@/ilse.js"
// Vue.prototype.ilse           = ilse
// -----------------------> Config <-------------------------- //

import i18n from './i18n'

// -----------------------> Init <-------------------------- //
new Vue({
    router,
    i18n,

    // store,
    render: h => h(App)
}).$mount('#app')
// -----------------------> Init <-------------------------- //
