const printf = console.log

const get_note_string_id               = require("./get_note_string_id.js")
const get_unique_date_id               = require("./get_unique_date_id.js")


module.exports =function get_note_id() {
    let id   = get_note_string_id(2)
    let date = get_unique_date_id()

    return `${date}-${id}`
}
