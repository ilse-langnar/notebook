import printf                   from "@/functions/printf.js"

import Vue                      from "vue"

import App                      from "./App.vue"

// -----------------------> Config <-------------------------- //
Vue.config.productionTip = false
Vue.config.performance = true;
Vue.prototype.$log = console.log.bind( console ); // log from html

// import IlseRequire                  from "@/classes/IlseRequire.js"
// Vue.prototype.irequire = new IlseRequire()

import ilse                  from "@/ilse.js"
Vue.prototype.ilse           = ilse
// -----------------------> Config <-------------------------- //

import i18n from './i18n'

// window.Alpine = Alpine
// Alpine.data('ref', ()=>{ return {} })

// alpine
    import Alpine from 'alpinejs'

/*
document.addEventListener('alpine:init', () => {

    printf( "(Alpine Init)" )
    Alpine.directive( "ilse", ( el, { value, modifiers, expression }, { Alpine, effect, cleanup }) => {
        printf( "(Alpine Init) >>>>>>>> el -> ", el )
    })

})
*/

Alpine.start();

// -----------------------> Init <-------------------------- //
new Vue({
    i18n,

    // store,
    render: h => h(App)
}).$mount('#app')
// -----------------------> Init <-------------------------- //
