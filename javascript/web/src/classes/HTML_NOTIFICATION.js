export default `
<div style=" border-radius: var( --border-radius ); display: inline; position: absolute; right: 10px; bottom: 40px; padding: 1rem; background: var( --background-color ); color: var( --text-color ); box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px !important; max-width: 70vw; " >

    <img class="is-pulled-right" style="width: 20px; cursor: pointer;" onclick="ilse.htmls.list.shift()" :src="window.ilse.require('x.svg')" />
    <br/>
    <h2 class="centered" > $title </h2>
    <p class="centered" > $description </p>

</div>
`
