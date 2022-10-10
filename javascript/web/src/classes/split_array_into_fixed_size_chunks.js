const printf = console.log

export default function split_array_into_fixed_size_chunks( source, number_of_items = 2 ) {


    // // let arr = [...source]
    // const size = Math.min(max, Math.ceil(arr.length / 2));
    // return Array.from({ length: Math.ceil(arr.length / size)  }, (v, i) =>
        // arr.slice(i * size, i * size + size)
    // );

    /*
    const numChunks = Math.ceil(array.length / limit);
    return Array.from(
        { length: numChunks  },
        (_, i) => array.slice(i * array.length / numChunks, (i + 1) * array.length / numChunks)

    );
    */

    const inputArray = [...source]

    const result = inputArray.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index/number_of_items)

        if(!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [] // start a new chunk

        }

        resultArray[chunkIndex].push(item)

        return resultArray

    }, [])

    return result

    /*
    let array = [...source]
    let final = []

    for( let i = 0; i < array.length; i += number_of_items ) {
        let tempArray;
        tempArray = array.slice(i, i + number_of_items);
        final.push( tempArray )
    }
    printf( "final -> ", final )

    return final
    */

    /*
    let chunk
    let final = []
    let array = [...source]

    while( source.length > 0 ) {
        chunk = array.splice( 0, number_of_items )
        final.push( chunk )
    }
    printf( "final -> ", final )

    return final
    */


    /*
    var arrays = []
    let copy   = [...source]

    printf( "source -> ", source )

    source.map( (item, index) => {

        arrays[index] = []
        printf( "arrays -> ", arrays )
        // arrays.push([])
        for( var i = 0; i < number_of_items; i++ ) {
            arrays[index].push( item )
            printf( "after -> arrays -> ", arrays )
            // array.push( item )
        }

    })

    printf( "array -> ", arrays )

    // while( copy.length > 0 ) {
        // arrays.push( copy.splice(0, size) )
    // }

    return arrays
    */
}
