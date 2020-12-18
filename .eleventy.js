module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("bookmarks", function (bmArray) {
    function folder(f) {
      return `<h3>${f.title}</h3>${f.list ? linkList(f.list) : ""}`;
    }

    function linkList(ll) {
      let llArray = [];
      ll.forEach((li) => {
        if (li.list) {
          llArray.push(`<li>${folder(li)}</li>`);
          return;
        }
        llArray.push(`<li><a href="${li.url}">${li.title}</a></li>`);
      });
      return `<ul>${llArray.join("")}</ul>`;
    }

    let bmList = bmArray.map((f) => {
      if (f.title == "Bookmarks Menu") {
        return ``;
      }
      let className = f.title.replace(/\s+/g, "-").toLowerCase();
      return `<div class="bm-cell ${className}">${folder(f)}</div>`;
    });

    return bmList.join("");
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
