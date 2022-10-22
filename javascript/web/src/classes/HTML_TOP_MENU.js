// import ilse from "@/ilse.js"
let ilse = { number: null }

export default `
<style>

#top-menu {
    margin-top: 0px;
    width: 100%;
    padding: 0.3em 0.5em;
    display: flex;
}

#top-menu .margin-small {
    display: inline;
    margin-left: 10px !important;
}

#top-menu .margin-large {
    margin-left: 30px;
    display: inline;
}

#top-menu .menu-item {
    width: 50%;
    margin: auto;
}

#top-menu .menu-item img {
    cursor: pointer;
    width: 20px;
}

</style>

<div id="top-menu" style="" >

    <div class="menu-item" > </div>
    <div class="menu-item" > </div>

    <div class="menu-item" >

        <!-- <span x-data="{ message: 'I love you', aaa: 'llll' }" >
            <button x-on:click="message = 'lll'" > Increase </button>
            <span x-text="message" > </span>
            <button x-on:click="console.log('aaa -> ', aaa )" > Increase </button>
        </span> -->

        <img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" onload="this.src = window.ilse.require('command.svg')" onclick="window.ilse.htmls.add( 'command-pallet', ilse.core['command-pallet'] )" >

        <div class="margin-small"> </div>

        <img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" onload="this.src = window.ilse.require('address-book.svg')" onclick="window.ilse.commands.run('open-modal','configuration')" >
        <div class="margin-small"> </div>

        <img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" onload="this.src = window.ilse.require('settings.svg')" onclick="window.ilse.htmls.add( 'configuration', ilse.core.configuration )" >

        <img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" onload="this.src = window.ilse.require('building-store.svg')" onclick="window.ilse.htmls.add( 'marketplace', ilse.core.marketplace )" >
        <div class="margin-small"> </div>

        <img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" onload="this.src = window.ilse.require('folders.svg')" onclick="window.ilse.commands.run('open-modal','folders')" >
        <div class="margin-small"> </div>

        <img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" onload="this.src = window.ilse.require('lifebuoy.svg')" onclick="window.ilse.commands.run('spawn','help')" >
        <div class="margin-large"> </div>

        <img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" onload="this.src=window.ilse.require('moon-stars.svg')" onclick="window.ilse.commands.run('toggle-dark-mode')" >

    </div>
</div>
`
