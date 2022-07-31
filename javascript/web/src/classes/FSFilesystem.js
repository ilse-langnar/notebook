const printf                                    = console.log

import ilse                                      from "@/ilse.js"

const fs                                         = require('fs')
const fs_promises                                = fs.promises
const { promisify  } = require('util')

let promisified_list_dir   = promisify( fs.readdir )
let promisified_read_file  = promisify( fs.readFile )
let promisified_write_file = promisify( fs.writeFile )
let promisified_create_dir = promisify( fs.mkdir )
let promisified_stats      = promisify( fs.lstat )


const path                                       = require('path')

var target_directory

function error_check( file_path ) {
    let is_relative   = file_path.indexOf("@/") !== -1
        if( is_relative ) throw new Error( `Error: cannot access relative like this: @/` )

    let is_going_back = file_path.indexOf("../") !== -1
        if( is_going_back ) throw new Error( `Error: access relative urls like: ../(Security Issue)` )

}

export default class FSFilesystem {

    constructor( dir ) {

        // target_directory = dir + "/"
        target_directory = dir

        // ilse.filesystem.file.read.async()
        // ilse.filesystem.file.read.sync()

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
            watch   : this.watch_file,
            is      : this.is_file,
        }

        this.dir = {
            exists  : this.has_path,
            create  : this.create_dir,
            list    : this.read_dir,
            is      : this.is_directory,
        }
        */
    }

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
