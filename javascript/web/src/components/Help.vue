<template lang="pug" >
.help

    .all
        .options( style="width: 20%; float: left;" )
            .item.flex( v-for="( option, index ) in options" :key="index" @click="selected = option.name")
                img( :src="get_img(option.img)" )
                p( style="font-size: 0.7em; " ) &nbsp; &nbsp; {{option.name}} 
            
        .options-configuration( style="width: 80%; float: right;" )
            p.is-size-1( style="text-align: center;" ) {{selected}}

        .general( v-if="selected === 'Introduction' " )
            p.is-size-1 Introduction
            p Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.


</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default {

    name: "Help",

    data() {
        return {
            ilse: ilse,
            selected: "General",
            options: [
                { name: "Introduction", img: "settings.svg" },
                { name: "Bullets", img: "address-book.svg" },
                { name: "Plugins", img: "plugin.svg" },
                { name: "Themes", img: "palette.svg" },
                { name: "CSS Snippets", img: "brand-css3.svg" },
                { name: "Graph", img: "network.svg" },
                { name: "Vitruvian Brain", img: "math-function.svg" },
                { name: "Keyboard Shortcut", img: "keyboard.svg" },
                { name: "Lore", img: "address-book.svg" },
                { name: "Others", img: "lifebuoy.svg" },
            ]
        }
    },

    methods: {

        get_img( img ) {

            let result 

            if( ilse.config.dark ) {
                result = require(`@/assets/images/dark-mode/${img}`)
            } else {
                result = require(`@/assets/images/${img}`)
            }

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

.help {
}

.item {
    margin-bottom: 20px;
}

.item:hover {
    border-bottom: 1px solid gray;
    border-radius: 2px;
}

</style>
