<template lang="pug" >
.top-menu( style="width: 100%; display: flex; padding: 0.3em 0.5em; " )

    .menu-item( style="margin: auto;" )

        // img( src="@/assets/images/menu.svg"      style="cursor: pointer; width: 20px; margin-left: 15px;"   title="Add Menu"  @click="toggle_menu" accesskey="m" )

        .vspace

        img( src="@/assets/images/home.svg"      style="cursor: pointer; width: 20px; margin-left: 15px; color: #fff; fill: #fff;"   title="Home Page"  @click="toggle_is_home_page_on" )
        img( src="@/assets/images/calendar.svg"      style="cursor: pointer; width: 20px; margin-left: 15px; color: #fff; fill: #fff;"   title="Go to Daily Notes"  @click="add_daiyl_notes" accesskey="d" )
        img( src="@/assets/images/school.svg"      style="cursor: pointer; width: 20px; margin-left: 15px; color: #fff; fill: #fff;"   title="Toggle First Brain"  @click="toggle_first_brain" )

        // img( src="@/assets/images/news.svg"      style="cursor: pointer; width: 20px; margin-left: 15px;"   title="Open File"  @click="open_file" accesskey="o" )

        .vspace

        // img( src="@/assets/images/report.svg"      style="cursor: pointer;width:20px;margin-left: 15px;"   title="Statistics"  @click="open_statistics" )

        // img( src="@/assets/images/school.svg"      style="cursor: pointer; width: 20px; margin-left: 15px;"   title="Toggle First Brain Tools"  @click="toggle_first_brain_tools" accesskey="i" )


        // .did( style="margin-top: 10px; clear: both; margin-left: 65px;" )
        .did( style="width: 300px; height: 100px; position: fixed; bottom: 10px; left: 0px;" )
            img( v-show="has_first_brain_tools" src="@/assets/images/player-play.svg"      style="cursor: pointer; width: 20px; "   title="Toggle First Brain Tools"  @click="ilse.brains.first.read_first()" accesskey="i" )

            img( v-show="has_first_brain_tools" src="@/assets/images/trash.svg"      style="cursor: pointer; width: 20px; margin-left: 10px;"   title="Toggle First Brain Tools"  @click="ilse.brains.first.remove()" accesskey="i" )

            img( v-show="has_first_brain_tools" src="@/assets/images/arrows-shuffle.svg"      style="cursor: pointer; width: 20px; margin-left: 10px;"   title="Toggle First Brain Tools"  @click="ilse.brains.first.shuffle()" accesskey="i" )

            img( v-show="has_first_brain_tools" src="@/assets/images/lupe.svg"      style="cursor: pointer; width: 20px; margin-left: 10px;"   title="Toggle First Brain Tools"  @click="ilse.brains.first.show_query( item => ilse.brains.first.read(item) )" accesskey="i" )

            img( v-show="has_first_brain_tools" src="@/assets/images/hash.svg"      style="cursor: pointer; width: 20px; margin-left: 10px;"   title="Toggle First Brain Tools"  @click="ilse.brains.first.add_topic()" accesskey="i" )

            img( v-show="has_first_brain_tools" src="@/assets/images/plus.svg"      style="cursor: pointer; width: 20px; margin-left: 10px;"   title="Toggle First Brain Tools"  @click="ilse.brains.first.increase()" accesskey="i" )

            img( v-show="has_first_brain_tools" src="@/assets/images/minus.svg"      style="cursor: pointer; width: 20px; margin-left: 10px;"   title="Toggle First Brain Tools"  @click="ilse.brains.first.decrease()" accesskey="i" )
            p( v-if="has_first_brain_tools" ) {{get_first_brain_last_item_info()}}








    .menu-item( style="margin: auto; " )
        Search( :width="50" :should-autofocus="false" @on-result-select="on_note_search_on_result_select" )

    .menu-item( style="margin: auto; " )
        // img( src="@/assets/images/circle-plus.svg" style="cursor: pointer; width: 20px; "   title="Add Component"  @click="add_component" accesskey="C" )
        // .margin-small


        ImporterImg( style="margin-right: 5px;" )
        img( src="@/assets/images/command.svg"   style="cursor: pointer; width: 20px; " title="Save" alt="Save" @click="toggle_command_pallet" )
        // img( src="@/assets/images/save.svg"   style="cursor: pointer; width: 20px; " title="Save" alt="Save" @click="save" accesskey="s" )

        .margin-small

        img( src="@/assets/images/settings.svg"     style="cursor: pointer; width: 20px; " title="Configurations" @click="open_configuration_modal" accesskey="c" )

        .margin-small

        img( src="@/assets/images/folders.svg"    style="cursor: pointer; width: 20px; "   title="Help/Manual/Tutorial/APIs" v-popover="{ name: 'folders', position: 'bottom' }" )

        .margin-small
        img( src="@/assets/images/lifebuoy.svg"    style="cursor: pointer; width: 20px; "   title="Help/Manual/Tutorial/APIs" accesskey="h" @click="open_help_modal" )

        .margin-large
        img.is-pulled-right( src="@/assets/images/moon-stars.svg"   style="cursor: pointer; width: 20px; " title="Toggle Dark Mode" @click="toggle_dark_mode()" )

    Popover( direction="bottom" name="folders" style="width: 300px; background: var( --background-color ); color: var( --text-color ); " )
        .folders( style="padding: 5px; overflow: hidden; " )
            .folder( v-for="( folder, index ) in ilse.target_directories" :key="index" @click="select_folder(folder)" :style="get_target_directory_style(folder)" :title="'Use ' + folder" )
                img.is-pulled-right( src="@/assets/images/x.svg" style="width: 20px; display: block; margin: 0 auto;" title="Add another folder" @click="delete_dir(folder)" )

                p {{folder}}
            img( src="@/assets/images/plus.svg" style="width: 30px; display: block; margin: 0 auto;" @click="add_target_directory" title="Add another folder" )

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Components
    import Search                       from "@/components/Search.vue"
    import ImporterImg                  from "@/components/ImporterImg.vue"

export default {

    name: "TopMenu",

    data() {
        return {
            ilse: ilse,
            has_first_brain_tools: false,
        }
    },

    components: {
        Search,
        ImporterImg,
    },


    methods: {

        toggle_is_home_page_on() {
            ilse.is_home_page_on = !ilse.is_home_page_on 
        },

        toggle_first_brain() {
            printf( "toggle_first_brain" )
            ilse.modals.open( "first-brain" )
        },

        toggle_command_pallet() {
            ilse.modals.open( "command-pallet" )
        },

        open_help_modal() {
            ilse.modals.open( "help" )
        },

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

        toggle_first_brain_tools() {
            this.has_first_brain_tools = !this.has_first_brain_tools
        },

        interest_repetition() {

            this.ilse.electron.ipc.send("execute-zir", {
                dir: ilse.target_directories[0]
            })

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

        async ask_for_new_note() {

            let payload = await ilse.dialog.input( "New note", "Content:" )
            let input   = payload.input
            let index   = ilse.notes.list.length
                ilse.notes.add( input, index, 0 )
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

        toggle_menu() {

            let has_menu_already = false
            let menu_index       = null

            let index = 0
            for( const component of ilse.components ) {
                index++

                if( component.type === "menu" ) {
                    has_menu_already = true
                    menu_index       = index
                }
            }

            if( has_menu_already ) {
                // ilse.components.splice( menu_index, 1 )
                // ilse.notification.send( "Already there", "The menu is already on!" )
            } else {
                let component = new ilse.classes.Component({ type: "menu", width: 0 })
                    ilse.components.unshift( component )
            }

        },

        open_statistics() {
            let component = new ilse.classes.Component({ type: "statistics", width: 12, props: {} })
                ilse.components.push( component )
        },

        open_file() {
            let component = new ilse.classes.Component({ type: "file", width: 12, props: { file: "Ilse.md" } })
                ilse.components.push( component )
        },

        open_interest_repetition() {
            let component = new ilse.classes.Component({ type: "interest-repetition", width: 12, props: { } })
                ilse.components.push( component )
        },

        delete_dir( folder ) {

            // let selected_folder = ilse.target_directories[0]
                // let selected_folder_index = ilse.target_directories.indexOf( selected_folder )

            let index = ilse.target_directories.indexOf( folder )
                ilse.target_directories.splice( index, 1 )

            ilse.target_directories.splice( selected_folder_index, 1 )
            // ilse.target_directories.unshift( selected_folder )

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
                printf( "ilse.target_directories -> ", ilse.target_directories )
                printf( "path -> ", path )
                printf( "has_dir_already -> ", has_dir_already )
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
