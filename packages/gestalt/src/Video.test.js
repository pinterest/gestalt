// @flow strict
import { create } from 'react-test-renderer';
import Video from './Video.js';

test('Video with source', () => {
  const tree = create(
    <Video
      aspectRatio={1}
      captions="https://media.w3.org/2010/05/sintel/captions.vtt"
      onPlay={() => {}}
      onPlayError={() => {}}
      src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video with multiple sources', () => {
  const tree = create(
    <Video
      aspectRatio={1}
      captions="https://media.w3.org/2010/05/sintel/captions.vtt"
      onPlay={() => {}}
      onPlayError={() => {}}
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
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video with media attributes', () => {
  const tree = create(
    <Video
      aspectRatio={1}
      captions="https://media.w3.org/2010/05/sintel/captions.vtt"
      loop
      volume={0}
      onPlay={() => {}}
      onPlayError={() => {}}
      preload="metadata"
      src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video with callbacks', () => {
  const tree = create(
    <Video
      aspectRatio={1}
      captions="https://media.w3.org/2010/05/sintel/captions.vtt"
      onDurationChange={() => {}}
      onEnded={() => {}}
      onFullscreenChange={() => {}}
      onLoadedChange={() => {}}
      onControlsPause={() => {}}
      onControlsPlay={() => {}}
      onReady={() => {}}
      onSeek={() => {}}
      onTimeChange={() => {}}
      onVolumeChange={() => {}}
      onPlay={() => {}}
      onPlayError={() => {}}
      src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video with children', () => {
  const tree = create(
    <Video
      aspectRatio={1}
      captions="https://media.w3.org/2010/05/sintel/captions.vtt"
      src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
      controls
      onPlay={() => {}}
      onPlayError={() => {}}
    >
      <div>overlay</div>
    </Video>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video with crossOrigin', () => {
  const tree = create(
    <Video
      crossOrigin="anonymous"
      aspectRatio={1}
      captions="https://media.w3.org/2010/05/sintel/captions.vtt"
      src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
      onPlay={() => {}}
      onPlayError={() => {}}
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video with objectFit', () => {
  const tree = create(
    <Video
      objectFit="contain"
      aspectRatio={1}
      captions="https://media.w3.org/2010/05/sintel/captions.vtt"
      src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
      onPlay={() => {}}
      onPlayError={() => {}}
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video with startTime', () => {
  const tree = create(
    <Video
      startTime={3}
      aspectRatio={1}
      captions="https://media.w3.org/2010/05/sintel/captions.vtt"
      src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
      onPlay={() => {}}
      onPlayError={() => {}}
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
