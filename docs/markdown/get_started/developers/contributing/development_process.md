---
title: Development
fullwidth: true
---

Pinterest web engineers can visit the [internal Gestalt documentation](http://pinch.pinadmin.com/gestalt_wiki).

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

To start the documentation server, run `yarn start`, which will automatically open the docs in a new browser tab.
If that tab doesn't launch automatically, navigate to <ins>http://localhost:8888</ins>

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

- Any subsequent component changes might require the following actions.

  - Run unit tests

  ```bash
  yarn jest -u
  ```

  - Run [Playwright accessibility integration tests](https://www.npmjs.com/package/@axe-core/playwright). If any documentation examples are expected to fail accessibility testing, wrap the example in a container with `data-skip-accessibility-check`.

  ```bash
  yarn playwright:test accessibility/
  ```

  - Run [Playwright visual diff snapshot tests](https://playwright.dev/docs/test-snapshots). If any component changes are expected to visually modify your component, you must update the snapshot tests

  ```bash
  # Start the documentation server (required for updating macOS snapshots)
  yarn start
  #
  # Update visual test snapshots
  yarn playwright:test visual-test/ --update-snapshots
  ```

  - Update CSS flow types

  ```bash
  yarn run flow-generate:css
  ```

  - If you are introducing breaking changes, create a **[codemod](/get_started/developers/tooling/web#Release-codemods)** to help users migrate between versions.

  ```bash
  yarn run flow-generate:css
  ```

- Commit the changes to your branch. Follow naming conventions for the PR `<Component>: <Commit Change Description>`
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

<Hint icon="lock"> If you are a Pinterest employee, please let us know on Slack (#gestalt-web) that your PR is ready for review. </Hint>

- Ensure checks pass on your Pull Request - having the "Require Semver / Test (pull_request)" check fail is expected, because a Gestalt maintainer needs to add a correct semver label. Read our [release and versioning guidelines](/get_started/developers/releases#Automated-releases).

- After a Gestalt maintainer adds a correct semver label and approves a Pull Request, the PR will be ready to merge. Coordinate with the reviewer to determine when the PR should be merged.

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
