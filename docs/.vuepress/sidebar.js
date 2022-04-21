const fs = require("fs");
const path = require("path");
const { resolve } = path;

const getMsg = (path = resolve(__dirname, "../articles")) => {
  let res = fs.readdirSync(path);
  if (res) {
    let arr = res.map((item) => {
      if (String(item).endsWith(".md")) {
        return { title: item.split(".")[0], path: resolve(path, item) };
      } else {
        return {
          title: item,
          children: getMsg(resolve(path, item)),
        };
      }
    });
    arr = arr.map((item) => {
      if (item.path) {
        item.path = translateDir(item.path);
      }
      return item;
    });

    return arr;
  } else {
    console.warn("无文章");
  }
};

/**
 *
 * @param {string} path
 * @returns
 */
function translateDir(path) {
  return path.replace(/\\/g, "/").split("docs")[1].split(".")[0];
}

module.exports = {
  "/": getMsg(),
};
