// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import VideoPlayhead from '../VideoPlayhead';

test('VideoPlayhead', () => {
  const tree = create(
    <VideoPlayhead currentTime={50} duration={100} seek={() => {}} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
