const nodeExternals = require("webpack-node-externals");
const NodemonWebpackPlugin = require("nodemon-webpack-plugin");

module.exports = {
  mode: "development",
  target: "node",
  entry: "./src/index.ts",
  externals: [nodeExternals()],
  plugins: [new NodemonWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
