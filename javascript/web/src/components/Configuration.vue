<template lang="pug" >
.configuration( :key="$i18n.locale" )

    .all
        .options( style="width: 20%; float: left;" )
            .item.flex( v-for="( option, index ) in options" :key="index" @click="selected = option.name" :style="get_option_style(option)" )
                img( :src="get_img(option.img)" )
                p( style="font-size: 0.7em; " ) &nbsp; &nbsp; {{ $t(option.name) }} 
            
        .options-configuration( style="width: 80%; float: right;" :key="selected" )
            p.is-size-1( style="text-align: center;" ) {{ $t(selected) }}

            .general( v-if="selected === 'general' " )
                p Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

            // .typography( v-if="selected === 'typography' " )

            .plugins( v-if="selected === 'plugins' " )

                .loop( v-for="( note, index ) in ilse.notes.query('#i/plugin/')" :key="index" )
                    Notes( :note="note" :options="{ is_collapsed: true }" )
                    .space


                // .plugin( v-for="( plugin, index ) in ilse.plugin_manager.plugins" :key="index" )
                    img.is-pulled-right( src="@/assets/images/x.svg" style="width: 20px; cursor: pointer;" @click="delete_plugin(plugin)" )
                    h3 {{plugin.name}} by {{plugin.manifest.autor || "Anonymous" }}({{plugin.manifest.version}})
                    p {{plugin.manifest.description}}
                    img( :src="plugin.icon" )

            .themes( v-if="selected === 'themes' " )
                .centered
                    img( src="@/assets/images/paint.svg" :title="$t('apply')" alt="Apply" @click="ilse.themes.apply_default_theme()" style="border-shadow: var( --border-shadow ); cursor: pointer; border: 1px solid var( --text-color ); border-radius: var( --border-radius ); padding: var( --padding );" )
                .loop( v-for="( note, index ) in ilse.notes.query('#i/theme/')" :key="index" )
                    img.img.is-pulled-left( src="@/assets/images/paint.svg" :title="('apply')" alt="Apply" @click="ilse.themes.apply( note )" style="border-shadow: var( --border-shadow ); cursor: pointer; border: 1px solid var( --background-color );" )
                    img.img.is-pulled-left( src="@/assets/images/packge-export.svg" :title="$t('export_to_clipboard')" alt="Export to clipboard" @click="export_theme_to_clipboard(note)" )
                    .s-clear
                    Notes( :note="note" :options="{ is_collapsed: true }" )
                    .space

            .templates( v-if="selected === 'templates' " )
                .loop( v-for="( note, index ) in ilse.notes.query('#i/template/')" :key="index" )
                    Notes( :note="note" :options="{ is_collapsed: true }" )



            .plugins( v-if="selected === 'marketplace' " )
                p Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

            .components( v-if="selected === 'components' " )
                .loop( v-for=" ( type, index ) in ilse.types.types" :key="index" style="border: 1px solid #000; float: left; margin-left: 10px; padding: 14px; margin-bottom: 8px; border-radius: 10px; width: 30%; height: 200px; overflow: hidden;"  )
                    p.is-size-4.centered {{type.name}} 
                    img.img( :src="type.img" style="display: block; margin: 0 auto; width: 40px;" )
                    // button.slick-button Select

            .languages( v-if="selected === 'languages' " )
                // p {{$i18n}}
                select( v-model="$i18n.locale" )
                    option( v-for="( lang, index ) in ilse.languages" :key="index" :value="lang" @select="ilse.modals.close()" ) {{ilse.SUPPORTED_LANGUAGES[lang]}}



            .snippets( v-if="selected === 'snippets' " )

                .loop( v-for="( note, index ) in ilse.notes.query('#i/css')" :key="index" )
                    Notes( :note="note" )
                    // img.img.is-pulled-left( src="@/assets/images/paint.svg" :title="('apply')" alt="Apply" @click="ilse.themes.apply( note )" style="border-shadow: var( --border-shadow ); cursor: pointer; border: 1px solid var( --background-color );" )

                // .snippet( v-for="( snippet, index ) in ilse.themes.snippets" :key="index" )
                    img.is-pulled-right( src="@/assets/images/x.svg" style="width: 20px; cursor: pointer;" @click="delete_snippet(plugin)" :title="$t('remove_snippet')" )
                    h2 {{snippet.note.id}}
                    // p {{snippet.css}}
                    p {{snippet.note.content}}

            .graph( v-if="selected === 'graph' " )
                p Layout: 
                select.select( id="layout" )
                    option( value="breadthfirst" ) breadthfirst
                    option( value="grid" ) grid
                    option( value="circle" ) circle
                    option( value="concentric" ) concentric
                    option( value="cose" ) cose

            .keyboard-shortcut( v-if="selected === 'keyboard_shortcut' " )

                .key( v-for="( key, index ) in ilse.keyboard.keys" :key="index" )
                    img.is-pulled-right( src="@/assets/images/x.svg" style="width: 20px; cursor: pointer;" @click="delete_key(key)" :title="$t('remove_snippet')" )
                    input( v-model="key.combo" style="margin-right: 3px;" )
                    input( v-model="key.command" :title="Object.values(ilse.commands.commands).map( item => ` ${item.name}` )" )
                button.button.slick-button.centered( @click="add_keyboard_shortcut()" ) Add

            .lorem( v-if="selected === 'lore' " )
                p LORE

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Components
    import Notes                        from "@/components/Notes.vue"

export default {

    name: "Configuration",

    data() {
        return {
            ilse: ilse,
            selected: "General",
            cache: null,
            items_with_tags: 0,
            options: [
                { name: "general", img: "settings.svg" },
                // { name: "typography", img: "typography.svg" },
                { name: "plugins", img: "plugin.svg" },
                { name: "themes", img: "palette.svg" },
                { name: "templates", img: "template.svg" },
                { name: "marketplace", img: "building-store.svg" },
                { name: "languages", img: "language.svg" },
                { name: "components", img: "tech-box.svg" },
                { name: "snippets", img: "brand-css3.svg" },
                { name: "graph", img: "network.svg" },
                { name: "keyboard_shortcut", img: "keyboard.svg" },
                { name: "lore", img: "vocabulary.svg" },
            ]
        }

    },

    components: {
        Notes,
    },

    methods: {

        export_theme_to_clipboard( note ) {

            if( !note ) {
                /*
                let result  = ilse.notes.query( `#i/theme` )
                let content = ""

                result.map( item => {
                    content += `${item.content}\n`
                    item.children.map( (child, child_index) => {
                        content += `${child.content}\n`
                        // if( child_index === item.children.length - 1 ) content += `\n`
                    })

                })

                printf( "content -> ", content )

                let final = `ilse-importer:theme:${Math.random().toString().replace("0.", "")}\n${content}`

                ilse.clipboard.write( final )
                */

            } else {
                let content = `${note.content}`

                note.children.map( child => {
                    content += `${child.content}\n`
                })

                let final = `ilse-importer:theme:${Math.random().toString().replace("0.", "")}\n${content}`

                ilse.clipboard.write( final )
            }

        },

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

.s-clear {
    clear: both;
}

</style>
