let NULL_IMG = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA="

document.addEventListener( "keydown", event => {

    if( event.key === "Escape" ) {
        window.ilse.htmls.list.map( (item, index) => {
            if( item.id.indexOf("marketplace") !== -1 ) window.ilse.htmls.list.splice( index, 1 )
        })

    }
})

async function try_app( item ) {

    let res  = await fetch( item.url)
    let html = await res.text()

    await ilse.filesystem.file.write.async( "tmp.html", html )

    create_window({ is_internal_and_iframe: true, title: `${item.name} Demo`, url: "tmp.html" })
}

export default `
<style>
#marketplace a {
    display: block;
}

#marketplace {
    z-index: 2;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate( -50%, -50% );
    width: 70%;
    height: 70%;
    overflow: auto;
    color: var( --text-color );
    background: var( --background-color );
    padding: 5px;
    text-align: center;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px !important;
}

</style>
<div
    x-transition:enter-start="opacity-0 transform scale-90"
    x-transition:enter-end="opacity-100 transform scale-100"
    x-transition:leave="transition ease-in duration-300"
    x-transition:leave-start="opacity-100 transform scale-100"
    x-transition:leave-end="opacity-0 transform scale-90"
    x-data="{ ilse: window.ilse, }"
    >

    <img class="is-pulled-right" style="width: 20px; cursor: pointer;" onclick="ilse.htmls.list.shift()" src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" onload="this.src = window.ilse.require('x.svg')" />

    <h1> Marketplace </h1>
    <p > lll </p>

    <!-- <div x-data="{ plugins: (await window.ilse.fetch.json('https://raw.githubusercontent.com/ilse-langnar/notebook/dev/marketplace/marketplace.json') ) }"> -->
    <div>
        <template x-for="plugin in (await window.ilse.fetch.json('https://raw.githubusercontent.com/ilse-langnar/notebook/dev/marketplace/marketplace.json') )" >
            <p x-text="plugin.name"> </p>
            <p x-text="plugin.description"> </p>
            <p x-text="plugin.url"> </p>
        </template>
    </div>

</div> `
