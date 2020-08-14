# Development

## Setting up your laptop

* Install a source-code editor. We recommend installing [VSCode](https://code.visualstudio.com/download).
* Install nvm on your Mac using the instructions [here](https://github.com/creationix/nvm#install-script). 
* Install node on your Mac using the instructions [here](https://github.com/nvm-sh/nvm#usage).

## Setting up your Gestalt Repository

* Clone the Repo: Fork the Gestalt Repo and work of your forked repo, not the `pinterest/gestalt` repo.
* Once forked, clone to your local machine using the `SSH` option.

```bash
git clone git@github.com:<YOUR_USERNAME>/gestalt.git
```
* Use the correct Node.js version to setup the environment locally. 

```bash
cd gestalt && nvm use
``` 

If the node version isn't available, install it on your Mac using the instructions [here](https://github.com/nvm-sh/nvm#usage).
 * Install project dependencies. Do not run `npm install` because it will create a `package-lock.json` file.

```bash
yarn
```

* Add `pinterest/gestalt` as a remote (do this once). Make sure you name it upstream - the publish script depends on this.

```bash
git remote add upstream git@github.com:pinterest/gestalt.git
```

* Check your remote.

```bash
git remote -v
// origin	git@github.com:<YOUR_USERNAME>/gestalt.git (fetch)
// origin	git@github.com:<YOUR_USERNAME>/gestalt.git (push)
// upstream	git@github.com:pinterest/gestalt.git (fetch)
// upstream	git@github.com:pinterest/gestalt.git (push)
```

## Setting up VSCode
* Open the new `/gestalt` folder with VSCode. 
* Install the suggested VSCode extensions including `vscode-stylelint` to lint CSS files.

## Running the Gestalt Documentation Server
Whenever you make changes to Gestalt, please test them out locally before making a PR.

To start the documentation server run `yarn start` & open http://localhost:3000 or http://localhost:8888.

## Creating a Pull Request
* Rebase your local master branch.

```bash
git fetch upstream
git rebase upstream/master
```

* Create and checkout a branch. Replace the text `<feature-branch>` with your branch name.

```bash
git checkout -b <feature-branch> upstream/master
```

* Time to make changes to Gestalt!
* Update the documentation if needed.
* Add unit tests for the change.
 * `<Component>.test.js` files should be used to test component rendering and for snapshot tests.
 * `<Component>.jsdom.test.js` files should be used to test component interactions (such as click, keypress, focus, etc) and client-side only tests. More info on [react-testing-library](https://testing-library.com/docs/react-testing-library/cheatsheet).
 * `<Component>.flowtest.js` files should be used to test flow coverage.
* Run tests & update snapshots.

```bash
yarn jest -u
```

* Update CSS flow types

```bash
yarn run flow-generate:css
```

* Push the changes up to your branch. Follow naming conventions for the PR: `<Component>: <Commit Change Description>`. Follow these steps again for any additional updates to your branch.

```bash
git add .
git commit -am "Component: Commit Change Description"
git push -f origin HEAD
```

* Go to https://github.com/pinterest/gestalt. A new banner will be displayed, click on "Compare & Create Pull Request".
* Add useful summary and screenshots.
* Click on `Create Pull Request` or `Create Draft` if it's not ready for review and approval.
* Ensure checks pass on your Pull Request - having the "Require Semver / Test (pull_request)" check fail is expected, a Gestalt maintainer needs to add a correct semver label.
* After a Gestalt maintainer adds a correct semver label and approves a Pull Request, the release process is initiated automatically.

## Guidelines to develop Gestalt Components
#### Scope of work
When pushing new changes to GitHub, your PR title should be aligned with the scope of your work. If your goal was to change the default color of a component, keep the scope of changes to that specific task and get the title exactly reflect those changes.

#### Not allowed changes. 
Do not use the following CSS style properties:

* line-height:  Property in CSS that controls the space between lines of text. Not defining a `line-height` allows the browser to determine line-height based on language which prevents localization issues.
* height/width: Height & width are CSS properties that can be used for determining the size of static assets such as an icon size. However, components that contain text data should not fix the height & width of the component to prevent incorrect styling under different cases such as localization, longer texts, etc. Consider other alternatives such as padding to define different component sizes.

Avoid: 
* Boolean props: For example, instead of `isRTL: boolean` or  `isStart: boolean isEnd: boolean` use more declarative props such as `layoutDirection: rtl | ltr` or `role: startInput | endInput`.
