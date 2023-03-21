import printf                           from "@/functions/printf.js"

// Ilse
    import ilse                         from "@/ilse.js"

// Parse
    import Parse                         from "parse"

// Functions
    import watchf                        from "@/functions/watch.js"
    import map                           from "@/functions/map.js"
    import keys                          from "@/functions/keys.js"

// Libs
    import Alpine                   from 'alpinejs'

export default class ParseServer {

    constructor( ilse ) {

        Parse.initialize( process.env.VUE_APP_PARSER_SERVER_APPLICATION_ID, process.env.VUE_APP_PARSER_SERVER_JAVASCRIPT_KEY)
        Parse.serverURL = process.env.VUE_APP_PARSER_SERVER_URL

        this.user       = Parse.User.current()
        this.id         = this.user ? this.user.id : null
        this.key        = 0
        this.Parse      = Parse

        this.setup()
    }

    // set data from server, push( "Filesystem", "xA2ui13", { notes: "", filesystem: { '/': {} }, "name": "This is my new name!!!!" })
    async push( _class, id, obj ) {

        const query      = new Parse.Query( _class )
        const remote     = await query.get( id )
        const prop_names = Object.keys( props )

        prop_names.map( prop => {
            remote.set( prop, obj[prop] )
        })

        await remote.save()

        return obj
    }

    // get data from server, pull( "Filesystem", "Xu1i3b12" )
    async pull( _class, id ) {

        let _this = this
        const query      = new Parse.Query( _class );
        const fresh      = await query.get( id )
        const props      = fresh.attributes
        // const prop_names = Object.keys( props )

        let tmp          = {}
            tmp.id           = id

        map( keys(props), name => {
            tmp[name]  = props[name]
        })

        // prop_names.map( name => {
            // tmp[name]  = props[name]
        // })

        return tmp
    }

    update_key() {
        let _this = this
        setTimeout( () => {
            _this.key = Math.random()
        }, 100 )
    }

    async fetch_user() {

        let fresh_user   = await this.pull( Parse.User, this.id )
        let brains       = fresh_user.brains
        let new_brain
        let normalized_brains = []

        for( var i = 0; i < brains.length; i++ ) {
            new_brain = await this.pull( "Filesystem", brains[i] )
            normalized_brains.push( new_brain )
        }

        // Inject new new_brain
        fresh_user.brains = normalized_brains

        // now
        // printf( "Parse.js fetch_user() -> before -> ilse.target_directories -> ", ilse.target_directories )
        // normalized_brains.map( brain => {
            // ilse.target_directories.push( "cloud://" + brain.id )
        // })
        // printf( "Parse.js fetch_user() -> after -> ilse.target_directories -> ", ilse.target_directories )

        // Key
        fresh_user.key = Math.random()

        ilse.store( "user", fresh_user )

        printf( ">>@>@>@>@ emitting ... " )
        Messager.emit( "~parse", { action: "loaded", target: "user", value: fresh_user } )

        this.update_key()

    }

    setup() {

        if( this.id && window.navigator.onLine && !process.env.VUE_APP_TESTING /* :serve2 ok, :serve no*/) {
            this.fetch_user()
        }

    }

    async query( _class = Parse.User, prop, value ) {

        const query  = new Parse.Query( _class )
            query.equalTo( prop, value )

        const result = await query.find()
            return result
    }

    async reset() {

        const query      = new Parse.Query(Parse.User);
        const fresh      = await query.get(this.id)
        const props      = fresh.attributes
        const prop_names = Object.keys( props )

        this.id  = null
        prop_names.map( name => {
            this[name] = null
        })

        this.pfp = "data:image/svg+xml;base64, PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIGljb24tdGFibGVyIGljb24tdGFibGVyLXVzZXItY2lyY2xlIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiM0ODUzNjEiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+CiAgPHBhdGggc3Ryb2tlPSJub25lIiBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+CiAgPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iOSIgLz4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSIzIiAvPgogIDxwYXRoIGQ9Ik02LjE2OCAxOC44NDlhNCA0IDAgMCAxIDMuODMyIC0yLjg0OWg0YTQgNCAwIDAgMSAzLjgzNCAyLjg1NSIgLz4KPC9zdmc+CgoK"
    }

    async logout() {

        // let user = this.user
            // if( !user ) return true

        try {
            await Parse.User.logOut();
            ilse.notification.send( "Logged Out", "You logged out Successfully" )
            this.reset()
            return true
        } catch( error ) {
            throw error
        }

    }

    // Sync an object to a remove place. ,g:
    watch( class_name = "Filesystem", id, obj, fn ) {

        var client = new Parse.LiveQueryClient({
            applicationId: process.env.VUE_APP_PARSER_SERVER_APPLICATION_ID,
            serverURL:     process.env.VUE_APP_PARSER_WEB_SOCKET_SERVER,
            javascriptKey: process.env.VUE_APP_PARSER_SERVER_JAVASCRIPT_KEY,
        })

        client.open()

        var query = new Parse.Query( class_name )

        let fs_id = this.brains[0]
            if( id ) query.get( id )

        var subscription = client.subscribe( query )


        subscription.on('update', (object, original, response) => {

            let keys = Object.keys(object.attributes)

            // printf( "before -> obj -> ", obj )
            keys.map( key => {
                obj[key] = object.attributes[key]
            })

            Alpine.store('store', obj)

            // printf( "after -> obj -> ", obj )

            // fn = watchf ( obj, (one) => {
                // printf( ">>>A>A>A>A>A>A one -> ", one )
                // printf( "obj -> ", obj )
            // })

        })

        return fn

    }

    /*
    sync() {

        var client = new Parse.LiveQueryClient({
            applicationId: process.env.VUE_APP_PARSER_SERVER_APPLICATION_ID,
            serverURL:     process.env.VUE_APP_PARSER_WEB_SOCKET_SERVER,
            javascriptKey: process.env.VUE_APP_PARSER_SERVER_JAVASCRIPT_KEY,
        });

        client.open();

        var query = new Parse.Query('Filesystem');

        // printf( "this -> ", this )
        // printf( "this.brains -> ", this.brains )

        // printf( "this.brains -> ", this.brains )
        let fs_id = this.brains[0]
            printf( "fs_id -> ", fs_id )
            query.get( fs_id )
        var subscription = client.subscribe(query);

        subscription.on('create', todo => {
            printf( "Parse.js -> create -> todo -> ", todo )
        });

        subscription.on('update', (object, original, response) => {
            let notes = object.attributes.notes
            printf( "Parse.js -> update -> object -> ", object )
            printf( "Parse.js -> update -> original -> ", original )
            printf( "Parse.js -> update -> response -> ", response )
            printf( "notes -> ", notes )
        })

        subscription.on('delete', todo => {

            printf( "Parse.js -> delete -> response -> ", todo )

            // this.todos.forEach(t => {
                // if (t.id === todo.id) {
                    // console.log('On delete event');
                    // this.todos.delete(t);
                // }
            // });
        });

    }
    */

    async set_profile_picture( filename, data, mime ) {

        let url = await this.upload( filename, data, mime )

        let user = this.user
            user.set( "pfp", url )
            this.pfp = url

        try {
            await user.save()
            ilse.notification.send( "Modified", "Profile Picture Modified" )
        } catch( error ) {
            throw error
        }

        return url
    }

    async upload( filename = "file.text", data, mime = "image/png" ) {

        const file = new Parse.File( filename , data, mime );

        try {
            await file.save()
            let url = await file.url()
            return url
        } catch( error ) {
            ilse.notification.send( "Error", `Could not upload: ${error}`,  )
            throw error
        }

    }

    async register( email, username, password ) {

        if( !username || !email || !password ) throw new Error( `ERROR: To make a new user you need: username, email, password, you're not giving me the right quantity of parameters` )

        // Creates a new Parse "User" object, which is created by default in your Parse app
            let user = new Parse.User()

        // Set the input values to the new "User" object
            user.set( "username", username )
            user.set( "email",    email )
            user.set( "password", password )
            user.set( "bio", "" )
            user.set( "pfp",  "data:image/svg+xml;base64, PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIGljb24tdGFibGVyIGljb24tdGFibGVyLXVzZXItY2lyY2xlIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiM0ODUzNjEiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+CiAgPHBhdGggc3Ryb2tlPSJub25lIiBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+CiAgPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iOSIgLz4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSIzIiAvPgogIDxwYXRoIGQ9Ik02LjE2OCAxOC44NDlhNCA0IDAgMCAxIDMuODMyIC0yLjg0OWg0YTQgNCAwIDAgMSAzLjgzNCAyLjg1NSIgLz4KPC9zdmc+CgoK")

        try {
            // Call the save method, which returns the saved object if successful
            user = await user.save()

            if( user !== null ) {
                ilse.notification.send( "Registered", `Account: ${email} registered succesfully` )
                ilse.Messager.emit('configuration', { action: 'registered', user: user.id })
                return user.id
            }
        } catch(error) {
            Messager.emit( "configuration", { action: "error", error:error })
            throw error
        }
    }

    async login( username, password ) {
        let user = await Parse.User.logIn( username, password )
        this.id = user.id
        return user
    }


}
