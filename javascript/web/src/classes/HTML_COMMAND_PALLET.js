import printf                   from "@/classes/printf.js"

let NULL_IMG                    = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA="

document.addEventListener( "keydown", event => {

    if( event.key === "Escape" ) {

        window.ilse.htmls.list.map( (item, index) => {
            if( item.id.indexOf("command-pallet") !== -1 ) window.ilse.htmls.list.splice( index, 1 )
        })

    }

})
import require          from "@/classes/require.js"

let command_img       = require("command.svg")
let question_mark_img = require("question-mark.svg")

export default `
<style>

.flex .mitem {
    margin: 0 auto;
    font-size: 10px;
}

input.input {
    background: var( --background-color );
    color: var( --text-color );
    width: 100%;
    border: 0 !important;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px !important;
}

.flex .item {
    width: 100%;
    margin-bottom: 5px;
    border-radius: var( --border-radius );
    padding: 3px;
    cursor: pointer;
    height: 35px;
}

.flex .item:hover {
    background: var( --text-color );
    color: var( --background-color );
    border-radius: var( --border-radius );
}

</style>
<div id="command-pallet" style="z-index: 2; position: fixed; left: 50%; top: 50%; transform: translate( -50%, -50% ); width: 60%; height: 50%; overflow: auto; color: var( --text-color ); background: var( --background-color ); padding: 5px; text-align: center; box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px !important; "
    x-transition.duration.5000ms x-data="{ search: '', }" >

    <img class="is-pulled-right" style="width: 18px; cursor: pointer;" onclick="ilse.htmls.list.shift(); let id = this.parentNode.parentNode.id; window.ilse.Messager.emit('~dialog.vue', 'rejected', { id: id, input: document.getElementById('input-dialog-textarea').value })" :src="window.ilse.require('x.svg'); document.getElementById('input-dialog-textarea') ?  document.getElementById('input-dialog-textarea').focus() : null " />

    <div class="flex" >
        <img src="${command_img}"       style="width: 23px; margin-bottom: 6px;" />

        <input id="command-pallet-id" class="input" placeholder="Search ... " x-model="search" autofocus @keyup.enter.prevent="window.ilse.commands.run(window.ilse.commands.list.filter( e=> e.id.indexOf(search) !== -1 )[0].id); ilse.htmls.list.shift()" >
        <img src="${NULL_IMG}" onload="document.getElementById('command-pallet-id') ?  document.getElementById('command-pallet-id').focus() : null" />

        <img src="${question_mark_img}" style="width: 23px; margin-bottom: 6px;" />
    </div>

    <div class="flex">

        <div class="mitem">
            <p class="is-size-6" x-text="window.ilse.commands.list.filter( e=> e.id.indexOf(search) !== -1 ).length + '/' + window.ilse.commands.list.length" > </p>
        </div>

        <div class="mitem">
            <span> Run </span>
            <strong> ↪ </strong>
        </div>

        <div class="mitem">
            <span> Quit </span>
            <strong> ESC </strong>
        </div>

    </div>

    <div @click="$dispatch('haha', Math.random() ) " > Send Event </div>
    <div @haha.window="console.log('I have listened to haha -> ', $event )" > </div>

    <template x-for="( command, index ) in window.ilse.commands.list.filter( e=> e.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 )">
        <div class="flex" @click="window.ilse.commands.run(command.id); ilse.htmls.list.shift(); " >

            <div class="item" >

                <div class="is-pulled-left" >
                    <img :src="window.ilse.require(command.icon)" style="width: 17px; position: relative; top: 5px;  margin-right: 5px; " >
                    <span x-text="command.name" > </span>
                    <!-- <span class="is-size-7" x-text=" ' &nbsp; &nbsp; &nbsp;' command.description" > </span> -->
                </div>

                <div class="shortcut is-pulled-right" >
                    <span > Ctrl+Space </span>
                </div>

            </div>
        </div>
    </template>
</div>
`
