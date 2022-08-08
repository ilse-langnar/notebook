<template lang="pug" >
.top-menu( v-if="!ilse.is_zen" style="width: 100%; display: flex; padding: 0.3em 0.5em; " )

    img( :src="irequire.img('arrow-narrow-right.svg')"      style="cursor: pointer; width: 20px; margin-left: 15px; color: #fff; fill: #fff;"   :title="$t('toggle_left_sidebar')" @click="ilse.is_left_sidebar_open = !ilse.is_left_sidebar_open" )
    .menu-item( style="margin: auto;" )


        .vspace

        img( :src="irequire.img('calendar.svg')"      style="cursor: pointer; width: 20px; margin-left: 15px; color: #fff; fill: #fff;"   :title="$t('open_daily_notes')"  @click="add_daiyl_notes" accesskey="d" )
        img( :src="irequire.img('school.svg')"      style="cursor: pointer; width: 20px; margin-left: 15px; color: #fff; fill: #fff;"   :title="$t('toggle_first_brain')"  @click="toggle_first_brain" )

        .vspace


    .menu-item( style="margin: auto; " )
        SearchButton( :width="50" :should-autofocus="false" @on-result-select="on_note_search_on_result_select" )

    .menu-item( style="margin: auto; " )
        img( :src="irequire.img('command.svg')"   style="cursor: pointer; width: 20px; " :title="$t('open_command_pallet')" alt="$t('open_command_pallet')" @click="toggle_command_pallet" )
        .margin-small

        img( :src="irequire.img('settings.svg')"     style="cursor: pointer; width: 20px; " :title="$t('configuration')" @click="open_configuration_modal" accesskey="c" )
        .margin-small

        img( :src="irequire.img('folders.svg')"    style="cursor: pointer; width: 20px; "   :title="$t('folders')" v-popover="{ name: 'folders', position: 'bottom' }" )
        .margin-small

        img( :src="irequire.img('lifebuoy.svg')"    style="cursor: pointer; width: 20px; "   :title="$t('help_manual_tutorial_and_apis')" accesskey="h" @click="open_help_modal" )
        .margin-large

        img.is-pulled-right( :src="irequire.img('moon-stars.svg')"   style="cursor: pointer; width: 20px; " :title="$t('toggle_dark_mode')" @click="toggle_dark_mode()" )

    Popover( direction="bottom" name="folders" style="width: 300px; background: var( --background-color ); color: var( --text-color ); " )
        .folders( style="padding: 5px; overflow: hidden; " )
            .folder( v-for="( folder, index ) in ilse.target_directories" :key="index" @click="select_folder(folder)" :style="get_target_directory_style(folder)" :title="$t('use') + folder" )
                img.is-pulled-right( :src="irequire.img('x.svg')" style="width: 20px; display: block; margin: 0 auto;" :title="$t('delete_folder')" @click="delete_dir(folder)" )

                p {{folder}}

            img( :src="irequire.img('plus.svg')" style="width: 30px; display: block; margin: 0 auto;" @click="add_target_directory" :title="$t('add_folder')" )

    img( :src="irequire.img('arrow-narrow-left.svg')"      style="cursor: pointer; width: 20px; margin-left: 15px; color: #fff; fill: #fff;"   :title="$t('toggle_right_sidebar')" @click="ilse.is_right_sidebar_open = !ilse.is_right_sidebar_open" )
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
    },


    methods: {

        toggle_is_home_page_on() {
            ilse.is_home_page_on = !ilse.is_home_page_on 
        },

        toggle_first_brain() {
            ilse.modals.open( "first-brain" )
        },

        toggle_command_pallet() {
            ilse.modals.open( "command-pallet" )
        },

        open_help_modal() {
            ilse.modals.open( "help" )
        },

        toggle_dark_mode() {

            let is_dark = ilse.config.dark

            if( is_dark ) {
                ilse.config.dark = false
            } else {
                ilse.config.dark = true
            }

            ilse.config.save()
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

        add_daiyl_notes() {

            let has_daily_notes_already = false
            let daily_notes_index       = null

            let index = 0
            for( const component of ilse.components ) {
                index++

                if( component.type === "daily-notes" ) {
                    has_daily_notes_already = true
                    daily_notes_index       = index
                }
            }

            if( !has_daily_notes_already ) {
                let component = new ilse.classes.Component({ type: "daily-notes", width: 12 })
                    ilse.components.push( component )
            } else {

                if( ilse.components.length >= 1 ) {
                    ilse.components.splice( daily_notes_index, 1 )
                }

            }

        },

        delete_dir( folder ) {

            let index = ilse.target_directories.indexOf( folder )
                ilse.target_directories.splice( index, 1 )

            ilse.target_directories.splice( selected_folder_index, 1 )

            window.localStorage.setItem( "target-directories", JSON.stringify(ilse.target_directories) )
        },

        get_target_directory_style( folder ) {

            const is_folder_already_active = ilse.target_directories[0] === folder 

            let style = `margin-bottom: 10px; cursor: pointer;`
            if( is_folder_already_active ) {
                style += `border: 1px solid #000; padding: 3px; border-radius: 5px;`
            }

            return style

        },

        async add_target_directory() {

            let current_list = ilse.target_directories

            ilse.electron.dialog.open()

            ilse.electron.ipc.on( "selected-file", ( event , payload ) => {

                // BUGFIX: something wrong with the files
                let path              = payload[0]
                    if( !path ) return

                ilse.target_directories.push( path )

                let has_dir_already = ilse.target_directories.indexOf( path ) !== -1
                    if( has_dir_already ) return

                window.localStorage.setItem( "target-directories", JSON.stringify(ilse.target_directories) )
                    window.location.reload()

            })


        },

        select_folder( folder ) {

            const is_folder_already_active = ilse.target_directories[0] === folder 
            if( is_folder_already_active ) {
                ilse.notification.send( "Error", "This folder is already selected" )
                return
            }

            let index = ilse.target_directories.indexOf( folder )
                ilse.target_directories.splice( index, 1 )
                ilse.target_directories.unshift( folder )

            window.localStorage.setItem( "target-directories", JSON.stringify(ilse.target_directories) )
            window.location.reload()
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

</style>
