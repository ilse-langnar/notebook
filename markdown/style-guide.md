
# Style guide

This is a guide on how to write standardized code/file/names for ilse langnat's notebook

## No all uppercase letters like 
LICENCE, README.md

> USE: Instead use licence, readme.md

## The root folder should contain one readme.md + all the folders for development, anything related to th project like guides, design etc should be included inside of project/

## While on the root folder you should only add something if it's a client/server, everything else should be hanlded inside of those folders
As an example, the desktop build is just a web build that we bundle into a dist/ and then copy it to the desktop/ dir where we have a electron environment setup.

## Naming Convention
In ilse we use variables_like_this and not variablesLikeThis, so don't use camelCase for thing ilse related variables, this also helps distinguish when you're calling a library method since javascript normally uses camelCase.

## File naming convention

### Avoid
`dont_do_this`

### Use
`do-this-instead`

## Avoid naming things twice like 

### Avoid
`link.scanLink()`

### Use
`link.can()`

## Avoid using console.log define a printf and use it

## Avoid
```javascript
console.log( "Something" )
```

## Use
```javascript
const printf = console.log
printf( "Something" )
```

## I usually don't use semicolos, so if you want to add them that's ok

## Avoid double negatives
Double negatives is when you negate something like 'has not links' it makes the code harder to read

### Avoid

```javascript
const has_not_scanned_links = true
```

```javascript
const has_no_bugs = true
```

### Use

```javascript
const has_scanned_links = true
```

```javascript
const has_bugs = true
// or
const has_exceptions = true
if( !has_bugs ) {
    // ...
}
```

## Avoid using `for`, `while` loops and `map` use `for of` when possible
This standardizes when we need looping, and avoid certain people using `map/forEach` and others `for( let i )` etc

### Avoid

```javascript
const links = []
const len   = links.length

for( let i = 0; i < len; i++ ) {
    printf( "Bla" )
}
```

```javascript
const links = []

links.map( link => {
    printf( "link -> ", link )
})
```

### Use

```javascript
const links = []
for( const link of links ) {
    printf( "link -> ", link )
}
// if you need an index and don't want to use a counter use:

for( const [index, link] of links.entries() ) {
printf( "link -> ", link )
printf( "index -> ", index )
}
```

## If a function takes more than 2 aguments( 3, 4, 5 etc ), use the object destructing syntax 

### Avoid

```javascript
function scan_link( text, regexp, depth, options ) {
    /// Bla
}
scan_link( "Example", /^\[\[\*.\]\]$/, 1, {})
```


### Use
```javascript
function scan_link({ text, regexp, depth, options }) {
    /// Bla
}

scan_link({
    text: "Example",
    regexp: /^\[\[\*.\]\]$/,
    depth: 1,
    options: {}
})
```


## If you're using Vue.js as a view layer and need to initialize some state or call a listener function make use of `setup()` function and call it when mouted
This is standard in this codebase that when we need to initizlize things in a .vue file we call `setup()` when mounted and `setup()` will initialize the component, usually with things like listeners, initializing classes etc.
```vue
export default {

    data() {
        return {
        }
    },

    methods: {

        listen() {

            Messager.on( 'outline.vue', ( action, payload ) => {
                if( action === 'update' ) {
                    this.$forceUpdate()
                }

            })

        },

        setup() {
            this.listen()
        },

    },

    mounted() {
        this.setup()
    }

}
```

## Communicating between different parts
if you're on a `box` and you want to communicate with the `outline` layout how would you do it?

### Use Messager
Messager is a way of communicating between `.vue`, `.js`, `.ts` parts of this app. a simple way of sending something to a box is to do `Messager.emit("box", "update", {})` when the name has no extention it means `.js` when there's a `~` in front of the name, it means its broadcasting something to someone else to lise so `~box` is box emitting something it wants anyone to capture and do something about it( e.g `~box` emits a 'created' action and a payload of the newly created box )

### Messager Format
A message as a target, action and payload, where the target and the actions are mandatory the payload is optional.

