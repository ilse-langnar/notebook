import printf                   from "@/functions/printf.js"

import Vue                      from "vue"
printf( "process.env.VUE_APP_TARGET -> ",  process.env.VUE_APP_TARGET )

import App                      from "./App.vue"
// import router                   from "./router.js"

// -----------------------> Config <-------------------------- //
Vue.config.productionTip = false
if( process.env.VUE_APP_TARGET ) printf( "main.js -> 1" )
Vue.config.performance = true;
if( process.env.VUE_APP_TARGET ) printf( "main.js -> 2" )
Vue.prototype.$log = console.log.bind( console ); // log from html
if( process.env.VUE_APP_TARGET ) printf( "main.js -> 3" )

// import IlseRequire                  from "@/classes/IlseRequire.js"
// Vue.prototype.irequire = new IlseRequire()

import ilse                  from "@/ilse.js"
Vue.prototype.ilse           = ilse
if( process.env.VUE_APP_TARGET ) printf( "main.js -> 4" )
// -----------------------> Config <-------------------------- //

import i18n from './i18n'

if( process.env.VUE_APP_TARGET ) printf( "main.js -> 5" )
// alpine
import Alpine from 'alpinejs'
window.Alpine = Alpine
if( process.env.VUE_APP_TARGET ) printf( "main.js -> 6" )

// Alpine.data('ref', ()=>{ return {} })

Alpine.start();
if( process.env.VUE_APP_TARGET ) printf( "main.js -> 6" )



// -----------------------> Init <-------------------------- //
new Vue({
    // router,
    i18n,

    // store,
    render: h => h(App)
}).$mount('#app')
// -----------------------> Init <-------------------------- //
