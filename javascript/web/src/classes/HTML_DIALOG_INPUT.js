import printf                   from "@/classes/printf.js"


document.addEventListener( "keydown", event => {

    if( event.key === "Escape" ) {

        window.ilse.htmls.list.map( (item, index) => {
            if( item.id.indexOf("dialog-input-") !== -1 ) window.ilse.htmls.list.splice( index, 1 )
        })

    }

})

export default `
<style>

#input-dialog {

}

#input-dialog textarea {
    width: 80%;
    height: 40%;
    border-radius: var( --border-radius );
    resize: none; box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px !important;
}

#input-dialog textarea:active {
    border: 0! important;
}

</style>

<div id="input-dialog" style="z-index: 2; position: fixed; left: 50%; top: 50%; transform: translate( -50%, -50% ); width: 50%; height: 35%; overflow: hidden; color: var( --text-color ); background: var( --background-color ); padding: 5px; text-align: center; box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px !important; "
    x-transition:enter-start="opacity-0 transform scale-90"
    x-transition:enter-end="opacity-100 transform scale-100"
    x-transition:leave="transition ease-in duration-300"
    x-transition:leave-start="opacity-100 transform scale-100"
    x-transition:leave-end="opacity-0 transform scale-90" >

    <img class="is-pulled-right" style="width: 20px; cursor: pointer;" onclick="ilse.htmls.list.shift(); let id = this.parentNode.parentNode.id; window.ilse.Messager.emit('~dialog.vue', 'rejected', { id: id, input: document.getElementById('input-dialog-textarea').value })" src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" onload="this.src = window.ilse.require('x.svg'); document.getElementById('input-dialog-textarea') ?  document.getElementById('input-dialog-textarea').focus() : null " />

    <h1> $title </h1>
    <h3> $description </h3>
    <textarea id="input-dialog-textarea" autofocus @keyup.enter.prevent="let id = $event.target.parentNode.parentNode.id; console.log('id -> ', id); window.ilse.Messager.emit('~dialog.vue', 'done', { id: id, input: document.getElementById('input-dialog-textarea').value })" class="textarea" style=""> </textarea>
    <br/>
    <button class="slick-button" onclick="let id = this.parentNode.parentNode.id; window.ilse.Messager.emit('~dialog.vue', 'done', { id: id, input: document.getElementById('input-dialog-textarea').value })" > Done </button>
</div>
`
