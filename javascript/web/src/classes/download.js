const printf = console.log

export default function download( name, content ) {

    var data    = content

    var a       = document.createElement("a");
        a.download  = name

    var t       = new Blob([data], { type: "text/plain" });
        a.href = window.URL.createObjectURL(t);
        a.click()
}
