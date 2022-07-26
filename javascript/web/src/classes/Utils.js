const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Utils
    // import Messager                     from "@/classes/Messager.js"

    // Functions
        import fuzzy_sort                   from "@/assets/js/fuzzysort.js"

export default class Utils {

    constructor() {
        // DEP: Plugins
        // this.HyperMD            = require('hypermd')
    }

    get_unique_id() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);

    }

    get_date_array(start, end) {

        let arr = new Array();
        let dt  = new Date(start);

        while (dt <= end) {
            arr.push(new Date(dt));
            dt.setDate(dt.getDate() + 1);
        }
        return arr;
    }

    sleep( ms ) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    is_scrolled_into_view( el ) {
         let rect       = el.getBoundingClientRect()
         let elemTop    = rect.top
         let elemBottom = rect.bottom
         let isVisible   = elemTop < window.innerHeight && elemBottom >= 0

         return isVisible
    }

    /*
    throttle( fn, delay ) {

        this.lastCalled = 0;

        return (...args) => {
            let now = new Date().getTime();
            if(now - this.lastCalled < delay) {
                return;

            }
            this.lastCalled = now;
            return fn(...args);

        }

    }
    */

    /*
    throttle( fn, time = 2000, bind = this ) {

        if( !fn ) throw new Error( "We need a function to throttle!" )

        let now = new Date().getTime()
        if( time > (now - bind.lastCalled) ) return

        bind.lastCalled = now
    }
    */

    /*
    debounce( func, wait, immediate ) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        }
    }
    */

    debounce( func, wait ) {
      let timeout
      return (...params) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          func(params)
        }, wait)
      }
    }


    add_new_lines( str, number = 200 ) {

        var result = '';

        while (str.length > 0) {
            result += str.substring(0, number) + '\n';
            str = str.substring( number )
        }

        return result
    }

    random_integer(min = 1, max = 100 ) {

        if (min==null && max==null)
            return 0;

        if (max == null) {
            max = min;
            min = 0;

        }
            return min + Math.floor(Math.random() * (max - min + 1));

    };

    move_array(arr, old_index, new_index) {

        if( new_index >= arr.length ) {
            var k = new_index - arr.length + 1;
            while( k-- ) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr; // for testing
    }

    get_depth_spaces( depth ) {

        if( depth === null || depth === undefined ) return ""

        if( depth === 0 ) return ""

        if( depth === 1 ) return "    "

        let spaces = ``
        // Depth
        for(let index = 0; index < depth; index++) {
            spaces  += "    "
        }

        return spaces
    }

    split_array_into_pairs( source ) {

        let normalized = source.reduce( (result, value, index, array) => {

            if( index % 2 === 0 ) {
                result.push( source.slice( index, index + 2 ) )
            }
            return result

        }, []);

        return normalized
    }

    /*
    debounce(fn, timeout) {

        let timer
        return (...args) => {
            if (!timer) {
                fn.apply(this, args)
            }
            clearTimeout(timer)
            timer = setTimeout(() => { timer = undefined }, timeout)
        }

        let o = this.get_javascript_unique_date_id()
        printf( "o -> ", o )
    }
    */

    /*
    debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);

            };

        }
    }

    debounce( func, time, id ) {

        let is_attempting_too_fast  = window["last-attempt-" + id ] >= ( Date.now() - time )
            if( is_attempting_too_fast ) return

        window["last-attempt-" + id ] = Date.now()

        func()
    }
    */

    // matches a-z
    get_just_year_from_date_metadata( date ) {
        let normalized = date.split("T")[0]
        return normalized
    }

    // matches a-z
    is_letter(str) {
        return str.length === 1 && str.match(/[a-zA-Z]/i);
    }

    shuffle_array( copy ) {

        let array = copy.slice();
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }



    /*
    debounce( func, wait, immediate ) {

        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);

            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);

        };

    }
    */

    split_array_into_nth_legnth( source, size = 1 ) {

        var arrays = []
        let copy   = source

        while( copy.length > 0 ) {
            arrays.push( copy.splice(0, size) )
        }
        return arrays
    }

    get_normalized_date_from_stats( stats ) {

        let tokens          = stats.birthtime.split("T")
        let date            = tokens[0]
        let normalized_date = this.normalize_date_to_to_daily_format( date )

        return  normalized_date

    }

    // 2021-04-11 -> January 2th, 2021
    normalize_date_to_to_daily_format( date ) {

        let tokens = date.split("-")

        let YYYY    = tokens[0]

        let MM      = tokens[1]
        // BUGFIX: 04 -> 4
            if( MM[0] === "0" )  MM = MM.split("")[1]

        let DD      = tokens[2]
        // BUGFIX: 04 -> 4
            if( DD[0] === "0" )  DD = DD.split("")[1]

        let format = `${MM} ${DD}th, ${YYYY}`

        return format
    }

    get_unique_array( array ) {
        let unique = [...new Set(array)]
        return unique
    }

    get_default_container() {

        let format = this.get_daily_note_format()

        let container  = new ilse.classes.Container(
            {
                name: format,
                components: [ new ilse.classes.Component() ],
                offset: 3,
                width: 7,
            }
        )

        return container

    }

    // javascript.md -> false, a_beautiful_song.mp4 -> true
    has_media_extention( file_name ) {

        let is_mp4  = file_name.indexOf(".mp4")   !== -1
        let is_webm = file_name.indexOf(".webm") !== -1

        let is_png  = file_name.indexOf(".png") !== -1
        let is_jpg  = file_name.indexOf(".jpg") !== -1 || file_name.indexOf(".jpeg") !== -1
        let is_gif  = file_name.indexOf(".gif") !== -1

        let is_mp3  = file_name.indexOf(".mp3")   !== -1
        let is_ogg  = file_name.indexOf(".ogg")   !== -1

        if( is_mp4 || is_webm || is_png || is_jpg || is_gif || is_mp3 || is_ogg ) {
            return true
        } else {
            return false
        }

    }

    // Febuary 20th, 2020
    get_daily_note_format() {

        const today = new Date()
        let month   = today.toLocaleString('default', { month: 'long'  })
        let day     = today.getDate()
        let year    = today.getFullYear()
        let format  = `${month} ${day}th, ${year}`

        return format
    }

    get_number_month( number ) {

        number = String(number)

        if( number === "01" ) {
            return "January"
        } else if( number === "02" ) {
            return "February"
        } else if( number === "03" ) {
            return "March"
        } else if( number === "04" ) {
            return "April"
        } else if( number === "05" ) {
            return "May"
        } else if( number === "06" ) {
            return "June"
        } else if( number === "07" ) {
            return "July"
        } else if( number === "08" ) {
            return "August"
        } else if( number === "09" ) {
            return "September"
        } else if( number === "10" ) {
            return "October"
        } else if( number === "11" ) {
            return "November"
        } else if( number === "12" ) {
            return "December"
        }

    }

    // ( "02", "2022" ) -> 31
    get_numer_of_days_in_month( iMonth, iYear ) {
        return 32 - new Date(iYear, iMonth, 32).getDate();
    }

    // 20220123180536 -> Febuary 20th, 2020
    convert_from_date_unique_id_to_daily_note_format( unique_id ) {

        // printf( "convert_from_date_unique_id_to_daily_note_format -> unique_id -> ", unique_id )

        let year    = unique_id.substr( 0, 4 )
        // printf( "year -> ", year )

        // let month   = unique_id.substr( 4, 2 )
        let month   = unique_id.substr( 4, 2 )
            month   = this.get_number_month( month )
        // printf( "month -> ", month )

        let day     = unique_id.substr( 6, 2 )
        // printf( "day -> ", day )

        let format  = `${month} ${day}th, ${year}`
        // printf( "format -> ", format )

        return format
    }

    transform_unix_epoch_into_us_en_date( epoch  ) {

        let today   = new Date( epoch )

        printf( "today -> ", today )
        let year    = today.getFullYear()

        let month   = Number( today.getMonth() )
            month += 1
            month = `0${month}`
            if( month === "010" ) month = "10" // BUGFIX :
            if( month === "011" ) month = "11" // BUGFIX :
            if( month === "012" ) month = "12" // BUGFIX :


        let day     = today.getDate()
            if( day === 1 ) day = "01" // BUGFIX: only "1" will give a bug on the id, 01 is not allowed in strict mode,
            if( day === 2 ) day = "02"
            if( day === 3 ) day = "03"
            if( day === 4 ) day = "04"
            if( day === 5 ) day = "05"
            if( day === 6 ) day = "06"
            if( day === 7 ) day = "07"
            if( day === 8 ) day = "08"
            if( day === 9 ) day = "09"
            if( day === 10 ) day = "10"

        let hour    = today.getHours()
        let minutes = today.getMinutes()
        let seconds = today.getSeconds()

        let id      = `${year}${month}${day}${hour}${minutes}${seconds}`

        return {
            year,
            month,
            day,
            hour,
            minutes,
            seconds,
        }
    }

    // 20220123180536
    get_unique_date_id() {

        const today = new Date()
        let year    = today.getFullYear()

        let month   = Number( today.getMonth() )
            month += 1
            month = `0${month}`
            if( month === "010" ) month = "10" // BUGFIX :
            if( month === "011" ) month = "11" // BUGFIX :
            if( month === "012" ) month = "12" // BUGFIX :


        let day     = today.getDate()
            if( day === 1 ) day = "01" // BUGFIX: only "1" will give a bug on the id, 01 is not allowed in strict mode,
            if( day === 2 ) day = "02"
            if( day === 3 ) day = "03"
            if( day === 4 ) day = "04"
            if( day === 5 ) day = "05"
            if( day === 6 ) day = "06"
            if( day === 7 ) day = "07"
            if( day === 8 ) day = "08"
            if( day === 9 ) day = "09"
            if( day === 10 ) day = "10"

        let hour    = today.getHours()
        let minutes = today.getMinutes()
        let seconds = today.getSeconds()

        let id      = `${year}${month}${day}${hour}${minutes}${seconds}`

        return id
    }

    img_2_base64( src, callback, outputFormat ) {

        var img = new Image()

        img.crossOrigin = 'Anonymous';

        img.onload = function() {

            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            var dataURL;

            canvas.height = this.naturalHeight;
            canvas.width = this.naturalWidth;

            ctx.drawImage(this, 0, 0);

            dataURL = canvas.toDataURL(outputFormat);

            callback(dataURL);

        };

        img.src = src;

        if (img.complete || img.complete === undefined) {
            img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
            img.src = src;
        }

    }

    async create_note( title, content ) {

        if( !title ) throw new Error( "Utils.js -> create_note(<title>, <content>)-> <title> is not defined" )
        let result = await ilse.filesystem.file.set( title, content )
        return !!result
    }

    extract_tags( text  ) {

        if( !text ) return []
        if( !text.indexOf) return []
        if( text.indexOf("#") === -1 ) return []

        let reg_exp = /#[\w-]*,?[\s]*/
        // let reg_exp = /#[.*][\s]*/

        // let reg_exp = /#[\w-]*,?[\s]*/
        // let reg_exp = /#[\w-?\]*,?[\s]*/

        text        = text.replace( /[\n]+/g, " " )

        let words   = text.split(" ")
        let tags    = []
        let letters

        // Words
        for( let word of words ) {
            if( word.match(reg_exp) ) {

                letters = word.split("#")
                if( letters[1] !== "" ) {
                    tags.push( word )
                }
            }
        }

        return tags

    }

    // ( "[[example]]", /\[\[*./, /\]\]/ )
    extract_tokens_by_delimiters( text, start, end ) {

        // BUGCATCH
            if( !text ) return []
            if( !text.split ) return []

        // BUGFIX: Remove new lines
            text        = text.replace( /[\n]+/g, " " )

        let words   = text.split(" ") // "I have a new [[Funny Idea]] for you" -> [ "I", "have", "a", "new", "[[Funny", "Idea]]", "for", "you" ]

        let list    = []

        let tmp     = ""
        let token_count = 0
        let is_on   = false

        // SUPERHACK: OMG IT WORKED HAHAHAH, since the fist/second words are 'ignored' and we only parse the second/third, I artifically add a first + second word, then just pop then before returning, and it's working
            words.splice( 0, 0, "[[Bug Fix]]" )
            words.splice( 0, 0, "[[Bug Fix 2]]" )

        // "This is a [[Javascript Example]] " -> [ "This", "is", "a", "[[Javascript", "Example]]" ]
        for( let word of words) {

            if( word.match( start ) && word ) {
                is_on = true
            }

            // BUG: If the first [[]] has multiple token in it, we'll NOT Add the space
            if( is_on && word ) {

                // [[ref.png]], [[ This is multiple]] -> add spaced for it(sentence with space).
                // if( token_count >= 2 && !words[++index].match( end ) ) {
                if( token_count >= 2 /*multi-token*/ ) {
                    tmp += word + " "
                } else {
                    tmp += word
                }

                token_count++
            }

            if( word.match( end ) && is_on && word ) {

                list.push( tmp.trim() )
                is_on = false
                tmp   = ""
            }
        }

        // SUPERHACK: OMG IT WORKED HAHAHAH, since the fist/second words are 'ignored' and we only parse the second/third, I artifically add a first + second word, then just pop then before returning, and it's working
            list.shift()
            list.shift()

        return list

        let normalized_list = []

        // BUGFIX: Remove first + last space, [ " [[Link]]" ] -> [ "[[Link]]" ]
        for( let item of list ) {

                // BUGFIX: Remove outer/inner whitespace
            let letters = item.split("")

                if( letters[0] === " " ) letters.shift()
                if( letters[letters.length -1] === " " ) letters.pop()

            normalized_list.push( letters.join("") )
        }

        return normalized_list

    }

    // "I'm an example [[here]] nad [[2]]" -> [ [[here]], [[2 ]] ]
    extract_string_by_regexp( pattern, string ) {

        // let words = string.split("\n")
        let words = string.split(/\b/)
        let list  = []

        for( let word of words ) {

            if( word.match( pattern ) ) {

                list.push({
                    token: word.match( pattern )[0],
                    index: word.match( pattern ).index
                })
            }
        }

        return list

    }

    compare_2_arrays(arr1, arr2) {
        // compare arrays
        const result = JSON.stringify(arr1) == JSON.stringify(arr2)
        return result
    }


    get_link_turple_from_wiki_links( text ) {

        let lines = text.split( "\n" )
        let list  = []

        let wiki_link
        let obsidian_link
        let url

        for( let line of lines ) {

            if( line.indexOf("![[") === -1 ) continue

            // Extract ![[ilse.png]] -> ilse.png
            url        = line
                .substring(  line.indexOf("![["), line.indexOf("]]") )
                .replace("![[", "" )
                .replace("]]", "" )

            // obsidian_link = "[[ilse.png]]"
                obsidian_link    = `![[${url}]]`

            // wiki_link = "![<name>](url)"
                wiki_link        = `![${url}](${ilse.backend_url}/assets/${encodeURI(url)})`

            list.push({ obsidian_link: obsidian_link, wiki_link: wiki_link })
        }

        return list
    }

    // ![ilse.png](ilse.png) -> ![[ilse.png]]
    wiki_links_2_obsidian_links( text ) {

        // let list = this.get_link_turple( text )
        let list = []

        for( let item of list ) {
            text = text.replace( item.wiki_link , item.obsidian_link )
        }

        return text
    }


    // ![[ilse.png]] -> ![ilse.png](ilse.png)
    obsidian_links_2_wiki_links( text ) {

        let list = this.get_link_turple_from_wiki_links( text )

        for( let item of list ) {
            text = text.replace( item.obsidian_link, item.wiki_link )
        }

        return text
    }

    load_css( url ) {

        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", url)

        if( typeof fileref != "undefined" )
            document.getElementsByTagName("head")[0].appendChild(fileref)
    }

    load_javascript( url ) {

        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", url)

        if( typeof fileref != "undefined" )
            document.getElementsByTagName("head")[0].appendChild(fileref)

    }

    // Zettel it
    file_2_binary( file ){
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve(reader.result)
            }
            reader.readAsBinaryString(file)
        })

    }

    file_2_buffer( file ){
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve(reader.result)
            }
            reader.readAsArrayBuffer( file )
        })

    }

    async file_2_base64( file ) {

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve(reader.result)
            }
            reader.readAsDataURL( file )
        })
    }

    base64_2_blob( base64, mime ) {
        mime = mime || '';
        var sliceSize = 1024;
        var byteChars = window.atob(base64);
        var byteArrays = [];

        for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
            var slice = byteChars.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);

            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);

        }

        return new Blob(byteArrays, {type: mime});
    }


    async get_tags_from_text( file ) {

        let content
        let extention = file.substr(file.lastIndexOf("."), file.length )

        // Exception | Performance - file
            // Non .md files
                if( extention !== ".md" )  return []

            // no files with '#' TEMP
                if( file.indexOf("#") === -1 ) return []

        try {
            content = await ilse.filesystem.file.get( file )
        } catch( e ) {
            printf( "e -> ", e )
            return []
        }

        // Exception | Performance - content
            // Empty File
                if( !content ) return []

            // BUGFIX: JSON
                if( typeof content.indexOf !== 'function' ) return []

            // no links
                if( content.indexOf("[[") === -1 ) return []


        let tags  = []
        let lines = content.split( "\n" )

        lines.map( line => {

            let words = line.split( " " )

            words.map( word => {

                if( word.indexOf( "#" ) === -1 ) return // no #
                if( word[1] === '#' ) return // ##
                if( word.length === 1 ) return // #

                // #tag # Head ## head
                if( word[0] === "#" && word[1] !== " " ) {
                    let _tag = word.replace( "#", "" )
                    tags.push( _tag )
                }
            })
        })

        return tags
    }

    async  get_links_from_text( file ) {

        let content
        let extention = file.substr(file.lastIndexOf("."), file.length )

        // Exception | Performance - file
            // Non .md files
                if( extention !== ".md" )  return []

            // no files with '#' TEMP
                if( file.indexOf("#") !== -1 ) return []

        try {
            content = await ilse.filesystem.file.get( file )
        } catch( e ) {
            printf( "e -> ", e )
            return []
        }

        // Exception | Performance - content
            // Empty File
                if( !content ) return []

            // BUGFIX: JSON
                if( typeof content.indexOf !== 'function' ) return []

            // no links
                if( content.indexOf("[[") === -1 ) return []

        let lines       = content.split( "\n" )
        let all_links   = []

        lines.map( line => {

            let links = line.split( "[[" )

            links.map( link => {

                // we have a liks
                if( link.indexOf( "]]" ) !== -1 ) {
                    let normalized_link = link.replace( "]]", "" )
                    all_links.push( normalized_link )
                }

            })

        })

        return all_links

    }

    truncate_text( text, limit = 10  ) {

        if( !text  ) throw new Error( "mixin: truncateText.js -> text is not defined"  );

        // if( text.length > limit  ) return text.substring( 0, 5  ) + "...";
        if( text.length > limit  ) return text.substring( 0, limit  ) + "...";

        return text;

    }

    get_normalized_fs_name( file ) {

        // let exists = ilse.utils._file_on_fs( file )

        if( ilse.graph.graph.getNode(file + ".md") ) {
            return file + ".md"

        }

        return file

    }

    is_file_on_fs( file ) {

        // CHANGE TO ilse.graph or nag?
        let index                       = ilse.graph.files.indexOf( file )

        if( index === -1 ) {
            return false
        } else {
            return true
        }

    }

    get_file_extention( file ) {

        if( file.indexOf(".") === -1 ) return null

        let extention      = file.substr(file.lastIndexOf("."), file.length )

        return extention
    }

    is_markdown( file ) {

        if( !file ) throw new Error( "Utils.js -> is_markdown(<file>) => <file> is not defined" )

        let extention       = file.substr(file.lastIndexOf("."), file.length )
        let is_markdown     = extention === '.md'
        return is_markdown
    }

    search( query = "", list = [] ) {


        let result    = []
        let has_match = false

        let index = 0
        for( const item of list ) {
            index++

            has_match = item.indexOf( query ) !== -1

            if( has_match ) result.push( item )

        }

        return result
    }

    fuzzy_search( search = "", list = []) {
        let search_results                  = fuzzy_sort.go( search, list )
        return search_results
    }

    get_uid() {
        var S4 = function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    get_rgb_from_string( str ) {
        var vals = str.substring(str.indexOf('(') +1, str.length -1).split(', ');
        return {
            'r': vals[0],
            'g': vals[1],
            'b': vals[2]
        }
    }

    random_rgba() {
        var o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
    }

    get_links_and_backlinks( file ) {

        let graph           = ilse.graph.graph

        let node            = graph.getNode( file )
            if( !node ) return { links: [], backlinks: [] }

        let links           = node.links || []

        let node_links      = []
        let node_backlinks  = []

        for( let link of links ) {

            if( link.fromId === file ) {
                node_links.push( link )
            } else {
                node_backlinks.push( link )
            }
        }

        return {
            links: node_links,
            backlinks: node_backlinks,
        }

    }

    get_human_readable_creation_date( id ) {
        if( !id ) return ""

        // BUGFIX: Normalize, if is child of another note remove the spaces
            id = id.trim()

        let year        = id.substr( 0, 4 )
        let month       = id.substr( 4, 2 )
        let day         = id.substr( 6, 2 )
        let hour        = id.substr( 8, 2 )
        let seconds     = id.substr( 10, 2 )

        let date_string = ilse.utils.convert_from_date_unique_id_to_daily_note_format( id)
            date_string     += `(${hour}:${seconds})`

        return date_string
    }

    get_selection() {

        if( window.getSelection ) {
            return window.getSelection().toString()
        }

        if( window.document.getSelection ) {
            return window.document.getSelection().toString()
        }

        if( window.document.selection ) {
            return window.document.selection.createRange().text
        }

        return "";
    }

    decode_base64_image( dataString ) {
        var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};
        if (matches.length !== 3) return new Error('Invalid input string');

        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');

        return response;
    }

    throttle( callback, limit ) {
        var waiting = false;                      // Initially, we're not waiting
        return function () {                      // We return a throttled function
            if (!waiting) {                       // If we're not waiting
                callback.apply(this, arguments);  // Execute users function
                waiting = true;                   // Prevent future invocations
                setTimeout(function () {          // After a period of time
                    waiting = false;              // And allow future invocations
                }, limit);
            }
        }
    }

}

