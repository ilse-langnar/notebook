<template lang="pug">
.first-brain
    .all
        .options( style="width: 20%; float: left;" )
            .item.flex( v-for="( option, index ) in options" :key="index" @click="selected = option.name" :style="get_option_style(option)" )
                img( :src="get_img(option.img)" )
                p( style="font-size: 0.7em; " ) &nbsp; &nbsp; {{ $t(option.name) }} 
            
        .options-configuration( style="width: 80%; float: right;" )
            p.is-size-1( style="text-align: center;" ) {{ $t(selected) }}

            .review( v-if="selected === 'Review' " )
                p( :title="get_first_brain_current_item()" ) {{get_first_brain_current_item()}}


                .centered.options
                    button.button.slick-button Easy
                    button.button.slick-button Good
                    button.button.slick-button Hard

            .search( v-if="selected === 'Search' " )

                img.is-pulled-left( src="@/assets/images/arrow-narrow-left.svg"   :title="$t('previous')"  @click="decrease_pointer()" style="cursor: pointer;" )
                img.is-pulled-right( src="@/assets/images/arrow-narrow-right.svg"  :title="$t('next')"     @click="increase_pointer()" style="cursor: pointer;" )

                br
                input.input.centered
                br

                p.centered {{pointer}} / {{chunks.length}}
                .loop( v-for="(chunk, index) in chunks[pointer]" :key="index" )
                    p {{chunk}} 



            // .priority( v-if="selected === 'Tags' " )

                .flex
                    input.input
                    img( :src=" priority_mode === 'table' ? require('@/assets/images/columns.svg') : require('@/assets/images/list-details.svg') " style="cursor: pointer;" @click="toggle_priority_mode()" title="$t('toggle_display_mode')" )

                br

                .flex
                    p.fitem {{ilse.brains.first.queue.length}} Items
                    p.fitem {{get_tags().length}} Tags 
                    p.fitem {{items_with_tags}} Tagged
                    p.fitem {{Math.round(items_with_tags / ilse.brains.first.queue.length * 100)}}%

                br

                table( v-if="priority_mode === 'table'" )
                    tr
                        th Tag 
                        th Items 
                        th Priority 
                    tr( v-for="( item, index ) in get_tags() " :key="index" )
                        td {{item}}
                        td {{get_tags(item).length}}
                        td 
                            input.input( v-model.number="ilse.brains.first.priorities.priorities[item]" type="number"  style="width: 55px; " @change="on_priority_change" )

                .loop.flex.is-pulled-left( v-if="priority_mode === 'compressed' " v-for="( item, index ) in get_tags()" :key="index" )
                    p( :title="$t('total') + get_tags(item).length" ) {{item}} 
                    input.input( v-model.number="ilse.brains.first.priorities.priorities[item]" type="number"  style="width: 55px; " @change="on_priority_change" )

            .knowledge-tree( v-if="selected === 'Knowledge Tree' " )
                KnowledgeTree 


            .global-statistics( v-if="selected === 'Global Statistics' " )
                p Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

            .daily-statistics( v-if="selected === 'Daily Statistics' " )

                img.is-pulled-left( src="@/assets/images/arrow-narrow-left.svg"   @click="decrease_left_arrow()" )
                img.is-pulled-right( src="@/assets/images/arrow-narrow-right.svg" @click="increase_right_arrow()" )
                br

                .loop( v-if="list[index] && get_pretty_date(daily_statistics_days[0]) === get_pretty_date(list[index].id) " v-for="( list, index ) in Object.values(get_cubes())" :key="index" )
                    h1.is-size-1.centered {{get_pretty_date(Object.keys(get_cubes())[index])}}

                    table.table
                        tr
                            th Total
                            th Tags
                            th Time Record
                            th Total Time
                        tr
                            td.is-size-7 {{list.length}}
                            .loop( v-for="( item, item_index ) in get_most_common_tag(list)" :key="'ll' + item_index" )
                                p {{get_most_common_tag(list)[item_index][0]}}  {{get_most_common_tag(list)[item_index].length}}  
                            // td.is-size-7
                                p {{ilse.utils.truncate_text(get_most_time(list).item, 30)}} ({{Math.round(get_most_time(list).time / 30)}})
                            td.is-size-7
                                p Time Record
                            td.is-size-7
                                p {{get_total_time(list) || "No Total Time"}}

                    table.table
                        tr
                            th Name
                            th Time
                            th Seen
                            th Interest
                            th Tags
                        tr( v-for="( cube, index ) in list" :key="index" )
                            // td.is-size-7( :title="cube.item" ) {{ilse.utils.truncate_text(cube.item, 30)}}
                            // td.is-size-7( :title="cube.time + 'sec'" ) {{Math.round(cube.time / 60)}} min
                            td.is-size-7 {{cube.item}}
                            td.is-size-7( :title="cube.time / 60 + 'min'" ) {{cube.time}}sec
                            td.is-size-7 {{cube.seen}}
                            td.is-size-7 {{cube.interest}}
                            td.is-size-7 {{cube.tags}}

                    .space
                     

            .videos( v-if="selected === 'Videos' " )
                .loop( v-for="( item, index ) in ilse.brains.first.queue" :key="index" )
                    .video( v-if="item.indexOf('mp4') !== -1" )
                        // p {{item}} 
                        // p {{'atom://first/' + item.split('/')[0]}}
                        p {{resolve_item_path(item)}}
                        // video.video( v-if="index % 2 === 0" :src="resolve_item_path(item)" style="width: 100px; height: 100px;" )

            .images( v-if="selected === 'Images' " )
                .loop( v-for="( item, index ) in ilse.brains.first.queue" :key="index" )
                    .image( v-if="item.indexOf('png') !== -1 || item.indexOf('jpg') !== -1 || item.indexOf('jpeg') !== -1|| item.indexOf('gif') !== -1" )
                        p {{item.split("/")[0]}}
                        img.is-pulled-left( :src="resolve_item_path(item)" )
                        .space

            .address-book( v-if="selected === 'Library' " )
                p.centered Total: {{get_books_and_articles().length}} {{Math.round( get_books_and_articles().length / ilse.brains.first.queue.length * 100 )}}%
                .loop( v-for="(book, index) in get_books_and_articles()" :key="index" )
                    details
                        summary {{book}}
                        .extracts( v-for="( extract, extract_index ) in ilse.brains.first.query(book.split('/')[0])" :key=" 'extracts-' + extract_index" )

            .how-does-it-work( v-if="selected === 'How does it work' " )
                p In order to this to work properly, you need a script to open the files natively.
                a( href="windows" ) Windows
                a( href="Linux" ) Linux
                a( href="MacOS" ) MacOS
</template>
<script>
// eslint-disable-next-line
const printf                                        = console.log;

// Ilse
    import ilse             from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Import
    import VuejsHeatmap     from 'vuejs-heatmap'
    import KnowledgeTree    from "@/components/KnowledgeTree.vue"
    

export default {

    name: "FirstBrain",

    components: {
        VuejsHeatmap,
        KnowledgeTree,
    },

    data() {
        return {
            ilse: ilse,

            // daily_statistics_selected_date: ilse.utils.get_unique_date_id(),
            daily_statistics_days: [],

            priority_mode: "table", // compressed and table
            can_save_priority: true,

            pointer: 0,
            chunks: [],

            selected: "Review",

            caches: {
                cubes: null,
                tags: null,
                library: null,
            },

            items_with_tags: 0,
            options: [
                { name: "Review", img: "settings.svg" },
                { name: "Daily Statistics", img: "report.svg" },
                // { name: "Tags", img: "tag.svg" },
                { name: "Knowledge Tree", img: "tree.svg" },
                { name: "Search", img: "lupe.svg" },
                { name: "Library", img: "address-book.svg" },
                { name: "Videos", img: "video.svg" },
                { name: "Images", img: "photo.svg" },
                { name: "Global Statistics", img: "report.svg" },
                { name: "How does it work", img: "question-mark.svg" },
            ]
        }
    },

    methods: {

        get_books_and_articles() {

            // FEATURE: Cache/Speech, use cache is available
            if( this.caches.library ) return this.caches.library

            let list       = Array.from(this.ilse.brains.first.queue)
            let library     = []

            let is_book, is_pdf

            list.map( item => {

                is_book = item[0].match("[0-9]") === null
                is_pdf  = item.indexOf('pdf') !== -1 

                if( is_book && is_pdf ) {
                    library.push( item )
                }

            })

            // FEATURE: Cache/Speed, set it
            if( !this.caches.library ) this.caches.library = library

            return library
        },

        get_books_and_articles() {

            // FEATURE: Cache/Speech, use cache is available
            if( this.caches.library ) return this.caches.library

            let list       = Array.from(this.ilse.brains.first.queue)
            let library     = []

            let is_book, is_pdf

            list.map( item => {

                is_book = item[0].match("[0-9]") === null
                is_pdf  = item.indexOf('pdf') !== -1 

                if( is_book && is_pdf ) {
                    library.push( item )
                }

            })

            // FEATURE: Cache/Speed, set it
            if( !this.caches.library ) this.caches.library = library

            return library
        },

        decrease_left_arrow() {
            printf( "this.daily_statistics_days -> ", this.daily_statistics_days )
            let day = this.daily_statistics_days.shift()
                this.daily_statistics_days.push( day )
        },

        increase_right_arrow() {
            let day = this.daily_statistics_days.pop()
                this.daily_statistics_days.push( day )
        },

        resolve_item_path( item ) {
            let target_dir  = ilse.target_directories[0]
            item            = item.split( "/" )[0]
            return `atom://${target_dir}/first/${item}`
        },

        get_total_time( list ) {
            printf( "get_total_time -> list" )

            let total_time  = 0
            list.map( item => {
                total_time  += item.time
            })
            printf( "get_total_time -> total_time -> list ", list )

            total_time = total_time / 60 // min
            total_time = total_time / 60 // hours
            total_time = Math.round( total_time ) // round
            printf( "get_total_time -> total_time ", total_time )
            let to_return = `${total_time} hours`
            printf( "get_total_time -> to_return -> ", to_return )

            return to_return
        },

        get_most_time( list ) {

            let time_list   = []
            list.map( item => {
                time_list.push({time: item.time, item: item.item })
            })

            let sorted_time = time_list.sort( (a,b) => {
                return b.time - a.time
            })
            let most_time   = sorted_time[0]

            return most_time
        },

        get_most_common_tag( list ) {

            let tags = {}
            let has_tags, tag, has_multiple, multiple

            list.map( item => {

                has_tags     = item.tags
                    if( !has_tags ) return

                has_multiple = item.tags.indexOf(",") !== -1

                if( !has_tags ) return

                if( has_tags && has_multiple ) {
                    multiple = item.tags.split(',') 

                    multiple.map( m_item => {

                        if( !tags[tag] ) {
                            tags[tag] = []
                            tags[tag].push( tag )
                        } else {
                            tags[tag].push( tag )
                        }

                    })

                }

                if( has_tags && !has_multiple ) {
                    tag      = item.tags

                    if( !tags[tag] ) {
                        tags[tag] = []
                        tags[tag].push( tag )
                    } else {
                        tags[tag].push( tag )
                    }
                }

            })

            let values        = Object.values( tags )
            let sorted_values = values.sort( (a,b) => {
                return b.length - a.length
            })

            return sorted_values

        },

        get_pretty_date( date ) {
            // 20210411 -> January 2th, 2021
            let pretty_date = ilse.utils.convert_from_date_unique_id_to_daily_note_format( date )
            return pretty_date
        },

        toggle_priority_mode() {

            if( this.priority_mode === 'table' ) {
                this.priority_mode = "compressed"
            } else {
                this.priority_mode = "table"
            }

        },

        on_priority_change() {

            printf( "this.can_save_priority -> ", this.can_save_priority )
            if( this.can_save_priority ) {
                this.can_save_priority = false
                ilse.brains.first.priorities.save()
                setTimeout( () => { this.can_save_priority = true }, 1000 )
            }
            
        },

        get_item_priority( item ) {
            return ilse.brains.first.priorities.priorities[item]
        },

        increase_priority( item ) {
            ilse.brains.first.priorities.priorities[item]++
            // ilse.brains.first.priorities.save()
        },

        decrease_priority( item ) {
            ilse.brains.first.priorities.priorities[item]--
            // ilse.brains.first.priorities.save()
        },

        get_cubes() {

            // Check Cache
            if( this.caches.cubes ) return this.caches.cubes

            var today           = new Date()
            let day             = today.getDate()
            let month           = today.getMonth()
            let year            = today.getFullYear()
            let number_of_days  = ilse.utils.get_numer_of_days_in_month( month, year )
            let flexible
            let current = new Date(year, month, 1)

            let obj = {}
            ilse.brains.first.statistics.statistics.map( item => {

                if( item.operation === "write" ) return
                if( item.operation === "delete" ) return

                year  = item.id.substr( 0, 4 )
                month = item.id.substr( 4, 2 )
                day   = item.id.substr( 6, 2 )

                if( !obj[`${year}${month}${day}`] ) {
                    obj[`${year}${month}${day}`] = []
                    obj[`${year}${month}${day}`].push( item )
                } else {
                    obj[`${year}${month}${day}`].push( item )
                }

            })

            // Cache
            this.caches.cubes = obj

            return obj

            // this.cubes = obj
        },

        increase_pointer() {
            if( this.pointer >= this.chunks.length ) return
            this.pointer++
        },

        decrease_pointer() {
            if( this.pointer === 0 ) return
            this.pointer--
        },

        get_tags( tag_name ) {

            // FEATURE: CACHE
            if( this.caches.tags ) {

                if( tag_name ) {
                    return this.caches.tags[tag_name]
                } else {
                    let list   = Object.keys( this.caches.tags )
                    let sorted = list.sort( (a,b) => {
                        return this.caches.tags[b].length - this.caches.tags[a].length
                    })
                    return sorted
                }

            }

            let queue       = this.ilse.brains.first.queue
            let chunks, name, seen, interest, tags
            let obj         = []
            let items_with_tags = 0

            for( const item of queue ) {
                chunks      = item.split( "/" )
                name        = chunks[0]
                seen        = chunks[1]
                interest    = chunks[2]
                    interest    = Number( interest )
                tags      = chunks[3]

                if( !tags ) continue
                if( !tags[0] ) continue
                if( tags[0] !== "#" ) continue
                items_with_tags++

                let has_multiple =  tags.indexOf(",") !== -1
                if( has_multiple ) {

                    for( const chunk of tags.split(",") ) {
                        if( !obj[chunk] ) obj[chunk] = []
                        obj[chunk].push( item )
                    }

                } else {
                    if( !obj[tags] ) obj[tags] = []
                    obj[tags].push(item)
                }
            }

            if( !this.caches.tags ) this.caches.tags = obj

            // TODO: REMOVE: IMPURE: 
            this.items_with_tags = items_with_tags

            // printf( "tag_name -> ", tag_name )
            // printf( "obj -> ", obj )
            // printf( "obj[tag_name] -> ", obj[tag_name] )

            if( tag_name ) {
                return obj[tag_name]
            } else {
                let list   = Object.keys(obj)
                let sorted = list.sort( (a,b) => {
                    return obj[b].length - obj[a].length
                })
                return sorted
            }
        },

        get_img( img ) {
            let result = require(`@/assets/images/${img}`)
            return result
        },

        get_option_style( option ) {
            let style       = ""
            let is_selected = option.name === this.selected
            if( is_selected ) return "border: 1px solid var( --text-color ) !important; border-radius: var( --border-radius ); padding: 1px;"
            return ""
        },


        get_first_brain_current_item() {

            let last   = this.ilse.brains.first.get_last()
                if( !last ) return "You have 0 items on queue"

            let chunks = last.split("/")
                let name     = chunks[0]
                let interest = chunks[1]
                let topics   = chunks[2]

            return name
        },


        get_first_brain_last_item_info() {

            let last   = this.ilse.brains.first.get_last()
                if( !last ) return "You have 0 items on queue"

            let chunks = last.split("/")
                let name     = chunks[0]
                let interest = chunks[1]
                let topics   = chunks[2]

            let info   = `${name} ${interest} ${topics}`

            return info
        },

        set_daily_statistics() {

            this.daily_statistics_days.push( ilse.utils.get_unique_date_id() )

            let keys = Object.keys( this.get_cubes() )

            keys = keys.sort( (a,b) => {
                return Number(b) - Number(a)
            })
            printf( "keys -> ", keys )

            keys.map( key => { this.daily_statistics_days.push( key ) })
        },

        // ---------------------------------- Setup -------------------------- //
        setup() {
            setTimeout( () => { this.set_daily_statistics() })

            let queue       = Array.from(this.ilse.brains.first.queue)
            let chunks      = this.ilse.utils.split_array_into_nth_legnth( queue, 100 )
                this.chunks     = chunks
        },
        // ---------------------------------- Setup -------------------------- //

    },

    mounted() {
        this.setup();
    },

}
</script>
<style scoped>

.item {
    margin-bottom: 20px;
}

.item:hover {
    border-bottom: 1px solid gray;
    border-radius: 2px;
}

.first-brain .options {
    width: 70%;
}

.first-brain .options .button {
    margin-left: 10px;
}

.priority .loop {
    border: 1px solid #000;
    padding: 2px;
    border-radius: 4px;
    margin-bottom: 2px;
    margin-left: 4px;
}

.centered {
    display: block;
    margin: 0 auto;
}

.priority .input {
    display: block;
    margin: 0 auto;
}

.priority .centered {
    display: block;
    margin: 0 auto;
}

.priority .fitem {
    margin: 0 auto;
}


.loop .input {
    border: 1px solid var( --background-color );
}

.priorities table {
    border: 1px solid #000;
    margin: 0 auto;
}

table  {
    width: 100%;

}
table tr th  {
    padding: 10px;
}

.cube p.cube {
    border: 1px solid var( --text-color );
    width: 12px;
    height: 12px;
    overflow: hidden;
    float: left;
    margin-left: 2px;
    margin-bottom: 2px;
    cursor: pointer;
    border-radius: var( --border-radius );
}

.space {
    height: 40px;
    clear: both;
}

table tr, th, td, td .loop {
    padding: 15px;
    text-align: left;
    border: 1px solid var( --text-color );
    border-radius: var( --border-radius );
    color: var( --text-color ) !important;
}


.statistics {
    overflow: hidden;
}

.images .loop .image {
    border-radius: var( --border-radius );
}

</style>
