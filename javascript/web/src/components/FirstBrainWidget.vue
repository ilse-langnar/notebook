<template lang="pug">
.first-brain.widget

    .vitruvian-brain( style="position: fixed; bottom: -3px; left: 0px; z-index: 99; " @drop.prevent="on_drop" @dragover.prevent )

        .closed( v-if="!ilse.is_vitruvian_expanded" )
            img( src="@/assets/images/math-function.svg"      style="cursor: pointer; width: 30px; "   title="Open Vitruvian Study" @click="toggle_first_brain_modal" )

        .open( v-if="ilse.is_vitruvian_expanded" style="width: 100%; background: var( --background-color ); max-height: 40px; position: fixed; bottom: 0px; left: 0px; overflow: hidden; " )

            .list.flex
                img( src="@/assets/images/math-function.svg"      style="cursor: pointer; width: 30px; "   title="Open Vitruvian Study" @click="toggle_vitruvian_brain" )
                br

                img( src="@/assets/images/player-play.svg" title="Toggle First Brain Tools"  @click="ilse.brains.first.read_first()" accesskey="i" )
                img( src="@/assets/images/trash.svg"     title="Toggle First Brain Tools"  @click="ilse.brains.first.remove()" accesskey="i" )
                img( src="@/assets/images/arrows-shuffle.svg" title="Toggle First Brain Tools"  @click="ilse.brains.first.shuffle()" accesskey="i" )
                img( src="@/assets/images/lupe.svg"      title="Toggle First Brain Tools"  @click="ilse.brains.first.show_query( item => ilse.brains.first.read(item) )" accesskey="i" )
                img( src="@/assets/images/hash.svg"      title="Toggle First Brain Tools"  @click="ilse.brains.first.tag()" accesskey="i" )
                img( src="@/assets/images/plus.svg"      title="Toggle First Brain Tools"  @click="ilse.brains.first.increase()" accesskey="i" )
                img( src="@/assets/images/minus.svg"     title="Toggle First Brain Tools"  @click="ilse.brains.first.decrease()" accesskey="i" )
                img( src="@/assets/images/settings.svg"  title="Toggle First Brain Tools"  @click="ilse.modals.open('first-brain-config')" accesskey="i" )

                p( :title="get_first_brain_last_item_info()" ) {{get_first_brain_last_item_info()}}

</template>
<script>
// eslint-disable-next-line
const printf                                        = console.log;

// Ilse
    import ilse             from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default {

    name: "FirstBrain",

    data() {
        return {
            ilse: ilse,
        }
    },

    methods: {

        toggle_first_brain_modal() {
            this.ilse.modals.open( "first-brain" )
        },

        toggle_vitruvian_brain() {
            this.ilse.is_vitruvian_expanded = !this.ilse.is_vitruvian_expanded
        },

        on_drop( event ) {
            this.add_file( event )
        },

        async add_file( event ) {

            // TODO: handle package.zip
            let file        = event.dataTransfer.files[0] 
            let name        = file.name
            let extention   = name.substr(name.lastIndexOf("."), name.length )

            let is_pdf      = extention === ".pdf"
            let is_zip      = extention === ".zip"

            if( is_zip ) {
                this.handle_zip( name, file )
            }

            if( is_pdf ) {
                this.handle_pdf( name, file )
            }

        },

        async handle_pdf( name, file ) {

            // Blob Magic
                let fileData    = new Blob( [file] )
                let arrayBuffer = await fileData.arrayBuffer() 
                const buffer    = Buffer.from( arrayBuffer  ,'binary' )
                let blob        = buffer

            // Preflight check
                let text        = await this.ilse.filesystem.file.get( "queue" ) // FS Write

                // Block if the item is already there.
                    let has_already = text.indexOf( name ) !== -1
                    if( has_already )  {
                        ilse.dialog.info( "Error", `You already have the item: ${name}` )
                        return
                    }

            // Confirmation Dialog
                try {
                    await ilse.dialog.confirm( "Add?", `Do you want to add: ${name}` )
                } catch( e ) {
                    return e
                }

            // Write blog on FS
                await ilse.filesystem.file.set( ilse.path.join("first", file.name), blob )

            // Split Then Push
                let list        = text.split( "\n" )
                    list.push( `${name}/1/` )


            // Shuffle
                list            = list.filter( e=>e ) // BUGFIX: avoid empty newlines on new queue
                list            = ilse.utils.shuffle_array( list )

            // Array->String
                let queue       = list.join("\n") // Array -> String

            // FS Write
                await this.ilse.filesystem.file.set( "queue", queue ) // FS Write

            // Notify
            ilse.notification.send( `Added Item: ${name}`, `You can use it now.` )
        },

        async handle_zip( name, file ) {

            let fileData    = new Blob( [file] )
            let arrayBuffer = await fileData.arrayBuffer() 
            const buffer    = Buffer.from( arrayBuffer  ,'binary' )

            let string      = buffer.toString()
            let list        = string.split("\n")
                list            = list.filter( e=>e )
            let blob        = buffer
            printf( "string -> ", string )

            try {
                ilse.dialog.listing( "Add those items?", "Those items will be added to your first brain, and will be scheduled repeatedly.", list, function() {} )
                // add somehow
            } catch( e ) {
            }

            // await ilse.filesystem.file.set( ilse.path.join("second", file.name), blob )

            // this.inote.focus()

            // setTimeout( () => {
                // this.inote.caret.add( ` ![[${file.name}]]` ) }, 100 )
        },

        get_first_brain_last_item_info() {

            let last   = this.ilse.brains.first.get_last()
                if( !last ) return "You have 0 items on queue"

            let chunks = last.split("/")
                let name     = chunks[0]
                let interest = chunks[1]
                let topics   = chunks[2]

            let info   = `${name} ${interest} ${topics}`

            return info
        },

        // ---------------------------------- Setup -------------------------- //
        setup() {
        },
        // ---------------------------------- Setup -------------------------- //

    },

    mounted() {
        this.setup();
    },

}
</script>
<style scoped>

.list.flex img {
    cursor: pointer;
    width: 20px;
    margin-left: 10px;
}

.list.flex p {
    margin-left: 10px;

}

</style>
