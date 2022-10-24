export default `
<style>
.paragraph-note {
    margin-top:   -5px;
    text-align:   center;
    cursor:       pointer;
    color:        #a3a3a3;
    color:        var(--text-color);
    font-size:    24px;
    margin-left:  1px;
}

.ghost-note {
    width: 100%;
}

.ghost-note:hover {
    color: var( --text-color );
    background: var( --background-color );
    filter: opacity(1) !important;
    color: #fff;
}

.ghost-note.flex input.editable {
    padding: 3px !important;
}

.editable:focus {
    outline: none;
}
.editable {
    /*background: var( --background-color );*/
    background: transparent;
    color: var( --text-color );
    width: 100%;
    margin: 0 !important;
    padding: 0px !important;
    font-size: 1em;
    border: 1px solid transparent;
    height: fit-content;
    width: fit-content;
}

</style>
<div x-transition x-data="{ content: '' }" >

    <div class="ghost-note flex">
        <p class="paragraph-note" > &bull; </p>
        <input class="editable" x-model="content" @blur="if( $event.target.value ) window.ilse.add_note($event.target.value); content = '' " placeholder="Write Something ..." @keyup.enter="if( $event.target.value ) window.ilse.add_note($event.target.value); content = ''" />
    </div>

</div> `
