---
title: Development
fullwidth: true
---

## Set up your laptop

- Install a code editor - we recommended [VS Code](https://code.visualstudio.com/download)
- [Install nvm](https://github.com/creationix/nvm#install-script)
- [Install node](https://github.com/nvm-sh/nvm#usage)
- [Install yarn](https://classic.yarnpkg.com/en/docs/install)

## Set up your Gestalt repository

- Clone the repo: Fork the Gestalt repo and work off your forked repo, not the `pinterest/gestalt` repo.
- Once forked, clone to your local machine using the SSH option

```bash
git clone git@github.com:<YOUR_USERNAME>/gestalt.git
```

- Use the correct Node.js version to setup the environment locally

```bash
cd gestalt && nvm use
```

<Hint>If the node version isn't available, you will need to [install](https://github.com/nvm-sh/nvm#usage) it.</Hint>

- Install project dependencies. Do not run npm install because it will create a package-lock.json file (and also takes considerably longer).

```bash
yarn
```

- Add pinterest/gestalt as a remote upstream (you'll only need to do this once).

```bash
git remote add upstream git@github.com:pinterest/gestalt.git
```

- Check your remote configuration

```bash
git remote -v
// origin    git@github.com:<YOUR_USERNAME>/gestalt.git (fetch)
// origin    git@github.com:<YOUR_USERNAME>/gestalt.git (push)
// upstream    git@github.com:pinterest/gestalt.git (fetch)
// upstream    git@github.com:pinterest/gestalt.git (push)
```

## Set up Visual Studio Code

- Open the new `/gestalt` folder with VS Code.
- Install the suggested VS Code extensions including [vs code-stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) to lint CSS files.
- If you want to automatically launch the docs when you open VS Code:
  - In VS Code type `CMD+Shift+p`
  - Search and select Tasks: "Manage Automatic Tasks in Folder"
  - Select Allow "Automatic Tasks in Folder"
  - Relaunch VS Code

## Run the Gestalt documentation server

Whenever you make changes to Gestalt, please test them out locally before making a PR.

To start the documentation server, run `yarn start`. In your favorite browser, navigate to <ins>http://localhost:8888</ins>.

## Create a pull request

- Rebase your local master branch

```bash
git fetch upstream
git rebase upstream/master
```

- Create an checkout a branch. Replace the text `<feature-branch>` with your branch name

```bash
git checkout -b <feature-branch> upstream/master
```

- Time to make changes to Gestalt! If you are introducing a new component, run the scaffolding command to generate the necessary files. Replace ‘ComponentName‘ with the name of your component.

```bash
yarn generate ComponentName
```

- The script will generate the following files:
  - Component development
    - packages/gestalt/src<strong>/NewComponent.tsx</strong>: TSX file for component development
    - packages/gestalt/src<strong>/NewComponent.css</strong>: CSS file for component development
    - packages/gestalt/src<strong>/NewComponent.test.tsx</strong>: Test file for the component. It can also be replaced or complemented with an additional packages/gestalt/src<strong>/NewComponent.jsdom.test.tsx</strong>
  - Component documentation
    - docs/pages/web<strong>/newcomponent.tsx</strong>: This file builds the documentation page for the component
    - docs/examples<strong>/newcomponent/main.tsx</strong>: This file builds the main example used in the component documentation page. To add more examples to the docs,  duplicate this file as a template.
    - packages/gestalt/src<strong>/NewComponent.svg</strong>: SVG file used for the [component overview page](/web/overview)
    - docs/pages/visual-test<strong>/NewComponent-light.tsx</strong>: This file builds a component visual example in light mode. The component snapshot shows in VSCode when hovering over the component name
    - docs/pages/visual-test<strong>/NewComponent-dark.tsx</strong>: This file builds a component visual example in dark mode. The component snapshot shows in VSCode when hovering over the component name
  - Component testing
    - playwright/accessibility<strong>/NewComponent.spec.ts</strong>: This file runs accessibility Playwright tests on the new component documentation page
    - playwright/visual-test<strong>/NewComponent.spec.ts</strong>: This file creates visual snapshot tests on the new component in light mode
    - playwright/visual-test<strong>/NewComponent-dark.spec.ts</strong>: This file creates visual snapshot tests on the new component in dark mode
  - packages/gestalt/src<strong>/README_DELETE_componentName.md</strong>: This file provides guidance on the remaining steps to set up your component. It must be deleted once the steps are done.
  - The script will also update <strong>packages/gestalt/src/index.ts</strong> adding the new component to the index list.

<Hint>Run <code>yarn build</code> and access the visual test examples via http://localhost:8888/visual-test/NewComponent or https://deploy-preview-XXXX--gestalt.netlify.app/visual-test/NewComponent</Hint>

- While developing your new component or updating existing ones, your playground to test your work and changes is your component documentation page. Consider the following while developing:
  - Use your docs/examples<strong>/newcomponent/main.tsx</strong> example to iterate on your implementation
  - Our documentation currently uses two live coding environments: [Sandpack](https://sandpack.codesandbox.io/) and [React Live](https://github.com/FormidableLabs/react-live). While Sandpack provides a better final experience, it has not been configured yet to support local development efficiently. On the other hand, React Live works well with local development; however, it has the following limitations to consider when building examples:
    - [Optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) is not supported
    - External imports are not supported
    - All constants must be within the exported function, not outside
    - Sandpack examples are contained within its own contained viewport, while React Live isn't contained and uses the Gestalt documentation page as viewport. For components that are shown by default in Sandpack, for example Modal or OverlayPanel, we shouldn't display them by default within React Live as they would automatically be visible in your page. Use the following useState <code>const [showComponent, setShowComponent] = useState(true);</code> to control the visibility of your component. Under the hood, we replace the boolean so the components are shown by default in Sandpack but stayed closed by default on React Live.
  - To enable React Live during development and within build testing URLs (https://deploy-preview-XXXX--gestalt.netlify.app), you can toggle between development mode view in the Settings menu in the site header.

- Any subsequent component changes might require the following actions.

  - Run unit tests

  ```bash
  yarn jest -u
  ```

  - Run [Playwright accessibility integration tests](https://www.npmjs.com/package/@axe-core/playwright). If any documentation examples are expected to fail accessibility testing, wrap the example in a container with `data-skip-accessibility-check`.

  ```bash
  yarn playwright:test accessibility/
  ```

  - Run [Playwright visual diff snapshot tests](https://playwright.dev/docs/test-snapshots). If any component changes are expected to visually modify your component, you must update the snapshot tests. Make sure your macOS version matches the one set in [Playwright's config file](https://github.com/pinterest/gestalt/blob/master/.github/workflows/playwright.yml#L13)

  ```bash
  # Stop Docs build
  # Update all Gestalt packages builds running rollup. Make sure to run after every change in component/snapshot test
  yarn build:prod

  # Update a specific visual test snapshots with the latest builds
  yarn playwright:update-visual-test playwright/visual-test/<filename>  --update-snapshots
  ```

  - If you are introducing breaking changes, create a **[codemod](/get_started/developers/tooling/web#Release-codemods)** to help users migrate between versions.

- Commit the changes to your branch. Follow naming conventions for the PR

`<Component>: <Commit Change Description (including platform if relevant)>`

- When you are done, push your branch up.

```bash
git add .
git commit -am "Component: Commit Change Description"
git push -f origin HEAD
```

- Go to **[https://github.com/pinterest/gestalt](https://github.com/pinterest/gestalt)**. A new banner will be displayed, click on 'Compare & Create Pull Request'.

- Add useful summary and screenshots. We provide a template for the summary to make sure you include all necessary information.

- Click on `Create Draft Pull Request` to create your PR. Once you are done committing changes to it, and all the CI tests have passed, click the "Ready for Review" button.

<Hint>Keeping the PR as a draft until it is ready for review reduces the number of unneeded notifications for maintainers </Hint>

<Hint icon="lock"> If you are a Pinterest employee, please let us know on Slack (#gestalt-eng-web) that your PR is ready for review. </Hint>

- Ensure checks pass on your Pull Request - having the "Require Semver / Test (pull_request)" check fail is expected, because a Gestalt maintainer needs to add a correct semver label. Read our [release and versioning guidelines](/get_started/developers/releases#Automated-releases).

- After a Gestalt maintainer adds a correct semver label and approves a Pull Request, the PR will be ready to merge. Coordinate with the reviewer to determine when the PR should be merged.

- Check the status of your PR https://github.com/pinterest/gestalt/pull/XXXX and access the deploy preview using the built site URL https://deploy-preview-XXXX--gestalt.netlify.app from Netlify. 

- When sharing preview urls, you may have to remind viewers to toggle on development mode from the header menu. This is necessary to see unpublished changes in the code examples. To simplify sharing, you can add a `?devexample=true` parameter to the url to enable the examples by default.

## Create a new package

When should you create a new gestalt- package instead of adding a new component to the existing gestalt?

Gestalt is a lightweight package with only 2 dependencies: "classnames" and "prop-types". By using the minimal amount of dependencies, we can maintain the size of the bundle small. If a new component requires external packages, it's worth isolating it in a single package so that importing Gestalt in our codebase keeps a small bundle.

When adding a new package, follow the steps in this PR: https://github.com/pinterest/gestalt/pull/3143

<details>
  <summary><b>My pull request fails on "Semver / Require Label (pull_request)", how do I fix it?</b></summary>

Nothing you can do to fix it.

A Gestalt Core maintainer will add a semver label (patch release / minor release / major release) when reviewing a PR.

</details>

## Guidelines

### Scope of work

When pushing new changes to GitHub, your PR title should be aligned with the scope of your work. If your goal was to change the default color of a component, keep the scope of changes to that specific task and word the title to exactly reflect those changes.

### Changes not allowed

Do not use the following CSS style properties:

- `line-height`: Property in CSS that controls the space between lines of text. Not defining a `line-height` allows the browser to determine line-height based on language which prevents localization issues.

- `height/width`: Height & width are CSS properties that can be used for determining the size of static assets such as an icon size. However, components that contain text data should not fix the height & width of the component to prevent incorrect styling under different cases such as localization, longer texts, etc. Consider other alternatives such as padding to define different component sizes.

Avoid:

- Boolean props: For example, instead of `isRTL: boolean` or `isStart: boolean` or `isEnd: boolean`, use more declarative props such as `layoutDirection: rtl | ltr` or `role: startInput | endInput`.

## Technical Design Documents

Before starting coding a new component, you must first detail the component specifications in Technical Design Documents (TDD). You can find the [TDD template here](http://pinch.pinadmin.com/TDD).

## RFCs

Find the RFCs (request for comments) process and repository [here](https://github.com/pinterest/gestalt/tree/master/rfcs).
