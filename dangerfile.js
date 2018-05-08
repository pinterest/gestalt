// @flow
import { danger, markdown, warn } from 'danger';
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
  return responseJson[0].id;
};

const outputSizeDiff = (size: { percentage: number, raw: number }) => {
  const emoji =
    size.raw < 0 ? ':small_red_triangle_down:' : ':small_red_triangle:';
  return `${emoji} ${Math.abs(size.percentage * 100).toFixed(1)}%`;
};

const generateOutput = (
  results: Array<{
    currentStats: { gzipSize: number, size: number },
    filename: string,
    gzipDiff: { percentage: number, raw: number },
    previousStats: { gzipSize: number, size: number },
    sizeDiff: { percentage: number, raw: number },
  }>
) => {
  if (!results.length) {
    return;
  }
  if (results.find(result => result.sizeDiff.raw > 0)) {
    // warn if bundle size increases
    warn('Bundle size increase');
  }

  const headers = [
    'Filename',
    'Filesize Diff',
    'Gzip Diff',
    'Prev Size',
    'Current Size',
    'Prev Gzip',
    'Current Gzip',
  ];
  const rows = results.map(result =>
    [
      result.filename,
      outputSizeDiff(result.sizeDiff),
      outputSizeDiff(result.gzipDiff),
      result.previousStats.size,
      results.currentStats.size,
      results.previousStats.gzipSize,
      results.currentStats.gzipSize,
    ].join(' | ')
  );
  markdown(`
    ${headers.join(' | ')}\n
    ${headers.map(() => ' --- ').join(' | ')}\n
    ${rows.join('\n')}
  `);
};

const baseCommit = danger.github.pr.base.sha;
// const currentCommit = danger.github.pr.head.sha;
// Yen - fetching via API because i didn't see a way to get the build number for a commit via buildkite-agent
console.log(`Fetching stats for base commit: ${baseCommit}`);
getBuildNumber(baseCommit)
  .then(buildNumber => {
    console.log('Creating temp directories');
    execSync('mkdir -p ./tmp/previous');
    execSync('mkdir -p ./tmp/current');
    console.log('Downloading stats from current build');
    execSync(
      `buildkite-agent artifact download dist/stats.json tmp/current/ --build ${currentBuild}`
    );
    try {
      const current = JSON.parse(
        readFileSync('./tmp/current/dist/stats.json', 'utf8')
      );
      console.log(`Downloading stats from previous build: ${buildNumber}`);
      execSync(
        `buildkite-agent artifact download dist/stats.json tmp/previous/ --build ${buildNumber}`
      );
      const previous = JSON.parse(
        readFileSync('./tmp/previous/dist/stats.json', 'utf-8')
      );
      return Object.keys(current).reduce((results, filename) => {
        const previousStats = previous[filename];
        const currentStats = current[filename];

        if (previousStats && previousStats.size !== currentStats.size) {
          const sizeDiff = currentStats.size - previousStats.size;
          const gzipDiff = currentStats.gzipSize - previousStats.gzipSize;
          results.push({
            currentStats,
            filename,
            gzipDiff: {
              percentage: gzipDiff / previousStats.gzipSize,
              raw: gzipDiff,
            },
            previousStats,
            sizeDiff: {
              percentage: sizeDiff / previousStats.size,
              raw: sizeDiff,
            },
          });
        }
        return results;
      }, []);
    } catch (e) {
      // rethrow for catch
      throw e;
    }
  })
  .then(generateOutput)
  .catch(e => {
    console.error(`Error performing bundle size comparison: ${e.toString()}`);
  });
