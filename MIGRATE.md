## Migration to NPM from Infra setup

### 1. Scope

Make sure the package scope is `@one-profile` in package.json

### 2. Project Name

Refer README for details

### 3. Package Manifest

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
- MAKE SURE ONLY DIST IS IN FILES. INCLUDING SOURCE FILES WILL LEAD TO POSSIBLE SECURITY INCIDENT
```

### 4. Minimal Setup for CircleCI

Refer CircleCI for minimal setup. You can additionally add any workflow. The workflow contains immediate deployment strategy for import-maps includes

```diff
- NOTE: ANY WORKFLOW THAT INVOLVED NPM PUBLISH SHOULD HAVE SEMGREP IN PLACE TO AVOID SECURITY INCIDENTS
```
