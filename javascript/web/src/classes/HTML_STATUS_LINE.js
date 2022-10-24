import printf                           from "@/classes/printf.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// functions
    import clean_list                           from "@/classes/clean_list.js"
    import set                                  from "@/classes/set.js"
    import push                                 from "@/classes/push.js"
    import debounce                             from "@/classes/debounce.js"
    import delay                                from "@/classes/delay.js"
    import split_array_into_nth_chunks          from "@/classes/split_array_into_nth_chunks.js"
    import get_key_children                     from "@/classes/get_key_children.js"
    import same                                 from "@/classes/same.js"
    import and                                  from "@/classes/and.js"
    import if_else                              from "@/classes/if_else.js"
    import get_last_command                     from "@/classes/get_last_command.js"
    import last_item                            from "@/classes/last_item.js"
    import remove_text                          from "@/classes/remove_text.js"
    import first_letter                         from "@/classes/first_letter.js"
    import trim                                 from "@/classes/trim.js"
    import map                                  from "@/classes/map.js"
    import shift_nth_times                      from "@/classes/shift_nth_times.js"
    import send_message                         from "@/classes/send_message.js"

Messager.on( "~commands", (action, payload) => {

    if_else(
        same(action, "exec"),
        yes => {
            debounce( () => { send_message( "~status-line", "shrink" ) }, {}, ilse.keys, 10 )
            // setTimeout( () => { Messager.emit( "~status-line", 'shrink' ) }, 801 )
        },
    )

})

Messager.on( "~keyboard", payload => {

    if_else(
        and(
            same(payload.action, "keydown"),
            same(payload.key,    "esc"),
        ),
        yes => {
            Messager.emit( "~status-line", 'shrink' )
        }
    )

    if_else(
        and(
            same(payload.action, "keydown"),
            same(payload.key,     "C-SPC")
        ),
        yes => {
            debounce( () => {
                Messager.emit( "~status-line", 'expand' )
            }, {}, ilse.keys, 800 )
        }

    )

})


export default `
<style>

.status-line {
    z-index: 2;
}

.status-line .flexi {
    margin: auto;
    display: block;
    margin: 0 auto;
    text-align: center;
}

.which-key .key {
    width: 15%;
    height: 25px;
    overflow: hidden;
    margin-left: 5px;
    margin-bottom: 5px;
    background: var( --background-color );
    color: var( --text-color );
    cursor: pointer;
}

.which-key .key:hover {
    background: var( --text-color );
    color: var( --background-color );
}

.key .combo  {
    color: var( --link-color );
}

.key .arrow  {
    color: var( --terciary-text-color );
    margin-left: 2px;
    margin-right: 2px;
}

.key .command  {
    color: var( --tertiary-text-color );
}

.status-line {
    position: fixed;
    bottom: 0px;
    width: 100%;
    background: var( --background-color );
    z-index: 0;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    box-shadow: 0 0 2px 0 #555;
    height: 25px;
}

</style>
<div class="status-line" :style=" 'height:' + height + 'px;' + ( height === 25 ? 'overflow: hidden;' : 'overflow: auto;' )" x-init="window.Messager.on('~status-line', command => { console.log(' command -> ', command); if( command === 'expand' ) { height = 300 }; if( command === 'shrink' ) { height = 25}; }) " x-data="{ height: 25, }" >

    <div class="flex" >
        <!-- <p class="flexi" x-text="window.ilse.commands.history[window.ilse.commands.history.length - 1]" > </p> -->
        <p class="flexi" > First </p>
        <p class="flexi" > Second </p>
        <p class="flexi" > Third </p>
    </div>

    <div class="which-key" >

        <template x-if="height === 300" >

            <template x-for="(item, index) in window.ilse.keys" @click="console.log('item -> ', item)" >
                <div class="key is-pulled-left" style="margin: 5px; " @click="ilse.commands.run(item.command)" >
                    <span class="combo" x-text="item.combo.replace('ctrl+space', '')" > </span>
                    <span class="arrow" > &rarr; </span>
                    <span class="command" x-text="item.command" > </span>
                </div>
            </template>

        </template>
    </div>

</div> `
