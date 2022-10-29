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
    resize: none;
    /*box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px !important;*/
}

#input-dialog textarea:active {
    border: 0! important;
}

#input-dialog-textarea {
    color: var( --text-color );
    background: var( --background-color );
}

</style>

<div id="input-dialog" x-transition x-data="{ content: '' }" >

    <h1> $title </h1>
    <h3> $description </h3>
    <textarea id="input-dialog-textarea" x-model="content" x-init="document.getElementById('input-dialog-textarea') ? document.getElementById('input-dialog-textarea').focus() : null; content = '' " autofocus @keydown.enter.prevent="if( content ) { let id = $event.target.parentNode.parentNode.id; console.log('content'); window.ilse.Messager.emit('~dialog.vue', 'done', { id: id, input: content }) }" class="textarea" style=""> </textarea>
    <br/>
    <button class="slick-button" onclick="let id = this.parentNode.parentNode.id; window.ilse.Messager.emit('~dialog.vue', 'done', { id: id, input: document.getElementById('input-dialog-textarea').value })" > Done </button>
</div>
`
