import printf                           from "@/functions/printf.js"

export default function is_online() {

    return window.navigator.onLine

    /*
    async function hasInternet() {

        try {
            await fetch('https://example.com')
            return true
        } catch (error) {
            return false
        }
    }
    */

}
