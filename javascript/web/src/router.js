import Vue          from "vue"
import Router       from "vue-router"
Vue.use( Router )





// Components
    import Home         from "@/components/Home.vue"

const router = new Router({

    mode: "history", // avoid # in url

    transitionOnLoad: true,

    routes: [

        { path: "*",                            component: Home },
        { path: "*",                            component: Home },
        { path: "/",                            component: Home },
        { path: "/home",                        component: Home } ,

    ]

});

// ???
router.beforeResolve( ( to, from, next ) => {

    try {
        next();
    } catch( e ){
        printf( "BUG -> index.js(router) -> next -> ", next );
        throw e;
    }

});

// ???
router.afterEach( (to, from) => {

});


export default router;
