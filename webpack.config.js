const path = require("path");

module.exports = {
  entry: "./src/mongu.js",
  output: {
    filename: "mongu.js",
    path: path.resolve(__dirname, "dist"),
  },
};
