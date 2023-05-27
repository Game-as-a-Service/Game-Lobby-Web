const escape = require("shell-quote").quote;
const isWin = process.platform === "win32";

module.exports = {
  "**/*.{js,jsx,ts,tsx}": (filenames) => {
    const escapedFileNames = filenames
      .map((filename) => `"${isWin ? filename : [filename]}"`)
      .join(" ");

    return [
      `prettier --write ${escapedFileNames}`,
      `npx eslint ${escapedFileNames} --fix`,
      `git add ${escapedFileNames}`,
    ];
  },
  "**/*.{css,scss}": (filenames) => {
    const escapedFileNames = filenames
      .map((filename) => `"${isWin ? filename : escape([filename])}"`)
      .join(" ");

    return [
      `prettier --write ${escapedFileNames}`,
      `git add ${escapedFileNames}`,
    ];
  },
  "**/*.{json,md,mdx,html,yml,yaml}": (filenames) => {
    const escapedFileNames = filenames
      .map((filename) => `"${isWin ? filename : escape([filename])}"`)
      .join(" ");
    return [
      `prettier --write ${escapedFileNames}`,
      `git add ${escapedFileNames}`,
    ];
  },
};
