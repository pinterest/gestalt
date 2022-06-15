---
title: Development
description: 
component: true
---

## Set up your laptop

- Install a code editor - we recommended [VS Code](#)
- **Install nvm**
- **Install node**
- **Install yarn**
- **[Install Docker desktop](333)** \
You can also run the following command `brew install docker`

## Set up your Gestalt repository

- Clone the repo: Fork the Gestalt repo and work off your forked repo, not the `pintertest/gestalt` repo.

- Once forked, clone to your local machine using the SSH option

``` bash
git clone git@github.com:<YOUR_USERNAME>/gestalt.git
```

- Use the correct Node.js version to setup the environment locally

``` bash
git clone git@github.com:<YOUR_USERNAME>/gestalt.git
```

<Hint>If the node version isn't available, you will need to [install](#) it.</Hint>



- Install project dependencies. Do not run npm install because it will create a package-lock.json file (and also takes considerably longer).

``` bash
yarn
```

- Add pinterest/gestalt as a remote upstream (you'll only need to do this once).

``` bash
git remote add upstream git@github.com:pinterest/gestalt.git
```

- Check your remote configuration

``` bash
git remote -v
// origin    git@github.com:<YOUR_USERNAME>/gestalt.git (fetch)
// origin    git@github.com:<YOUR_USERNAME>/gestalt.git (push)
// upstream    git@github.com:pinterest/gestalt.git (fetch)
// upstream    git@github.com:pinterest/gestalt.git (push)
```

### Set up Visual Studio Code

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

``` bash
git fetch upstream
git rebase upstream/master
```


- Create an checkout a branch. Replace the text `<feature-branch>` with your branch name

``` bash
git checkout -b <feature-branch> upstream/master
```

- Time to make changes to Gestalt! If you are introducing a new component, run the scaffolding command to generate the necessary files. Replace ‘ComponentName‘ with the name of your component.

``` bash
yarn generate ComponentName
```

- Any subsequent component changes might require the following actions.
  - Run unit tests
  ```bash
  yarn jest -u
  ```
  - Run Playwright accessibility integration tests. If any documentation examples are expected to fail accessibility testing, wrap the example in a container with `data-skip-accessibility-check`.
  ```bash
  yarn playwright:test accessibility/
  ```
  - Run Playwright visual diff snapshot tests. If any component changes are expected to visually modify your component, you must update the snapshot tests. In order to update the Linux snapshots in the tests, you must build a docker file and then run docker.
  ```bash
  # Start the documentation server (required for updating macOS snapshots)
  yarn start
  #
  # Update macOS snapshots
  yarn playwright:test visual-test/ --update-snapshots
  ```
  ```bash
  # Build the docker container (only need to do this once)
  yarn docker:build
  #
  # Update the linux snapshots
  yarn docker:run
  ```

