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
            p Welcome to Ilse Langnart's Notebook, this tool is intended to augment human cognition, by being a reference system, spaced repetition system and thinkin system in itself.

        .general( v-if="selected === 'Bullets' " )
            p Bullets are 

        .general( v-if="selected === 'Plugins' " )
            p Bullets are 

        .general( v-if="selected === 'Themes' " )
            p Bullets are 

        .general( v-if="selected === 'CSS Snippets' " )
            p Bullets are 

        .general( v-if="selected === 'Graph' " )
            p Bullets are 

        .general( v-if="selected === 'Vitruvian Brain' " )
            p Bullets are 

        .general( v-if="selected === 'Keyboard & Mouse' " )
            p When searching, you can press `Enter` again to run the first command, or if you're sure your query matches your desired command like: "Dark" for "Toggle Dark Mode" you can press the `ctrl` key in order to automatically run the first result.

        .general( v-if="selected === 'Lore' " )
            p Bullets are 

        .general( v-if="selected === 'Others' " )
            p Bullets are 

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
            selected: "Introduction",
            options: [
                { name: "Introduction", img: "settings.svg" },
                { name: "Bullets", img: "address-book.svg" },
                { name: "Plugins", img: "plugin.svg" },
                { name: "Themes", img: "palette.svg" },
                { name: "CSS Snippets", img: "brand-css3.svg" },
                { name: "Graph", img: "network.svg" },
                { name: "Vitruvian Brain", img: "math-function.svg" },
                { name: "Keyboard & Mouse", img: "keyboard.svg" },
                { name: "Lore", img: "address-book.svg" },
                { name: "Others", img: "lifebuoy.svg" },
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
