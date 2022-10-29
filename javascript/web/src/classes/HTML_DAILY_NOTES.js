import printf                           from "@/classes/printf.js"

import Outline             from "@/classes/HTML_OUTLINE.js"
import Ghost               from "@/classes/HTML_GHOST_NOTE.js"
import cut_string          from "@/classes/cut_string.js"
import get_unique_date_id  from "@/classes/get_unique_date_id.js"
import yyyymmddhhss_to_pretty       from "@/classes/yyyymmddhhss_to_pretty.js"

let id          = get_unique_date_id()
let TODAY       = cut_string( get_unique_date_id(), 0, 8 )

export default `
<style>

.left-sidebar {
    height: 100vh;
    width: 20px !important;
    flex: 1;
    flex-basis: 1%;
    padding: 5px;
    overflow: ;
}

.bullet {
    margin-top:   -5px;
    text-align:   center;
    cursor:       pointer;
    color:        #a3a3a3;
    color:        var( --text-color );
    font-size: 1.5em;
    cursor:       pointer;

    margin-right: 7px;
    width: 10px;
    height: 10px;
}

</style>
<div x-transition x-data="{ days: [] }" x-init="days.push( ilse.utils.get_unique_date_id().slice(0, 8) )" style="display: flex;" >

    <div class="left-sidebar" x-data="{ is_open: false, tab: '', html: '' }" :style=" is_open ? 'flex-basis: 20%;' : '' " >

        <div style="float: left; " >

            <div style="float: right; width: 200px; height: 200px; border: 1px solid green; overflow: hidden;" x-show="is_open" x-html="ilse.markdown.render(html)" > </div>

            <img :src="window.ilse.require('arrow-narrow-left.svg')" style="width: 20px; cursor: pointer;" @click="is_open = !is_open; tab = '' "/>

            <br/>
            <br/>

            <img :src="window.ilse.require('folders.svg')"  style="width: 20px; cursor: pointer; display: block; " @click="tab = 'filesystem'; is_open = !is_open " />
            <img :src="window.ilse.require('settings.svg')" style="width: 20px; cursor: pointer; display: block; " @click="tab = 'settings'; is_open = !is_open " />

            <br/>
            <br/>

            <template x-for="( note, index ) in favorites" :key=" 'note' + index" x-data="{favorites:window.ilse.query('#public')}" x-init="window.ilse.Messager.on('~ilse',(action)=> { if( action === 'loaded' ) { console.log('@@ -> ', ilse, window.ilse.query('#public') ); console.log('favorites -> ', favorites ); favorites = window.ilse.query_regexp( /#public/ ); console.log('favorites -> ', favorites) } })" >

                <div >

                    <img style="width: 20px; height: 20px; cursor: pointer; " @click="is_open = !is_open; html = note.content; if( $event.shiftKey ) { is_open = false; ilse.components.create_window({ title: 'Component', pure: true, html: ilse.markdown.render(note.content)}) }; if( $event.ctrlKey ) { is_open = false; ilse.htmls.modal(note.id, ilse.markdown.render(note.content) ) }" :src="window.ilse.utils.get_string_favicon(note.content)" />

                </div>
            </template>
        </div> <!-- Hidden -->

    </div>

    <div id="daily-notes" style="overflow: auto !important; height: 91vh; width: 100%; margin: 0 auto; flex: 1; flex-basis: 96%;" >

        <template x-for="( day, index ) in days" :key="index" >

            <div x-data="{ list: window.ilse.query_regexp( new RegExp( '^' + day, 'ig') ) || [] }" x-init="window.ilse.Messager.on('~ilse', (action) => { if( action === 'loaded' ) { console.log('lllllll', list ); console.log('>>>>>', window.ilse.query('#public') ); console.log('<<<<< -> ', window.ilse.query_regexp( /#public/ ) ); list = window.ilse.query_regexp( '^' + day, 'ig' ) } })" >

                <div class="flex centered" x-init="setTimeout( () => { console.log( window.ilse.query_regexp( new RegExp( '^' + day, 'ig' ) )) }, 4000)" >
                    <img class="remove" :src="ilse.require('trash.svg')" @click="console.log('Remove day')" />
                    <span class="flexi is-size-3 has-text-weight-bold" > Day ${yyyymmddhhss_to_pretty(id)} </span>
                    <span class="fitem"> &#128269; </span>
                </div>

                <template x-for="(note, index) in list" >

                    <div :id="note.id" x-data="{ is_editing: false }" class="flex" :style=" 'margin-left:' + (ilse.notes.list[note.id].depth * 20) + 'px;' " >
                        <div class="bullet" > &bull; </div>

                        <div x-show="is_editing" class="edit" :id=" note.id + '-edit' " @blur="is_editing = false; ilse.notes.list[note.id].content = $event.target.innerText; ilse.notes.save()" contentEditable x-text="ilse.notes.list[note.id].content" > </div>

                        <div x-show="!is_editing" class="render" :id=" note.id + 'render'" :data-note-id="note.id" x-html="ilse.markdown.render(ilse.notes.list[note.id].content)" @link-click.window="if( $event.details.id === note.id ) { console.log( 'its me: note -> ', note ) }" @click="is_editing = true; setTimeout( () => {let dom = document.getElementById( note.id + '-edit' ); dom.focus() }, 10 ) " > </div>
                    </div>


                </template>

                <button x-show="index === 0" class="slick-button" @click="days.push( '${TODAY}' )"> Load More </button>

            </div>


        </template>

        <br/>
    </div>

</div>
`
