/* eslint-env jest */
import React from 'react';
import { create } from 'react-test-renderer';
import Video from '../Video';

test('Video with source', () => {
  const tree = create(
    <Video
      captions="https://media.w3.org/2010/05/sintel/captions.vtt"
      src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video with multiple sources', () => {
  const tree = create(
    <Video
      captions="https://media.w3.org/2010/05/sintel/captions.vtt"
      src={[
        {
          type: 'video/mp4',
          src: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
        },
        {
          type: 'video/ogg',
          src: 'https://archive.org/download/ElephantsDream/ed_hd.ogv',
        },
      ]}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video with media attributes', () => {
  const tree = create(
    <Video
      captions="https://media.w3.org/2010/05/sintel/captions.vtt"
      loop
      volume={0}
      preload="metadata"
      src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video with callbacks', () => {
  const tree = create(
    <Video
      captions="https://media.w3.org/2010/05/sintel/captions.vtt"
      onDurationChange={() => {}}
      onFullscreenChange={() => {}}
      onPause={() => {}}
      onPlay={() => {}}
      onTimeUpdate={() => {}}
      onVolumeChange={() => {}}
      src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
