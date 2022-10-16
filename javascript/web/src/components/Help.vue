<template lang="pug" >
.help

    .all
        .options( style="width: 20%; float: left; " )
            .item.flex( v-for="( option, index ) in options" :key="index" @click="selected = option.name")
                img( :src="get_img(option.img)" )
                p( style="font-size: 0.7em; " ) &nbsp; &nbsp; {{option.name}} 
            
        .options-configuration( style="width: 80%; float: right; " )
            p.is-size-1( style="text-align: center;" ) {{selected}}

            .general( v-if="selected === 'Introduction' " )
                p Welcome to Ilse Langnart's Notebook, this tool is intended to augment human cognition, by being a reference system, spaced repetition system and thinkin system in itself.

            .general( v-if="selected === 'Bullets' " )
                p Bullets are 

            .general( v-if="selected === 'Plugins' " )
                p Bullets are 

            .general( v-if="selected === 'Components' " )
                p Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                p Components is what shows you everything from your daily notes, calendar, menu and others.

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

            .general( v-if="selected === 'FAQ' " )

                p FAQ
                .question
                    h3 Q: How to import an item?
                    p A: Just drag and drop the item into the 
                    img( :src="ilse.require('school.svg')" )
                    p or
                    br
                    p And I'll be imported automatically

                .question
                    h3 Q: How do I review my queue
                    p A: Open the "first" brain panel by clicking on
                    img( :src="ilse.require('school.svg')" )
                    p Then it should look like this: 
                    p Then click on the "play" button or double click on it.

                .question
                    h3 Q: How do I run a command on click without closing the command pallet modal?
                    p A: Hold the "shift" key while you click

            .general( v-if="selected === 'Others' " )
                p Bullets are 

</template>
<script>
// eslint-disable-next-line
import printf                           from "@/classes/printf.js"

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
                { name: "Components", img: "tech-box.svg" },
                { name: "Themes", img: "palette.svg" },
                { name: "CSS Snippets", img: "brand-css3.svg" },
                { name: "Graph", img: "network.svg" },
                { name: "Vitruvian Brain", img: "school.svg" },
                { name: "Keyboard & Mouse", img: "keyboard.svg" },
                { name: "Lore", img: "address-book.svg" },
                { name: "FAQ", img: "lifebuoy.svg" },
                { name: "Others", img: "letter-i.svg" },
            ]
        }
    },

    methods: {

        get_img( img ) {
            let result = ilse.require( img )
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

.help .question {
    border: 1px solid var( --text-color );
    border-radius: var( --border-radius );
    padding: var( --padding );
    margin-bottom: 10px;
}

</style>
