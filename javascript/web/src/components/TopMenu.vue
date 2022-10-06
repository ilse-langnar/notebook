<template lang="pug" >
.top-menu
    .menu( v-if="!ilse.is_zen" style="width: 100%; display: flex; padding: 0.3em 0.5em; " )

        .menu-item( :key="ilse.keys['home'] || 0" )
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
</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

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
        }
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

        open_folders_modal() {
            ilse.modals.open("folders");
        },

        toggle_command_pallet() {
            ilse.modals.open( "command-pallet" )
        },

        open_help_modal() {
            ilse.modals.open( "help" )
        },

        toggle_dark_mode() {
            ilse.commands.run( "toggle-dark-mode" )
        },

        open_configuration_modal() {
            ilse.modals.open( "configuration" )
        },

        async save() {
            await ilse.save()
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

.top-menu {
    margin-top: 0px;
}

.margin-small {
    margin-left: 10px;
    display: inline;
}

.margin-large {
    margin-left: 30px;
    display: inline;
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
