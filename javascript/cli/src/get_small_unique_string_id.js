const printf = console.log

module.exports = function get_small_unique_string_id() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}
