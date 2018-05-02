// @flow
import * as React from 'react';
import { Video } from 'gestalt';
import PropTable from './components/PropTable';
import Example from './components/Example';
import PageHeader from './components/PageHeader';
import CardPage from './components/CardPage';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Video"
    description="
Like an Image, a Video component is used to lay out media. This component is
supercharged with lots of goodies to turn a regular video in a full blown viewing experience.
"
  />
);

card(
  <PropTable
    props={[
      {
        name: 'autoPlay',
        type: 'boolean',
        description: 'The video will start playing as soon as it is ready',
      },
      {
        name: 'controls',
        type: 'boolean',
        description: 'Show the video player controls',
      },
      {
        name: 'loop',
        type: 'boolean',
        description: 'The video will start playing over again when finished',
      },
      {
        name: 'muted',
        type: 'boolean',
        description: 'Specifies if the audio for the video should be muted',
      },
      {
        name: 'onDurationChange',
        type: '({ event: SyntheticEvent<HTMLVideoElement> }) => void',
        description:
          'Sent when the metadata has loaded or changed, indicating a change in duration',
      },
      {
        name: 'onPlay',
        type: '({ event: SyntheticEvent<HTMLVideoElement> }) => void',
        description:
          'Sent when the media begins to play (either for the first time, after having been paused, or after ending and then restarting)',
      },
      {
        name: 'onPause',
        type: '({ event: SyntheticEvent<HTMLVideoElement> }) => void',
        description: 'Sent when playback is paused',
      },
      {
        name: 'onTimeUpdate',
        type: '({ event: SyntheticEvent<HTMLVideoElement> }) => void',
        description:
          "Sent when the time indicated by the element's currentTime attribute has changed",
      },
      {
        name: 'onVolumeChange',
        type: '({ event: SyntheticEvent<HTMLVideoElement> }) => void',
        description: 'Sent when the audio volume changes',
      },
      {
        name: 'poster',
        type: 'string',
        description: 'The image to show while the video is downloading',
      },
      {
        name: 'preload',
        type: `"auto" | "metadata" | "none"`,
        defaultValue: 'auto',
        description:
          'Specifies how, if any, the video should be loaded when the page loads',
      },
      {
        name: 'src',
        type: 'string',
        description: 'The URL of the video file to play',
      },
    ]}
    heading={false}
  />
);

card(
  <Example
    description={`
    The source url you pass into \`Video\` will be used to download and play the video file. While it is
    downloading the metadata, you may show a thumbnail image by using the \`poster\` prop.
  `}
    name="Video media basics"
    defaultCode={`
<Video
  poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
  src="http://media.w3.org/2010/05/bunny/movie.mp4"
/>
`}
    scope={{ Video }}
  />
);

card(
  <Example
    description={`
    \`Video\` supports the native HTML video attributes such as \`autoPlay\`, \`loop\`, \`muted\`, and more.
    Simply pass these through as props on the \`Video\` component.
  `}
    name="Native video attributes"
    defaultCode={`
<Video
  autoPlay
  loop
  muted
  src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
/>
`}
    scope={{ Video }}
  />
);

card(
  <Example
    description={`
    \`Video\` components can show a control bar to users in order to allow them access to certain features
    such as play/pause, time stamps, mute, and fullscreen. Pass in the \`controls\` prop to make them appear.
  `}
    name="Video controls"
    defaultCode={`
<Video controls src="http://media.w3.org/2010/05/bunny/movie.mp4" />
`}
    scope={{ Video }}
  />
);

export default () => <CardPage cards={cards} />;
