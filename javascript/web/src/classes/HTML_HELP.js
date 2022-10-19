export default `
<style>
.help {
}

.item {
    margin-bottom: 20px;
}

.help .question {
    border: 1px solid var( --text-color );
    border-radius: var( --border-radius );
    padding: var( --padding );
    margin-bottom: 10px;
}
</style>

<div id="help" x-data="{ ilse: ilse }" >
    <div style="width: 20%; border: 1px solid #000; " >

        <div @click="window.ilse.store.ui.selected = 'Introduction' " > <img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" onload="this.src = window.ilse.require('settings.svg')" /> <p> &nbsp; &nbsp; Introduction </p> <div>

        <div @click="window.ilse.store.ui.selected = 'Plugin' " > <img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" onload="this.src = window.ilse.require('address-book.svg')" /> <p> &nbsp; &nbsp; Plugin </p> <div>

        <div @click="window.ilse.store.ui.selected = 'Components' " > <img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" onload="this.src = window.ilse.require('tech-box.svg')" /> <p> &nbsp; &nbsp; Components </p> <div>

        <div @click="window.ilse.store.ui.selected = 'Themes' " > <img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" onload="this.src = window.ilse.require('palette.svg')" /> <p> &nbsp; &nbsp; Themes </p> <div>

        <div @click="window.ilse.store.ui.selected = 'Keyboard' " > <img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" onload="this.src = window.ilse.require('keyboard.svg')" /> <p> &nbsp; &nbsp; Keyboard </p> <div>

        <div @click="window.ilse.store.ui.selected = 'Lore' " > <img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" onload="this.src = window.ilse.require('address-book.svg')" /> <div>

        <div @click="window.ilse.store.ui.selected = 'Others' " > <img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" onload="this.src = window.ilse.require('letter-i.svg')" /> <p> &nbsp; &nbsp; Others </p> <div>

    p
    </div>

    <!-- <div class="options" style="width: 80%; float: left;">

        <div x-if="window.ilse.store.ui.selected === 'General' " class="general" >
            <p> Welcome to Ilse Langnart's Notebook, this tool is intended to augment human cognition, by being a reference system, spaced repetition system and thinkin system in itself.  </p>
        </div>

        <div x-if="window.ilse.store.ui.selected === 'Plugin' " class="general" >
            <p> Plugin <p>
        </div>

        <div x-if="window.ilse.store.ui.selected === 'Components' " class="general" >
            <p> Components <p>
        </div>

        <div x-if="window.ilse.store.ui.selected === 'Themes' " class="general" >
            <p> Themes <p>
        </div>

        <div x-if="window.ilse.store.ui.selected === 'Keyboard' " class="general" >
            <p> Keyboard <p>
        </div>

        <div x-if="window.ilse.store.ui.selected === 'Lore' " class="general" >
            <p> Lore <p>
        </div>

        <div x-if="window.ilse.store.ui.selected === 'Others' " class="general" >
            <p> Others <p>
        </div>

    </div> -->

</div> `
