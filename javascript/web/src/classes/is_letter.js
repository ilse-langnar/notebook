const printf = console.log

// matches a-z
export default function is_letter(str) {
    return str.length === 1 && str.match(/[a-zA-Z]/i);
}
