// @flow
import { danger, warn } from 'danger';
import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import fetch from 'node-fetch';

if (!danger.git.modified_files.includes('CHANGELOG.md')) {
  warn(
    'Please add a [changelog.md](https://github.com/pinterest/gestalt/blob/master/CHANGELOG.md) entry for your changes.'
  );
}

// Bundle Size Alerting
const organization = process.env.BUILDKITE_ORGANIZATION_SLUG || 'pinterest';
const pipeline = process.env.BUILDKITE_PIPELINE_SLUG || 'gestalt';
const apiKey = process.env.BUILDKITE_API_TOKEN || '';
const currentBuild = process.env.BUILDKITE_BUILD_ID || '';
const BUILDKITE_API_BASE_URL = `https://api.buildkite.com/v2/organizations/${organization}/pipelines/${pipeline}`;

const getBuildNumber = async (sha: string) => {
  const response = await fetch(
    `${BUILDKITE_API_BASE_URL}/builds?commit=${sha}&access_token=${apiKey}`
  );
  const responseJson = await response.json();
  console.log(responseJson);
  return responseJson[0].id;
};

const baseCommit = danger.github.pr.base.sha;
// const currentCommit = danger.github.pr.head.sha;
// Yen - fetching via API because i didn't see a way to get the build number for a commit via buildkite-agent
console.log(`Fetching stats for base commit: ${baseCommit}`);
getBuildNumber(baseCommit).then(buildNumber => {
  console.log('Creating temp directories');
  execSync('mkdir -p ./tmp/previous');
  execSync('mkdir -p ./tmp/current');
  console.log('Downloading stats from current build');
  execSync(
    `buildkite-agent artifact download dist/stats.json tmp/current/ --build ${currentBuild}`
  );
  const currentStats = JSON.parse(
    readFileSync('./tmp/current/dist/stats.json', 'utf8')
  );
  console.log(currentStats);
  console.log(`Downloading stats from build: ${buildNumber}`);
  execSync(
    `buildkite-agent artifact download dist/stats.json tmp/previous/ --build ${buildNumber}`
  );
  const previousStats = JSON.parse(
    readFileSync('./tmp/previous/dist/stats.json', 'utf-8')
  );
  console.log(previousStats);
});
