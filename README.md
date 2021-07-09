<p align="center"><img alt="Icon" width="150" src="https://yashtotale.web.app/logo512.png"/></p>

<h1 align="center">Welcome to Yash's Portfolio Website 👋</h1>

<p align="center">
<a href="https://github.com/YashTotale/portfolio-v2/actions/workflows/integrate.yml"><img src="https://img.shields.io/github/workflow/status/YashTotale/portfolio-v2/Node%20CI?logo=github&logoColor=FFFFFF&labelColor=000000&label=Build&style=flat-square" alt="Build" /></a>
<a href="https://yashtotale.web.app/"><img src="https://img.shields.io/website?url=https%3A%2F%2Fyashtotale.web.app%2F&labelColor=000000&label=Website&style=flat-square" alt="Website"/></a>
<a href="https://github.com/YashTotale/portfolio-v2/actions/workflows/deploy.yml"><img src="https://img.shields.io/github/workflow/status/YashTotale/portfolio-v2/Deploy%20Website?logo=firebase&logoColor=FFFFFF&labelColor=000000&label=Deploy&style=flat-square" alt="Deploy" /></a>
<a href="https://lgtm.com/projects/g/YashTotale/portfolio-v2/context:javascript"><img src="https://img.shields.io/lgtm/grade/javascript/github/YashTotale/portfolio-v2?logo=lgtm&logoColor=FFFFFF&labelColor=000000&label=Code%20Quality&style=flat-square" alt="Code Quality" /></a>
</p>

## 📖 Contents <!-- omit in toc -->

- [🏃 Running Locally](#-running-locally)
- [🏆 Goals](#-goals)
  - [Start with a design](#start-with-a-design)
  - [Use an efficient CMS](#use-an-efficient-cms)
  - [Build sustainable infrastructure](#build-sustainable-infrastructure)

## 🏃 Running Locally

1. Prerequisites

   - [Git](https://git-scm.com/), version `>=2.x`
   - [Node.JS](https://nodejs.org/en/), version `>=15.x`
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

   Please reach out to me at totaleyash@gmail.com for these 🙂. Paste them into `.env`.

5. Fetch data

   ```shell
   npm run data
   ```

6. Start local development

   ```shell
   npm start
   ```

## 🏆 Goals

As you may have noticed, this is my second attempt at a portfolio website. The [first one](https://github.com/YashTotale/portfolio-v1) was ... a total failure. 600+ commits in, I realized that I had overcomplicated and under-planned the project. Instead of focusing on a clean and intuitive UI, I had gotten bogged down in adding relatively useless features that I thought were cool (like dynamic [Wikipedia](https://github.com/YashTotale/portfolio-v1/blob/master/src/Scripts/getTerms.ts) & [LinkedIn](https://github.com/YashTotale/portfolio-v1/blob/master/src/Scripts/getLinkedin.ts) integration). So, to avoid another failure, I set a few goals ahead of time:

### Start with a design

I used [Figma](https://figma.com/) to design almost all of the website's pages before I even started programming. This helped me quickly and efficiently write the UI for

### Use an efficient CMS

I used [Contentful](https://www.contentful.com/) for my headless CMS. This allowed me to separate out my website's layout and its content, reducing the amount of changes I would need to make to the code over time. Also, Contentful was a much better alternative to Google Sheets (which I used for my first portfolio website).

### Build sustainable infrastructure

If you browse through the [Components], [Pages], or [Utils] folders, you'll see quite a few patterns in each. This is on purpose: by "patternizing" my code, I am able to quickly add new features/pages or make edits to existing UI.

<!-- Reference Links -->

[components]: https://github.com/YashTotale/portfolio-v2/tree/master/src/Components
[pages]: https://github.com/YashTotale/portfolio-v2/tree/master/src/Pages
[utils]: https://github.com/YashTotale/portfolio-v2/tree/master/src/Utils
