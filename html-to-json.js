const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");
const path = require("path");

function getList(dl) {
  let retArray = [];
  dl.childNodes.forEach((cn) => {
    if (cn.tagName.toLowerCase() != "dt") {
      return;
    }

    if (
      cn.childNodes.length > 0 &&
      cn.childNodes[0].tagName.toLowerCase() == "a"
    ) {
      let a = cn.childNodes[0];
      retArray.push({ url: a.href, title: a.innerHTML });
    } else if (cn.childNodes.length > 2) {
      retArray.push(getLinkFolder(cn));
    }
  });
  return retArray;
}

function getLinkFolder(dt) {
  let folder = { title: "undefined", list: [] };
  dt.childNodes.forEach((li) => {
    if (li.tagName && li.tagName.toLowerCase() == "h3") {
      folder.title = li.innerHTML;
    } else if (li.tagName && li.tagName.toLowerCase() == "dl") {
      folder.list = getList(li);
    }
  });
  return folder;
}

function parseIt(inputDoc = "undefined") {
  if (inputDoc == "undefined") {
    inputDoc = "./test/Safari Bookmarks.html";
  }

  if (!fs.existsSync(inputDoc)) {
    console.log(`${inputDoc} does not exist.`);
    inputDoc = "./test/Safari Bookmarks.html";
    console.log("switching to test bookmarks");
  }

  if (!fs.existsSync(inputDoc)) {
    console.log(`${inputDoc} does not exist.`);
    return;
  }

  let srcDocPath = path.resolve(__dirname, inputDoc);
  let dom = new JSDOM(fs.readFileSync(srcDocPath, "utf8"));
  let document = dom.window.document;

  let dts = document.querySelectorAll("body > dt");
  let categories = [];
  dts.forEach((dt) => {
    categories.push(getLinkFolder(dt));
  });
  return categories;
}

module.exports = parseIt;
