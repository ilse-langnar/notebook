const printf                    = console.log

// Messager
    import Messager                     from "@/classes/Messager.js"

export default function focus_on_note( id ) {
    Messager.emit( "~note.vue", "focus", { target: id })
}
