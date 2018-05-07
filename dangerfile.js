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
const BUILDKITE_API_BASE_URL = `https://api.buildkite.com/v3/organizations/${env.BUILDKITE_ORGANIZATION_SLUG}/pipelines/${env.BUILDKITE_PIPELINE_SLUG}`;

const getBuildNumber = async (sha: string) => {
  const response = await fetch(
    `${BUILDKITE_API_BASE_URL}/builds?commit=${sha}`
  );
  const responseJson = await response.toJson();
  return responseJson[0].id;
};

const baseCommit = danger.github.pr.base.sha;
// const currentCommit = danger.github.pr.head.sha;
const currentStats = JSON.parse(
  readFileSync('./packages/gestalt/dist/stats.json', 'utf8')
);
// Yen - fetching via API because i didn't see a way to get the build number for a commit via buildkite-agent
console.log(`Fetching stats for base commit: ${baseCommit}`);
getBuildNumber(baseCommit).then(buildNumber => {
  console.log(`Downloading stats from build: ${buildNumber}`);
  execSync(
    `buildkite-agent artifact download stats.json tmp/previous-stats.json --build ${buildNumber}`
  );
  const previousStats = JSON.parse(
    readFileSync('./tmp/previous-stats.json', 'utf-8')
  );
  console.log(currentStats);
  console.log(previousStats);
});
