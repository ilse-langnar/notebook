const printf = console.log

export default function search( query = "", list = [] ) {

    let result    = []
    let has_match = false

    let index = 0
    for( const item of list ) {
        index++

        has_match = item.indexOf( query ) !== -1

        if( has_match ) result.push( item )

    }

    return result
}
