import printf                   from "@/functions/printf.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default function focus_on_note( id ) {
    Messager.emit( "~note.vue", "focus", { target: id })
}
