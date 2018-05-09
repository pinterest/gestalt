// @flow
import * as React from 'react';
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
        name: 'accessibilityMaximizeLabel',
        type: 'string',
        description:
          'Accessibility label for the fullscreen maximize button if controls are shown',
      },
      {
        name: 'accessibilityMinimizeLabel',
        type: 'string',
        description:
          'Accessibility label for the fullscreen minimize button if controls are shown',
      },
      {
        name: 'accessibilityMuteLabel',
        type: 'string',
        description:
          'Accessibility label for the mute button if controls are shown',
      },
      {
        name: 'accessibilityPauseLabel',
        type: 'string',
        description:
          'Accessibility label for the pause button if controls are shown',
      },
      {
        name: 'accessibilityPlayLabel',
        type: 'string',
        description:
          'Accessibility label for the play button if controls are shown',
      },
      {
        name: 'accessibilityUnmuteLabel',
        type: 'string',
        description:
          'Accessibility label for the unmute button if controls are shown',
      },
      {
        name: 'captions',
        type: 'string',
        description: 'The URL of the captions track for the video (.vtt file)',
        required: true,
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
        name: 'onDurationChange',
        type:
          '({ event: SyntheticEvent<HTMLVideoElement>, duration: number }) => void',
        description:
          'Sent when the metadata has loaded or changed, indicating a change in duration',
      },
      {
        name: 'onFullscreenChange',
        type: '({ event: Event, fullscreen: boolean }) => void',
        description: 'Sent when the video full screen status changes',
      },
      {
        name: 'onPlay',
        type: '() => void',
        description:
          'Sent when playback of the media starts after having been paused',
      },
      {
        name: 'onPause',
        type: '() => void',
        description: 'Sent when playback is paused',
      },
      {
        name: 'onTimeUpdate',
        type:
          '({ event: SyntheticEvent<HTMLVideoElement>, currentTime: number }) => void',
        description:
          "Sent when the time indicated by the element's currentTime attribute has changed",
      },
      {
        name: 'onVolumeChange',
        type: '({ volume: number }) => void',
        description: 'Sent when the audio volume changes',
      },
      {
        name: 'playing',
        type: 'boolean',
        description: 'Specifies whether the video should play or not',
        defaultValue: false,
      },
      {
        name: 'playsInline',
        type: 'boolean',
        description:
          'Indicates that the video is to be played "inline" where supported',
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
        type:
          'string | Array<{| type: "video/m3u8" | "video/mp4" | "video/ogg, src: string |}>',
        description: `The URL of the video file to play. This can also be supplied as a list of video types to respective
          video source urls in fallback order for support on various browsers.`,
        required: true,
      },
      {
        name: 'volume',
        type: 'number',
        description:
          'Specifies the volume of the video audio: 0 for muted, 1 for max',
        defaultValue: 1,
      },
    ]}
    heading={false}
  />
);

card(
  <Example
    name="Video media basics"
    description={`
    The source url you pass into \`Video\` will be used to download and play the video file. While it is
    downloading the metadata, you may show a thumbnail image by using the \`poster\` prop.
  `}
    defaultCode={`
<Video
  captions=""
  poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
  src="http://media.w3.org/2010/05/bunny/movie.mp4"
/>
`}
  />
);

card(
  <Example
    name="Video multiple sources"
    description={`
    Not all browsers support the same video encoding types. If you have multiple video file sources, you can pass
    them as a list to \`Video\` in the order you want the HTML video tag to use as fallbacks.
  `}
    defaultCode={`
<Video
  captions=""
  playing
  volume={0}
  src={[
    {
      type: "video/mp4",
      src: "https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4"
    },
    {
      type: "video/ogg",
      src: "https://archive.org/download/ElephantsDream/ed_hd.ogv"
    },
  ]}
/>
`}
  />
);

card(
  <Example
    name="Native video attributes"
    description={`
    \`Video\` supports the native HTML video attributes such as \`autoPlay\`, \`loop\`, \`muted\`, and more.
    Simply pass these through as props on the \`Video\` component.
  `}
    defaultCode={`
<Video
  captions=""
  loop
  playing
  src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
  volume={0}
/>
`}
  />
);

card(
  <Example
    name="Video controls"
    description={`
    \`Video\` components can show a control bar to users in order to allow them access to certain features
    such as play/pause, time stamps, mute, and fullscreen. Pass in the \`controls\` prop to make them appear.
  `}
    defaultCode={`
<Video
  accessibilityMaximizeLabel="Maximize"
  accessibilityMinimizeLabel="Minimize"
  accessibilityMuteLabel="Mute"
  accessibilityPauseLabel="Pause"
  accessibilityPlayLabel="Play"
  accessibilityUnmuteLabel="Unmute"
  captions=""
  controls
  src="http://media.w3.org/2010/05/bunny/movie.mp4"
/>
`}
  />
);

card(
  <Example
    name="Video updates"
    description={`
    \`Video\` is robust enough to handle any updates to it such as changing the source or muting.`}
    defaultCode={`
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeInput = this._handleChangeInput.bind(this);
    this.handleToggleMute = this._handleToggleMute.bind(this);
    this.handleSubmitInput = this._handleSubmitInput.bind(this);
    this.handleVolumeChange = this._handleVolumeChange.bind(this);
    this.state = {
      input: "http://media.w3.org/2010/05/bunny/movie.mp4",
      src: "http://media.w3.org/2010/05/bunny/movie.mp4",
      volume: 1,
    };
  }

  _handleChangeInput({ value }) {
    this.setState({ input: value });
  }

  _handleToggleMute() {
    this.setState({ volume: this.state.volume === 0 ? 1 : 0 });
  }

  _handleVolumeChange({ volume }) {
    this.setState({ volume });
  }

  _handleSubmitInput() {
    this.setState({ src: this.state.input });
  }

  render() {
    const { input, src, volume } = this.state;
    return (
      <Box>
        <Box paddingY={2}>
          <Box marginBottom={2}>
            <Label htmlFor="video-source">
              <Text>Video source URL</Text>
            </Label>
          </Box>
          <Box display="flex" marginLeft={-1} marginRight={-1}>
            <Box flex="grow" paddingX={1}>
              <TextField
                id="video-source"
                onChange={this.handleChangeInput}
                value={input}
              />
            </Box>
            <Box paddingX={1}>
              <Button
                text="Submit"
                color="red"
                onClick={this.handleSubmitInput}
              />
            </Box>
          </Box>
        </Box>
        <Box paddingY={2}>
          <Button
            text={volume === 0 ? "Unmute" : "Mute"}
            onClick={this.handleToggleMute}
          />
        </Box>
        <Video
          accessibilityMaximizeLabel="Maximize"
          accessibilityMinimizeLabel="Minimize"
          accessibilityMuteLabel="Mute"
          accessibilityPauseLabel="Pause"
          accessibilityPlayLabel="Play"
          accessibilityUnmuteLabel="Unmute"
          captions=""
          controls
          onVolumeChange={this.handleVolumeChange}
          src={src}
          volume={volume}
        />
      </Box>
    );
  }
}
`}
  />
);

export default () => <CardPage cards={cards} />;
