let NULL_IMG = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA="

document.addEventListener( "keydown", event => {

    if( event.key === "Escape" ) {
        window.ilse.htmls.list.map( (item, index) => {
            if( item.id.indexOf("configuration") !== -1 ) window.ilse.htmls.list.splice( index, 1 )
        })

    }
})

function toggle_permission( name, permission ) {

    let has = has_permission( name, permission )

    if( has ) {
        remove_permission( name, permission )
        ilse.notification.send( "Removed Permission(-): ", `${name}(${permission})` )
    } else {
        add_permission( name, permission )
        ilse.notification.send( "Added Permission(+): ", `${name}(${permission})` )
    }
}


export default `
<style>
#configuration a {
    display: block;
}

#configuration {
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

#configuration #keyboard-shortcut .loop {
    background: var( --background-color );
    color: var( --text-color );
}

#configuration #keyboard-shortcut {
    width: 80%;
    margin: 0 auto;
}

#configuration #keyboard-shortcut input {
    background: var( --background-color );
    color: var( --text-color );
    border: 0 !important;
}


</style>
<div
    x-transition:enter-start="opacity-0 transform scale-90"
    x-transition:enter-end="opacity-100 transform scale-100"
    x-transition:leave="transition ease-in duration-300"
    x-transition:leave-start="opacity-100 transform scale-100"
    x-transition:leave-end="opacity-0 transform scale-90"
    x-data="{ ilse: window.ilse }"
    >

    <img class="is-pulled-right" style="width: 20px; cursor: pointer;" onclick="ilse.htmls.list.shift()" :src="window.ilse.require('x.svg')" />

    <h1> Configuration</h1>

    <div class="flex" >
        <h2 class="flexi" style="display: inline; " x-text="window.ilse.info.platform" > </h2>
        <h2 class="flexi" style="display: inline;"  x-text="'v' + window.ilse.info.version" > </h2>

        <select class="flexi" x-model="window.ilse.lang" >
            <template x-for=" lang in window.ilse.languages" >
                <option x-text="lang" @change="console.log('select -> ', $event)" > </option>
            </template>
        </select>

    </div>

    <br style="height: 50px; clear: both;"/>

    <h2> Plugins </h2>
    <div style="width: 95%; margin: 0 auto;" >
        <template x-for=" plugin in window.ilse.plugins" >
            <div style=" float: left; width: 30%; overflow: hidden; " >
                <p x-text="plugin.name"> </p>
                <details>
                    <summary> Permissions </summary>
                    <span style="color: #ED7586;" > Clipboard </spa>
                    <span style="color: #ED7586;" > Filesystem Read </spa>
                    <span style="color: #ED7586;" > Filesystem Write </spa>
                    <span style="color: #ED7586;" > Notes </spa>
                    <span style="color: #ED7586;" > Communication </spa>
                </details>
                <br/>
            </div>
        </template>
    </div>

    <br style="height: 50px; clear: both;"/>

    <ul id="keyboard-shortcut" x-data="{ colors: window.ilse.keys /*[ { color: 'Red', nume: 1 }, { color: 'Orange', number: 2 }, { color: 'Yellow', number: 3 }]*/ }">
        <template x-for="(color, index) in colors">

            <li style="display: flex; float: left; margin: 3px; " >
                <input style="flex: 1; flex-basis: 40%; " x-model="color.combo" />
                <input style="flex: 1; flex-basis: 40%; " x-model="color.command" />
                <img   style="" style="width: 10px; cursor: pointer;" :src="window.ilse.require('x.svg')" />
            </li>

        </template>
    </ul>

    <br style="clear: both;"/>
    <button class="slick-button" > Add </button>
</div> `
