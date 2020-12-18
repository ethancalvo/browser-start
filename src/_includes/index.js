const localStorage = window.localStorage;
function supportLocalStorage() {
  var test = "Bookmarks";
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  if (supportLocalStorage() !== true) {
    alert("boo");
    localStorage = {
      getItem: function (key) {
        if (window.name == null || window.name == "") return "{}"; //Later i'm about to use JSON Parser.
        return window.name;
      },
      setItem: function (key, val) {
        window.name = val;
      },
    };
  } else {
    let bookmarksObj = [
      {
        title: "To Do",
        url: "https://trello.com/b/1DOEdN9t/ethan-private",
        description: "My Personal To Do List",
      },
    ];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksObj));
  }
});
