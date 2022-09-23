const printf = console.log

export default function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
