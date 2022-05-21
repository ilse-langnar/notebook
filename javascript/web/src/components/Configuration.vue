<template lang="pug" >
.configuration

    .all
        .options( style="width: 20%; float: left;" )
            .item.flex( v-for="( option, index ) in options" :key="index" @click="selected = option.name")
                img( :src="get_img(option.img)" )
                p( style="font-size: 0.7em; " ) &nbsp; &nbsp; {{option.name}} 
            
        .options-configuration( style="width: 80%; float: right;" )
            p.is-size-1( style="text-align: center;" ) {{selected}}

        .general( v-if="selected === 'General' " )

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default {

    name: "Configuration",

    data() {
        return {
            ilse: ilse,
            selected: "General",
            options: [
                { name: "General", img: "settings.svg" },
                { name: "Typography", img: "typography.svg" },
                { name: "Plugins", img: "plugin.svg" },
                { name: "Themes", img: "palette.svg" },
                { name: "Snippets", img: "brand-css3.svg" },
                { name: "Graph", img: "network.svg" },
                { name: "Vitruvian Brain", img: "math-function.svg" },
                { name: "Keyboard Shortcut", img: "keyboard.svg" },
            ]
        }

    },

    methods: {

        get_img( img ) {
            let result = require(`@/assets/images/${img}`)
            return result
        },

        setup() {
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped>

.configuration {
    background: blue !important;
}

.item {
    margin-bottom: 20px;
}


.item:hover {
    border-bottom: 1px solid gray;
    border-radius: 2px;
}

</style>
