/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable class-methods-use-this */
/* eslint-disable flowtype/require-valid-file-annotation */

const FailedRuns = {};
let startTime = 0;
class MyReporter {
  onBegin(config, suite) {
    console.log(`This is an automated test report`);
    console.log(`Running ${suite.allTests().length} tests`);
    startTime = new Date().getTime();
  }

  onTestBegin() {}

  onTestEnd(test, result) {
    if (result.status === 'failed') {
      // get the first word of the test title
      const title = test.title.split(' ')[0];
      FailedRuns[title] = test;
    }
  }

  onEnd() {
    // duration
    const endTime = new Date().getTime();
    const duration = endTime - startTime;
    // get duration in minutes and seconds
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);

    if (Object.keys(FailedRuns).length > 0) {
      console.log(`### Failed Visual Snapshots ❌`);
      console.log('-----------------------------------');
      console.log(
        'Note: These test failures may or may not be related to your changes. They are not blocking.',
      );

      console.log('');
      console.log(Object.keys(FailedRuns).length, ' failed visual tests:');

      Object.keys(FailedRuns).forEach((title) => {
        console.log(`- ${title}`);
      });

      console.log(`To see the failed tests, run the following command locally:`);
      console.log(`\`yarn run playwright:visual-test test --ui\``);

      console.log('');
      console.log('');

      console.log(`To update failed tests, run`);
      console.log(`\`yarn run playwright:visual-test --update-snapshots\``);

      console.log('');

      console.log(`Total Test Run Time: ${minutes}m ${seconds}s`);
    } else {
      console.log(`All visual tests passed ✅`);
      console.log(`Total Test Run Time: ${minutes}m  ${seconds}s`);
    }
  }
}

export default MyReporter;
