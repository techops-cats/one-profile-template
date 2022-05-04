// eslint-disable
const manifest = require("./package.json");
const releaseVersion = manifest.version;
const packageName = manifest.name;
const axios = require("axios");

const imdUser = process.env.IMD_USER;
const imdPassword = process.env.IMD_PASSWORD;
const supportedEnvironments = ["dev", "stage", "prod"];
const publishEnvironment = process.argv[2];
const importMapDeployerUrl = `https://import-map-deployer.pac.thoughtworks.net/services/?env=${publishEnvironment}`;

console.log(importMapDeployerUrl);
if (!supportedEnvironments.includes(publishEnvironment)) {
  process.exit(1);
}

const imdCredentials = `Basic ${Buffer.from(
  `${imdUser}:${imdPassword}`
).toString("base64")}`;

axios
  .patch(
    importMapDeployerUrl,
    {
      service: packageName,
      url: `https://cdn.jsdelivr.net/npm/${packageName}@${releaseVersion}`,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: imdCredentials,
      },
    }
  )
  .then((r) => {
    console.info(r.status);
    console.info(r.data);
    process.exit(0);
  })
  .catch((reason) => {
    console.error(reason.response.status);
    console.error(reason.response.data);
    process.exit(1);
  });
