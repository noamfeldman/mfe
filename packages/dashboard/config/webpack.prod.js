const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonCofig = require("./webpack.commom");
const packageJson = require("../package.json");

const prodConig = {
    mode: "production",
    output: {
      filename: "[name][contenthash].js",
      publicPath: '/dashboard/latest/'
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "dashboard",
        filename: "remoteEntry.js",
        exposes: {
            "./DashbordApp": "./src/bootstrap",
          },
        shared: packageJson.dependencies,
      }),
    ],
  };
  
  module.exports = merge(commonCofig, prodConig);