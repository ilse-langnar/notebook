let NULL_IMG = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA="

export default `
<style>

#setup img.select-folder {
    width: 40%;
    display: block;
    margin: 0 auto;
    border: 1px dashed #000;
    border-radius: 5px;
    cursor: pointer;
}

</style>
<div id="setup" style="font-family: Helvetica, sans, Inter; width: 70%; margin: 0 auto; "
    x-transition:enter-start="opacity-0 transform scale-90"
    x-transition:enter-end="opacity-100 transform scale-100"
    x-transition:leave="transition ease-in duration-300"
    x-transition:leave-start="opacity-100 transform scale-100"
    x-transition:leave-end="opacity-0 transform scale-90" >

    <br />
    <h1 class="centered" > Setup </h1>
    <h2 class="centered" > Select the folder with your notes( You can change later )</h2>
    <br style="height: 100px;" />

    <img x-bind:src="window.ilse.require('folders.svg')" class="select-folder centered" @click="window.ilse.electron.setup_target_folder()" )

</div> `
