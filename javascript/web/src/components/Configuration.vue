<template lang="pug" >
.configuration( :key="$i18n.locale" )

    .all
        .options( style="width: 12%; float: left;" )
            .item.flex( v-for="( option, index ) in options" :key="index" @click="selected = option.name" :style="get_option_style(option)" )
                img( :src="get_img(option.img)" )
                p( style="font-size: 0.7em; " ) &nbsp; &nbsp; {{ $t(option.name) }} 
            
        .options-configuration( style="width: 85%; float: right;" :key="selected" )
            p.is-size-1( style="text-align: center;" ) {{ $t(selected) }}

            .general( v-if="selected === 'general' " )
                p.is-pulled-left {{ilse.platform}}
                p.is-pulled-right {{ilse.env.VUE_APP_VERSION}}

            // .typography( v-if="selected === 'typography' " )

            .plugins( v-if="selected === 'plugins' " )

                .loop( v-for="( note, index ) in ilse.plugin_manager.list" :key="index" )
                    details
                        summary {{note.name}}
                        code {{note.code}}

                // .loop( v-for="( note, index ) in ilse.notes.query('#i/plugin/')" :key="index" )
                    Notes( :note="note" :options="{ is_collapsed: true }" )
                    .space


                // .plugin( v-for="( plugin, index ) in ilse.plugin_manager.plugins" :key="index" )
                    img.is-pulled-right( :src="irequire.img('x.svg')" style="width: 20px; cursor: pointer;" @click="delete_plugin(plugin)" )
                    h3 {{plugin.name}} by {{plugin.manifest.autor || "Anonymous" }}({{plugin.manifest.version}})
                    p {{plugin.manifest.description}}
                    img( :src="plugin.icon" )

            .themes( v-if="selected === 'themes' " )
                p 
                p {{ilse.themes.themes}}
                // .centered
                    img( :src="irequire.img('paint.svg')" :title="$t('apply')" alt="Apply" @click="ilse.themes.apply_default_theme()" style="border-shadow: var( --border-shadow ); cursor: pointer; border: 1px solid var( --text-color ); border-radius: var( --border-radius ); padding: var( --padding );" )
                .loop( v-for="( note, index ) in ilse.notes.query('#i/theme/')" :key="index" )
                    img.img.is-pulled-left( :src="irequire.img('paint.svg')" :title="('apply')" alt="Apply" @click="ilse.themes.apply( note )" style="border-shadow: var( --border-shadow ); cursor: pointer; border: 1px solid var( --background-color );" )
                    img.img.is-pulled-left( :src="irequire.img('packge-export.svg')" :title="$t('export_to_clipboard')" alt="Export to clipboard" @click="export_theme_to_clipboard(note)" )
                    .s-clear
                    Notes( :note="note" :options="{ is_collapsed: true }" )
                    .space

            .permissions( v-if="selected === 'permissions' " )

                p {{ilse.config.apps}}
                table.permissions
                    tr
                        th Name
                        th Read Permission
                        th Notes access
                        th Write Permission
                        th Is App?

                    tr( v-for="( item, index ) in get_list_of_html_files()" :key="index" ) 
                        td {{item}}
                        td( :key="ilse.keys[item+'read']" :style="get_green_red_color_based_on_boolean(has_permission( item, 'read'))" @click="toggle_permission( item, 'read')")
                            p {{has_permission( item, 'read')}}
                        td( :key="ilse.keys[item+'notes']" :style="get_green_red_color_based_on_boolean(has_permission( item, 'notes'))" @click="toggle_permission( item, 'notes')")
                            p {{has_permission( item, 'notes')}}
                        td( :key="ilse.keys[item+'write']" :style="get_green_red_color_based_on_boolean(has_permission( item, 'write'))" @click="toggle_permission( item, 'write')")
                            p {{has_permission( item, 'write')}}
                        td( :key="ilse.keys[item]" :style="get_green_red_color_based_on_boolean(get_is_html_app(item))" @click="toggle_is_app(item)")
                            p {{get_is_html_app(item)}}

                    // tr
                        td( v-for="( item, index ) in get_list_of_html_files()" :key="index" ) {{item}}


                // .loop( v-for="( item, index ) in get_list_of_html_files()" :key="index" )
                    .flex
                        // p {{item}}
                        // img.img.is-pulled-left( :src="irequire.img('packge-export.svg')" alt="Export to clipboard" )
                        table
                            tr
                                th td {{item}}
                                th td example 2
                            tr
                                img.img.is-pulled-left( :src="irequire.img('packge-export.svg')" alt="Export to clipboard" )
            .templates( v-if="selected === 'templates' " )
                .loop( v-for="( note, index ) in ilse.notes.query('#i/template/')" :key="index" )
                    Notes( :note="note" :options="{ is_collapsed: true }" )



            .marketplace( v-if="selected === 'marketplace' " )
                p( style="display: none;" ) {{set_marketplace_items()}}

                .loop( v-for="( item, index ) in marketplace" :key="index" style="width: 30%; height: auto; overflow: hidden; border: 1px dashed var( --text-color ); border-radius: var( --border-radius ); float: left; margin-bottom: 5px; margin-left: 5px; " )
                    p.is-centered {{item.name}}
                    button.slick-button( style="position: relative; bottom: 1px;" @click="try_app(item)") demo
                    details
                        summary Description
                        p {{item.description}}
                    br

            .languages( v-if="selected === 'languages' " )
                // p {{$i18n}}
                select( v-model="$i18n.locale" )
                    option( v-for="( lang, index ) in ilse.languages" :key="index" :value="lang" @select="ilse.modals.close()" ) {{ilse.SUPPORTED_LANGUAGES[lang]}}

            .graph( v-if="selected === 'graph' " )
                p Layout: 
                select.select( id="layout" )
                    option( value="breadthfirst" ) breadthfirst
                    option( value="grid" ) grid
                    option( value="circle" ) circle
                    option( value="concentric" ) concentric
                    option( value="cose" ) cose

            .keyboard-shortcut( v-if="selected === 'keyboard_shortcut' " )

                .loop( v-for="( key, index ) in ilse.keyboard.keys" :key="index" )
                    img.is-pulled-right( :src="irequire.img('x.svg')" style="width: 20px; cursor: pointer;" @click="delete_key(key)" :title="$t('remove_snippet')" )
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

// Components
    import Notes                        from "@/components/Notes.vue"

// functions
    import get_green_red_color_based_on_boolean from "@/classes/get_green_red_color_based_on_boolean.js"
    import add_permission                       from "@/classes/add_permission.js"
    import remove_permission                    from "@/classes/remove_permission.js"
    import has_permission                       from "@/classes/has_permission.js"
    import create_window                        from "@/classes/create_window.js"

export default {

    name: "Configuration",

    data() {
        return {
            ilse: ilse,
            selected: "general",
            cache: null,
            items_with_tags: 0,
            marketplace: [],
            options: [
                { name: "general", img: "settings.svg" },
                // { name: "typography", img: "typography.svg" },
                { name: "plugins", img: "plugin.svg" },
                { name: "themes", img: "palette.svg" },
                { name: "permissions", img: "shield-lock.svg" },
                { name: "templates", img: "template.svg" },
                { name: "marketplace", img: "building-store.svg" },
                { name: "languages", img: "language.svg" },
                { name: "graph", img: "network.svg" },
                { name: "keyboard_shortcut", img: "keyboard.svg" },
            ]
        }

    },

    components: {
        Notes,
    },

    methods: {

        async try_app( item ) {
            // printf( "res -> ", res )
            // printf( "html -> ", html )
            // create_window({ title: `${item.name} Demo`, url: item.url })

            let res  = await fetch( item.url)
            let html = await res.text()

            await ilse.filesystem.file.write.async( "tmp.html", html )

            create_window({ is_internal_and_iframe: true, title: `${item.name} Demo`, url: "tmp.html" })
        },

        async set_marketplace_items() {
            let res   = await fetch( "https://raw.githubusercontent.com/ilse-langnar/notebook/dev/marketplace/marketplace.json")
            let json  = await res.json()
            this.marketplace = json
        },

        toggle_permission( name, permission ) {

            let has = has_permission( name, permission )
            printf( `${name}(${has})` )

            if( has ) {
                remove_permission( name, permission )
                ilse.notification.send( "Removed Permission(-): ", `${name}(${permission})` )
            } else {
                add_permission( name, permission )
                ilse.notification.send( "Added Permission(+): ", `${name}(${permission})` )
            }

            printf( "ilse.keys -> name -> ", name )
            printf( "before -> ilse.keys -> ", ilse.keys )
            ilse.keys[name+permission] = Math.random()
            printf( "after -> ilse.keys -> ", ilse.keys )
        },

        toggle_is_app( name ) {
            let index    = ilse.config.apps.indexOf(name) 
            let is_app   = index !== -1

            if( is_app ) {
                ilse.config.apps.splice( index, 1 )
                ilse.notification.send( "Removed App(-): ", name )
            } else {
                ilse.config.apps.push( name )
                ilse.notification.send( "Added App(+): ", name )
            }

            ilse.config.save()
            ilse.keys['home'] = Math.random()
        },

        get_green_red_color_based_on_boolean( bool ) {
            return get_green_red_color_based_on_boolean( bool )
        },

        has_permission( item, permission ) {
            let has = has_permission( item, permission )
            return has
        },

        get_is_html_app( name ) {
            let is_app = ilse.config.apps.indexOf(name) !== -1
            return is_app
        },

        get_list_of_html_files() {
            let list      = ilse.filesystem.dir.list.sync( "/" )
            let HTMLs     = list.filter( item => item.indexOf(".html") !== -1 ) // needs to have .html
            return HTMLs
        },

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

        async delete_plugin( plugin ) {

            try {
                await ilse.dialog.confirm( "Delete this Plugin?", "Are you sure?" )
                printf( "yes -> plugin -> ", plugin )
            } catch( e ) {

            }

        },

        get_img( img ) {
            // let result = require(`@/assets/images/${img}`)
            let result = ilse.irequire.img( img )
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

.keyboard-shortcut .loop {
    background: var( --background-color );
    color: var( --text-color );
}

.keyboard-shortcut input {
    background: var( --background-color );
    color: var( --text-color );
    border: 0 !important;
}


table a:link {
    color: #666;
    font-weight: bold;
    text-decoration:none;
}
table a:visited {
    color: #999999;
    font-weight:bold;
    text-decoration:none;
}
table a:active,
table a:hover {
    color: var( --link-color );
    text-decoration:underline;
}
table {
    font-family:Arial, Helvetica, sans-serif;
    color: var( --text-color );
    font-size:12px;
    /*text-shadow: 1px 1px 0px #fff;*/
    background: var( --background-color );
    margin:20px;
    /*border:#ccc 1px solid;*/

    -moz-border-radius:3px;
    -webkit-border-radius:3px;
    border-radius:3px;

    /*
    -moz-box-shadow: 0 1px 2px #d1d1d1;
    -webkit-box-shadow: 0 1px 2px #d1d1d1;
    box-shadow: 0 1px 2px #d1d1d1;
    */
}
table th {

    padding: 21px 25px 22px 25px;
    border-top:1px solid #fafafa;
    border-bottom:1px solid #e0e0e0;

    background: var( --background-color );
    color: var( --text-color );
    /*background: -webkit-gradient(linear, left top, left bottom, from(#ededed), to(#ebebeb));
    background: -moz-linear-gradient(top,  #ededed,  #ebebeb);*/
}
table th:first-child {
    text-align: left;
    padding-left:20px;
}
table tr:first-child th:first-child {
    -moz-border-radius-topleft:3px;
    -webkit-border-top-left-radius:3px;
    border-top-left-radius:3px;
}
table tr:first-child th:last-child {
    -moz-border-radius-topright:3px;
    -webkit-border-top-right-radius:3px;
    border-top-right-radius:3px;
}
table tr {
    text-align: center;
    padding-left:20px;
}
table td:first-child {
    text-align: left;
    padding-left:20px;
    border-left: 0;
}
table td {
    padding:18px;
    border-top: 1px solid #ffffff;
    border-bottom:1px solid #e0e0e0;
    border-left: 1px solid #e0e0e0;

    background: var( --background-color );
    /*background: -webkit-gradient(linear, left top, left bottom, from(#fbfbfb), to(#fafafa));
    background: -moz-linear-gradient(top,  #fbfbfb,  #fafafa);*/
}
table tr.even td {
    background: var( --secondary-background-color );
    /*background: -webkit-gradient(linear, left top, left bottom, from(#f8f8f8), to(#f6f6f6));
    background: -moz-linear-gradient(top,  #f8f8f8,  #f6f6f6);*/
}
table tr:last-child td {
    border-bottom:0;
}
table tr:last-child td:first-child {
    -moz-border-radius-bottomleft:3px;
    -webkit-border-bottom-left-radius:3px;
    border-bottom-left-radius:3px;
}
table tr:last-child td:last-child {
    -moz-border-radius-bottomright:3px;
    -webkit-border-bottom-right-radius:3px;
    border-bottom-right-radius:3px;
}
table tr:hover td {
    background: var( --text-color );
    color: var( --background-color );
    /*background: -webkit-gradient(linear, left top, left bottom, from(#f2f2f2), to(#f0f0f0));
    background: -moz-linear-gradient(top,  #f2f2f2,  #f0f0f0);	*/
}

table.permissions tr td p {
    cursor: pointer;
}

.marketplace .loop p.is-centered  {
    text-align: center;
}

</style>
