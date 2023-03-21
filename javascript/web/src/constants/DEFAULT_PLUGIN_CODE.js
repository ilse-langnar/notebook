
export default `<div>
    <h1> This is a tutorial Plugin !! </h1>
    <h2> Getting Started </h2>
    <h3> Anything you want to do in ilse can be done via HTML and the global 'api' API. </h3>

    <h2> Loops </h2>
    <h3> You can use <strong> &lt;template x-for="( item, index ) in [1,2,3,4,5]" :key="index" &gt; &lt;\/template&gt; </strong> in order to create lists of HTML values. </h3>
    <h3> You can only have ONE ROOT element for each &lt;template&gt; if you have 2 then only the <strong> first one will be rendered. </strong> </h3>
    <strong> &lt;template x-for="( item, index ) in [1,2,3,4,5]"&gt; &lt;\/template&gt; </strong>
    <template x-for="( item, index ) in [1,2,3,4,5,6,7,8,9]" :key="index" >
        <div>
            <p x-text="item" > </p>
        </div>
    </template>

</div>`
