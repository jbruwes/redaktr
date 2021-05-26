var path = require("path");
var webpack = require("webpack");

module.exports = function(env) {

  var pack = require("./package.json");
  var MiniCssExtractPlugin = require("mini-css-extract-plugin");
  var CopyWebpackPlugin = require("copy-webpack-plugin");

  var production = !!(env && env.production === "true");
  var asmodule = !!(env && env.module === "true");
  var standalone = !!(env && env.standalone === "true");

  var babelSettings = {
    extends: path.join(__dirname, '/.babelrc')
  };

  var config = {
    mode: production ? "production" : "development",
    entry: {
      redaktr: ['babel-polyfill', './sources/redaktr.js']
    },
    output: {
      path: path.join(__dirname, "codebase"),
      //publicPath:"/codebase/",
      filename: "[name].js",
      chunkFilename: "[name].bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: "babel-loader?" + JSON.stringify(babelSettings)
        },
        {
          test: /\.(eot|ttf|woff|woff2|svg|png|jpg|gif)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              // outputPath: 'resource/',
            },
          }],
        },
          {
          test: /\.(less|css)$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
        }
      ]
    },
    stats: "minimal",
    resolve: {
      extensions: [".js"],
      modules: ["./sources", "node_modules"],
      alias: {
        "jet-views": path.resolve(__dirname, "sources/views"),
        "jet-locales": path.resolve(__dirname, "sources/locales")
      }
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css"
      }),
      new CopyWebpackPlugin([
        { from: 'resource/404.html' },
        { from: 'resource/favicon.ico' },
        { from: 'resource/index.html' },
        { from: 'resource/redaktr.svg' },
        { from: 'resource/robots.txt' }
      ]),
      new webpack.DefinePlugin({
        VERSION: `"${pack.version}"`,
        APPNAME: `"${pack.name}"`,
        PRODUCTION: production,
        BUILD_AS_MODULE: (asmodule || standalone)
      })
    ],
    devServer: {
      stats: "errors-only"
    },
    performance: { hints: false }
  };

  if (!production) {
    config.devtool = "inline-source-map";
  }

  if (asmodule) {
    if (!standalone) {
      config.externals = config.externals || {};
      config.externals = ["webix-jet"];
    }

    const out = config.output;
    const sub = standalone ? "full" : "module";

    out.library = pack.name.replace(/[^a-z0-9]/gi, "");
    out.libraryTarget = "umd";
    out.path = path.join(__dirname, "dist", sub);
    out.publicPath = "/dist/" + sub + "/";
  }

  return config;
}