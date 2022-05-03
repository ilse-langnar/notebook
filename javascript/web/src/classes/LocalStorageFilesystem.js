const printf                                    = console.log

import ilse                                     from "@/ilse.js"

const BrowserFS =                                require( "browserfs")

BrowserFS.install( window )

// Configures BrowserFS to use the LocalStorage file system.
BrowserFS.configure({
    fs: "LocalStorage"
}, function(e) {
    if (e) throw e
})

let fs = window.require("fs")

let target_directory = ""

export default class LocalStorageFilesystem {

    constructor() {

        this.file = {
            get     : this.read_file,
            set     : this.write_file,
            delete  : this.delete_file,
            rename  : this.rename_file,
            get_all : this.get_all_files,
            random  : this.get_random_files,
            upload  : this.upload_file,
            exists  : this.has_path,
            stats   : this.get_file_stats,
        }

        this.dir = {
            exists:   this.has_path,
            create:   this.create_dir,
            list:     this.read_dir,
        }

        this.DEFAULT_NOTES = [
            { content: "# Hello, World", depth: 0, },
            { content: "This is ilse Langnar's Notebook", depth: 0, },
            { content: "You can use Markdown with those notes", depth: 0, },
            { content: "Some things you can use ->  ==Highlight== **Bold** *Italic* ~~Strike~~ ", depth: 0, },
            { content: "> He who has a why can bear almost any how - Friedrich Nietzsche", depth: 0, },
            { content: "[[Ilse]] do a **shift-click** or a **ctrl-click** on the link to open the file / graph", depth: 0, },
            { content: "## Shortcuts ", depth: 0, },
            { content: "alt+n New note", depth: 1, },
            { content: "alt+f Search", depth: 1, },
            { content: "alt+h Help", depth: 1, },
            { content: "alt+m Toggle Menu", depth: 1, },
            { content: "alt+c Configuration", depth: 1, },
            { content: "alt+d Toggle Daily Notes", depth: 1, },
            { content: "alt+o Open File", depth: 1, },
            { content: "## Indenting notes ", depth: 0, },
            { content: "*tab* Indent note ", depth: 1, },
            { content: "*shift-tab*: Unindent note", depth: 1, },
            { content: "## Link Click ", depth: 0, },
            { content: "*shift-click*: Open File", depth: 1, },
            { content: "*ctrl-click*: Open File Graph", depth: 1, },
            // { content: " I will be referenced by other notes, try to edit me!!", depth: 0, }
        ]

    }

    // <-------------------------------> Dir <-------------------------------> //
    async create_dir( full_path ) {

        try {
            fs.mkdirSync( target_directory + full_path )
            return true
        } catch( e ) {
            throw new Error( `Could not create dir: ${name}` )
        }

    }

    async read_dir( dir ) {

        let list
        try {
            list      = fs.readdirSync( path.join( target_directory, dir ) )
            return list
        } catch( e ) {
            throw new Error( `Erorr: read_dir: ${dir}` )
        }

    }

    async has_path( full_path ) {
        let exists = fs.existsSync( target_directory + full_path )
            return !!exists
    }
    // <-------------------------------> Dir <-------------------------------> //

    async delete_file() {

    }

    async get_all_files() {

        let files   = await fs.readdirSync( target_directory )
            if( !files ) files = []

        return files
    }

    async get_random_files( how_many = 1 ) {

        let files       = await this.get_all_files()
        let random_file

        if( how_many === 1 ) {
            random_file = files[Math.floor(Math.random()*files.length)]
            return random_file
        } else {

            let list        = []

            for( var i = 0; i < how_many; i++ ) {
                random_file = files[Math.floor(Math.random()*files.length)]
                list.push( random_file )
            }

            return list

        }

    }

    async rename_file( old_path, new_path ) {
        let result  = fs.renameSync( target_directory + old_path, target_directory + new_path )
        return result
    }

    async list_dir( directory_path ) {
        let list      = fs.readdirSync( target_directory + directory_path )
        return list
    }

    async upload_file( file_name, data ) {
        // TODO
    }

    async get_file_stats( file_path ) {
        let stats = fs.statSync( target_directory + file_path )
        return res.data
    }

    // async read_file( file_name, options = { binary: false, query_param: false}) {
    async read_file( file_path, mode = "utf8" ) {

        file_path = target_directory + file_path
        let content = fs.readFileSync( file_path, mode )
        return content
    }

    async write_file( file_path, content)  {
        fs.writeFileSync( target_directory + file_path, content )
    }

}
