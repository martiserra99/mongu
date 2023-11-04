const path = require("path");

const nodeConfig = {
  entry: "./src/mongu.js",
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "mongu.js",
    library: {
      type: "commonjs2",
    },
  },
};

const webConfig = {
  entry: "./src/mongu.js",
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "mongu.js",
    library: {
      type: "commonjs2",
    },
  },
};

module.exports = [nodeConfig, webConfig];
