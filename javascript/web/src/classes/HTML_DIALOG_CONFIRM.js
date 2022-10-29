import printf                   from "@/classes/printf.js"


document.addEventListener( "keydown", event => {

    if( event.key === "Escape" ) {
        window.ilse.htmls.list.map( (item, index) => {
            if( item.id.indexOf("dialog-confirm-") !== -1 ) window.ilse.htmls.list.splice( index, 1 )
        })

    }

})

export default `
<div id="dialog-confirm" x-transition >

    <h1> $title </h1>
    <h3> $description </h3>

    <div style="width: 80%; margin: 0 auto; ">
        <button class="slick-button is-pulled-left" onclick="let id = this.parentNode.parentNode.parentNode.id; window.ilse.Messager.emit('~dialog.vue', 'done', { id: id })" > Confirm </button>
        <button class="slick-button is-pulled-right" onclick="let id = this.parentNode.parentNode.parentNode.id; window.ilse.Messager.emit('~dialog.vue', 'rejected', { id: id })"> Cancel </button>
    </div>

</div>
`
