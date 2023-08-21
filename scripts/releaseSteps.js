#!/usr/bin/env node
/* eslint import/no-dynamic-require: 0, no-console: 0 */
const fsPromises = require('fs').promises;
const path = require('path');
const core = require('@actions/core');
const { getOctokit, context } = require('@actions/github');
const prettier = require('prettier');
const semver = require('semver');
const shell = require('shelljs');

function packageDirectory(item) {
  return path.join(__dirname, '..', 'packages', item);
}

function packageJSONPath(item) {
  return path.join(__dirname, '..', 'packages', item, 'package.json');
}
function srcDirectory(item) {
  return path.join(__dirname, '..', 'packages', item, 'src');
}

// The order of these packages is important!
// The gestalt package depends on the tokens package, so that must be listed first.
const packages = [
  'gestalt-design-tokens',
  'gestalt',
  'gestalt-charts',
  'gestalt-datepicker',
  'eslint-plugin-gestalt',
];
const packageJSON = packageJSONPath('gestalt');
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

- ${lastCommitMessage.replace(/(\(#\d+\))/g, (value) => {
    const PR = value.replace('(', '').replace(')', '').replace('#', '');
    return `([#${PR}](https://github.com/pinterest/gestalt/pull/${PR})) - [Preview link](https://deploy-preview-${PR}--gestalt.netlify.app?devexample=true)`;
  })}`;
}

async function bumpPackageVersion() {
  // Define the version bump type depending on the attached label:
  // - 'patch release'
  // - 'minor release'
  // - 'major release'
  const types = ['patch', 'minor', 'major', 'prerelease'];
  const releaseType = types.find((type) =>
    (process.env.LABELS || '').toLowerCase().includes(`${type} release`),
  );

  // Previous version
  const { version: previousVersion } = packageJSONParsed;

  // if it's a pre-release, add an alpha modifier
  const isAlpha = releaseType === 'prerelease' ? 'alpha' : undefined;

  // Bump gestalt version number
  const newVersion = semver.inc(previousVersion, releaseType, isAlpha);

  await Promise.all(
    packages.map(async (item) => {
      const individualPackageJSON = packageJSONPath(item);
      // eslint-disable-next-line global-require
      const individualPackageJSONParsed = require(individualPackageJSON);
      individualPackageJSONParsed.version = newVersion;
      await fsPromises.writeFile(
        individualPackageJSON,
        `${JSON.stringify(individualPackageJSONParsed, null, 2)}\n`,
      );
    }),
  );

  return { previousVersion, newVersion, releaseType };
}

async function formatWithPrettier({ filePath, text }) {
  const options = await prettier.resolveConfig(filePath);
  return prettier.format(text, options);
}

async function updateChangelog({ releaseNotes }) {
  const changelogPath = './CHANGELOG.md';
  const previousChangelog = await fsPromises.readFile(changelogPath, {
    encoding: 'utf8',
  });

  const output = await formatWithPrettier({
    filePath: changelogPath,
    text: `${releaseNotes}

${previousChangelog}`,
  });

  await fsPromises.writeFile(changelogPath, output);
}

function commitChanges({ message }) {
  shell.exec('git add .');
  shell.exec('git config --global user.email "pinterest.gestalt@gmail.com"');
  shell.exec('git config --global user.name "Gestalt Bot"');
  shell.exec(`git commit -am "${message}"`);
}

function pushChanges(releaseType) {
  let upstreamBranch = 'origin master';
  if (releaseType === 'prerelease') {
    upstreamBranch = 'origin alpha';
  }
  shell.exec(`git push --set-upstream ${upstreamBranch}`);
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

function cleanSource() {
  packages.forEach((packageName) => {
    const src = srcDirectory(packageName);
    shell.exec(`find ${src} -type f -name "*.flowtest.js" -delete`);
    shell.exec(`find ${src} -type f -name "*.test.js" -delete`);
    shell.exec(`find ${src} -type d -name "__fixtures__" -exec rm -rf {} +`);
    shell.exec(`find ${src} -type d -name "__snapshots__" -exec rm -rf {} +`);

    // Convert .js to .js.flow so to disallow imports under `src/*`
    shell.exec(
      `find ${src} -type f -name "*.js" -exec sh -c 'mv "$1" "\${1%.js}.js.flow"' _ {} \\;`,
    );
  });
}

function buildPackages() {
  packages.forEach((packageName) => {
    const src = packageDirectory(packageName);
    shell.exec(`cd ${src}; yarn build:prod`);
  });
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
  commitChanges({ message: `Version bump: v${newVersion}` });

  pushChanges(releaseType);

  console.log(`\nBuild packages`);
  buildPackages();

  console.log('\nClean src/ directories & Convert .js to .js.flow');
  cleanSource();
  commitChanges({ message: `v${newVersion}: Clean source` });

  /**
   * If it's a pre-release, don't make a GH release for it
   */
  if (releaseType !== 'prerelease') {
    console.log('\nCreate GitHub Release');
    const { releaseId, htmlUrl, uploadUrl } = await createGitHubRelease({
      newVersion,
      releaseNotes,
    });
    console.log('id', releaseId);
    console.log('html_url', htmlUrl);
    console.log('upload_url', uploadUrl);
  }

  // Export new version so it can be used by other steps
  console.log('\nOutput new version');
  core.setOutput('VERSION', newVersion);
})();
