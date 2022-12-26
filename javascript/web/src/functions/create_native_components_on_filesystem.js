import printf                   from "@/functions/printf.js"

// ilse
    import ilse                     from "@/ilse.js"

export default function create_native_components_on_filesystem() {

    // if( process.env.VUE_APP_TEST ) return

    let to_inject = [

        {
            name: "status-line.html",
            content: require("@/html/status-line.html").default,
        },

        {
            name: "command-pallet.html",
            content: require("@/html/command-pallet.html").default,
        },

        {
            name: "component-not-found.html",
            content: require("@/html/component-not-found.html").default,
        },

        {
            name: "configuration.html",
            content: require("@/html/configuration.html").default,
        },

        {
            name: "daily-notes.html",
            content: require("@/html/daily-notes.html").default,
        },

        // {
        // name: "dialog-input",
        // content: require("@/html/dialog-input.html").default,
        // },

        // {
        // name: "dialog-confirm",
        // content: require("@/html/dialog-confirm.html").default,
        // },

        // {
        // content: require("@/html/dialog-info.html").default,
        // },


        /* Status Line */
            /* Keys */
            {
                name: "status-line-keys-icon.html",
                content: require("@/html/status-line-keys-icon.html").default,
            },

            {
                name: "status-line-keys-content.html",
                content: require("@/html/status-line-keys-content.html").default,
            },

            /* Links */
            {
                name: "status-line-links-icon.html",
                content: require("@/html/status-line-links-icon.html").default,
            },

            {
                name: "status-line-links-content.html",
                content: require("@/html/status-line-links-content.html").default,
            },

        // {
        // name: "status-line-links-content.html",
        // content: require("@/html/status-line-links-content.html").default,
        // },

        {
            name: "directory-manager.html",
            content: require("@/html/directory-manager.html").default,
        },

        {
            name: "file.html",
            content: require("@/html/file.html").default,
        },

        {
            name: "modes.html",
            content: require("@/html/modes.html").default,
        },

        {
            name: "filesystem.html",
            content: require("@/html/filesystem.html").default,
        },

        {
            name: "help.html",
            content: require("@/html/help.html").default,
        },

        {
            name: "link.html",
            content: require("@/html/link.html").default,
        },

        {
            name: "marketplace.html",
            content: require("@/html/marketplace.html").default,
        },

        {
            name: "new-tab.html",
            content: require("@/html/new-tab.html").default,
        },

        {
            name: "notification.html",
            content: require("@/html/notification.html").default,
        },

        {
            name: "outline.html",
            content: require("@/html/outline.html").default,
        },

        {
            name: "pan.html",
            content: require("@/html/pan.html").default,
        },

        {
            name: "references.html",
            content: require("@/html/references.html").default,
        },

        {
            name: "search.html",
            content: require("@/html/search.html").default,
        },

        {
            name: "setup.html",
            content: require("@/html/setup.html").default,
        },

        {
            name: "study.html",
            content: require("@/html/study.html").default,
        },

        {
            name: "template.html",
            content: require("@/html/template.html").default,
        },

        {
            name: "top-menu.html",
            content: require("@/html/top-menu.html").default,
        },

        {
            name: "web.html",
            content: require("@/html/web.html").default,
        },

    ]

    let file, exists

    to_inject.map( item => {
        // This version is for production, NOT overidding
        // exists = ilse.filesystem.file.exits.sync( item.name, item.content )
        // if( !exits ) ilse.filesystem.file.write.sync( item.name, item.content )
        ilse.filesystem.file.write.sync( item.name, item.content )
    })

}
