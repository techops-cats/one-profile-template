const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const manifest = require("./package.json");
function getOrg() {
  return manifest.name.split("/")[0].substring(1);
}
function getProjectName() {
  return manifest.name.split("/")[1];
}
module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: getOrg(),
    projectName: getProjectName(),
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    externals: ["@mui/material", "@emotion/styled", "@emotion/react"],
    // These dependencies are what assumed to be common dependencies.
    // You can propose to one profile team if you want to suggest a dependency that can be preloaded in one profile for performance improvement
  });
};
