
export default `
:root, .ilse[data-theme='light'] {

    --background-color: #EFEFEF;
        --background-color: #eee;
        --background-color: #e6e6e6;
        --background-color: #edfffc;
        --background-color: #e6e6e6;
        --background-color: #efefef;

    --secondary-background-color: #CED8E0;
        --secondary-background-color:  #eef5f5;

    --terciary-background-color: #E8E8E8;

    --text-color: #717171;
    --secondary-text-color: #3c3b3b;
    --terciary-text-color: #8D9EAC;

    --border: 1px solid #4a4a4a;
    --border-radius: 6px;

    --padding: 4px;

    --font-family: Mary, Helvetica, Georgia, Times New Roman, serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    --font-size: 1em;

    --link-color: #5ec7b8;
    --secondary-link-color: #70a7a8;
}

.ilse[data-theme="dark"] {

    --background-color: #131313ff;

    --secondary-background-color: #DCEAF8;
        --secondary-background-color: #000;

    --terciary-background-color: #5a6269;

    --text-color: #F8F8F8;
    --secondary-text-color: #E8E8E8;
    --terciary-text-color: #8D9EAC;

    --border: 2px solid #777;
    --border-radius: 6px;

    --padding: 4px;

    --font-family: Mary, Helvetica, Georgia, Times New Roman, serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    --font-size: 1em;

    --box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    --link-color: #5ec7b8;
    --secondary-link-color: #99c6c2;
}

.note-embed {
    background: var( --terciary-background-color  );
    margin-left: 13px;
    padding: 20px;
    border-radius: 10px;
}
`