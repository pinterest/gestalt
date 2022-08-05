---
title: Development
component: false
---

## Set up your laptop

- Install a code editor - we recommended **[VS Code](https://code.visualstudio.com/download)**
- **Install nvm**
- **Install node**
- **Install yarn**
- **[Install Docker desktop](333)** \
  You can also run the following command `brew install docker`

## Set up your Gestalt repository

- Clone the repo: Fork the Gestalt repo and work off your forked repo, not the `pintertest/gestalt` repo.

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
- Install the suggested VS Code extensions including vs code-stylelint to lint CSS files.
- If you want to automatically launch the docs when you open VS Code:
  - In VS Code type `CMD+Shift+p`
  - Search and select Tasks: "Manage Automatic Tasks in Folder"
  - Select Allow "Automatic Tasks in Folder"
  - Relaunch VS Code

## Run the Gestalt documentation server

Whenever you make changes to Gestalt, please test them out locally before making a PR.

To start the documentation server, run yarn start, which will automatically open the docs in a new browser tab.

If for some reason that tab doesn't launch, navigate to <ins>http://localhost:8888</ins>.

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

  - Run **Playwright accessibility integration tests**. If any documentation examples are expected to fail accessibility testing, wrap the example in a container with `data-skip-accessibility-check`.

  ```bash
  yarn playwright:test accessibility/
  ```

  - Run **Playwright visual diff snapshot tests**. If any component changes are expected to visually modify your component, you must update the snapshot tests

  ```bash
  # Start the documentation server (required for updating macOS snapshots)
  yarn start
  #
  # Update macOS snapshots
  yarn playwright:test visual-test/ --update-snapshots
  ```

  - In order to update the Linux snapshots in the tests, you must build a docker file and then run docker.

  ```bash
  # Build the docker container (only need to do this once)
  yarn docker:build
  #
  # Update the linux snapshots
  yarn docker:run
  ```

  - Update CSS flow types

  ```bash
  yarn run flow-generate:css
  ```

  - If you are introducing breaking changes, create a codemod to help users migrate between versions.

  ```bash
  yarn run flow-generate:css
  ```

- Commit the changes to your branch. Follow naming conventions for the PR `<Component>: <Commit Change Description>`
- Follow these steps again for any additional updates to your branch. When you are done, push your branch up.

```bash
git add .
git commit -am "Component: Commit Change Description"
git push -f origin HEAD
```

- Go to [https://github.com/pinterest/gestalt](https://github.com/pinterest/gestalt). A new banner will be displayed, click on 'Compare & Create Pull Request'.

- Add useful summary and screenshots. We provide a template for the summary to make sure you include all necessary information.

- Click on `Create Draft Pull Request` to create your PR. Once you are done committing changes to it, and all the CI tests have passed, click the "Ready for Review" button. (Keeping the PR as a draft until it is ready for review reduces the number of unneeded notifications for maintainers.) If you are a Pinterest employee, please let us know on Slack (#gestalt-web) that your PR is ready for review.

- Ensure checks pass on your Pull Request - having the "Require Semver / Test (pull_request)" check fail is expected, because a Gestalt maintainer needs to add a correct semver label. Check out our [versioning guidelines](https://gestalt.pinterest.systems/web/development#versioning) for more info.

- After a Gestalt maintainer adds a correct semver label and approves a Pull Request, the PR will be ready to merge. Coordinate with the reviewer to determine when the PR should be merged.

## Guidelines

### Scope of work

When pushing new changes to GitHub, your PR title should be aligned with the scope of your work. If your goal was to change the default color of a component, keep the scope of changes to that specific task and word the title to exactly reflect those changes.

### Versioning

Our versioning guidelines follow those outlined at **[semver.org](https://semver.org)**:

- Patch: internal fixes, documentation changes, or package upgrades (anything that consumers of Gestalt don't need to worry about)
- Minor: any new functionality or properties for a component, or net-new components
- Major: any breaking change, whether it be in a specific component or the library itself (will most likely include a
  [codemod](https://gestalt.pinterest.systems/web/development#codemods))

### Codemods

When a release will cause breaking changes (in usage or in typing) we provide a codemod to ease the upgrade process. Codemods are organized by release number in /packages/gestalt-codemods. The name of the folder should reflect the resulting version number of your PR.

Check out our [codemod README](https://github.com/pinterest/gestalt/tree/master/packages/gestalt-codemods) for a walkthrough of the development process.

Run the relevant codemod(s) in the relevant directory of your repo (not the Gestalt repo): anywhere the component to be updated is used.

Example usage for a codebase using Flow:

```bash
yarn codemod --parser=flow -t={relative/path/to/codemod} relative/path/to/your/code
```

For a dry run to see what the changes will be, add the -d (dry run) and -p (print output) flags (pipe stdout to a file for easier inspection if you like).

### Changes not allowed

Do not use the following CSS style properties:

- `line-height`: Property in CSS that controls the space between lines of text. Not defining a line-height allows the browser to determine line-height based on language which prevents localization issues.

- `height/width`: Height & width are CSS properties that can be used for determining the size of static assets such as an icon size. However, components that contain text data should not fix the height & width of the component to prevent incorrect styling under different cases such as localization, longer texts, etc. Consider other alternatives such as padding to define different component sizes.

Avoid:

- Boolean props: For example, instead of `isRTL: boolean` or `isStart: boolean` or `isEnd: boolean`, use more declarative props such as `layoutDirection: rtl | ltr` or `role: startInput | endInput`.

### RFCs

Find the RFCs (request for comments) process and repository [here](https://github.com/pinterest/gestalt/tree/master/rfcs).
