const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { Octokit } = require("@octokit/core");
const { context } = require("@actions/github");

const knipScanResultPath = path.join(process.cwd(), "knipScanResult.txt");

const HOST_NAME = "https://github.com";
const octokit = new Octokit({
  auth: process.env.GIT_TOKEN,
  baseUrl: `${HOST_NAME}/api/v3`,
});

const REPO_FULL_NAME = context.payload.repository.full_name;
const PR_NUMBER = context.payload.pull_request.number;
console.log("process.env.GIT_TOKEN ", process.env.GIT_TOKEN);
console.log("REPO_FULL_NAME ", REPO_FULL_NAME);
console.log("PR_NUMBER ", PR_NUMBER);
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
  let commentBody = `Knip Scan Result \n\n`;

  for (const [section, lines] of Object.entries(resultSections)) {
    commentBody += `<details>\n<summary>${section}</summary>\n\n`;
    commentBody += lines.join("\n") + "\n</details>\n\n";
  }

  octokit
    .request(`GET /repos/${REPO_FULL_NAME}/issues/${PR_NUMBER}/comments`)
    .then((response) => {
      const comments = response.data;

      return comments.find((comment) => commentRegex.test(comment.body));
    })
    .then((knipScanComment) => {
      if (knipScanComment) {
        return octokit.request(
          `DELETE /repos/${REPO_FULL_NAME}/issues/comments/${knipScanComment.id}`
        );
      }
    })
    .then(() => {
      return octokit.request(
        `POST /repos/${REPO_FULL_NAME}/issues/${PR_NUMBER}/comments`,
        {
          body: commentBody,
        }
      );
    })
    .catch(console.error);
};
