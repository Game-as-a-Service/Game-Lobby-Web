const fs = require("fs");

const root = "./.next/static/chunks/";

const files = fs.readdirSync(root);

const checkList = [
  // page _app
  {
    path: "./.next/static/chunks/pages/_app*.js",
    maxSize: "180KB",
  },
  // other pages
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
    githubAccessToken: process.env.BUNDLEWATCH_GITHUB_TOKEN,
    repoOwner: process.env.CI_REPO_OWNER,
    repoName: process.env.CI_REPO_NAME,
    repoCurrentBranch: process.env.CI_BRANCH,
    repoBranchBase: process.env.CI_BRANCH_BASE || "main",
    commitSha: process.env.CI_COMMIT_SHA,
  },
};

module.exports = bundleWatchConfig;
