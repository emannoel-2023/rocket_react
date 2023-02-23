const path = require("path");
const Htmlplugin = require("html-webpack-plugin");
const insDevelopment = process.env.NODE_ENV !== "production";
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  mode: insDevelopment ? "development" : "production",
  devtool: insDevelopment ? "eval-source-map" : "source-map",
  entry: path.resolve(__dirname, "src", "index.tsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx",".ts",".tsx"],
  },
  devServer: {
    port: 3000 || 3001 || 3002,
    static: {
      directory: path.join(__dirname, "public"),
    },
    hot: true,
  },
  plugins: [
    insDevelopment && new ReactRefreshWebpackPlugin(),
    new Htmlplugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.(j|t)sx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              insDevelopment && require.resolve("react-refresh/babel"),
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
