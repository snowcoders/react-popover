// import * as webpack from "webpack";
let webpack = require("webpack");
const path = require("path");

const config /*: webpack.Configuration*/ = {
  entry: {
    main: "./src/index.ts"
  },
  output: {
    chunkFilename: "index.js",
    filename: "index.js",
    library: "@snowcoders/react-popover",
    libraryTarget: "umd"
  },

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: "ts-loader"
      }
    ]
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  // Here is a list of our peer-dependencies that we will not include but need to have access to
  // Specifically because we use umd, we have to specify more information
  // https://stackoverflow.com/questions/34252424/webpack-umd-lib-and-external-files
  externals: {
    "@snowcoders/react-unstyled-button": "@snowcoders/react-unstyled-button",
    "react-dom": {
      amd: "react-dom",
      commonjs: "react-dom",
      commonjs2: "react-dom",
      root: "ReactDOM"
    },
    "react-popper": "react-popper",
    "react-resize-detector": {
      amd: "react-resize-detector",
      commonjs: "react-resize-detector",
      commonjs2: "react-resize-detector",
      root: "ResizeDetector"
    },
    classnames: "classnames",
    react: {
      amd: "react",
      commonjs: "react",
      commonjs2: "react",
      root: "React"
    },
    tslib: "tslib"
  }
};

// export default config;
module.exports = config;
