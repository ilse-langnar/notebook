import printf                   from "@/functions/printf.js"

export default function move_array_item( arr, old_index, new_index ) {

    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push( undefined )
        }
    }

    arr.splice( new_index, 0, arr.splice(old_index, 1)[0] )

    return arr
}
