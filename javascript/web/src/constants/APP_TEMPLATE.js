export default `<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="viewport" content="width=device-width">

        <title> App Template </title>
        <link rel=icon href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIGljb24tdGFibGVyIGljb24tdGFibGVyLWJyYW5kLWh0bWw1IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiM0ODUzNjEiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+CiAgPHBhdGggc3Ryb2tlPSJub25lIiBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+CiAgPHBhdGggZD0iTTIwIDRsLTIgMTQuNWwtNiAybC02IC0ybC0yIC0xNC41eiIgLz4KICA8cGF0aCBkPSJNMTUuNSA4aC03bC41IDRoNmwtLjUgMy41bC0yLjUgLjc1bC0yLjUgLS43NWwtLjEgLS41IiAvPgo8L3N2Zz4KCgo=">

    </head>

    <script id="manifest" type="application/json" >
        {
            "id": "app-template-${Math.random().toString().replace( "0.", "" )}",
            "name": "app-template",
            "version": "0.1",
            "description": "App Template",
            "author": "Me",
            "website": "https://example.com",
            "bugs": "https://example.com/report-bug"
        }
    </script>

    <script id="data" type="application/json">{}</script>

    <script id="plugin" >

        if( window.ilse ) {

            window.ilse.commands.add({
                id: "app-template-${Math.random().toString().replace( "0.", "" )}",
                name: "App Template",
                description: "App Template",
                fn: function() {
                    console.log( "I'm inside an app template!" )
                },
                props: {},
            })


            window.ilse.keyboard.add( "ctrl+space t s b", "open-brown-noise" )
        }

    </script>

  </body>
</html>
`
