import printf                   from "@/classes/printf.js"

export default `
<style>

.noote::before {
    content: "•";
    font-size: 20px;
}

.bullet p {
    margin-top:   -5px;
    text-align:   center;
    cursor:       pointer;
    color:        #a3a3a3;
    color:        var( --text-color );
    font-size: 1.5em;
    cursor:       pointer;

    margin-right: 7px;
    width: 10px;
    height: 10px;
}

.edit:focus {
    outline: none;
}


</style>

<div id="outline" x-data='$json' >

    <template x-for="note in notes" >
        <div :id="note.id" x-data="{ is_editing: false }" class="flex" :style=" 'margin-left:' + (ilse.notes.list[note].depth * 20) + 'px;' " >
            <div class="bullet" > <p style="" > &bull; </p> </div>

            <div class="edit" :id=" note + '-edit' " @blur="is_editing = false; ilse.notes.list[note].content = $event.target.innerText; ilse.notes.save()" x-show="is_editing" contentEditable x-text="ilse.notes.list[note].content" > </div>

            <div x-show="!is_editing" x-html="ilse.markdown.render(ilse.notes.list[note].content)" @click="is_editing = true; setTimeout( () => {let o = document.getElementById( note + '-edit' ); console.log(' o -> ', o ); o.focus() }, 10 ) " > </div>
        </div>
    </template>

</div>
`
