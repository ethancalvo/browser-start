const fs = require("fs");
const path = require("path");
const parseDoc = require("./html-to-json");
const eleventy = require("@11ty/eleventy");

async function build() {
  let bld = new eleventy();
  await bld.init();
  await bld.write();
}

let BookMarksSource = "./from-safari/Safari Bookmarks.html";
if (process.env.mode && process.env.mode == "TEST") {
  BookMarksSource = "./test/Safari Bookmarks.html";
}

let bmString = JSON.stringify(parseDoc(BookMarksSource));

fs.writeFileSync(
  path.resolve(__dirname, "src/_data/bookmarks.json"),
  bmString,
  "utf8"
);

build().then(() => {
  fs.unlinkSync(path.resolve(__dirname, BookMarksSource));
});
