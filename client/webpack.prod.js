const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const CompressionPlugin = require("compression-webpack-plugin");
const zlib = require("zlib");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    hashFunction: "xxhash64",
    publicPath: "/",
    chunkFilename: "[contenthash:5].js",
    filename: "[contenthash:5].js",
    assetModuleFilename: "[contenthash:5][ext][query]",
  },
  plugins: [
    new CompressionPlugin({
      filename: "[path][base].gz",
      algorithm: "gzip",
      test: /\.(js|css|html|svg|wasm)$/,
      compressionOptions: {
        level: zlib.constants.Z_BEST_COMPRESSION,
      },
    }),
    new CompressionPlugin({
      filename: "[path][base].br",
      algorithm: "brotliCompress",
      test: /\.(js|css|html|svg|wasm)$/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]:
            zlib.constants.BROTLI_MAX_QUALITY,
        },
      },
    }),
    new CopyPlugin({
      patterns: [{ from: "public", to: "./" }],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new HtmlMinimizerPlugin(), new TerserPlugin()],
  },
});
