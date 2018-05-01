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
    The source url you pass into \`Video\` will be used to download and play the video file.
  `}
    name="Video"
    defaultCode={`
<Video controls src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
`}
    scope={{ Video }}
  />
);

export default () => <CardPage cards={cards} />;
