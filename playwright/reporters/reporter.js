/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable class-methods-use-this */
/* eslint-disable flowtype/require-valid-file-annotation */

const FailedRuns = {};
let startTime = 0;
class MyReporter {
  onBegin(config, suite) {
    console.log(`Running ${suite.allTests().length} tests`);
    startTime = new Date().getTime();
  }

  onTestBegin() {}

  onTestEnd(test, result) {
    if (result.status === 'failed' && test.retry > 1) {
      // get the first word of the test title
      const title = test.title.split(' ')[0];
      FailedRuns[title] = test;
    }
  }

  onEnd(result) {
    // duration
    const endTime = new Date().getTime();
    const duration = endTime - startTime;
    // get duration in minutes and seconds
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);

    console.log(`This is an automated visual test report.`);

    if (result.status === 'failed') {
      console.log(`### Failed Visual Snapshots ❌`);
      console.log(
        'These test failures may or may not be related to your changes. These are not blocking.',
      );

      console.log(Object.keys(FailedRuns).length, ' failed visual tests:');

      Object.keys(FailedRuns).forEach((title) => {
        console.log(`- ${title}`);
      });

      console.log(`To see the failed tests, run the following command:`);
      console.log(`yarn run playwright:visual-test test --ui"`);

      console.log(`To update failed tests, run`);
      console.log(`yarn run playwright:visual-test --update-snapshots"`);

      console.log(`Total Test Run Time: ${minutes}:${seconds}`);
    } else {
      console.log(`All visual tests passed ✅`);
      console.log(`Total Test Run Time: ${minutes}:${seconds}`);
    }
  }
}

export default MyReporter;
