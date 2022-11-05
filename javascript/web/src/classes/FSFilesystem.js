import printf                                    from "@/functions/printf.js"

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

export default class FSFilesystem {

    constructor( dir ) {

        target_directory        = dir // target_directory = dir + "/"

        this.file               = {

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
                // "async": this.delete_file,
                // "sync": this.delete_file_sync,
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

    }

    // <-------------------------------> Dir <-------------------------------> //

    async is_directory( full_path ) {

        if( full_path.indexOf("..")  !== -1 ) throw new Error( `FSFilesystem.Error: You don't have access to check: ${full_path}` ) // BUGFIX: antihack

        let is = await promisified_stats( path.join( target_directory, full_path ) ).isDirectory()
        return is
    }

    async is_file( full_path ) {

        if( full_path.indexOf("..")  !== -1 ) throw new Error( `FSFilesystem.Error: You don't have access to check: ${full_path}` ) // BUGFIX: antihack

        // let is = await fs.lstat( path.join( target_directory, full_path ) ).isFile()
        let is = await promisified_stats( path.join( target_directory, full_path ) ).isDirectory()
        return is
    }

    async create_dir( full_path ) {

        if( full_path.indexOf("..")  !== -1 ) throw new Error( `FSFilesystem.Error: You don't have access to create: ${full_path}` ) // BUGFIX: antihack

        try {
            fs.mkdirSync( path.join(target_directory , full_path) )
            return true
        } catch( e ) {
            return false
        }
    }

    async has_path( full_path ) {

        if( full_path.indexOf("..")  !== -1 ) throw new Error( `FSFilesystem.Error: You don't have access to check: ${full_path}` ) // BUGFIX: antihack

        return fs.existsSync( path.join( target_directory, full_path ) )
    }





    is_directory_sync( full_path ) {

        if( full_path.indexOf("..")  !== -1 ) throw new Error( `FSFilesystem.Error: You don't have access to check: ${full_path}` ) // BUGFIX: antihack

        let is = fs.lstatSync( path.join( target_directory, full_path ) ).isDirectory()
        return is
    }

    is_file_sync( full_path ) {

        if( full_path.indexOf("..")  !== -1 ) throw new Error( `FSFilesystem.Error: You don't have access to check: ${full_path}` ) // BUGFIX: antihack

        let is = fs.lstatSync( path.join( target_directory, full_path ) ).isFile()
        return is
    }

    create_dir_sync( full_path ) {

        if( full_path.indexOf("..")  !== -1 ) throw new Error( `FSFilesystem.Error: You don't have access to create: ${full_path}` ) // BUGFIX: antihack

        try {
            fs.mkdirSync( path.join(target_directory , full_path) )
            return true
        } catch( e ) {
            throw new Error( `Could not create dir: ${name}` )
        }

    }

    has_path_sync( full_path ) {

        if( full_path.indexOf("..")  !== -1 ) throw new Error( `FSFilesystem.Error: You don't have access to check: ${full_path}` ) // BUGFIX: antihack

        let exists = fs.existsSync( path.join(target_directory , full_path) )
            return !!exists
    }

    // <-------------------------------> Dir <-------------------------------> //

    // async delete_file() { }

    async get_all_files() {

        let files   = await promisified_list_dir( target_directory )
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

        if( old_path.indexOf("..")  !== -1 || new_path.indexOf("..") !== -1 ) throw new Error( `FSFilesystem.Error: You don't have access to rename: ${old_path} to ${new_path}` ) // BUGFIX: antihack

        let result  = await fs.rename( path.join(target_directory , old_path), path.join(target_directory , new_path) )
        return result
    }

    async list_dir( directory_path ) {

        if( directory_path.indexOf("..")  !== -1 ) throw new Error( `FSFilesystem.Error: You don't have access to read: ${directory_path}` ) // BUGFIX: antihack

        let list      = await promisified_list_dir( path.join(target_directory , directory_path) )
        return list
    }

    async upload_file( file_name, data ) {
        // TODO
    }

    async read_file( file_path, mode = "utf8" ) {

        if( file_path.indexOf("..")  !== -1 ) throw new Error( `FSFilesystem.Error: You don't have access to read: ${file_path}` ) // BUGFIX: antihack

        let content = await promisified_read_file( path.join(target_directory, file_path), mode )
        return content
    }

    async write_file( file_path, content, options )  {

        if( file_path.indexOf("..")  !== -1 ) throw new Error( `FSFilesystem.Error: You don't have access to write: ${file_path}` ) // BUGFIX: antihack

        await promisified_write_file( path.join(target_directory , file_path), content, options )
    }







    // delete_file_sync() { }

    get_all_files_sync() {

        let files   = fs.readdirSync( target_directory )
            if( !files ) files = []

        return files
    }

    rename_file_sync( old_path, new_path ) {

        if( old_path.indexOf("..")  !== -1 || new_path.indexOf("..") !== -1 ) throw new Error( `FSFilesystem.Error: You don't have access to rename: ${old_path} to ${new_path}` ) // BUGFIX: antihack

        let result  = fs.renameSync( path.join(target_directory , old_path), path.join(target_directory , new_path) )
        return result
    }

    list_dir_sync( directory_path, ll ) {

        if( directory_path.indexOf("..")  !== -1 ) throw new Error( `FSFilesystem.Error: You don't have access to list: ${directory_path}` ) // BUGFIX: antihack

        let list      = fs.readdirSync( path.join(target_directory , directory_path) )
        return list
    }

    upload_file_sync( file_name, data ) { }

    read_file_sync( file_path, mode = "utf8" ) {

        if( file_path.indexOf("..")  !== -1 ) throw new Error( `FSFilesystem.Error: You don't have access to read: ${file_path}` ) // BUGFIX: antihack

        file_path   = path.join(target_directory , file_path )
        let content = fs.readFileSync( file_path, mode )
        return content
    }

    write_file_sync( file_path, content, options )  {
        if( file_path.indexOf("..")  !== -1 ) throw new Error( `FSFilesystem.Error: You don't have access to write: ${file_path}` ) // BUGFIX: antihack

        fs.writeFileSync( path.join(target_directory , file_path), content, options )
    }


    watch_file( file_path, fn )  {

        if( file_path.indexOf("..")  !== -1 ) throw new Error( `FSFilesystem.Error: You don't have access to watch: ${file_path}` ) // BUGFIX: antihack

        fs.watch(path.join(target_directory, file_path), function(event, targetfile, one){
            fn( targetfile, one )
        })

    }
}
