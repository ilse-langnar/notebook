let NULL_IMG        = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA="

document.addEventListener( "keydown", event => {

    if( event.key === "Escape" ) {
        window.ilse.htmls.list.map( (item, index) => {
            if( item.id.indexOf("search") !== -1 ) window.ilse.htmls.list.splice( index, 1 )
        })

    }
})

export default `
<style>

#search input:focus {
    /*box-shadow: 0 0 0 3px hsla(var(--input-focus-h), var(--input-focus-s), calc(var(--input-focus-l) + 40%), 0.8);*/
    outline: 3px solid transparent;
    border-color: hsl(var(--input-focus-h), var(--input-focus-s), var(--input-focus-l));
    border: 2px solid rgb(124, 138, 255);
}

#search input:not([type="checkbox"]) {
    transition: 180ms box-shadow ease-in-out;
    width: 100%;
    color: rgb(36, 35, 42);
    font-size: 16px;
    line-height: 20px;
    min-height: 28px;
    border-radius: 4px;
    padding: 8px 16px;
    border: 2px solid transparent;
    box-shadow: rgb(0 0 0 / 12%) 0px 1px 3px, rgb(0 0 0 / 24%) 0px 1px 2px;
    background: rgb(251, 251, 251);
    transition: all 0.1s ease 0s;
}

</style>
<div id="search" style="z-index: 2; position: fixed; left: 50%; top: 15%; transform: translate( -50%); width: 80%; max-height: 70vh; overflow-y: auto; overflow-x: hidden; color: var( --text-color ); background: var( --background-color ); border-radius: var( --border-radius ); padding: 5px; text-align: center; box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px !important; " x-data="{ search: ilse.store.search || '', list: [] }"
    x-transition:enter="transition ease-out duration-300"
    x-transition:enter-start="opacity-0 transform scale-90"
    x-transition:enter-end="opacity-100 transform scale-100"
    x-transition:leave="transition ease-in duration-300"
    x-transition:leave-start="opacity-100 transform scale-100"
    x-transition:leave-end="opacity-0 transform scale-90" >

    <input id="search-input" x-model="search" onkeydown="function name(event){ console.log('event -> ', event ) }" @keydown.enter="list = window.ilse.query(search)" />

    <img class="is-pulled-right" style="" src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" onload="document.getElementById('search-input') ?  document.getElementById('search-input').focus() : null; " />

    <template x-for="item in list" >
        <div style="display: flex; " >
            <span style="flex: 1; flex-basis: 1%;" > &bull; </span>
            <p x-html="window.ilse.markdown.render(item.content)" style="cursor: pointer; margin-bottom: 5px; flex: 1; flex-basis: 98%; text-align: left; " @click="console.log('item -> ', item, item.id ); window.ilse.add_component({ type: 'outline', props: { notes: [item.id] }, width: 12 });" > </p>
        </div>
    </template>

</div> `
