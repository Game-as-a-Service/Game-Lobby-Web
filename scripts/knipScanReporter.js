const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { Octokit } = require("@octokit/core");
const { context } = require("@actions/github");

const knipScanResultPath = path.join(process.cwd(), "knipScanResult.txt");

const octokit = new Octokit({
  auth: process.env.GIT_TOKEN,
  baseUrl: "https://api.github.com",
});

const REPO_FULL_NAME = context.payload.repository.full_name;
const PR_NUMBER = context.payload.pull_request.number;
const COMMIT_SHA = context.payload.head.sha;

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
  "Configuration issues",
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

const createTable = (section, lines) => {
  let table = `| ${section} |\n`;
  table += `|${"-".repeat(section.length + 2)}|\n`;

  for (const line of lines) {
    const words = line.split(" ");

    if (words.length > 1) {
      const boldText = `**${words[0]}**`;
      const remainingText = words.slice(1).join(" ");
      table += `| ${boldText} ${remainingText} |\n`;
    } else {
      table += `| ${line} |\n`;
    }
  }

  return table;
};

const addOrUpdateComment = (resultSections) => {
  let commentBody = `✅ **Knip Scan Result** for https://github.com/${REPO_FULL_NAME}/pull/${PR_NUMBER}/commits/${COMMIT_SHA} \n\n`;

  for (const [section, lines] of Object.entries(resultSections)) {
    commentBody += `<details>\n<summary>${section}</summary>\n\n`;
    commentBody += createTable(section, lines);
    commentBody += `</details>\n\n`;
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
