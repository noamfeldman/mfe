const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonCofig = require("./webpack.commom");
const packageJson = require("../package.json");

const domain = process.env.PRODUCTION_DOMAIN;

const prodConig = {
  mode: "production",
  output: {
    filename: "[name][contenthash].js",
    publicPath: '/container/latest/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,
        auth: `auth@${domain}/auth/latest/remoteEntry.js`,
        dashboard: `dashboard@${domain}/dashboard/latest/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonCofig, prodConig);
