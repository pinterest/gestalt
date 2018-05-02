/* eslint-env jest */
import React from 'react';
import { create } from 'react-test-renderer';
import Video from '../Video';

test('Video with source', () => {
  const tree = create(
    <Video src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video with media attributes', () => {
  const tree = create(
    <Video
      autoPlay
      loop
      muted
      preload="metadata"
      src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video with callbacks', () => {
  const tree = create(
    <Video
      src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
      onDurationChange={() => {}}
      onPlay={() => {}}
      onPause={() => {}}
      onTimeUpdate={() => {}}
      onVolumeChange={() => {}}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
