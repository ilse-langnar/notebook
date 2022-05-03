const printf                                    = console.log

import ilse                                      from "@/ilse.js"
import axios                                     from "axios"

export default class RESTFilesystem {

    constructor( backend_url ) {

        if( !backend_url ) throw new Error( "RESTFilesystem.js -> ERROR -> We need a backend_url so we know where to upload files, do writes/reads etc." )

        this.file = {
            get     : this.read_file,
            set     : this.write_file,
            delete  : this.delete_file,
            rename  : this.rename_file,
            get_all : this.get_all_files,
            random  : this.get_random_files,
            upload  : this.upload_file,
            exists  : this.does_file_exists,
            stats   : this.get_file_stats,
        }

        this.dir = {
            exists:   this.does_dir_existS,
            create:   this.create_dir,
            list:     this.read_dir,
        }

    }


    // <-------------------------------> Dir <-------------------------------> //
    async create_dir( name ) {
        let url      = "http://localhost:8090"
        let result   = await axios.post( `${url}/dir/`, {
            name: name
        })

        if( result ) return result.data

        return []

    }

    async read_dir( dir ) {

        // let url      = "http://localhost:8090" // FIXME: this needs to come from ilse.SERVER_URL
        // let result   = await axios.get( `${url}/dir/${dir}` )

        let url      = "http://localhost:8090" // FIXME: this needs to come from ilse.backend_url
            let result   = await axios.get( `${url}/dir/?dir=${dir}` )

        if( result ) {
            return result.data
        } else {
            return []
        }

    }

    async does_dir_existS( path ) {

        if( !path ) throw new Error( "exists(<dir>) has no <path> as in exists(<path>)" )

        let res
        let normalized_path    = encodeURI( path )
        let url

        try {
            res = await axios.get( `http://localhost:8090/exists/?file=${normalized_path}` )

            if( res.data === "OK" ) {
                return true
            } else {
                return false
            }

        } catch( e ) {
            return false
        }
    }
    // <-------------------------------> Dir <-------------------------------> //

    async delete_file() {

    }

    async get_all_files() {

        let res = await axios.get(`http://localhost:8090/files/`)
        return res.data
    }

    async get_random_files( how_many = 1 ) {

        let files       = await filesystem.rest.file.get_all()
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

    async rename_file( title, new_title ) {


        if( !title ) throw new Error( "rename(filesyste->file) has no <title> as in rename(<title>)" )
        if( !new_title ) throw new Error( "rename(filesyste->file) has no <new_title> as in rename(<new_title>)" )

        let response = await axios.post(`http://localhost:8090/rename/${title}`, {
            title: new_title,
        })

        let body     = response.data

        return body
    }

    async create_file( name ) {

        let url      = "http://localhost:8090"
        let result   = await axios.post( `${url}/dir/`, {
            name: name
        })

        if( result ) return result.data

        return null
    }

    async does_file_exists( path ) {

        if( !path ) throw new Error( "exists(<dir>) has no <path> as in exists(<path>)" )

        let normalized_path    = encodeURI( path )
        let url

        let res = await axios.get( `http://localhost:8090/exists/?file=${normalized_path}` )

        return res.data
        /*
        try {

            printf( ">>res -> ", res )
            if( res.data === "true" ) {
                return true
            } else {
                return false
            }

        } catch( e ) {
            return false
        }
        */

    }

    async list_dir( dir ) {

        // let url      = "http://localhost:8090" // FIXME: this needs to come from ilse.SERVER_URL
        // let result   = await axios.get( `${url}/dir/${dir}` )

        let url      = "http://localhost:8090" // FIXME: this needs to come from ilse.backend_url
        let result   = await axios.get( `${url}/dir/?dir=${dir}` )

        if( result ) return result.data
        return []
    }

    async upload_file( file_name, data ) {


        // ???
            let url         = ilse.backend_url

        // Upload URL
            let complete_url = `${url}/upload/`

        // Form Data multipart/form-data
            let form = new FormData()
            form.append( 'name', file_name )
            form.append( 'data', data )

        // let responsde   =  axios.post(complete_url, { file: file_name, data: data }, {
        try {

            let res = await axios.post("http://localhost:8090/upload/", form, {
                headers: {
                    // 'Content-Type' : 'application/octet-stream',
                    // 'Content-Type': 'multipart/form-data; boundary=--blob',
                    // 'Content-Type': 'multipart/form-data',
                    'Content-Type': 'multipart/form-data',
                }
            })

            return res

        } catch( e ) {
            throw e
        }
    }

    async get_file_stats( file_name ) {

        if( !file_name ) throw new Error( "stats(filesyste->file) has no <file_name> as in stats(<file_name>)" )

        let normalized_file_name    = encodeURI( file_name )
        let url                     = `http://localhost:8090/metadata/?file=${normalized_file_name}`

        let res = await axios.get( url )
        return res.data

    }

    async read_file( file_name, options = { binary: false, query_param: false}) {

        if( !file_name ) throw new Error( "get_file(filesyste->file) has no <file_name> as in get_file(<file_name>)" )

        let res
        let normalized_file_name    = encodeURI( file_name )
        let url                     = `http://localhost:8090/file/?file=${normalized_file_name}`

        try {
            res = await axios.get( url )
            return res.data
        } catch( e ) {
            throw e
        }

    }

    async write_file( title, content, options = { binary: false, query_param: false}) {

        if( !title ) throw new Error( "Set.js(filesystem) -> set_file -> title is not defined" )
        // if( !content ) throw new Error( "Set.js(filesystem) -> set_file -> content is not defined" )

        let res
        let normalized_file_name    = encodeURI( title )
        let url                     = `http://localhost:8090/file/?file=${normalized_file_name}`

        try {
            res = await axios.post( url, {title: title, content: content} )
            return res
        } catch( e ) {
            return null
        }

    }

}

// File
//     import file        from "@/filesystem/rest/file/index.js"
//
//     // Dir
//         import dir        from "@/filesystem/rest/dir/index.js"
//
//         // Search
//             import search     from "@/filesystem/rest/search/index.js"
//
//             let filesystem = {
//
//                 type: "rest",
//                     file: file ,
//                         dir: dir,
//                             search: search,
//
//                             }
//
//                             export default filesystem
//
//             }


/*
import list         from "@/filesystem/rest/dir/list.js"
let dir = {
    list: list
}


let dir = {
    exists: exists,
    create: create,
    list: list,
}


export default random
// File
import get         from "@/filesystem/rest/file/get.js"
import set         from "@/filesystem/rest/file/set.js"
import _delete     from "@/filesystem/rest/file/delete.js"
import rename      from "@/filesystem/rest/file/rename.js"
import all         from "@/filesystem/rest/file/all.js"
import random      from "@/filesystem/rest/file/random.js"
import upload      from "@/filesystem/rest/file/upload.js"
import exists      from "@/filesystem/rest/file/exists.js"
import stats       from "@/filesystem/rest/file/stats.js"

let file = {
    get     : get,
    set     : set,
    delete  : _delete,
    rename  : rename,
    get_all : all,
    random  : random,
    upload  : upload,
    exists  : exists,
    stats   : stats,
}
*/
