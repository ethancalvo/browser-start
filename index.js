const fs = require("fs");
const path = require("path");
const parseDoc = require("./html-to-json");
const exec = require("child_process").exec;

let BookMarksSource = "./from-safari/Safari Bookmarks.html";
if (process.env.mode && process.env.mode == "TEST") {
  BookMarksSource = "./test/Safari Bookmarks.html";
}

let bmString = JSON.stringify(parseDoc(BookMarksSource));

// let jsSource = path.resolve(__dirname, "src/_includes/index.js");
// let jsString = fs.readFileSync(jsSource, "utf8");

// jsString = `const bookMarks = ${bmString}; ${jsString}`;

// let htmlIndexSource = path.resolve(__dirname, "src/index.html");
// let htmlIndexString = fs.readFileSync(htmlIndexSource, "utf8");

// htmlIndexString = htmlIndexString.replace(
//   "</html>",
//   `<script>${jsString}</script></html>`
// );
// fs.writeFileSync(
//   path.resolve(__dirname, "public/index.html"),
//   htmlIndexString,
//   "utf8"
// );

fs.writeFileSync(
  path.resolve(__dirname, "src/_data/bookmarks.js"),
  bmString,
  "utf8"
);
exec("npm run build", (err, stdout, stderr) => {
  if (err) {
    console.log(err);
  }
  console.log(stdout);
});

fs.unlinkSync(path.resolve(__dirname, BookMarksSource));
