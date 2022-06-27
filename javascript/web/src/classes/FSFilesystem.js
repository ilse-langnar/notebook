const printf                                    = console.log

import ilse                                      from "@/ilse.js"

const fs                                         = require('fs')
const path                                       = require('path')

var target_directory

export default class FSFilesystem {

    constructor( dir ) {

        // target_directory = dir + "/"
        target_directory = dir

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
            is      : this.is_file,
        }

        this.dir = {
            exists  : this.has_path,
            create  : this.create_dir,
            list    : this.read_dir,
            is      : this.is_directory,
        }

    }

    // <-------------------------------> Dir <-------------------------------> //
    async is_directory( full_path ) {
        let is = fs.lstatSync( path.join( target_directory, full_path ) ).isDirectory()
        return is
    }

    async is_file( full_path ) {
        let is = fs.lstatSync( path.join( target_directory, full_path ) ).isFile()
        return is
    }

    async create_dir( full_path ) {

        try {
            fs.mkdirSync( path.join(target_directory , full_path) )
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
        /// let exists = fs.existsSync(path.join(target_directory, full_path ) )
        let exists = fs.existsSync( path.join(target_directory , full_path) )
            return !!exists
    }
    // <-------------------------------> Dir <-------------------------------> //

    async delete_file() {

    }

    async get_all_files() {

        let files   = await fs.readdirSync( path.join(target_directory , "second") )
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
        let result  = fs.renameSync( path.join(target_directory , old_path), path.join(target_directory , new_path) )
        return result
    }

    async list_dir( directory_path ) {
        let list      = fs.readdirSync( path.join(target_directory , directory_path) )
        return list
    }

    async upload_file( file_name, data ) {
        // TODO
    }

    async get_file_stats( file_path ) {
        let stats = fs.statSync( path.join(target_directory , file_path) )
        return res.data
    }

    // async read_file( file_name, options = { binary: false, query_param: false}) {
    async read_file( file_path, mode = "utf8" ) {

        file_path   = path.join(target_directory , file_path )
        let content = fs.readFileSync( file_path, mode )
        return content
    }

    async write_file( file_path, content)  {
        fs.writeFileSync( path.join(target_directory , file_path), content )
    }

}
