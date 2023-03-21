import printf                           from "@/functions/printf.js"

export default function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
