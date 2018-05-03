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
        name: 'onFullScreenChange',
        type: '({ event: Event }) => void',
        description: 'Sent when the video full screen status changes',
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
    name="Video media basics"
    description={`
    The source url you pass into \`Video\` will be used to download and play the video file. While it is
    downloading the metadata, you may show a thumbnail image by using the \`poster\` prop.
  `}
    defaultCode={`
<Video
  poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
  src="http://media.w3.org/2010/05/bunny/movie.mp4"
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
  autoPlay
  loop
  muted
  src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
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
<Video controls src="http://media.w3.org/2010/05/bunny/movie.mp4" />
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
    this.state = {
      input: "http://media.w3.org/2010/05/bunny/movie.mp4",
      src: "http://media.w3.org/2010/05/bunny/movie.mp4",
      muted: false
    };
  }

  _handleChangeInput({ value }) {
    this.setState({ input: value });
  }

  _handleToggleMute() {
    this.setState({ muted: !this.state.muted });
  }

  _handleSubmitInput() {
    this.setState({ src: this.state.input });
  }

  render() {
    const { input, src, muted } = this.state;
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
            text={muted ? "Unmute" : "Mute"}
            onClick={this.handleToggleMute}
          />
        </Box>
        <Video controls muted={muted} src={src} />
      </Box>
    );
  }
}
`}
  />
);

export default () => <CardPage cards={cards} />;
