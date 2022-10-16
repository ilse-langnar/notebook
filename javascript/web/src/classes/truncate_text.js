import printf                           from "@/classes/printf.js"

export default function truncate_text(  text, limit = 10   ) {

    if( !text  ) throw new Error( "mixin: truncate_text.js -> text is not defined"  );

    // if( text.length > limit  ) return text.substring( 0, 5  ) + "...";
    if( text.length > limit  ) return text.substring( 0, limit  ) + "...";

    return text;
}
