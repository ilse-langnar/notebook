
export default {
    embed: /^\!\[\[([^|\]\n]+)(\|([^\]\n]+))?\]\]/,
    link: /\[\[([^|\]\n]+)(\|([^\]\n]+))?\]\]/,
    task: /^ *\[([\sx])] /i,
    tag: /\S*#(?:\[[^\]]+\]|\S+)/,
    strike_through: /{{c[0-9]::.*}}/,
    separator: /^\S*---\S*$/,
    number_list: /\s[0-9]+\.(.*)/g,
    inline_embed: /{{.*}}/,
    inline_code: /(\\`{1})(\\`{1})/,
    highlight: /^==(.*)==/,
    code_block: /(\\`{3}\\n+)(.*)(\\n+\\`{3})/,
    note: /\d{14}-\w{8}:/,
}
