import printf                       from "@/functions/printf.js"

import box            from "@/html/box.html"
import contextmenu    from "@/html/contextmenu.html"
import daily_notes    from "@/html/daily-notes.html"
import file           from "@/html/file.html"
import hello_world    from "@/html/hello-world.html"
import html_list      from "@/html/html-list.html"
import ilse           from "@/html/ilse.html"
import main           from "@/html/main.html"
import make_plugin    from "@/html/make-plugin.html"
import marketplace    from "@/html/marketplace.html"
import new_tab        from "@/html/new-tab.html"
import notification   from "@/html/notification.html"
import outline_search from "@/html/outline-search.html"
import outline        from "@/html/outline.html"
import references     from "@/html/references.html"
import setup          from "@/html/setup.html"
import theme          from "@/html/theme.html"
import url_bar        from "@/html/url-bar.html"
import web            from "@/html/web.html"
import loading        from "@/html/loading.html"

export default function get_default_components() {
    return {
        "box.html":           box,
        "contextmenu.html":   contextmenu,
        "daily-notes.html":   daily_notes,
        "file.html":          file,
        "hello-world.html":   hello_world,
        "html-list.html":     html_list,
        "ilse.html":          ilse,
        "main.html":          main,
        "make-plugin.html":   make_plugin,
        "marketplace.html":   marketplace,
        "new-tab.html":       new_tab,
        "notification.html":  notification,
        "outline-search.html":outline_search,
        "outline.html":       outline,
        "references.html":    references,
        "setup.html":         setup,
        "theme.html":         theme,
        "url-bar.html":       url_bar,
        "loading.html":       loading,
        "web.html":           web,
    }
}
