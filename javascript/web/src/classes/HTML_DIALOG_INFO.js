import printf                   from "@/classes/printf.js"


document.addEventListener( "keydown", event => {

    if( event.key === "Escape" ) {
        printf( "Escape" )

        window.ilse.htmls.list.map( (item, index) => {
            if( item.id.indexOf("dialog-info-") !== -1 ) window.ilse.htmls.list.splice( index, 1 )
        })

    }

})

export default `
<div style="z-index: 2; position: fixed; left: 50%; top: 50%; transform: translate( -50%, -50% ); width: 50%; height: 30%; overflow: hidden; color: var( --text-color ); background: var( --background-color ); padding: 5px; text-align: center; box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px !important; "
    x-transition:enter-start="opacity-0 transform scale-90"
    x-transition:enter-end="opacity-100 transform scale-100"
    x-transition:leave="transition ease-in duration-300"
    x-transition:leave-start="opacity-100 transform scale-100"
    x-transition:leave-end="opacity-0 transform scale-90" >

    <img class="is-pulled-right" style="width: 20px; cursor: pointer;" onclick="ilse.htmls.list.shift()" src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" onload="this.src = window.ilse.require('x.svg')" />
    <h1> $title </h1>
    <h3> $description </h3>

</div>
`
