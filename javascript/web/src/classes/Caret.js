const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

let ref
export default class Caret {

    constructor( note ) {

        this.pos    = {}

        // ref = note
        // this.note   = note
        this.id     = note.id
        this.listen( note )
    }

    listen( note ) {

        Messager.on( "~carret", ( action, payload ) => {

            if( action === 'append' && payload.target === note.id ) {
                note.content += payload.content
            }

        })
    }

    set_element() {
        this.element = document.getElementById( this.id )
    }

    add( content ) {
        this.set_element()
        printf( "AAAAAAAAAAAAAAAAA Caret.js -> add -> content -> ", content )
        Messager.emit( "~carret", "append", { target: this.id, content: content })
        // printf( "Caret.js -> add -> content -> ", content )
        // let element = this.element
        // printf( "Caret.js -> add -> element -> ", element )
        // ref.content += content
        // printf( "Caret.js -> add -> ref -> ", ref )
        // this.note.content += content
        // element.textContent += content
        // printf( "Caret.js -> element.textContent -> ", element.textContent )
    }

    insert( text ) {

        this.set_element()
         // var txtarea = document.getElementById( this.inote.id )
         var txtarea = this.element

         var strPos = 0;
         var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
                 "ff" : (document.selection ? "ie" : false));
         if (br == "ie") {
             txtarea.focus();
             var range = document.selection.createRange();
             range.moveStart('character', -txtarea.value.length);
             strPos = range.text.length;

         } else if (br == "ff") strPos = txtarea.selectionStart;

         var front = (txtarea.value).substring(0, strPos);
         var back = (txtarea.value).substring(strPos, txtarea.value.length);
         txtarea.value = front + text + back;
         strPos = strPos + text.length;
         if (br == "ie") {
             txtarea.focus();
             var range = document.selection.createRange();
             range.moveStart('character', -txtarea.value.length);
             range.moveStart('character', strPos);
             range.moveEnd('character', 0);
             range.select();

         } else if (br == "ff") {
             txtarea.selectionStart = strPos;
             txtarea.selectionEnd = strPos;
             txtarea.focus();
         }

         return txtarea.value

     }

    set( start, end ) {

        // const ctrl = document.getElementById( this.inote.id )
        this.set_element()
        const ctrl = this.element


        // IE >= 9 and other browsers
        if (ctrl.setSelectionRange) {
            ctrl.focus();
            ctrl.setSelectionRange(start, end);
        } else if (ctrl.createTextRange) { // IE < 9
            var range = ctrl.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }

    }

    get() {

        // const ctrl = document.getElementById( this.inote.id )
        this.set_element()
        const ctrl = this.element

        // IE < 9 Support
        if (document.selection) {
            ctrl.focus();
            var range = document.selection.createRange();
            var rangelen = range.text.length;
            range.moveStart('character', -ctrl.value.length);
            var start = range.text.length - rangelen;
            return {
                'start': start,
                'end': start + rangelen
            };

        } // IE >=9 and other browsers
        else if (ctrl.selectionStart || ctrl.selectionStart == '0') {

            let pos = {
                'start': ctrl.selectionStart,
                'end': ctrl.selectionEnd
            };

            this.pos = pos

            return pos

        } else {

            let pos = {
                'start': 0,
                'end': 0
            };

            return pos

        }

    }

}
