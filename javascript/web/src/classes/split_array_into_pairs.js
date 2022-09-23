const printf = console.log

export default function split_array_into_pairs( source ) {

    let normalized = source.reduce( (result, value, index, array) => {

        if( index % 2 === 0 ) {
            result.push( source.slice( index, index + 2 ) )
        }
        return result

    }, []);

    return normalized
}
