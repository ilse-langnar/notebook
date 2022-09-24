const printf = console.log

// ( "[[example]]", /\[\[*./, /\]\]/ )
export default function extract_tokens_by_regexp_delimiters( text, start, end ) {

    // BUGCATCH
        if( !text ) return []
        if( !text.split ) return []

    // BUGFIX: Remove new lines
        text        = text.replace( /[\n]+/g, " " )

    let words   = text.split(" ") // "I have a new [[Funny Idea]] for you" -> [ "I", "have", "a", "new", "[[Funny", "Idea]]", "for", "you" ]

    let list    = []

    let tmp     = ""
    let token_count = 0
    let is_on   = false

    // SUPERHACK: OMG IT WORKED HAHAHAH, since the fist/second words are 'ignored' and we only parse the second/third, I artifically add a first + second word, then just pop then before returning, and it's working
        words.splice( 0, 0, "[[Bug Fix]]" )
        words.splice( 0, 0, "[[Bug Fix 2]]" )

    // "This is a [[Javascript Example]] " -> [ "This", "is", "a", "[[Javascript", "Example]]" ]
    for( let word of words) {

        if( word.match( start ) && word ) {
            is_on = true
        }

        // BUG: If the first [[]] has multiple token in it, we'll NOT Add the space
        if( is_on && word ) {

            // [[ref.png]], [[ This is multiple]] -> add spaced for it(sentence with space).
            // if( token_count >= 2 && !words[++index].match( end ) ) {
            if( token_count >= 2 /*multi-token*/ ) {
                tmp += word + " "
            } else {
                tmp += word
            }

            token_count++
        }

        if( word.match( end ) && is_on && word ) {

            list.push( tmp.trim() )
            is_on = false
            tmp   = ""
        }
    }

    // SUPERHACK: OMG IT WORKED HAHAHAH, since the fist/second words are 'ignored' and we only parse the second/third, I artifically add a first + second word, then just pop then before returning, and it's working
        list.shift()
        list.shift()

    return list
}
