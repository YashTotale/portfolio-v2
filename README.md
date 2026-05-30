## Contents <!-- omit in toc -->

- [Running Locally](#running-locally)
- [Goals](#goals)
- [Architecture](#architecture)
- [Pre-rendering](#pre-rendering)

## Running Locally

1. Prerequisites

   - [Git](https://git-scm.com/), version `>=2.x`
   - [Node.JS](https://nodejs.org/en/), version `>=16.x`
   - [NPM](https://www.npmjs.com/), version `>=6.x`

2. Clone the repository

   ```shell
   git clone https://github.com/YashTotale/portfolio-v2.git
   cd portfolio-v2
   ```

3. Install dependencies

   ```shell
   npm install
   ```

4. Set up environment variables

   Paste them into `.env`. Use [`.env.example`](.env.example) as an example:

   ```text
   CONTENTFUL_ACCESS_TOKEN=
   CONTENTFUL_SPACE_ID=
   CONTENTFUL_MANAGEMENT_ACCESS_TOKEN=
   REACT_APP_RECAPTCHA_KEY=
   ```

5. Fetch data

   ```shell
   npm run data
   ```

6. Start local development

   ```shell
   npm start
   ```

7. (Optional) Start local Firebase emulators

   This step is only required if you plan to change any features involving Firebase services like authentication, storage, Firestore, and Cloud Functions. If you wish to run the Cloud Functions emulator, ensure that you are using `node@12.x`.

   Steps:

   - ```shell
     npm run emulate
     ```

   - Uncomment the `useEmulator()` call in the [Firebase config file](src/Utils/Config/firebase.ts).

   - To edit Cloud Functions, refer to the [functions](functions) directory for steps.

## Goals

This is my second attempt at a portfolio website. The [first one](https://github.com/YashTotale/portfolio-v1) was ... a failure. **600+ commits** in, I realized that I had overcomplicated the project. Instead of focusing on a clean and intuitive UI, I had gotten bogged down in adding relatively useless features that I thought were cool (like dynamic [Wikipedia](https://github.com/YashTotale/portfolio-v1/blob/master/src/Scripts/getTerms.ts) & [LinkedIn](https://github.com/YashTotale/portfolio-v1/blob/master/src/Scripts/getLinkedin.ts) integration). So, to avoid another failure, I set a few goals ahead of time:

### Start with a design

I used [Figma](https://figma.com/) to design most of the website's pages before I even created the GitHub repo. This helped me quickly build an MVP of the entire website. From there, I was able to optimize and improve specific areas without losing sight of the overall picture.

### Use an efficient CMS

I used [Contentful](https://www.contentful.com/) as my headless CMS. This allowed me to separate out my website's layout and its content, reducing the amount of changes I would need to make to the code over time. Also, Contentful was a much better alternative to Google Sheets (which I used for my first portfolio website).

### Build sustainable infrastructure

If you browse through the [Components], [Pages], or [Utils] folders, you'll see quite a few patterns in each. By patternizing my code, I was able to quickly add new features/pages or make edits to existing UI.

## Architecture

### [Components]

**Components are divided into 4 folders: [Atomic], [Content], [Custom], and [Static]**

#### [Atomic]

Atomic components can be used essentially anywhere. They are meant to be building blocks for layouts, with specific styling/UI to make the website consistent.

#### [Content]

Content components are meant to be UI for a specific type of content. They can be further divided into Main, Preview, Overlay/Mini/Associated.

- Main content components are to be displayed on that specific content's own page. For example, on the route `/experience/<slug>`, the Main component for that specific experience will be displayed.
- Preview content components are to be displayed on the content type's page. For example, on the route `/experience`, the Preview components for all experiences will be displayed.
- The other content components such as Overlay, Mini, and Associated are to be displayed anywhere else as "supporting" components. For example, on a specific tag's page (`/tags/<slug>`), the related experience, articles, and projects of the tag will also be displayed via Overlay components.

#### [Custom]

Custom components are extensively configured components (like a [Rich Text renderer](src/Components/Custom/RichText)) that can be used in multiple areas of the application. They are generally not atomic as they are meant for a very specific purpose.

#### [Static]

Static components are rendered only once. These include elements like the Navbar, Footer, Sidebar, etc.

### [Pages]

Each page of the website is a folder in the [Pages] directory (except the [NotFound](src/Pages/NotFound.tsx) and [Error](src/Pages/Error.tsx) pages which are just files). Each folder contains an `index.tsx` file for the UI of that page.

- Every page calls a [`useAnalytics`](src/Hooks/useAnalytics.tsx) hook, which logs a `page_view` event to [Google Analytics](http://analytics.google.com/).
- Every page updates the `<head>` of the HTML using [React Helmet](https://github.com/nfl/react-helmet).

### [Utils]

Any utilities such as [functions](src/Utils/funcs.ts), [types](src/Utils/types.ts), [constants](src/Utils/constants.ts), etc. are located in the [Utils] folder.

Additionally, content utilities are located in the [Content subdirectory](src/Utils/Content). Each file in this folder contains utilities to get, resolve, filter, and sort a specific content type.

## Pre-rendering

Pre-rendering is a way to generate static HTML files for a SPA. I used pre-rendering to boost page-load times and SEO. Learn more about its benefits on the [react-snap GitHub page](https://github.com/stereobooster/react-snap).

Sounds pretty simple, but there are a few caveats with pre-rendering that took a _little_ while for me to debug.

### Pre-rendering in CI/CD

[react-snap](https://github.com/stereobooster/react-snap) and other pre-rendering libraries use [puppeteer](https://github.com/puppeteer/puppeteer) to launch a headless Chrome browser to crawl your site's web pages and generate HTML files.

This works great locally, but if you're pre-rendering in a CI/CD step, you have to include some extra configuration for puppeteer to work properly. Here is what you need to include in your project's `package.json`:

```json
"reactSnap": {
  "puppeteerArgs": [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-gpu"
  ]
}
```

### Pre-rendering with API requests

If you attempt to pre-render your website with API requests or something similar (ex. Google Analytics event logging) enabled, you'll likely face `Navigation Timeout Exceeded` or `Protocol Error` issues. There's a simple fix for this: **just don't make those calls during the pre-rendering stage.** Here's how:

```javascript
if (navigator.userAgent !== "ReactSnap") {
  // Do your requests here
}
```

<!-- Reference Links -->

[components]: src/Components
[pages]: src/Pages
[utils]: src/Utils
[atomic]: src/Components/Atomic
[content]: src/Components/Content
[custom]: src/Components/Custom
[static]: src/Components/Static
