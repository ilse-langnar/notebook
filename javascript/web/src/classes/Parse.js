import printf                           from "@/functions/printf.js"

// Ilse
    import ilse                         from "@/ilse.js"

// Ilse
    import Parse                         from "@/ilse.js"

export default class ParseServer {

    constructor() {
        Parse.initialize( process.env.VUE_APP_PARSER_SERVER_APPLICATION_ID, process.env.VUE_APP_PARSER_SERVER_JAVASCRIPT_KEY)
        Parse.serverURL = process.env.VUE_APP_PARSER_SERVER_URL
    }

    sync() {

        var client = new Parse.LiveQueryClient({
            applicationId: process.env.VUE_APP_PARSER_SERVER_APPLICATION_ID,
            serverURL:     process.env.VUE_APP_PARSER_WEB_SOCKET_SERVER,
            javascriptKey: process.env.VUE_APP_PARSER_SERVER_JAVASCRIPT_KEY,
        });

        client.open();

        var query = new Parse.Query('Todo');
        var subscription = client.subscribe(query);

        subscription.on('create', todo => {
            this.todos.add(todo);
            console.log('On create event');

        });

        subscription.on('update', (object, original, response) => {

        })

        subscription.on('delete', todo => {
            this.todos.forEach(t => {
                if (t.id === todo.id) {
                    console.log('On delete event');
                    this.todos.delete(t);
                }

            });

        });

    }

    async upload( image ) {

        // 1. Create a file
        const { base64, fileName } = image;
        const  parseFile           = new Parse.File( fileName, { base64 })

        // 2. Save the file
        try {
            const responseFile     = await parseFile.save();

            const Gallery          = Parse.Object.extend('Gallery');
            const gallery          = new  Gallery();
                gallery.set('picture', responseFile);
            await gallery.save();

        } catch (error) {
            console.log( 'The file either could not be read, or could not be saved to Back4app.',);
        }
    }

    async create_user( username, email, pass ) {

        if( !username || !email || !pass ) throw new Error( `ERROR: To make a new user you need: username, email, password, you're not giving me the right quantity of parameters` )

        // Creates a new Parse "User" object, which is created by default in your Parse app
            let user = new Parse.User()

        // Set the input values to the new "User" object
            user.set("username", username )
            user.set("email",    email )
            user.set("password", password )

        try {
            // Call the save method, which returns the saved object if successful
            user = await user.save()

            if( user !== null ) {
                return user.id
            }
        } catch(error) {
            printf( "error -> ", error )
            throw error
        }
    }

}
