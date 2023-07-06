import React from "react";

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    onlyLogs: true,
    titleColor: "green",
    diffNameColor: "red",
    diffPathColor: "red",
  });
}
