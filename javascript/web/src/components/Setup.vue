<template lang="pug">
.setup( v-if="ilse" )
    .space
    .electron-setup( v-if="ilse.platform === 'electron' " )
        p.is-size-3.has-text-centered Select the folder with your notes
        button.centered( @click="open_file_dialog" style="display: block !important; margin: 0 auto; ") Select

    .web-setup.flex(  v-if="ilse.platform === 'web' " )
        input.input.flexi( v-model="ilse.target_directories[0]" @keydown.enter="set" autofocus="autofocus" placeholder="e.g: /home/maria/Documents/notes or C:\\\Users\Maria\Desktop\zettel")
        button.button.slick-button.flexi( @click="set" ) Set


</template>
<script>
// eslint-disable-next-line
import printf                           from "@/classes/printf.js"

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default {

    name: "Setup",

    components: {
    },

    data() {
        return {
            ilse: ilse,
        }
    },

    methods: {

        open_file_dialog() {

            ilse.electron.dialog.open()

            ilse.electron.ipc.on( "selected-file", ( event , payload ) => {

                // BUGFIX: We should not do anything if it's already defined
                let has_directory     = !!ilse.target_directories.length
                    if( has_directory ) return

                // BUGFIX: something wrong with the files
                let path              = payload[0]
                    if( !path ) return

                let list              = []
                    list.push( path )
                let stringified_list  = JSON.stringify( list )

                window.localStorage.setItem( "target-directories", stringified_list )

                ilse.target_directories       = window.localStorage.getItem( "target-directories" )
                window.location.reload()

            })

        },

        /*
        look( event ) {
            let o = event.target.files[0].mozFullPath
            var files = event.target.files;
            var path = files[0].webkitRelativePath;
            var Folder = path.split("/");
        },
        */

        set() {
            Messager.emit( "ilse", "set-target-directory", this.target_directories )
        },

        // ---------------------------------- Setup -------------------------- //
        setup() {
            Messager.emit( "keyboard", "set-mode", "Normal" )
        },
        // ---------------------------------- Setup -------------------------- //

    },

    mounted() {
        this.setup();
    },

}
</script>
