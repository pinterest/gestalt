// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import VideoPlayhead from './VideoPlayhead.js';

test('VideoPlayhead', () => {
  const tree = create(
    <VideoPlayhead
      currentTime={50}
      duration={100}
      seek={() => {}}
      onPlayheadDown={() => {}}
      onPlayheadUp={() => {}}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
