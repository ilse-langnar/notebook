import printf                           from "@/classes/printf.js"

export default function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
