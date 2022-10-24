let NULL_IMG = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA="

document.addEventListener( "keydown", event => {

    if( event.key === "Escape" ) {
        window.ilse.htmls.list.map( (item, index) => {
            if( item.id.indexOf("reference") !== -1 ) window.ilse.htmls.list.splice( index, 1 )
        })

    }

})



export default `
<style>

/*
#reference {
    z-index: 2;
    position: fixed
    left: 50%;
    top: 50%;
    transform: translate( -50%, -50% );
    width: 60%;
    height: 50%;
    overflow: auto;
    color: var( --text-color );
    background: var( --background-color );
    padding: 5px;
    text-align: center;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px !important;
}
*/

</style>
<div style="with: 100%; height: 100%; overflow: auto; font-size: 2em; "
    x-transition:enter-start="opacity-0 transform scale-90"
    x-transition:enter-end="opacity-100 transform scale-100"
    x-transition:leave="transition ease-in duration-300"
    x-transition:leave-start="opacity-100 transform scale-100"
    x-transition:leave-end="opacity-0 transform scale-90"
    x-data="{ file: '$file' }" >

    <h1 x-text="file" style="font-size: 30px; text-align: center; "> </h1>
    <img src="${NULL_IMG}" style="width: 20px; cursor: pointer;" />


    <template x-data="{ list: ilse.query('[[' + '$file' + ']]') }" x-for="color in list" >

        <div style="display: flex; font-size: 15px !important;" >
            <span style="flex: 1; flex-basis: 1%;" > &bull; </span>
            <div x-html="window.ilse.markdown.render(color.content)" style="cursor: pointer; margin-bottom: 5px; flex: 1; flex-basis: 98%; text-align: left; " > </div>
        </div>
    </template>

</div> `
