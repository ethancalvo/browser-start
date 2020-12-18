const parseDoc = require("../html-to-json");
console.log("beginning html-to-json test");
let bookmarks = parseDoc();
console.log(JSON.stringify(bookmarks, null, 4));
