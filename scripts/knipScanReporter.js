const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { Octokit } = require("@octokit/core");
const { context } = require("@actions/github");
console.log("context  ", context);
const knipScanResultPath = path.join(process.cwd(), "knipScanResult.txt");

const HOST_NAME = "https://github.com/";
// const octokit = new Octokit({
//   auth: process.env.GIT_TOKEN,
//   baseUrl: `${HOST_NAME}/api/v3`,
// });

const categories = [
  "Unused files",
  "Unused dependencies",
  "Unused devDependencies",
  "Unlisted dependencies",
  "Unlisted binaries",
  "Unresolved imports",
  "Unused exports",
  "Unused exports in namespaces",
  "Unused exported types",
  "Unused exported types in namespaces",
  "Unused exported enum members",
  "Unused exported class members",
  "Duplicate exports",
];

const commentRegex = new RegExp(/Knip Scan Result+/gm);
let currentSection = "";
let resultSections = {};

const rl = readline.createInterface({
  input: fs.createReadStream(knipScanResultPath),
});

rl.on("line", (line) => {
  for (let category of categories) {
    if (line.startsWith(category)) {
      currentSection = line;
      resultSections[currentSection] = [];
      break;
    }
  }

  if (
    currentSection &&
    line.trim() !== "" &&
    line.trim() !== currentSection &&
    !line.startsWith("Done in") &&
    !line.startsWith("yarn run")
  ) {
    resultSections[currentSection].push(line.trim());
  }
});

rl.on("close", () => {
  addOrUpdateComment(resultSections);
});

const addOrUpdateComment = (resultSections) => {
  // const DRONE_REPO = process.env.REPO_NAME;
  // const DRONE_PULL_REQUEST = process.env.PULL_REQUEST;
  // const DRONE_COMMIT_SHA = process.env.COMMIT_SHA;

  let commentBody = `Knip Scan Result \n\n`;

  for (const [section, lines] of Object.entries(resultSections)) {
    commentBody += `<details>\n<summary>${section}</summary>\n\n`;
    commentBody += lines.join("\n") + "\n</details>\n\n";
  }

  // octokit
  //   .request(`GET /repos/${DRONE_REPO}/issues/${DRONE_PULL_REQUEST}/comments`)
  //   .then((response) => {
  //     const comments = response.data;

  //     return comments.find((comment) => commentRegex.test(comment.body));
  //   })
  //   .then((knipScanComment) => {
  //     if (knipScanComment) {
  //       return octokit.request(
  //         `DELETE /repos/${DRONE_REPO}/issues/comments/${knipScanComment.id}`
  //       );
  //     }
  //   })
  //   .then(() => {
  //     return octokit.request(
  //       `POST /repos/${DRONE_REPO}/issues/${DRONE_PULL_REQUEST}/comments`,
  //       {
  //         body: commentBody,
  //       }
  //     );
  //   })
  //   .catch(console.error);
};
