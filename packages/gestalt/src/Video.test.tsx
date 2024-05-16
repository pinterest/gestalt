import {create} from 'react-test-renderer';
import Video from './Video';

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
      onPlay={() => {}}
      onPlayError={() => {}}
      preload="metadata"
      src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
      volume={0}
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video with callbacks', () => {
  const tree = create(
    <Video
      aspectRatio={1}
      captions="https://media.w3.org/2010/05/sintel/captions.vtt"
      onControlsPause={() => {}}
      onControlsPlay={() => {}}
      onDurationChange={() => {}}
      onEnded={() => {}}
      onFullscreenChange={() => {}}
      onLoadedChange={() => {}}
      onPlay={() => {}}
      onPlayError={() => {}}
      onReady={() => {}}
      onSeek={() => {}}
      onTimeChange={() => {}}
      onVolumeChange={() => {}}
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
      controls
      onPlay={() => {}}
      onPlayError={() => {}}
      src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
    >
      <div>overlay</div>
    </Video>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video with crossOrigin', () => {
  const tree = create(
    <Video
      aspectRatio={1}
      captions="https://media.w3.org/2010/05/sintel/captions.vtt"
      crossOrigin="anonymous"
      onPlay={() => {}}
      onPlayError={() => {}}
      src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video with objectFit', () => {
  const tree = create(
    <Video
      aspectRatio={1}
      captions="https://media.w3.org/2010/05/sintel/captions.vtt"
      objectFit="contain"
      onPlay={() => {}}
      onPlayError={() => {}}
      src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video with startTime', () => {
  const tree = create(
    <Video
      aspectRatio={1}
      captions="https://media.w3.org/2010/05/sintel/captions.vtt"
      onPlay={() => {}}
      onPlayError={() => {}}
      src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
      startTime={3}
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
