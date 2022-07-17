const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  output: {
    publicPath: "/",
  },
  devtool: "eval-source-map",
  devServer: {
    static: path.join(__dirname, "public"),
    historyApiFallback: true,
    port: 4000,
    open: false,
    hot: true,
    watchFiles: ["src"],
  },
});
