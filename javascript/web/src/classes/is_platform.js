const printf                    = console.log

export default function is_platform( platform ) {
    return process.env.VUE_APP_TARGET.toLowerCase() === platform
}