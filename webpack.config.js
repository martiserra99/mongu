const path = require("path");

module.exports = {
  entry: "./src/mongu.js",
  experiments: {
    outputModule: true,
  },
  output: {
    filename: "mongu.js",
    path: path.resolve(__dirname, "dist"),
    library: { type: "module" },
  },
};
