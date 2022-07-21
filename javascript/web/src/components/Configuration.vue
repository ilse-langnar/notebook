<template lang="pug" >
.configuration

    .all
        .options( style="width: 20%; float: left;" )
            .item.flex( v-for="( option, index ) in options" :key="index" @click="selected = option.name" :style="get_option_style(option)" )
                img( :src="get_img(option.img)" )
                p( style="font-size: 0.7em; " ) &nbsp; &nbsp; {{option.name}} 
            
        .options-configuration( style="width: 80%; float: right;" )
            p.is-size-1( style="text-align: center;" ) {{selected}}

            .general( v-if="selected === 'General' " )
                p General

            .typography( v-if="selected === 'Typography' " )

            .plugins( v-if="selected === 'Plugins' " )
                .plugin( v-for="( plugin, index ) in ilse.plugin_manager.plugins" :key="index" )
                    img.is-pulled-right( src="@/assets/images/x.svg" style="width: 20px; cursor: pointer;" @click="delete_plugin(plugin)" )
                    h3 {{plugin.name}} by {{plugin.manifest.autor || "Anonymous" }}({{plugin.manifest.version}})
                    p {{plugin.manifest.description}}
                    img( :src="plugin.icon" )

            .themes( v-if="selected === 'Themes' " )
                img.img.centered( src="@/assets/images/paint.svg" title="Apply" alt="Apply" @click="ilse.themes.apply_default_theme()" style="border-shadow: var( --border-shadow ); cursor: pointer; border: 1px solid var( --text-color ); border-radius: var( --border-radius ); padding: var( --padding );" )
                .loop( v-for="( note, index ) in ilse.notes.query('#i/theme/')" :key="index" )
                    h3.inline {{note.content}}
                    img.img.is-pulled-right( src="@/assets/images/paint.svg" title="Apply" alt="Apply" @click="ilse.themes.apply( note )" style="border-shadow: var( --border-shadow ); cursor: pointer; border: 1px solid var( --background-color );" )
                    .loop( v-for="( child, child_index ) in note.children" :key="'child-' + child_index" )
                        textarea.input( v-model="child.content" style="width: 100%;" )
                    .space

            .components( v-if="selected === 'Components' " )
                .loop( v-for=" ( type, index ) in ilse.types.types" :key="index" style="border: 1px solid #000; float: left; margin-left: 10px; padding: 14px; margin-bottom: 8px; border-radius: 10px; width: 30%; height: 200px; overflow: hidden;"  )
                    p.is-size-4.centered {{type.name}} 
                    img.img( :src="type.img" style="display: block; margin: 0 auto; width: 40px;" )
                    // button.slick-button Select



            .snippets( v-if="selected === 'Snippets' " )
                .snippet( v-for="( snippet, index ) in ilse.themes.snippets" :key="index" )
                    img.is-pulled-right( src="@/assets/images/x.svg" style="width: 20px; cursor: pointer;" @click="delete_snippet(plugin)" title="Remove Snippet" )
                    h2 {{snippet.note.id}}
                    // p {{snippet.css}}
                    p {{snippet.note.content}}

            .graph( v-if="selected === 'Graph' " )
                p Layout: 
                select.select( id="layout" )
                    option( value="breadthfirst" ) breadthfirst
                    option( value="grid" ) grid
                    option( value="circle" ) circle
                    option( value="concentric" ) concentric
                    option( value="cose" ) cose

            .keyboard-shortcut( v-if="selected === 'Keyboard Shortcut' " )

                .key( v-for="( key, index ) in ilse.keyboard.keys" :key="index" )
                    img.is-pulled-right( src="@/assets/images/x.svg" style="width: 20px; cursor: pointer;" @click="delete_key(key)" title="Remove Snippet" )
                    input( v-model="key.combo" style="margin-right: 3px;" )
                    input( v-model="key.command" :title="Object.values(ilse.commands.commands).map( item => ` ${item.name}` )" )
                button.button.slick-button.centered( @click="add_keyboard_shortcut()" ) Add

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
            cache: null,
            items_with_tags: 0,
            options: [
                { name: "General", img: "settings.svg" },
                { name: "Typography", img: "typography.svg" },
                { name: "Plugins", img: "plugin.svg" },
                { name: "Themes", img: "palette.svg" },
                { name: "Components", img: "tech-box.svg" },
                { name: "Snippets", img: "brand-css3.svg" },
                { name: "Graph", img: "network.svg" },
                { name: "Keyboard Shortcut", img: "keyboard.svg" },
            ]
        }

    },

    methods: {

        get_option_style( option ) {
            let style       = ""
            let is_selected = option.name === this.selected
            if( is_selected ) return "border: 1px solid var( --text-color ) !important; border-radius: var( --border-radius ); padding: 3px;"
            return ""
        },

        get_tags( tag_name ) {

            // FEATURE: CACHE
            if( this.cache ) {

                if( tag_name ) {
                    return this.cache[tag_name]
                } else {
                    let list   = Object.keys(this.cache)
                    let sorted = list.sort( (a,b) => {
                        return this.cache[b].length - this.cache[a].length
                    })
                    return sorted
                }

            }

            let queue = this.ilse.brains.first.queue
            let chunks, name, seen, interest, tags
            let obj  = []
            let items_with_tags = 0

            for( const item of queue ) {
                chunks      = item.split( "/" )
                name        = chunks[0]
                seen        = chunks[1]
                interest    = chunks[2]
                    interest    = Number( interest )
                tags      = chunks[3]

                if( !tags ) continue
                if( !tags[0] ) continue
                if( tags[0] !== "#" ) continue
                items_with_tags++

                let has_multiple =  tags.indexOf(",") !== -1
                if( has_multiple ) {

                    for( const chunk of tags.split(",") ) {
                        if( !obj[chunk] ) obj[chunk] = []
                        obj[chunk].push( item )
                    }

                } else {
                    if( !obj[tags] ) obj[tags] = []
                    obj[tags].push(item)
                }
            }

            if( !this.cache ) this.cache = obj

            // TODO: REMOVE: IMPURE: 
            this.items_with_tags = items_with_tags

            if( tag_name ) {
                return obj[tag_name]
            } else {
                let list   = Object.keys(obj)
                let sorted = list.sort( (a,b) => {
                    return obj[b].length - obj[a].length
                })
                return sorted
            }
        },

        add_keyboard_shortcut() {
            ilse.keyboard.add( "ctrl+shift+j", "void" )
        },

        async delete_key( key ) {

            try {
                await ilse.dialog.confirm( "Delete this keyboard shortcut?", "Are you sure?" )
                printf( "yes -> key -> ", key )
            } catch( e ) {

            }

        },

        async delete_snippet( snippet ) {

            try {
                await ilse.dialog.confirm( "Delete this CSS snippet?", "Are you sure?" )
                printf( "yes -> snippet -> ", snippet )
            } catch( e ) {

            }

        },

        async delete_plugin( plugin ) {

            try {
                await ilse.dialog.confirm( "Delete this Plugin?", "Are you sure?" )
                printf( "yes -> plugin -> ", plugin )
            } catch( e ) {

            }

        },

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
}

.item {
    margin-bottom: 20px;
}

.item:hover {
    border-bottom: 1px solid gray;
    border-radius: 2px;
}

.plugin {
    border: 1px solid var( --text-color );
    border-radius: var( --border-radius );
    padding: var( --padding );
    margin-bottom: 10px;
}

.snippet {
    border: 1px solid var( --text-color );
    border-radius: var( --border-radius );
    padding: var( --padding );
    margin-bottom: 10px;
}

.key {
    border: 1px solid var( --text-color );
    border-radius: var( --border-radius );
    padding: var( --padding );
    margin-bottom: 10px;
}

.key input {
    background: var( --background-color );
    color: var( --text-color );
    border: 1px solid var( --text-color );
    border-radius: var( --border-radius );
}

.centered {
    display: block;
    margin: 0 auto;
}

.vitruvian-brain .loop {
    border: 1px solid #000;
    padding: 2px;
    border-radius: 4px;
    margin-bottom: 2px;
    margin-left: 4px;
}

.vitruvian-brain .input {
    display: block;
    margin: 0 auto;
}

.vitruvian-brain .centered {
    display: block;
    margin: 0 auto;
}

.vitruvian-brain .fitem {
    margin: 0 auto;
}

.inline {
    display: inline-block;
}

</style>
