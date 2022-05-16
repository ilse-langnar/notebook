<template lang="pug">
.home

    .loading( v-if="!ilse.target_directories.length /*|| !ilse.has_loaded*/ " :key="ilse.key" )
        Setup

    .ilse( v-if="ilse.target_directories.length && ilse.has_loaded " :key="ilse.key" :data-theme="get_data_theme()" )

        TopMenu

        .vitruvian-brain( style="position: fixed; bottom: 0px; left: 0px; z-index: 99; " )

            .closed( v-if="!ilse.is_vitruvian_expanded" )
                img( v-if="!ilse.config.dark" src="@/assets/images/math-function.svg"      style="cursor: pointer; width: 30px; "   title="Open Vitruvian Study" @click="toggle_vitruvian_brain" )
                img( v-if="ilse.config.dark" src="@/assets/images/dark-mode/math-function.svg" style="cursor: pointer; width: 30px; " title="Open Vitruvian Study" @click="toggle_vitruvian_brain" )

            .open( v-if="ilse.is_vitruvian_expanded" style="width: 300px; height: 140px; position: fixed; bottom: 0px; left: 0px; overflow: hidden; " )

                img( v-show="!ilse.config.dark" src="@/assets/images/math-function.svg"      style="cursor: pointer; width: 30px; "   title="Open Vitruvian Study" @click="toggle_vitruvian_brain" )
                img( v-show="ilse.config.dark" src="@/assets/images/dark-mode/math-function.svg" style="cursor: pointer; width: 30px; " title="Open Vitruvian Study" @click="toggle_vitruvian_brain" )
                br

                img( v-show="!ilse.config.dark" src="@/assets/images/player-play.svg"      style="cursor: pointer; width: 20px; "   title="Toggle First Brain Tools"  @click="ilse.brains.first.read_first()" accesskey="i" )
                img( v-show="ilse.config.dark" src="@/assets/images/dark-mode/player-play.svg"      style="cursor: pointer; width: 20px; "   title="Toggle First Brain Tools"  @click="ilse.brains.first.read_first()" accesskey="i" )

                img( v-show="!ilse.config.dark" src="@/assets/images/trash.svg"      style="cursor: pointer; width: 20px; margin-left: 10px;"   title="Toggle First Brain Tools"  @click="ilse.brains.first.remove()" accesskey="i" )
                img( v-show="ilse.config.dark" src="@/assets/images/dark-mode/trash.svg"      style="cursor: pointer; width: 20px; margin-left: 10px;"   title="Toggle First Brain Tools"  @click="ilse.brains.first.remove()" accesskey="i" )

                img( v-show="!ilse.config.dark" src="@/assets/images/arrows-shuffle.svg"      style="cursor: pointer; width: 20px; margin-left: 10px;"   title="Toggle First Brain Tools"  @click="ilse.brains.first.shuffle()" accesskey="i" )
                img( v-show="ilse.config.dark" src="@/assets/images/dark-mode/arrows-shuffle.svg"      style="cursor: pointer; width: 20px; margin-left: 10px;"   title="Toggle First Brain Tools"  @click="ilse.brains.first.shuffle()" accesskey="i" )

                img( v-show="!ilse.config.dark" src="@/assets/images/lupe.svg"      style="cursor: pointer; width: 20px; margin-left: 10px;"   title="Toggle First Brain Tools"  @click="ilse.brains.first.show_query( item => ilse.brains.first.read(item) )" accesskey="i" )
                img( v-show="ilse.config.dark" src="@/assets/images/dark-mode/lupe.svg"      style="cursor: pointer; width: 20px; margin-left: 10px;"   title="Toggle First Brain Tools"  @click="ilse.brains.first.show_query( item => ilse.brains.first.read(item) )" accesskey="i" )

                img( v-show="!ilse.config.dark" src="@/assets/images/hash.svg"      style="cursor: pointer; width: 20px; margin-left: 10px;"   title="Toggle First Brain Tools"  @click="ilse.brains.first.add_topic()" accesskey="i" )
                img( v-show="ilse.config.dark" src="@/assets/images/dark-mode/hash.svg"      style="cursor: pointer; width: 20px; margin-left: 10px;"   title="Toggle First Brain Tools"  @click="ilse.brains.first.add_topic()" accesskey="i" )

                img( v-show="!ilse.config.dark" src="@/assets/images/plus.svg"      style="cursor: pointer; width: 20px; margin-left: 10px;"   title="Toggle First Brain Tools"  @click="ilse.brains.first.increase()" accesskey="i" )
                img( v-show="ilse.config.dark" src="@/assets/images/dark-mode/plus.svg"      style="cursor: pointer; width: 20px; margin-left: 10px;"   title="Toggle First Brain Tools"  @click="ilse.brains.first.increase()" accesskey="i" )

                img( v-show="!ilse.config.dark" src="@/assets/images/minus.svg"      style="cursor: pointer; width: 20px; margin-left: 10px;"   title="Toggle First Brain Tools"  @click="ilse.brains.first.decrease()" accesskey="i" )
                img( v-show="ilse.config.dark" src="@/assets/images/dark-mode/minus.svg"      style="cursor: pointer; width: 20px; margin-left: 10px;"   title="Toggle First Brain Tools"  @click="ilse.brains.first.decrease()" accesskey="i" )

                p( :title="get_first_brain_last_item_info()" ) {{get_first_brain_last_item_info()}}

        Components( :components="ilse.components" unique-key="home" )

        Modals
        Dialogs
        Notifications( v-if="ilse.has_loaded" )

</template>
<script>
// eslint-disable-next-line
const printf                                        = console.log;

// Ilse
    import ilse             from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Components
    import TopMenu          from "@/components/TopMenu.vue"
    import Setup            from "@/components/Setup.vue"
    import Modals           from "@/components/Modals.vue"
    import Dialogs          from "@/components/Dialogs.vue"
    import Notifications    from "@/components/Notifications.vue"
    import Components       from "@/components/Components.vue"

export default {

    name: "Home",

    components: {
        TopMenu,

        Modals,
        Dialogs,

        Setup,
        Notifications,

        Components,
    },

    data() {
        return {
            ilse: ilse,
            key: Math.random(),
        }
    },

    methods: {

        get_first_brain_last_item_info() {

            let last   = this.ilse.brains.first.get_last()
                if( !last ) return "No Last"

            let chunks = last.split("/")
                let name     = chunks[0]
                let interest = chunks[1]
                let topics   = chunks[2]

            let info   = `${name} ${interest} ${topics}`

            return info
        },

        toggle_vitruvian_brain() {
            this.ilse.is_vitruvian_expanded = !this.ilse.is_vitruvian_expanded
        },

        get_data_theme() {
            let theme = ilse.config.dark ? 'dark' : 'light'
            return theme
        },

        /*
        async info_dialog() {
            ilse.dialog.info( "Title", "something else" )
        },

        async confirm_dialog() {
            ilse.dialog.confirm( "Title", "something else" )
        },

        async input_dialog() {
            ilse.dialog.input( "Title", "something else" )
        },

        notify() {
            ilse.notification.send( "New Message", "Hey man, could you switch away from that gas-thing from now on?" )
        },

        test() {
            ilse.ipc.send( "hello" )
        },

        dialog() {
            ilse.electron.dialog.open()
        },

        open_modal() {
            ilse.modals.open( "test" )
        },

        async confirm_dialog() {

            try {
                let o = await ilse.dialog.confirm( "Delete this note?", "Are you sure you want to delete this note? There's no going back! Make sure you have your backup secured." )
            } catch( e ) {
                printf( "e -> ", e )
            }

        },

        save() {
            ilse.save()
        },

        add_component() {
            let component = new ilse.classes.Component()
                ilse.components.push( component )
        },

        get_component_style( component ) {
            let style = `flex: ${component.flex}; margin-left: 10px; height: 100%; `
            return style
        },

        get_theme_type() {
            return ilse.themes.type
        },
        */

        setup() {

        },
    },

    mounted() {
        this.setup();
    },

}
</script>
<style>

:root, .ilse[data-theme='light'] {
    --background-color: #fff;
    --text-color: #4a4a4a;
    --border: 1px solid #4a4a4a;
    --border-radius: 6px;
}

.ilse[data-theme="dark"] {
    --background-color: #000;
    --text-color: #fff;
    --border: 2px solid #777;
    --border-radius: 6px;
}

.ilse  {
    color: var( --text-color );
    background: var( --background-color ) !important;
    min-height: 100vh;
}

</style>
