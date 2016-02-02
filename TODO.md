This is a React application. Install dependencies with `npm install` and run the Webpack webserver.

```
webpack-dev-server --inline
```

This is a demo.
---

Here are some things that are missing to productize it.

* The demo hijacks Chrome's native drag and drop to get text
  positioning in `contentEditable` elements. To get proper cross-client drag and drop behavior, you'll need to implement HTML5 drag and drop event handling and have custom caret positioning logic.
  
  [This Stack Overflow thread](http://stackoverflow.com/questions/14678451/precise-drag-and-drop-within-a-contenteditable) is a good starting point.
  
* [jQuery.floatThead](http://mkoryak.github.io/floatThead/) (sticky table headers) manipulates the DOM directly, which causes erratic behavior. Comment out the contents of `enable_sticky_header()` in [`app/compose/datatable.js`](app/compose/datatable.js) to get rid of most UI glitches. If you plan on sticking to React, you'll need custom Virtual DOM-based sticky header logic to get good behavior.

* More generally, React doesn't interact well with `contentEditable` elements.

* There's currently no way to delete rows and empty cells aren't handled well.

* There isn't much design around rich text formatting, particularly regarding dynamic data as links or as the source of images.

* There's no backend nor any support for server-side data processing.
