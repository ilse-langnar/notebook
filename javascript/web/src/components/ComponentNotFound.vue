<template lang="pug" >
.error-component-not-found
    p Error ---- {{ $('component_not_found') }} ----
    img( src="@/assets/images/box-margin.svg" style="width: 50px;" )


</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

export default {

    name: "NotFound",

    props: {
        name: { type: String, require: false, },
    },

    components: {
    },

    data() {
        return {
        }
    },

    methods: {

        setup() {
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
