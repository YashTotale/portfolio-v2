# Portfolio Cloud Functions

## Set Up

Ensure your working directory is `functions`, not the root directory for all steps.

1. Prerequisites

   - [Node.JS](https://nodejs.org/en/), version `=12.x`
   - [NPM](https://www.npmjs.com/), version `>=6.x`
   - [Firebase CLI](https://firebase.google.com/docs/cli)

2. Install Dependencies

   ```shell
   npm install
   ```

3. Get Private Key

   Follow the steps in [the Firebase documentation](https://firebase.google.com/docs/admin/setup#initialize-sdk) to obtain a new private key. Paste the private key into `functions/src/service-account.json`.

4. Get Runtime Config

   Ensure you are logged in to the Firebase CLI.

   ```shell
   firebase functions:config:get >.runtimeconfig.json
   ```

5. Start local development

   ```shell
   npm run watch
   ```
