![](https://badgen.net/badge/Editor.js/v2.0/blue)

# Github Gist Plugin for Editor.js

A plugin to add Github Gists to [Editor.js](https://editorjs.io).  
Demo: [https://editor.js-github-gist-plugin.github.io](https://editor.js-github-gist-plugin.github.io)

## Screenshot

![Github Gist Plugin](https://i.ibb.co/pyPLWWT/github-gist-plugin.png)

## Features

- Add Gists by pasting its URL.
- Add an optional Caption explaining the Gist.
- Specify the height of the added Gist.
- A preview of the uploaded Gist will be presented.

## Installation

### Install via NPM
Get the package

```shell
npm i editorjs-github-gist-plugin
```

Include module at your application

```javascript
import Gist from 'editorjs-github-gist-plugin';
```

### Other methods

#### Manual downloading and connecting

1. Download folder `dist` from repository
2. Add `dist` folder to your page.
3. Import `main.js` file inside the `dist` folder.

## Usage

Add the plugin to the `tools` property of the Editor.js initial config as a new tool.

```javascript
import Gist from 'editorjs-github-gist-plugin';

var editor = EditorJS({
  ...

  tools: {
    ...
    gist: Gist
  }

  ...
});
```

## Output data

This Plugin/Tool returns `data` with following format:

| Field | Type     | Description        |
| ----- | -------- | ------------------ |
| url | `string` | URL of the Github Gist added |
| caption | `string` | Caption for the Gist |
| height | `number` | The fixed height of the Gist |

Example:

```json
{
    "type": "gist",
    "data": {
        "url": "https://gist.github.com/AdeilsonESilva/7ddb4c0f156f20d2642d0414777cff85.js",
        "caption": "Get items in array.",
        "height": "450"
    }
}
```

## Preview

The preview in the block is shown using an `iframe` tag in which the link to the Github Gist is provided as `srcdoc` property.  
This way of adding scripts can be helpful for some environments or frameworks in which adding a direct script tag is not permitted or throws an error for example, Vue.js.  

The code below is how a Github Gist is embedded in `iframe` element which can be helpful if one wants to use the gists same way.

```javascript
const iframe = document.createElement('iframe');
/**
 * Adds the gist as  a srcdoc.
 */
iframe.srcdoc = `<script src="${url}"></script>`;

/**
* Removes the borders of the inline-frame
*/
iframe.frameBorder = 0;

iframe.addEventListener('load', function () {
    /**
     * Set the height of the inline frame equal to the height of the Gist.
     */
    this.style.height = this.contentWindow.document.body.scrollHeight + 16 + 'px';

    /**
     * Makes all the links in the inline-frame on click, to open in a new tab of the browser 
     * rather than inside the inline-frame itself.
    */
    const links = this.contentWindow.document.getElementsByTagName('a');

    for (let i = 0; i < links.length; i++) {
        links[i].setAttribute('target', '_blank');
    }
});
```