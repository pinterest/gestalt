/* eslint no-console:0 */
/*

Usage:

    $ yarn global add babel-cli
    $ yarn add gestalt benchmark
    $ babel-node ./boxperf.js

*/
import { Box as PublishedBox } from 'gestalt';
import { Box as DevelopmentBox } from '../dist/gestalt.es.js';
import Benchmark from 'benchmark';

const emptyProps = {};
const lotsOfProps = {
  xs: { display: 'flex' },
  alignItems: 'center',
  padding: 1,
  marginLeft: -1,
  marginRight: -1,
  top: true,
  bottom: true,
  left: true,
  right: true,
};

const emptyPropsSuite = new Benchmark.Suite();
const lotsOfPropsSuite = new Benchmark.Suite();

emptyPropsSuite
  .add('Published Box', () => {
    PublishedBox(emptyProps);
  })
  .add('Development Box', () => {
    DevelopmentBox(emptyProps);
  })
  .on('cycle', event => {
    console.log(String(event.target));
  })
  .on('complete', function complete() {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .run();

lotsOfPropsSuite
  .add('Published Box w/ lots of props', () => {
    PublishedBox(lotsOfProps);
  })
  .add('Development Box w/ lots of props', () => {
    DevelopmentBox(lotsOfProps);
  })
  .on('cycle', event => {
    console.log(String(event.target));
  })
  .on('complete', function complete() {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .run();
