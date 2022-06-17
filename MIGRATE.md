## Migration to one profile

## Prerequisites

Only react projects are currently support in one profile

### OneProfile Dependencies

```shell
# Dependencies
yarn # or npm install
yarn add single-spa # or npm install --save single-spa
yarn add @emotion/react @emotion/styled @mui/material single-spa single-spa-react
```

```shell
# Development Dependencies
yarn add -D webpack webpack-cli webpack-config-single-spa-react webpack-dev-server webpack-merge
```

```shell
# For typescript
yarn add @types/systemjs @types/webpack-env
yarn add -D webpack-config-single-spa-react-ts webpack-config-single-spa-ts ts-config-single-spa
```

### SingleSPA Lifecycle configuration

Create a file `one-profile-{your-project-name}.(t|j)sx` with following code

```typescript jsx
import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
```

### Webpack Configuration

Create a file `webpack.config.js`

```javascript
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts"); // for typescript
const singleSpaDefaults = require("webpack-config-single-spa-react"); // for javascript
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
```

### Package Scope

Make sure the package scope is `@one-profile` in package.json. Project name in package.json should be of format `@one-profile/{your project name}`

### Webpack scripts for bundling

```json
{
  "start": "webpack serve --https",
  "start:standalone": "yarn start --env standalone",
  "build": "concurrently yarn:build:webpack",
  "build:webpack": "webpack --mode=production"
}
```

For typescript

```json
{
  "start": "webpack serve --https",
  "start:standalone": "yarn start --env standalone",
  "build": "concurrently yarn:build:webpack yarn:build:types",
  "build:type": "webpack --mode=production",
  "yarn:build:types": "tsc"
}
```

### tsconfig.json

```json
{
  "extends": "ts-config-single-spa",
  "compilerOptions": {
    "jsx": "react-jsx",
    "declarationDir": "dist"
  },
  "files": ["src/one-profile-{your-project-name}.tsx"],
  "include": ["src/**/*"],
  "exclude": ["src/**/*.test*"]
}
```

### Integration with oneprofile

You need to raise a request to [One Profile team](mailto:cats@thoughtworks.com)

## npmjs release channel (optional)

### Team in npm package

You need to raise a request to [One Profile team](mailto:cats@thoughtworks.com)

### Package Manifest

You have make sure that the following keys are included in package manifest (package.json)

```json
{
  "version": "0.0.0",
  "license": "MIT",
  "files": ["dist"],
  "keywords": ["Thoughtworks", "One Profile", "TechOps", "internal"],
  "publishConfig": {
    "access": "public"
  }
}
```

```diff
- MAKE SURE ONLY DIST IS IN FILES (package.json). INCLUDING SOURCE FILES WILL LEAD TO POSSIBLE SECURITY INCIDENT
```

### Minimal Setup for CircleCI

Refer CircleCI for minimal setup. You can additionally add any workflow. The workflow contains immediate deployment strategy for import-maps

```diff
- NOTE: ANY WORKFLOW THAT INVOLVED NPM PUBLISH SHOULD HAVE SEMGREP IN PLACE TO AVOID SECURITY INCIDENTS
```

### Release Management

`release.js` is needed for making release in oneprofile through importmap deployer
