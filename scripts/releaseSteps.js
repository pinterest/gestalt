#!/usr/bin/env node
/* eslint import/no-dynamic-require: 0, no-console: 0 */
const path = require('path');
const shell = require('shelljs');
const semver = require('semver');
const fsPromises = require('fs').promises;

const core = require('@actions/core');
const { getOctokit, context } = require('@actions/github');

const packageJSON = path.join(__dirname, '..', 'packages', 'gestalt', 'package.json');
const packageJSONParsed = require(packageJSON);

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function getLastCommitMessage() {
  // Example: `Icon: Adding story pin icon #minor (#842)`
  return shell.exec('git log -n1 --pretty=format:"%s"', {
    silent: true,
  }).stdout;
}

async function getReleaseNotes({ lastCommitMessage, newVersion, releaseType }) {
  // Format date: "May 7, 2020"
  const date = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return `## ${newVersion} (${date})

### ${capitalizeFirstLetter(releaseType)}

- ${lastCommitMessage}`;
}

async function bumpPackageVersion() {
  // Define the version bump type depending on the attached label:
  // - 'patch release'
  // - 'minor release'
  // - 'major release'
  const types = ['patch', 'minor', 'major'];
  const releaseType = types.find((type) =>
    (process.env.LABELS || '').toLowerCase().includes(`${type} release`),
  );

  // Previous version
  const { version: previousVersion } = packageJSONParsed;

  // Bump gestalt version number
  const newVersion = semver.inc(previousVersion, releaseType);
  packageJSONParsed.version = newVersion;

  await fsPromises.writeFile(packageJSON, `${JSON.stringify(packageJSONParsed, null, 2)}\n`);

  return { previousVersion, newVersion, releaseType };
}

async function updateChangelog({ releaseNotes }) {
  const changelogPath = './CHANGELOG.md';
  const previousChangelog = await fsPromises.readFile(changelogPath, {
    encoding: 'utf8',
  });

  await fsPromises.writeFile(
    changelogPath,
    `${releaseNotes}

${previousChangelog}`,
  );
}

async function commitChanges({ newVersion }) {
  shell.exec('git add .');
  shell.exec('git config --global user.email "pinterest.gestalt@gmail.com"');
  shell.exec('git config --global user.name "Gestalt Bot"');
  shell.exec(`git commit -am "Version bump: v${newVersion}"`);
  shell.exec('git push --set-upstream origin master');
}

async function createGitHubRelease({ newVersion, releaseNotes }) {
  const octokit = getOctokit(process.env.GITHUB_TOKEN);
  const { owner, repo } = context.repo;

  const createReleaseResponse = await octokit.repos.createRelease({
    owner,
    repo,
    tag_name: `v${newVersion}`,
    name: `v${newVersion}`,
    body: releaseNotes,
  });

  const {
    data: { id: releaseId, html_url: htmlUrl, upload_url: uploadUrl },
  } = createReleaseResponse;

  return { releaseId, htmlUrl, uploadUrl };
}

(async () => {
  console.log('Running Gestalt Release Steps');
  console.log(`Labels: ${process.env.LABELS || '(no labels set)'}`);

  console.log('\nGet last commit message');
  const lastCommitMessage = await getLastCommitMessage();
  console.log(`Last commit message: ${lastCommitMessage}`);

  console.log('\nGet last commit message');
  const { newVersion, previousVersion, releaseType } = await bumpPackageVersion();
  console.log(`Release type: ${releaseType}`);
  console.log(`Previous version: ${previousVersion}`);
  console.log(`New version: ${newVersion}`);

  console.log(`\nRelease notes`);
  const releaseNotes = await getReleaseNotes({
    lastCommitMessage,
    newVersion,
    releaseType,
  });
  console.log(`Release notes: ${releaseNotes}`);

  console.log('\nUpdate Changelog');
  await updateChangelog({ releaseNotes });

  console.log('\nCommit Changes');
  await commitChanges({ newVersion });

  console.log('\nCreate GitHub Release');
  const { releaseId, htmlUrl, uploadUrl } = await createGitHubRelease({
    newVersion,
    releaseNotes,
  });
  console.log('id', releaseId);
  console.log('html_url', htmlUrl);
  console.log('upload_url', uploadUrl);

  // Export new version so it can be used by other steps
  console.log('\nOutput new version');
  core.setOutput('VERSION', newVersion);
})();
