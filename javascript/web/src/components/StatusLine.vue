<template lang="pug" >
.status-line( v-if="!ilse.is_zen" :style="get_status_line_style()" )

    .flex
        // p.flexi {{ilse.target_directories[0]}}
        p.flexi( v-if="height > 25 && ilse.keyboard.last_key" ) {{get_last_command_target_key() === " " ?  "&#9251;" : get_last_command_target_key() }}
        

        p.flexi {{ilse.commands.last_command.id}}
        // p.flexi {{ilse.notes.list.length}}(notes)
        p.flexi.italic {{ilse.modes[0]}}
        p.flexi {{ilse.input}}
    br



    .which-key( v-if="height > 25 && ilse.keyboard.last_key" style="margin: 10px; " )
        // p {{get_last_command_target_key()}}
        // p.centered {{get_last_command()}}
        // p {{get_last_command_target_key() === " " ? 'SHOW EVERYTHING' : 'SHOW Nothing' }}
                // span.command {{item.command}} 
                // span.combo {{prettify_combo(item.combo, item)}} 
        // span.combo {{item.combo, item}} 
        // span.combo {{prettify_combo(item.combo, item)}} 
        // span.combo {{first_letter( trim(prettify_combo(item.combo, item) ) )}}
        // span.command {{shift_nth_times(ilse.keyboard.get_command_by_combo(item.combo).category, 2)}}
        // span.command {{ilse.keyboard.get_command_by_combo(item.combo).category.slice( get_last_command )}}
        // span.command {{ilse.keyboard.get_command_by_combo(item.combo).category}}
        // p {{get_last_command()}}
        // p.command {{get_last_command().length}} {{get_last_command()}}
        // p {{get_last_key_suggestions()}}
        // p {{last_combo_next_key(item)}}
        // p {{get_last_command_target_key()}}
        // span.command {{item.command}} 
        // span.command {{ilse.keyboard.get_command_by_combo(item.combo).category}}

        .show-everything( v-if="is_ctrl_space_only()" )
            .key.is-pulled-left( v-for="( item, index ) in ilse.keyboard.keys" :key="index" @click="run_command(item)" :title="JSON.stringify(item)" )
                span.combo {{get_key_combo(item)}} 
                span.arrow &rarr;
                span.command {{get_key_name(item)}}

        .last-key( v-if="!is_ctrl_space_only()" )
            .key.is-pulled-left( v-for="( item, index ) in get_last_key_suggestions()" :key="index" @click="run_command(item)" :title="JSON.stringify(item)" )
                span.combo {{get_key_combo(item)}} 
                span.arrow &rarr;
                span.command {{get_key_name(item)}}

</template>
<script>
// eslint-disable-next-line
import printf                                   from "@/classes/printf.js"

// Ilse
    import ilse                                 from "@/ilse.js"

// functions
    import clean_list                           from "@/classes/clean_list.js"
    import set                                  from "@/classes/set.js"
    import push                                 from "@/classes/push.js"
    import debounce                             from "@/classes/debounce.js"
    import delay                                from "@/classes/delay.js"
    import split_array_into_nth_chunks          from "@/classes/split_array_into_nth_chunks.js"
    import get_key_children                     from "@/classes/get_key_children.js"
    import same                                 from "@/classes/same.js"
    import and                                  from "@/classes/and.js"
    import if_else                              from "@/classes/if_else.js"
    import get_last_command                     from "@/classes/get_last_command.js"
    import last_item                            from "@/classes/last_item.js"
    import remove_text                          from "@/classes/remove_text.js"
    import first_letter                         from "@/classes/first_letter.js"
    import trim                                 from "@/classes/trim.js"
    import map                                  from "@/classes/map.js"
    import shift_nth_times                      from "@/classes/shift_nth_times.js"

export default {

    name: "StatusLine",

    data() {
        return {
            ilse: ilse,
            height: 25,
        }
    },

    methods: {

        get_key_combo( item ) {

            let copy = item.combo
                copy = copy.split(" ")

            printf( "copy.length -> ", copy.length )

            if( copy.length === 1 ) {
                return item.combo
            } else {
                copy.shift()
                return copy.join(" ")
            }


            /*
            let last_key     = this.get_last_command_target_key()
                printf( "last_key -> ", last_key )

            let copy         = item.combo
                printf( "copy -> ", copy )

            let tmp       = copy.combo.split(" ")
                tmp.combo.shift()

            let normalized   = tmp.combo.join(" ")
            printf( "normalized -> ", normalized )

            return normalized
            // return item.combo.join(" ")
            */
        },

        get_key_name( item ) {

            let last_key     = this.get_last_command_target_key()
                printf( "@ last_key -> ", last_key )

            let last_command = this.get_last_command()
                printf( "@ last_command -> ", last_command )

                printf( "item.command -> ", item.command )
            return item.command
        },

        is_ctrl_space_only() {
            return this.get_last_command_target_key() === " " 
        },

        trim( string ) {
            return trim(string)
        },

        run_command( item ) {
            ilse.commands.run( item.command )
        },

        get_last_key_suggestions() {

            let final        = []

            ilse.keyboard.keys.map( item => {
                printf( "get_last_key_suggestions -> ilse.keys.keys.map.item -> ", item )
                if( ilse.keyboard.last_key === this.last_combo_next_key(item) ) {
                    final.push( item )
                }
            })

            return final

        },

        prettify_combo( combo, key ) {
            return remove_text(remove_text(combo, "ctrl+space"), this.last_combo_next_key(key))
        },

        // [ "ctrl+space b s" ] = s
        last_combo_next_key( item ) {

            // if( item && item.combo && typeof item.combo === "string" && item.combo.split(" ") === 1 ) return item.combo.split("+")[0]

            return first_letter(
                trim(
                    remove_text(
                        remove_text(item.combo, "ctrl+space"),
                    ilse.keyboard.last_item )
                ) 
            )


            /*
            return first_letter(
                trim(
                    remove_text(
                        remove_text(item.combo, "ctrl+space"),
                    ilse.keyboard.last_item )
                ) 
            )
            */

        },

        first_letter( string ) {
            return first_letter( string )
        },

        get_last_command_target_key() { //
            return this.last_item( this.get_last_command() )
        },

        last_item( array ) {
            return last_item( array )
        },

        get_last_command() {
            return get_last_command( ilse.keyboard.history )

        },
        get_key_children( key ) {
            return get_key_children( key )
        },

        split_array_into_nth_chunks( source, chunk_number = 6 ) {
            let list = split_array_into_nth_chunks( source, chunk_number )
            printf( "list -> ", list )
            return list
        },

        get_status_line_style() {

            let style = `position: absolute; bottom: 0px; width: 100%; height: ${this.height}px; background: var( --background-color ); z-index: 0; box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px; box-shadow: 0 0 2px 0 #555; `

            if( this.height === 25  ) {
                style += `overflow: hidden; `
            } else {
                style += `overflow: auto; `
            }

            return style
        },

        setup() {

            let _this = this

            Messager.on( "~commands", (action, payload) => {

                if_else(
                    same(action, "exec"),
                    yes => {
                        // set( _this, "height", 25 );
                        debounce( () => { _this.height = 25 }, {}, ilse.keys, 10 )
                    },
                )

            })

            Messager.on( "~keyboard", payload => {

                if_else(
                    and(
                        same(payload.action, "keydown"),
                        same(payload.key,    "esc"),
                    ),
                    yes => set( _this, "height", 25 ),
                )

                if_else(
                    and(
                        same(payload.action, "keydown"),
                        same(payload.key,     "C-SPC")
                    ),
                    yes => debounce( () => { _this.height = 300 }, {}, ilse.keys, 800 )
                )

            })

        },

    },

    mounted() {
        this.setup()
    }

}
</script>
<style scoped>

.status-line {
    z-index: 2;

}
.status-line .flexi {
    margin: auto;
    display: block;
    margin: 0 auto;
    text-align: center; 
}

.which-key {

}

.which-key .key {
    width: 16%;
    height: 25px;
    overflow: hidden;
    margin-left: 5px;
    margin-bottom: 5px; 
    background: var( --background-color );
    color: var( --text-color );
    cursor: pointer;
}

.which-key .key:hover {
    background: var( --text-color );
    color: var( --background-color );
}

/*
.which-key .flexi {
    border: 1px solid var( --text-color );
    border-radius: var( --border-radius );
    margin: 2px;
}


.which-key .flexi p {

}

.which-key .flexi p:hover {
    background: var( --text-color );
    color: var( --background-color );
    cursor: pointer;
}
*/

.key .combo  {
    color: var( --link-color );
}

.key .arrow  {
    color: var( --terciary-text-color );
    margin-left: 2px;
    margin-right: 2px;
}

.key .command  {
    color: var( --tertiary-text-color );
}

</style>
