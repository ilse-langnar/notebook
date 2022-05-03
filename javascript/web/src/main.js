
import Vue                      from "vue"
import App                      from "./App.vue"
import router                   from "./router.js"


// -----------------------> MainConfig <-------------------------- //
// import "./mainConfig.js"; // apps that need to be configured to be global.
// -----------------------> MainConfig <-------------------------- //


import Popover from "vue-js-popover"
Vue.use(Popover)

import VuetifulBoard from 'vuetiful-board'

Vue.use(VuetifulBoard)


// --------------------------------------------------------------------------- Test ---------------------------------------//
// import VuejsDialog from "vuejs-dialog";
// import "vuejs-dialog/dist/vuejs-dialog.min.css"; // include the default style
// Vue.use( VuejsDialog );
// --------------------------------------------------------------------------- Test ---------------------------------------//


// --------------------------------------------------------------------------- Test ---------------------------------------//
// import VueMeta from 'vue-meta';
// Vue.use(VueMeta);
// --------------------------------------------------------------------------- Test ---------------------------------------//


// --------------------------------------------------------------------------- Test ---------------------------------------//
// import Popover from "vue-js-popover"
// Vue.use(Popover)
// --------------------------------------------------------------------------- Test ---------------------------------------//


// --------------------------------------------------------------------------- Upload ---------------------------------------//
// const VueUploadComponent = require( "vue-upload-component" ); // https://lian-yue.github.io/vue-upload-component/#/en/documents#options-props-input-id
// Vue.component( "file-upload", VueUploadComponent )
// --------------------------------------------------------------------------- Upload ---------------------------------------//

// -----------------------> Store, Mixins, Directives <-------------------------- //
// import store                    from "./store/index.js";
// import "./mixins.js";
// import "@/directives/index.js"; // directives
// -----------------------> Store, Mixins, Directives <-------------------------- //


// -----------------------> Parse Server <-------------------------- //
// import Parse from "./parse-server.js"; // Parse Server Config
// Vue.prototype.$parse   = Parse; // vue short
// -----------------------> Parse Server <-------------------------- //


// -----------------------> Config <-------------------------- //
Vue.config.productionTip = false
Vue.config.performance = true;
Vue.prototype.$log = console.log.bind( console ); // log from html
// -----------------------> Config <-------------------------- //


// -----------------------> Init <-------------------------- //
new Vue({
    router,
    // store,
    render: h => h(App)
}).$mount('#app')
// -----------------------> Init <-------------------------- //
