const printf                = console.log

// Libs
    let fuzzy_sort      = require("./fuzzysort.js")
    // Native
        const fs            = require( "fs" )

class Utils {

    constructor() {

    }

    fuzzy_search( search = "", list = []) {
        let search_results                  = fuzzy_sort.go( search, list )
        return search_results
    }

    is_directory( path ) {
          const stats =  fs.statSync( path )
          return stats.isDirectory()
    }

}

module.exports = Utils
