const fs = require("fs");

const root = "./.next/static/chunks/";

const files = fs.readdirSync(root);

const checkList = [
  // page _app
  {
    path: "./.next/static/chunks/pages/_app*.js",
    maxSize: "180KB",
  },
  // other pagesxw
  {
    path: "./.next/static/chunks/pages/**/!(_app)*.js",
    maxSize: "50KB",
  },
  // CSS
  {
    path: "./.next/static/css/*.css",
    maxSize: "15KB",
  },
];

files.forEach((file) => {
  if (file.replace(/\..{16}\.js$/, "").match(/^(?=.*\d).{8}$/)) {
    // node modules
    checkList.push({
      path: root + file,
      maxSize: "120KB",
    });
  } else if (file.match(/\.js$/)) {
    // other chunks
    checkList.push({
      path: root + file,
      maxSize: "50KB",
    });
  }
});

const bundleWatchConfig = {
  files: checkList,
  ci: {
    trackBranches: ["main"],
  },
};

module.exports = bundleWatchConfig;
