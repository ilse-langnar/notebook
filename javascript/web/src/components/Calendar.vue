<template lang="pug" >
.calendar
    p calendar
    p Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    // table
        tr
            td( v-for="( item, index ) in ilse.utilse.get_numer_of_days_in_month()" )


    table
        div(v-html="get_items()" )
    table
        tr
            th S
            th M
            th T
            th W
            th T
            th F
            th S
        th
            td  LLL
            td  LLL
            td  LLL
            td  LLL
            td  LLL
            td  LLL
                 
</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Components 
    import Note                         from "@/components/Note.vue"

export default {

    name: "Celandar",

    data() {
        return {
            ilse: ilse,
        }
    },

    components: {
        Note,
    },

    props: {
        component: { type: Object, required: false },
    },

    methods: {

        get_items() {
            var htmlstring = "";
            for (var i = 1; i <= 5; i++) {
                //open tr tag
                htmlstring += "<tr>";
                for (var i = 1; i <= 30; i++) {
                    var days = "<td>" + i + "</td>";
                    //print 1 to 31 with td tag
                    htmlstring += days;
                    //if i divide by 7 and remainder is 0
                    if (i % 7 == 0 || i == 31) {
                        htmlstring += "</tr>";
                        htmlstring += "<tr>";

                    }
                }
                htmlstring += "</tr>";
            }

            return htmlstring
        },

        setup() {
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped>

</style>
