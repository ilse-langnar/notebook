import printf                                        from "@/functions/printf.js"

// ilse
    import ilse                                      from "@/ilse.js"

// libs
    import path                                      from "path"
    import DOMFilesystem2                            from "dom-filesystem"


// JSON
    import CONFIG_TEMPLATE                           from  "@/constants/CONFIG_TEMPLATE.js"

// globals
    let filesystem
    var target_directory
    let fs

export default class DOMFilesystem {

    constructor( dir ) {

        target_directory = "/"

        filesystem = {
            "/": {
                "notes": "20210810100520-1sr7opf3: [[Ilse Ideas]] How can I integrate bullets + spaced repetition better?",
                "config.json": JSON.stringify(CONFIG_TEMPLATE),
                "flashcards/": { },
            }
        }

        let db = document.getElementById("db")

        if( db ) { // has, load
            filesystem   = JSON.parse(db.innerText)
        } else { // has not, create
            let db       = document.createElement( "div" )
                db.id        = "db"
                db.innerText = JSON.stringify( db.innerText )

        }

        this.file = {

            watch: this.watch_file,

            read: {
                "async": this.read_file,
                "sync":  this.read_file_sync,
            },
            write: {
                "async": this.write_file,
                "sync": this.write_file_sync,
            },
            delete: {
                "async": this.delete_file,
                "sync": this.delete_file_sync,
            },
            get_all: {
                "async": this.get_all_files,
                "sync": this.get_all_files_sync,
            },
            exists: {
                "async": this.has_path,
                "sync": this.has_path_sync,
            },
            is: {
                "async": this.is_file,
                "sync": this.is_file_sync,
            }
        }

        this.dir = {

            exists: {
                "async": this.has_path,
                "sync": this.has_path_sync,
            },
            create: {
                "async": this.create_dir,
                "sync": this.create_dir_sync,
            },
            list: {
                "async": this.list_dir,
                "sync": this.list_dir_sync,
            },
            is: {
                "async": this.is_directory,
                "sync": this.is_directory_sync,
            }
        }

        fs = {

            save() {

                setTimeout( () => {

                    let dom = document.getElementById( "db" )

                    // BUGFIX: don't exist yet
                    if( dom ) {
                        dom.innerText = JSON.stringify(filesystem)
                        document.head.appendChild( dom )
                    } else {
                        dom = document.createElement( "div" )
                            dom.id    = "db"
                            dom.style = "display: none;"
                        dom.innerText = JSON.stringify(filesystem)
                        document.head.appendChild( dom )
                    }
                }, 10 )
            },

            readFileSync: function( full_path, mode ) {

                let chunks = full_path.split("/").filter( e=>e )
                let obj    = filesystem["/"]
                let len    = chunks.lenght
                    if( !len ) return obj[full_path]
                printf( "chunks -> ", chunks )
                printf( "readFileSync -> full_path -> ", full_path )
                printf( "len -> ", len )
                printf( "obj[full_path] -> ", obj[full_path] )
                // if( len === 1 ) return obj[full_path]

                for( let chunk of chunks ) {
                    obj = obj[chunk]
                }

                if( typeof obj === "string" ) {
                    return obj
                } else {
                    throw new Error( `DOMFilesystem: You're trying to use fs.readFile on a directory!! Use a File Path instead!! (${full_path})`)
                }
            },

            watch: function() {

            },

            readdir: async function( full_path ) {

                let chunks = full_path.split("/").filter( e=>e )
                let obj = filesystem["/"]

                for( let chunk of chunks ) {
                    if( obj[chunk + "/"] ) {
                        obj = obj[chunk + "/"]
                    } else {
                        obj = obj[chunk]
                    }
                }

                if( typeof obj === "object" ) {
                    return Object.keys(obj)
                } else {
                    throw new Error( `DOMFilesystem: You're trying to use fs.readdir on a file!! Use a File Directory instead!! (${full_path})`)
                }

            },

            readdirSync: function( full_path ) {

                let chunks = full_path.split("/").filter( e=>e )
                let obj = filesystem["/"]

                for( let chunk of chunks ) {
                    if( obj[chunk + "/"] ) {
                        obj = obj[chunk + "/"]
                    } else {
                        obj = obj[chunk]
                    }
                }

                if( typeof obj === "object" ) {
                    return Object.keys(obj)
                } else {
                    throw new Error( `DOMFilesystem: You're trying to use fs.readDir on a file!! Use a File Directory instead!! (${full_path})`)
                }

            },



            writeFileSync: function( full_path, content, options ) {

                let chunks = full_path.split("/").filter( e=>e )

                if( chunks.length === 1 ) {
                    filesystem["/"][full_path] = content
                } else if( chunks.length === 2 ) {
                    filesystem["/"][chunks[0] + "/"][chunks[1]] = content
                } else if( chunks.length === 3 ) {
                    filesystem["/"][chunks[0] + "/"][chunks[1] + "/"][chunks[3]] = content
                } else if( chunks.length === 4 ) {
                    filesystem["/"][chunks[0]][chunks[1] + "/"][chunks[2] + "/"][chunks[3]] = content
                }

                fs.save()

                return content
            },

            async exists( full_path ) {

                let chunks = full_path.split("/").filter( e=>e )
                let obj    = filesystem["/"]

                chunks.map( chunk => {
                    if( obj[chunk + "/"] ) {
                        obj = obj[chunk + "/"]
                    } else {
                        obj = obj[chunk]
                    }
                })

            },

            existsSync( full_path ) {

                printf( "DOMFilesystem -> has_path_sync -> full_path -> ", full_path )
                let chunks = full_path.split("/").filter( e=>e )
                printf( "DOMFilesystem -> has_path_sync -> chunks -> ", chunks )
                let obj    = filesystem["/"]
                printf( "DOMFilesystem -> has_path_sync -> obj -> ", obj )

                chunks.map( chunk => {
                    if( obj[chunk + "/"] ) {
                        obj = obj[chunk + "/"]
                    } else {
                        obj = obj[chunk]
                    }
                })

            },

        }

    }

    // <-------------------------------> Dir <-------------------------------> //

    async is_directory( full_path ) {

        let chunks = full_path.split("/").filter( e=>e )
        let obj    = filesystem["/"]
        let last

        for( let chunk of chunks ) {
            if( obj[chunk + "/"] ) {
                obj = obj[chunk + "/"]
            } else {
                obj = obj[chunk]
            }
        }

        if( typeof obj === "string" ) {
            return false
        } else  {
            return true
        }

    }

    async is_file( full_path ) {
        // let is = await fs.lstat( path.join( target_directory, full_path ) ).isFile()
        let is = await promisified_stats( path.join( target_directory, full_path ) ).isDirectory()
        return is
    }

    async create_dir( full_path ) {
        try {
            await fs.mkdir( path.join(target_directory , full_path) )
            return true
        } catch( e ) {
            return false
        }
    }

    async has_path( full_path ) {

        try {
            // await fs.access( path.join( target_directory, full_path ) )
            await fs.existsSync( path.join( target_directory, full_path ) )
            return true

        } catch {
            return false
        }
    }




    is_directory_sync( full_path ) {

        let chunks = full_path.split("/").filter( e=>e )
        let obj    = filesystem["/"]
        let last

        for( let chunk of chunks ) {
            if( obj[chunk + "/"] ) {
                obj = obj[chunk + "/"]
            } else {
                obj = obj[chunk]
            }
        }

        if( typeof obj === "string" ) {
            return false
        } else  {
            return true
        }
    }

    is_file_sync( full_path ) {
        let is = fs.lstatSync( path.join( target_directory, full_path ) ).isFile()
        return is
    }

    create_dir_sync( full_path ) {

        try {
            fs.mkdirSync( path.join(target_directory , full_path) )
            return true
        } catch( e ) {
            throw new Error( `Could not create dir: ${name}` )
        }

    }

    has_path_sync( full_path ) {
        printf( "has_path_sync -> full_path -> ", full_path )
        printf( "target_directory -> ", target_directory )
        printf( "full_path -> ", full_path )
        printf( "fs -> ", fs )
        let exists = fs.existsSync( path.join(target_directory , full_path) )
        printf( "exists -> ", exists )
            return !!exists
    }

    // <-------------------------------> Dir <-------------------------------> //

    async delete_file() {

    }

    async get_all_files() {

        printf( "DOMFilesystem get_all_files " )
        let files   = await fs.readdir("/" )
        printf( "DOMFilesystem -> get_all_files -> files -> ", files )
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
        let result  = await fs.rename( path.join(target_directory , old_path), path.join(target_directory , new_path) )
        return result
    }

    async list_dir( directory_path ) {
        let list      = await fs.readdir( "/" + directory_path )
        return list
    }

    async upload_file( file_name, data ) {
        // TODO
    }

    async read_file( file_path, mode = "utf8" ) {

        // // return new Promise((resolve, reject) => {
            // fs.readFile( path.join( target_directory, file_path ), 'utf8', function (error, data) {
                // if (error) return reject(error)
                // resolve( data )
            // })
        // })


        // printf( "fs_promises.readFile -> ", readFile )
        // let content = await fs_promises.readFile( path.join(target_directory, file_path), mode )
        // let content = await promisified_read_file( path.join(target_directory, file_path), mode )
        // let content = fs.readFileSync( path.join( target_directory, file_path ) )
        let content = fs.readFileSync( file_path )
        return content

    }

    async write_file( file_path, content, options )  {

        if( file_path.indexOf( "@/" ) !== -1 ) return
        // await promisified_write_file( path.join(target_directory , file_path), content, options )
        await fs.writeFileSync( file_path, content, options )
    }







    delete_file_sync() {
    }

    get_all_files_sync() {

        let files   = fs.readdirSync( target_directory )
            if( !files ) files = []

        return files
    }

    get_random_files_sync( how_many = 1 ) {

        let files       = this.get_all_files()
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

    rename_file_sync( old_path, new_path ) {
        let result  = fs.renameSync( path.join(target_directory , old_path), path.join(target_directory , new_path) )
        return result
    }

     list_dir_sync( directory_path ) {
        let list      = fs.readdirSync( path.join(target_directory , directory_path) )
        return list
    }

    upload_file_sync( file_name, data ) { }

    read_file_sync( file_path, mode = "utf8" ) {
        // file_path   = path.join(target_directory , file_path )
        let content = fs.readFileSync( file_path, mode )
        return content
    }

    write_file_sync( file_path, content, options )  {

        if( file_path.indexOf( "@/" ) !== -1 ) return

        // fs.writeFileSync( path.join(target_directory , file_path), content, options )
        fs.writeFileSync( file_path, content, options )
    }


    watch_file( file_path, fn )  {

        fs.watch(path.join(target_directory, file_path), function(event, targetfile, one){
            fn( targetfile, one )
        })

    }
}
