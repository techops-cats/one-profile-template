# one-profile-template

THIS IS A TEMPLATE REPOSITORY FOR ONE-PROFILE (NPM RELEASE CHANNEL)

## Possible release channels

- NPM Package (current)
- GCP CloudRun (need contribution)
- AWS Cloudfront (need contribution)

You can reach out to [TechOps CATS team](mailto:cats@thoughtworks.com)

## Initial Setup (common for all release channels)

### 1. Project name

##### a) manifest (package.json)

Rename the project, dist, and main to your profile name

```json
{
  "name": "@one-profile/{your-project}",
  "main": "dist/one-profile-{your-project}.js",
  "types": "dist/one-profile-{your-project}.d.ts"
}
```

##### b) source file

Also rename the file name to the project name

```shell
mv ./src/one-profile-template.tsx ./src/one-profile-{your-project}.tsx
```

### 2. Context in CircleCI

Create context in circleci and replace the context in config.yml with your context name

The following environment variables should be set. Contact for access to 1password vault access to the credentials

```shell
export NPM_TOKEN
export IMD_USERNAME
export IMD_PASSWORD
```

## Releasing Package (only for teams who choose npm as CDN)

### 1. Version

Version using the available script and it will create commit and tag for the version bump

```shell
yarn version:patch
```

```shell
yarn version:minor
```

```shell
yarn version:major
```

### 2. Pushing changes including tags

```shell
git push origin main --tags
```

### 3. CircleCI Workflow

The Publish NPM Package Job is enabled in the workflow only for tag publish in git. Make sure `All branches` is selected in the branch filter to see the tag commit in CircleCI

## Unpublish in case of emergency or security threats

Run the following command. Once you unpublish you cannot republish using the same version.

```shell
 npm unpublish @one-profile/{your-project}@0.0.0 --force
```

### 4. Minimal Setup for CircleCI

Refer CircleCI for minimal setup. You can additionally add any workflow. The workflow contains immediate deployment strategy for import-maps includes

```diff
- NOTE: ANY WORKFLOW SHOULD HAVE SEMGREP IN PLACE TO AVOID SECURITY INCIDENTS
```
