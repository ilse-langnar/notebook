<template lang="pug" >
.text-file
    input.input.centered( v-model="input" @keydown.enter="on_keydown_enter()" )
    br
    .file( v-if="type === 'file' " )
        .go-back( @click="go_back()" )
            p ../
        // p( contentEditable="" ) {{text}}
        textarea( v-model="text" )
    .directory( v-if="type === 'directory' " )
        .go-back( @click="go_back()" )
            p ../
        .loop( v-for="( dir, index ) in directory_files" :key="index" @click="go_to(dir)" )
            p {{dir}}
</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default {

    name: "TextFile",

    props: {
       component: { type: Object, required: false, },
    },

    data() {
        return {
            ilse: ilse,
            // input: this.component.props.name || "/",
            input: this.component.props.name,
            type: "",

            // Dir
            directory_files: [],

            // File
            text: "",
        }
    },

    watch: {

        text( text ) {
            ilse.utils.throttle( this.save( this.input, text ), 4000 )
        },

    },

    methods: {

        async save( fpath, text ) {

            let is_illegal = fpath === "/"

                if( is_illegal ) return

            let now = new Date().getTime()
            if( 3000 > (now - this.lastCalled) ) return
            this.lastCalled = now

            await ilse.filesystem.file.write.async( fpath, text )
        },

        go_back() {
            let split  = this.input.split("/")
            split.pop()
            this.input = split.join("/")
            this.go_to_dir()
        },

        go_to( dir ) {
            printf( "go_to -> dir -> ", dir )
            if( this.input[this.input.length-1] === "/" ) {
                this.input += dir
            } else {
                this.input += "/" + dir 
            }

            this.go_to_dir()
        },

        async go_to_dir() {

            let is_illegal = this.input.indexOf( "../" ) !== -1
            if( is_illegal ) return

            try {

                let does_path_exists = await ilse.filesystem.file.exists.async( this.input )
                let is_dir           = await ilse.filesystem.dir.is.async(  this.input )

                if( does_path_exists && !is_dir ) {
                    this.type = "file"
                    this.text = await ilse.filesystem.file.read.async(    this.input )
                } else if( does_path_exists && is_dir ){
                    this.type = "directory"
                    this.directory_files = await ilse.filesystem.dir.list.async( this.input )
                }

            } catch( e ) {
                ilse.notification.send( "Not Found", `Could Not Find: ${this.input}` )
            }

        },

        on_keydown_enter() {
            this.go_to_dir()
        },

        setup() {
            this.go_to_dir()
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped >

.text-file .input.centered {
    display: block;
    width: 70%;
}

.directory  {
    width: 80%;
    margin: 0 auto;
    color: var( --text-color );
}

.directory div, .file div {
    border: 1px solid var( --text-color );
    width: 100%;
    margin-bottom: 5px;
    border-radius: var( --border-radius );
    padding: 3px;
    cursor: pointer;
}

.file .go-back:hover {
    background: var( --text-color );
    color: var( --background-color );
    border: 1px solid var( --text-color );
    border-radius: var( --border-radius );

}

.directory .go-back:hover {
    background: var( --text-color );
    color: var( --background-color );
    border: 1px solid var( --text-color );
    border-radius: var( --border-radius );

}

.text-file .file {
    width: 100%;
    margin: 0 auto;
    color: var( --text-color );
}

.file textarea {
    width: 100%;
    height: 100vh;
    background: var( --background-color );
    color: var( --text-color );
    resize: none;
    border-radius: var( --border-radius );
    padding: var( --padding );
}

</style>
