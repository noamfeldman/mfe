const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonCofig = require("./webpack.commom");
const packageJson = require("../package.json");

const prodConig = {
    mode: "production",
    output: {
      filename: "[name][contenthash].js",
      publicPath: '/marketing/latest/'
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "marketing",
        filename: "remoteEntry.js",
        exposes: {
            "./MarketingApp": "./src/bootstrap",
          },
        shared: packageJson.dependencies,
      }),
    ],
  };
  
  module.exports = merge(commonCofig, prodConig);