/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable class-methods-use-this */
/* eslint-disable flowtype/require-valid-file-annotation */

const FailedRuns = [];
let startTime = 0;
class MyReporter {
  onBegin(config, suite) {
    console.log(`Starting the run with ${suite.allTests().length} tests`);
    startTime = new Date().getTime();
  }

  onTestBegin() {}

  onTestEnd(test, result) {
    if (result.status === 'failed') {
      FailedRuns.push(test);
    }
  }

  onEnd(result) {
    // duration
    const endTime = new Date().getTime();
    const duration = endTime - startTime;
    // get duration in minutes and seconds
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);

    if (result.status === 'failed') {
      console.log(`### Failed Visual Snapshots`);
      console.log(`Total Test Run Time: ${minutes}:${seconds}`);

      FailedRuns.forEach((test) => {
        console.log(`- ${test.title}`);
      });
    } else {
      console.log(`All tests passed ✅`);
      console.log(`Total Test Run Time: ${minutes}:${seconds}`);
    }
  }
}

export default MyReporter;
