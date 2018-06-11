// @flow
/* eslint no-console:0 */
import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import fetch from 'node-fetch';
import filesize from 'filesize';

const organization = process.env.BUILDKITE_ORGANIZATION_SLUG || 'pinterest';
const pipeline = process.env.BUILDKITE_PIPELINE_SLUG || 'gestalt';
const token = process.env.BUILDKITE_API_TOKEN || '';
const currentBuild = process.env.BUILDKITE_BUILD_ID || '';
const BUILDKITE_API_BASE_URL = `https://api.buildkite.com/v2/organizations/${organization}/pipelines/${pipeline}`;

const outputSizeDiff = (size: { percentage: number, raw: number }) => {
  const emoji =
    size.raw < 0 ? ':small_red_triangle_down:' : ':small_red_triangle:';
  return `${emoji} ${Math.abs(size.percentage * 100).toFixed(1)}%`;
};

const generateMDTable = (headers, body): string => {
  const tableHeaders = [
    headers.join(' | '),
    headers.map(() => ' --- ').join(' | '),
  ];

  const tablebody = body.map(row => row.join(' | '));
  return `${tableHeaders.join('\n')}\n${tablebody.join('\n')}`;
};

type Result = {
  currentStats: { gzipSize: number, size: number },
  filename: string,
  gzipDiff: { percentage: number, raw: number },
  previousStats: { gzipSize: number, size: number },
  sizeDiff: { percentage: number, raw: number },
};

const generateOutput = (results: Array<Result>) => {
  if (!results.length) {
    return;
  }

  // Warn if bundle size increases
  if (results.find(result => result.sizeDiff.raw > 0)) {
    const title = ':file_folder: Bundlesize';
    const message = 'Bundle size increase detected, please review';
    warn(`${title} - <i>${message}</i>`);
  }

  const headers = [
    'Filename',
    'Size Diff',
    'Gzip Diff',
    'Prev Size',
    'Current Size',
    'Prev Gzip',
    'Current Gzip',
  ];

  const rows = results.map(result => [
    result.filename,
    outputSizeDiff(result.sizeDiff),
    outputSizeDiff(result.gzipDiff),
    filesize(result.previousStats.size),
    filesize(result.currentStats.size),
    filesize(result.previousStats.gzipSize),
    filesize(result.currentStats.gzipSize),
  ]);

  markdown(generateMDTable(headers, rows));
};

const getBuildNumber = async () => {
  const { sha } = danger.github.pr.base;
  console.log(`Fetching stats for base commit: ${sha}`);
  // Yen - fetching via API because i didn't see a way to get the build number for a commit via buildkite-agent
  const endpoint = `${BUILDKITE_API_BASE_URL}/builds?commit=${sha}&access_token=${token}`;
  const response = await fetch(endpoint);
  const responseJson = await response.json();
  return responseJson[0].id;
};

const getStats = (buildNumber: string) => {
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
  } catch (error) {
    throw error;
  }
};

export default function bundlesize() {
  getBuildNumber()
    .then(getStats)
    .then(generateOutput)
    .catch(error =>
      console.error(
        `Error performing bundle size comparison: ${error.toString()}`
      )
    );
}
