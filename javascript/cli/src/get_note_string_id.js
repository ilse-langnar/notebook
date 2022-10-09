const printf = console.log

const get_small_unique_string_id = require("./get_small_unique_string_id.js")

module.exports = function get_note_string_id( num = 1 ) {

    let id = ""

    for( var i = 0; i < num; i++ ) {
        id += get_small_unique_string_id()
    }

    return id
}
