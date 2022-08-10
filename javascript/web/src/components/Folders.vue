<template lang="pug" >
.folders

    h1.centered Available Folders
    .folder( v-for="( folder, index ) in ilse.target_directories" :key="index" @click="select_folder(folder)" :style="get_target_directory_style(folder)" :title="$t('use') + folder" )
        img.is-pulled-right( :src="irequire.img('x.svg')" style="width: 20px; display: block; margin: 0 auto;" :title="$t('delete_folder')" @click="delete_dir(folder)" )
        p {{folder}}

    img( :src="irequire.img('plus.svg')" style="width: 30px; display: block; margin: 0 auto;" @click="add_target_directory" :title="$t('add_folder')" )
</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default {

    name: "Folders",

    data() {
        return {
            ilse: ilse,
        }
    },

    methods: {

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


        setup() { },

    },

    mounted() {
        this.setup();
    }

}
</script>
