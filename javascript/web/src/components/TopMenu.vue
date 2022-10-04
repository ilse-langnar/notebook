<template lang="pug" >
.top-menu
    .menu( v-if="!ilse.is_zen" style="width: 100%; display: flex; padding: 0.3em 0.5em; " )

        .menu-item( :key="ilse.keys['home']" )
            img.app-icon( v-for="( item, index ) in ilse.config.apps" :key="index" :src="get_icon(item)" @click="select_app($event, item)" :style="get_app_icon_style(item)" :title="item" )

        .menu-item
            img( :src="irequire.img('command.svg')" style="cursor: pointer; width: 20px;" :title="$t('open_command_pallet')" alt="$t('open_command_pallet')" @click="toggle_command_pallet" )
            .margin-small

            img( :src="irequire.img('settings.svg')"     style="cursor: pointer; width: 20px; " :title="$t('configuration')" @click="open_configuration_modal" accesskey="c" )
            .margin-small

            img( :src="irequire.img('folders.svg')"    style="cursor: pointer; width: 20px; "   :title="$t('folders')" @click="open_folders_modal" )
            .margin-small

            img( :src="irequire.img('lifebuoy.svg')"    style="cursor: pointer; width: 20px; "   :title="$t('help_manual_tutorial_and_apis')" accesskey="h" @click="open_help_modal" )
            .margin-large

            img.is-pulled-right( :src="irequire.img('moon-stars.svg')"   style="cursor: pointer; width: 20px; " :title="$t('toggle_dark_mode')" @click="toggle_dark_mode()" )

        br
//; .top-menu( v-if="!ilse.is_zen" style="width: 100%; display: flex; padding: 0.3em 0.5em; " @drop="on_app_drop" )

    .menu-item( @drop="on_app_drop" :key="ilse.keys['home']")
        img.app( v-for="( item, index ) in ilse.config.apps" :key="index" :src="get_icon(item)" @click="select_app($event, item)" :style="get_app_icon_style(item)" :title="item" )

        // input( placeholder="&#128269;" )
        // img( :src="irequire.img('lupe.svg')" style="cursor: pointer; vertical-align: sub; width: 30px; " :title="$t('delete_app')" )
        // SearchButton( :width="50" :should-autofocus="false" @on-result-select="on_note_search_on_result_select" )
        // Gene( component="SearchButton.html" @SearchButton="on_search_button" )

    .menu-item
        img( :src="irequire.img('command.svg')" style="cursor: pointer; width: 20px;" :title="$t('open_command_pallet')" alt="$t('open_command_pallet')" @click="toggle_command_pallet" )
        .margin-small

        img( :src="irequire.img('settings.svg')"     style="cursor: pointer; width: 20px; " :title="$t('configuration')" @click="open_configuration_modal" accesskey="c" )
        .margin-small

        img( :src="irequire.img('folders.svg')"    style="cursor: pointer; width: 20px; "   :title="$t('folders')" @click="open_folders_modal" )
        .margin-small

        img( :src="irequire.img('lifebuoy.svg')"    style="cursor: pointer; width: 20px; "   :title="$t('help_manual_tutorial_and_apis')" accesskey="h" @click="open_help_modal" )
        .margin-large

        img.is-pulled-right( :src="irequire.img('moon-stars.svg')"   style="cursor: pointer; width: 20px; " :title="$t('toggle_dark_mode')" @click="toggle_dark_mode()" )

    // img( :src="irequire.img('arrow-narrow-left.svg')"      style="cursor: pointer; width: 20px; margin-left: 15px; color: #fff; fill: #fff;"   :title="$t('toggle_right_sidebar')" @click="ilse.is_right_sidebar_open = !ilse.is_right_sidebar_open" )

    br

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Components
    import SearchButton                 from "@/components/SearchButton.vue"

// Components
    import Gene                         from "@/components/Gene.vue"

// functions
    import string_to_html               from "@/classes/string_to_html.js"
    import get_html_favicon             from "@/classes/get_html_favicon.js"
    import move_array_item              from "@/classes/move_array_item.js"
    import create_window                from "@/classes/create_window.js"

export default {

    name: "TopMenu",

    data() {
        return {
            ilse: ilse,
            has_first_brain_tools: false,
        }
    },

    components: {
        SearchButton,
        Gene,
    },

    methods: {

        get_icon( name ) {
            if( name === "ilse.html" ) return require("@/assets/logo.svg")

            let file    = ilse.filesystem.file.read.sync( name )
            let html    = string_to_html( file )
            let favicon = get_html_favicon( html )
            return favicon
        },

        select_app( event, name ) {
            let is_shift            = event.shiftKey

            if( is_shift ) {
                if( name === "ilse.html" ) return // BUGFIX: 'ilse.html' is not an app but the default one.
                create_window({ title: `${name}(HTML)`, url: name })
            } else {

                let index               = ilse.config.apps.indexOf(name)
                let is_already_selected = ilse.config.apps[0] === name
                    if( is_already_selected ) return

                let new_apps           = move_array_item( ilse.config.apps, index, 0 )
                    ilse.config.apps       = new_apps

                ilse.keys['home'] = Math.random()

                // this.update_ilse()
            }

        },

        get_app_icon_style( item ) {
            let name = ilse.config.apps[0]
            if( name === item ) return `border-bottom: 1px dashed #000; `
        },

        on_search_button( payload ) {

            if( payload.action === 'click' ) {
                ilse.modals.open( "search", { mode: "global", filter: "all", is_markdown_mode_on: true, id: null  })
            }

        },

        open_folders_modal() {
            ilse.modals.open("folders");
        },

        toggle_is_home_page_on() {
            ilse.is_home_page_on = !ilse.is_home_page_on 
        },

        /*
        toggle_first_brain() {
            ilse.modals.open( "first-brain" )
        },
        */

        toggle_command_pallet() {
            ilse.modals.open( "command-pallet" )
        },

        open_help_modal() {
            ilse.modals.open( "help" )
        },

        toggle_dark_mode() {
            // ilse.config.dark = !ilse.config.dark
            ilse.commands.run( "toggle-dark-mode" )
            // ilse.config.save()
            // printf( "ilse.config.dark -> ", ilse.config.dark )
        },

        open_configuration_modal() {
            ilse.modals.open( "configuration" )
        },

        on_note_search_on_result_select( payload ) {
            printf( "TopMenu.vue -> on_note_search_on_result_select -> payload -> ", payload )

            let is_note  = payload.note_id
            let is_file   = payload.file

            let is_shift  = payload.shift
            let is_ctrl   = payload.ctrl

            let note      = payload.note_id
            let file      = payload.file

            if( is_note ) {


                if( is_shift ) {

                    let query_result = ilse.notes.query( `${note}:` )[0]
                    ilse.clipboard.write( query_result.content )
                }

                if( is_ctrl ) {
                    ilse.clipboard.write( note )
                    return
                }

                // No shift nor ctrl
                if( !is_ctrl && !is_shift ) {
                    printf( "ononononon " )

                    let query_result  = ilse.notes.query( `${note}:` )[0]
                    const instance    = new ilse.classes.Component({
                        type: "edit-note",
                        width: 8,
                        props: {
                            note: query_result,
                        }
                    })

                    ilse.components.push( instance )
                    ilse.config.save()
                    return

                    // const instance    = new ilse.classes.Component({
                        // type: "edit-note",
                        // width: 8,
                        // props: {
                            // note: note,
                        // }
                    // })

                    // ilse.components.splice( 1, 1, instance )

                }

            }

            if( is_file ) {

                let file = payload.file

                const instance    = new ilse.classes.Component({
                    type: "file",
                    width: 8,
                    props: {
                        file: file,
                    }
                })

                if( is_shift ) {
                    ilse.components.push( instance )
                    ilse.config.save()
                    return
                }

                if( is_ctrl ) {
                    return
                }

                // No shift nor ctrl
                if( !is_ctrl && !is_shift ) {
                    ilse.components.splice( 1, 1, instance )
                }


            }
        },

        async save() {
            await ilse.save()
        },

        add_component() {

            let component = new ilse.classes.Component({ width: 8 })
                ilse.components.push( component )

            ilse.save()
        },

        // async test() {
            // printf( "aaa " )
            // let o = await ilse.clipboard.read()
            // printf( "AAAAAAAAAA o -> ", o )
        // },

        setup() {
            // setTimeout( () => { this.test() }, 1000 )
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped>

.top-menu {
    margin-top: 0px;
}

.margin-small {
    margin-left: 10px;
    display: inline;
}

.margin-medium {
    margin-left: 20px;
    display: inline;
}

.margin-large {
    margin-left: 30px;
    display: inline;
}

.vspace {
    display: inline;
    padding-left: 15px;
}

.apps {
    min-width: 30%;
    margin: auto;
    border: 1px solid var( --text-color );
    border-radius: var( --border-radius );
    padding: 3px; 
}

.menu-item {
    margin: auto; 
}

.menu-item img.app {
    margin-left: 10px;
    cursor: pointer;
}

</style>
