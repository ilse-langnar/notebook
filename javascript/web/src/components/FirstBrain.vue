<template lang="pug">
.first-brain
    .all
        .options( style="width: 20%; float: left;" )
            .item.flex( v-for="( option, index ) in options" :key="index" @click="selected = option.name" :style="get_option_style(option)" )
                img( :src="get_img(option.img)" )
                p( style="font-size: 0.7em; " ) &nbsp; &nbsp; {{option.name}} 
            
        .options-configuration( style="width: 80%; float: right;" )
            p.is-size-1( style="text-align: center;" ) {{selected}}

            .review( v-if="selected === 'Review' " )
                p( :title="get_first_brain_last_item_info()" ) {{get_first_brain_last_item_info()}}
                p LAST: {{get_first_brain_current_item()}}


                .centered.options
                    button.button.slick-button Easy
                    button.button.slick-button Good
                    button.button.slick-button Hard

            .search( v-if="selected === 'Search' " )

                img.is-pulled-left( src="@/assets/images/arrow-narrow-left.svg"   title="Previous"  @click="decrease_pointer()" style="cursor: pointer;" )
                img.is-pulled-right( src="@/assets/images/arrow-narrow-right.svg"  title="Next"     @click="increase_pointer()" style="cursor: pointer;" )

                br
                input.input.centered
                br

                p.centered {{pointer}} / {{chunks.length}}
                .loop( v-for="(chunk, index) in chunks[pointer]" :key="index" )
                    p {{chunk}} 


            .priority( v-if="selected === 'Priority' " )
                input.input
                .flex
                    p.fitem {{ilse.brains.first.queue.length}} Items
                    p.fitem {{get_tags().length}} Tags 
                    p.fitem {{items_with_tags}} Tagged
                    p.fitem {{Math.round(items_with_tags / ilse.brains.first.queue.length * 100)}}%

                br

                .loop.flex.is-pulled-left( v-for="( item, index ) in get_tags()" :key="index" )
                    p {{item}}({{get_tags(item).length}}) 
                    .arrows.is-pulled-right
                        img( src="@/assets/images/arrow-narrow-top.svg" style="width: 20px; cursor: pointer;" title="Increase Priority" )
                        img( src="@/assets/images/arrow-narrow-down.svg" style="width: 20px; cursor: pointer;" title="Decrease Priority" )


    // .centered.menu
        p.is-size-4 Review
        p.is-size-4 All
        p.is-size-4 Configuration

    // img.is-pulled-right( src="@/assets/images/trash.svg"     title="Toggle First Brain Tools"  @click="ilse.brains.first.remove()" )
    // br

    // .centered
        img( src="@/assets/images/minus.svg"     title="Toggle First Brain Tools"  @click="ilse.brains.first.decrease()" )
        img( src="@/assets/images/plus.svg"      title="Toggle First Brain Tools"  @click="ilse.brains.first.increase()" )
    // br

    // img( src="@/assets/images/lupe.svg"      title="Toggle First Brain Tools"  @click="ilse.brains.first.show_query( item => ilse.brains.first.read(item) )" accesskey="i" )
    // img( src="@/assets/images/hash.svg"      title="Toggle First Brain Tools"  @click="ilse.brains.first.tag()" accesskey="i" )
    // img( src="@/assets/images/settings.svg"  title="Toggle First Brain Tools"  @click="ilse.modals.open('first-brain-config')" accesskey="i" )

</template>
<script>
// eslint-disable-next-line
const printf                                        = console.log;

// Ilse
    import ilse             from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default {

    name: "FirstBrain",

    data() {
        return {
            ilse: ilse,

            pointer: 0,
            chunks: [],

            selected: "Review",
            cache: null,
            items_with_tags: 0,
            options: [
                { name: "Review", img: "settings.svg" },
                { name: "Priority", img: "vertical-list.svg" },
                { name: "Statistics", img: "report.svg" },
                { name: "Search", img: "lupe.svg" },
            ]
        }
    },

    methods: {

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
            if( this.cache ) {

                if( tag_name ) {
                    return this.cache[tag_name]
                } else {
                    let list   = Object.keys(this.cache)
                    let sorted = list.sort( (a,b) => {
                        return this.cache[b].length - this.cache[a].length
                    })
                    return sorted
                }

            }

            let queue = this.ilse.brains.first.queue
            let chunks, name, seen, interest, tags
            let obj  = []
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

            if( !this.cache ) this.cache = obj

            // TODO: REMOVE: IMPURE: 
            this.items_with_tags = items_with_tags

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


        // ---------------------------------- Setup -------------------------- //
        setup() {


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

</style>
