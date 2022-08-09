const printf                                    = console.log

import ilse                                     from "@/ilse.js"

const BrowserFS =                                require( "browserfs")
printf( "BrowserFS -> ", BrowserFS )
const { promisify  } = require('util')

BrowserFS.install( window )

// Configures BrowserFS to use the LocalStorage file system.
BrowserFS.configure({
    fs: "LocalStorage"
}, function(e) {
    if (e) throw e
})

let fs                         = window.require("fs")
const path                     = require('path')
printf( "BrowserFS -> ", BrowserFS )
printf( "fs -> ", fs )

// Promisified functions
    let promisified_list_dir   = promisify( fs.readdir )
    let promisified_read_file  = promisify( fs.readFile )
    let promisified_write_file = promisify( fs.writeFile )
    let promisified_create_dir = promisify( fs.mkdir )
    let promisified_stats      = promisify( fs.lstat )

let target_directory = ""


// TODO: Should I make a sync version????
export default class LocalStorageFilesystem {

    constructor() {

        this.file = {

            watch: this.watch_file,

            read: {
                "async": this.read_file,
                // "sync":  this.read_file,
                "sync":  this.read_file_sync,
            },
            write: {
                "async": this.write_file,
                // "sync": this.write_file,
                "sync": this.write_file_sync,
            },
            delete: {
                "async": this.delete_file,
                // "sync": this.delete_file,
                "sync": this.delete_file_sync,
            },
            get_all: {
                "async": this.get_all_files,
                // "sync": this.get_all_files,
                "sync": this.get_all_files_sync,
            },
            exists: {
                "async": this.has_path,
                // "sync": this.has_path,
                "sync": this.has_path_sync,
            },
            is: {
                "async": this.is_file,
                // "sync": this.is_file,
                "sync": this.is_file_sync,
            }
        }

        this.dir = {

            exists: {
                "async": this.has_path,
                // "sync": this.has_path,
                "sync": this.has_path_sync,
            },
            create: {
                "async": this.create_dir,
                // "sync": this.create_dir,
                "sync": this.create_dir_sync,
            },
            list: {
                "async": this.list_dir,
                // "sync": this.list_dir,
                "sync": this.list_dir_sync,
            },
            is: {
                "async": this.is_directory,
                // "sync": this.is_directory,
                "sync": this.is_directory_sync,
            }
        }



        /*
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
        */

    }

    // <-------------------------------> Dir <-------------------------------> //
    /*
    watch_file() {

    }

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
    */

    // <-------------------------------> Dir <-------------------------------> //
    async is_directory( full_path ) {
        // let is = await fs.lstat( path.join( target_directory, full_path ) ).isDirectory()
        let is = await promisified_stats( path.join( target_directory, full_path ) ).isDirectory()
        return is
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
        let is = fs.lstatSync( path.join( target_directory, full_path ) ).isDirectory()
        return is
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
        let exists = fs.existsSync( path.join(target_directory , full_path) )
            return !!exists
    }

    // <-------------------------------> Dir <-------------------------------> //

    async delete_file() {

    }

    async get_all_files() {

        let files   = await promisified_list_dir( path.join(target_directory , "second") )
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
        let list      = await promisified_list_dir( path.join(target_directory , directory_path) )
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
        let content = await promisified_read_file( path.join(target_directory, file_path), mode )


        return content

    }

    async write_file( file_path, content, options )  {

        if( file_path.indexOf( "@/" ) !== -1 ) return
        await promisified_write_file( path.join(target_directory , file_path), content, options )
    }







    delete_file_sync() {
    }

    get_all_files_sync() {

        let files   = fs.readdirSync( path.join(target_directory , "second") )
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


        file_path   = path.join(target_directory , file_path )
        let content = fs.readFileSync( file_path, mode )
        return content
    }

    write_file_sync( file_path, content, options )  {

        if( file_path.indexOf( "@/" ) !== -1 ) return

        fs.writeFileSync( path.join(target_directory , file_path), content, options )
    }


    watch_file( file_path, fn )  {

        fs.watch(path.join(target_directory, file_path), function(event, targetfile, one){
            fn( targetfile, one )
        })

    }

}
