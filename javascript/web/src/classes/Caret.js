import printf                           from "@/functions/printf.js"

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

let ref
export default class Caret {

    constructor( note ) {
        // this.pos    = {}
        this.id     = note.id
        // this.listen( note )
    }

    /*
    listen( note ) {

        Messager.on( "~carret", ( action, payload ) => {
            if( action === 'append' && payload.target === note.id ) { note.content += payload.content }
        })
    }
    */

    // set_element() {
        // this.element = document.getElementById( this.id )
    // }

    add( content ) {
        this.set_element()
        Messager.emit( "~carret", "append", { target: this.id, content: content })
    }

    insert( text ) {

        // this.set_element()
        // var txtarea = document.getElementById( this.inote.id )
        // var txtarea = this.element

        let note       = ilse.notes.query( `${this.id}: ` )[0]
        const txtarea  = document.getElementById( note.id )
        printf( "txtarea -> ", txtarea )
        printf( "txtarea.value -> ", txtarea.value )
        printf( "txtarea.innerText -> ", txtarea.innerText)
        // var txtarea = dom

         var strPos = 0;
         var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
                 "ff" : (document.selection ? "ie" : false));
         if (br == "ie") {
             txtarea.focus();
             var range = document.selection.createRange();
             range.moveStart('character', -txtarea.innerText.length);
             strPos = range.text.length;

         } else if (br == "ff") strPos = txtarea.selectionStart;

        var front = (txtarea.innerText).substring(0, strPos);
        var back = (txtarea.innerText).substring(strPos, txtarea.innerText.length);
        txtarea.innerText = front + text + back;
        strPos = strPos + text.length;
        if (br == "ie") {
            txtarea.focus();
            var range = document.selection.createRange();
            range.moveStart('character', -txtarea.innerText.length);
            range.moveStart('character', strPos);
            range.moveEnd('character', 0);
            range.select();

        } else if (br == "ff") {
            txtarea.selectionStart = strPos;
            txtarea.selectionEnd = strPos;
            txtarea.focus();
        }

        // Set Note
        note.content = txtarea.innerText

        return txtarea.innerText
     }

    set( start, end ) {

        printf( "set -> start -> ", start )
        printf( "set -> end -> ", end )

        // const ctrl = document.getElementById( this.inote.id )
        // this.set_element()
        // const ctrl = this.element
        let note   = ilse.notes.query( `${this.id}: ` )[0]
        const ctrl = document.getElementById( note.id )
        // const ctrl = dom


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

    get( ) {

        // const ctrl = document.getElementById( this.inote.id )
        // this.set_element()
        // const ctrl = this.element
        let note   = ilse.notes.query( `${this.id}: ` )[0]
        const ctrl = document.getElementById( note.id )

        // IE < 9 Support
        if (document.selection) {
            ctrl.focus();
            var range = document.selection.createRange();
            var rangelen = range.text.length;
            range.moveStart('character', -ctrl.innerText.length);
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
