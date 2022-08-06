<template lang="pug" >
.file( style="overflow: hidden;" )

    .flex
        img.is-pulled-left( v-if="!ilse.config.favorites || !(ilse.config.favorites.indexOf(file) !== -1)" src="@/assets/images/star.svg" style="width: 20px; cursor: pointer; " @click="toggle_favorite(file)" :title="$t('favorite')" )
        img.is-pulled-left( v-if="ilse.config.favorites && ilse.config.favorites.indexOf(file) !== -1" src="@/assets/images/star-off.svg" style="width: 20px; cursor: pointer; " @click="toggle_favorite(file)" :title="$t('unfavorite')" )
        input.is-size-4.centered.file-input( v-model="file" style="border: 0; " @keydown.enter="get_file" autofocus="autofocus" ref="input" )

        img.is-pulled-right( src="@/assets/images/trash.svg" style="width: 20px; cursor: pointer; " @click="delete_file(file)" title="$t('delete_file')" )

    // .file-wrapper( v-if="content" style="border: 1px solid #eee; border-radius: 7px; box-shadow: 2px 3px 5px rgba(0,0,0,.2); padding: 7px;" )
        br
        textarea.textarea.rendered( v-show="is_editable && file" v-model="content" :id="file" @blur="on_blur" )
        .rendered( v-show="!is_editable" contentEditable v-html="get_html()" @focus="on_focus" )
        br

    br

    .loop( v-if="is_on" v-for="( note, index ) of notes" :key="index" :style="get_note_style(note)" )
        
        component( v-if="note.id" :is="require('@/components/Notes.vue').default" :note="note" @on-enter="on_note_enter" @on-link-click="on_note_link_click" @on-blur="on_note_blur" @on-tab="on_tab" @on-shift-tab="on_shift_tab" @on-esc="on_note_esc" @on-arrow-up="on_note_arrow_up" @on-arrow-down="on_note_arrow_down" @on-note-left-click="on_note_left_click" )

        // Notes( v-show="note.id" :note="note" :key="note.id + file" @on-enter="on_note_enter" @on-link-click="on_note_link_click" @on-blur="on_note_blur" @on-tab="on_tab" @on-shift-tab="on_shift_tab" @on-esc="on_note_esc" @on-arrow-up="on_note_arrow_up" @on-arrow-down="on_note_arrow_down" @on-note-left-click="on_note_left_click" )

    GhostNote.is-pulled-left( @on-blur="on_ghost_note_blur" @on-enter="on_ghost_note_enter" )

    button.button.slick-button.centered( v-if="is_create_file_button_on" style="display: block;" @click="create(file)" ) Create

    .space
    References( v-if="content && file" :file="file" :key="content" )
    .space

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
    import References                   from "@/components/References.vue"
    import GhostNote                    from "@/components/GhostNote.vue"

export default {

    name: "File",

    props: {
       // path: { type: String, required: false, },
       component: { type: Object, required: false, },
    },

    data() {
        return {
            ilse: ilse,
            file: this.component.props.file || "",
            is_editable: false,
            content: "",
            refs: [],
            notes: [],
            is_on: false,
            is_create_file_button_on: false,

            // BUGFIX: this fucking shit does not want to update when a file is passed direstly from a saved component AAAAAAAAAAAAAAAAAA
            ref_key: 0,
        }
    },

    components: {
        Notes,
        References,
        GhostNote,
    },

    watch: {

        file( file ) {
            this.component.props.file = file
        }
    },

    methods: {

        async create( file ) {
            await ilse.filesystem.file.write.async( ilse.path.join("second" , file), "" )
            this.is_create_file_button_on = false
        },

        // Control the margins
        get_note_style( note ) {

            // let style = `display: flex;`
            let style = ``
                if( note.depth ) style += `margin-left: ${18 * note.depth}px !important; `

            return style
        },

        delete_file( file ) {
            printf( "delete_file -> ", file )
        },

        toggle_favorite( file ) {

            let has_favorites = ilse.config.favorites 
                if( !has_favorites ) ilse.config.favorites = []

            let has_file_already = ilse.config.favorites.indexOf( file ) !== -1

            if( has_file_already ) {
                // TODO: remove
                let index = ilse.config.favorites.indexOf( file )
                ilse.config.favorites.splice( index, 1 )
            } else {
                ilse.config.favorites.push( file )
            }
        },

        /*
        on_note_link_click( payload ) {
            printf( "@@@ on_note_link_click -> payload ->  ", payload )

            let note           = payload.note
            let file             = payload.link
            let event            = payload.event
            let is_shift         = event.shiftKey
            let is_ctrl          = event.ctrlKey

            let is_file_markdown = !(file.indexOf(".mp4") !== -1 || file.indexOf(".png") !== -1 || file.indexOf(".jpg") !== -1 || file.indexOf(".jpeg") !== -1 || file.indexOf(".gif") !== -1 || file.indexOf(".svg") !== -1 || file.indexOf(".mp4") !== -1 || file.indexOf(".webm") !== -1 || file.indexOf(".mp3") !== -1 || file.indexOf(".ogg") !== -1 || file.indexOf(".wav") !== -1)
                if( is_file_markdown ) file += ".md"

            // <=======> Shift <=======> //
            if( is_shift ) {
                let component = new ilse.classes.Component({ type: "file", width: 8, props: { file }})
                    ilse.components.push( component )
            }
            // <=======> Shift <=======> //

            // <=======> Ctrl <=======> //
            if( is_ctrl ) {
                let component = new ilse.classes.Component({ type: "graph", width: 8, props: { file }})
                    ilse.components.push( component )
            }
            // <=======> Ctrl <=======> //

        },
        */

        on_note_link_click( payload ) {

            let note             = payload.note
            let file             = payload.link
            let event            = payload.event
            let is_shift         = event.shiftKey
            let is_ctrl          = event.ctrlKey
            let is_relative      = payload.link.indexOf( "@" ) !== -1 

            if( is_relative ) {
                let component = new ilse.classes.Component({ type: "text-file", width: 12, props: { name: payload.link.replace("@", "") }})
                    ilse.components.push( component )
                    return
            }

            let is_file_markdown = !(file.indexOf(".png") !== -1 || file.indexOf(".jpg") !== -1 || file.indexOf(".jpeg") !== -1 || file.indexOf(".gif") !== -1 || file.indexOf(".svg") !== -1 || file.indexOf(".mp4") !== -1 || file.indexOf(".webm") !== -1 || file.indexOf(".mp3") !== -1 || file.indexOf(".ogg") !== -1 || file.indexOf(".wav") !== -1 || file.indexOf(".md") !== -1) 
                if( is_file_markdown ) file += ".md"

            // <=======> Shift <=======> //
            if( is_shift ) {
                let component = new ilse.classes.Component({ type: "file", width: 8, props: { file }})
                    ilse.components.push( component )
            }
            // <=======> Shift <=======> //

            // <=======> Ctrl <=======> //
            if( is_ctrl ) {
                let component = new ilse.classes.Component({ type: "graph", width: 8, props: { file }})
                    ilse.components.push( component )
            }
            // <=======> Ctrl <=======> //

        },

        on_ghost_note_enter( payload ) {

            let content         = payload.content
            let has_text        = !!content
                if( !has_text ) return

            let time_id         = ilse.utils.get_unique_date_id() // 20220120155758
            let note          = new ilse.classes.Note( `${time_id}: ${content}`)
                this.notes.push( note )

            this.save()
        },

        on_ghost_note_blur( payload ) {

            let content         = payload.content
            let has_text        = !!content
                if( !has_text ) return

            let time_id         = ilse.utils.get_unique_date_id() // 20220120155758
            let note            = new ilse.classes.Note( `${time_id}: ${content}`)
            printf( "note -> ", note )
                this.notes.push( note )

            this.save()
        },

        async save() {

            let file     = this.file
            printf( "file -> ", file )

            let is_buggy = !file
                if( is_buggy ) {
                    ilse.notification.send( "Error", `Can't save file: ${file}, since it does not exist!` )
                    return
                }

            let content          = this.content 
            printf( "content -> ", content )
            let notes          = ""
            let note_id_regexp = /^\s*[0-9]{13}.*/

            let non_notes      = ""
            let is_note

            // Non note content
            let lines             = content.split("\n") 
            printf( "lines -> ", lines )
            let index             = 0
            let is_last
            for( const line of lines ) {
                index++

                is_note = note_id_regexp.test( line ) 
                    if( is_note ) continue

                is_last   = index === lines.length 

                if( is_last ) {
                    non_notes = non_notes + line 
                } else {
                    non_notes = non_notes + line + "\n"
                }
            }

            let is_empty
            // note content
            for( const note of this.notes ) {

                printf( "note.get() -> ", note.get() )

                is_empty = !note.get() 
                    if( is_empty ) continue

                notes  = notes + note.get()  + "\n"
            }

            let final = non_notes + notes

            await ilse.filesystem.file.write.async( ilse.path.join("second" , file), final )

        },

        on_note_enter( payload ) {

            let content         = " "
            let time_id         = ilse.utils.get_unique_date_id() // 20220120155758
            printf( "time_id -> ", time_id )
            let spaces          = ilse.utils.get_depth_spaces( payload.note.depth )
            printf( "spaces -> ", spaces )
            let source         = `${spaces}${time_id}: ${content}`
            printf( "source -> ", source )

            let new_note          = new ilse.classes.Note( source )
                // this.notes.splice( ++index, 0, new_note )
                // this.notes.splice( this.notes.length, 1,  )

                // this.notes.push( new_note )
                let index = this.notes.indexOf( payload.note )
                printf( "index -> ", index )
                // this.notes.splice( this.notes.length -1 , 0 )
                this.notes.splice( ++index, 0, new_note )

                // let array = ilse.utils.move_array( this.notes, this.notes.length - 1, ++index )
                // printf( "array -> ", array )

            new_note.focus() 

            this.save()
        },

        on_note_blur( payload ) {
            this.save()
        },

        on_tab( payload ) {
            printf( "on_tab -wdionqwdio -> ", payload )
            payload.note.$depth( 1 )
        },

        on_shift_tab( payload ) {
            payload.note.$depth( -1 )
        },

        on_note_esc() {
            document.activeElement.blur()
        },

        on_note_arrow_up( payload ) {
            let note          = payload.note
            let notes         = this.notes
            let index           = notes.indexOf( note )
            let note_above    = notes[--index]
                if( note_above ) note_above.focus()
        },

        on_note_arrow_down( payload ) {
            let note          = payload.note
            let notes         = this.notes
            let index           = notes.indexOf( note )
            let note_below    = notes[++index]
                if( note_below ) note_below.focus()
        },

        on_note_left_click( payload ) {
            ilse.clipboard.write( payload.id )
        },

        // break each line, then check against a regexp, if yes when that line is a note
        check_for_existing_notes() {

            let content     = this.content

            let has_content = !!content
                if( !has_content ) return

            let lines       = content.split("\n")

            let note_id_regexp = /^\s*[0-9]{13}.*/

            let has_line
            let is_line_a_note
            let instance

            for( const line of lines ) {

                has_line = line
                if( !has_line ) continue

                is_line_a_note = note_id_regexp.test( line )

                if( is_line_a_note ) {
                    instance = new ilse.classes.Note( line, "file-" + this.file )
                        this.notes.push( instance )
                }

            }

        },

        async set_content() {

            let file     = this.file
            let has_file = !file
                if( has_file ) return

            let has_extention       = this.file.lastIndexOf(".") !== -1
            let file_exists         = await ilse.filesystem.file.exists.async( ilse.path.join("second" , this.file) )
            let should_md_extention = !has_extention && !file_exists  // FEATURE: no extention AND we tried getting without extention, let's just try adding a .md, more convenient
                if( should_md_extention ) this.file = this.file + ".md"

            let content

            try {
                content         = await ilse.filesystem.file.read.async( ilse.path.join("second" , this.file) )
                this.content    = content
                this.is_create_file_button_on = false
                this.check_for_existing_notes()
            } catch(e) {
                // ilse.notification.send( "New File", `Created file name: ${this.file}` )
                // await ilse.filesystem.file.set( this.file, this.file )
                // this.content    = this.file
                this.is_create_file_button_on = true
                ilse.notification.send( "Error", `Could not find file: ${this.file}` )
            }
            this.is_on = true

        },

        // BUGFIX: When changing the file, we "keep" old refs and notes
        reset_evetyhing() {
            this.is_editable    = false
            this.content        = ""
            this.refs           = []
            this.notes        = []
        },

        get_file() {
            this.reset_evetyhing()
            this.set_content()
        },

        setup() {

            /*
            this.$nextTick(function () {
                this.$refs.input.focus()
            })
            */

            setTimeout( () => {
                this.$refs.input.focus()
            }, 1000 )
            

            setTimeout( () => {
                if( this.file ) this.set_content()
            }, 1000 )

        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped>

.file-input {
    background: var( --background-color );
    color: var( --text-color );
}

.rendered {
    height: 50vh;
    overflow: auto;
}

</style>
