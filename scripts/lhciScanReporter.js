const fs = require("fs");
const path = require("path");
const { Octokit } = require("@octokit/core");
const { context } = require("@actions/github");

const lhciScanResultPath = path.join(
  process.cwd(),
  ".lighthouseci",
  "manifest.json"
);

const lhciScanUrlMappingPath = path.join(
  process.cwd(),
  ".lighthouseci",
  "links.json"
);

const octokit = new Octokit({
  auth: process.env.GIT_TOKEN,
  baseUrl: "https://api.github.com",
});

const REPO_FULL_NAME = context.payload.repository.full_name;
const PR_NUMBER = context.payload.pull_request.number;
const COMMIT_SHA = context.payload.pull_request.head.sha;

const commentRegex = new RegExp(/Lighthouse Scan Result+/gm);

const lighthouseData = JSON.parse(fs.readFileSync(lhciScanResultPath, "utf-8"));
const urlMapping = JSON.parse(fs.readFileSync(lhciScanUrlMappingPath, "utf-8"));

const addOrUpdateComment = () => {
  let commentBody = `🤖 **Lighthouse Scan Result** for https://github.com/${REPO_FULL_NAME}/pull/${PR_NUMBER}/commits/${COMMIT_SHA} \n\n`;

  for (const result of lighthouseData) {
    const url = new URL(result.url);
    const path = url.pathname;

    commentBody += `<details>\n<summary><b>${path}<b></summary>\n\n`;

    commentBody += "| Metric | Value |\n";
    commentBody += "|--------|-------|\n";

    // Add the metrics we're interested in
    const metrics = ["performance", "seo", "accessibility"];

    for (const metric of metrics) {
      const capitalizedMetric =
        metric.charAt(0).toUpperCase() + metric.slice(1);
      const score = Math.round(result.summary[metric] * 100);
      commentBody += `| ${capitalizedMetric} | ${score} |\n`;
    }

    // Add the HTML path
    const htmlReportUrl = urlMapping[result.url]; // Fetch the HTML report URL from the mapping
    if (htmlReportUrl) {
      commentBody += `| HTML Report for LHCI Scan | [Report Link](${htmlReportUrl}) |\n`;
    }

    commentBody += `</details>\n\n`;
  }

  octokit
    .request(`GET /repos/${REPO_FULL_NAME}/issues/${PR_NUMBER}/comments`)
    .then((response) => {
      const comments = response.data;

      return comments.find((comment) => commentRegex.test(comment.body));
    })
    .then((lhciScanComment) => {
      if (lhciScanComment) {
        return octokit.request(
          `DELETE /repos/${REPO_FULL_NAME}/issues/comments/${lhciScanComment.id}`
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

addOrUpdateComment();
