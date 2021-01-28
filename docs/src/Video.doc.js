// @flow strict
import React, { type Node } from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Video"
    description="
Like an Image, a Video component is used for media layout. This component is
supercharged with lots of goodies to turn a regular video in a full blown viewing experience.
"
  />,
);

card(
  <PropTable
    props={[
      {
        name: 'accessibilityMaximizeLabel',
        type: 'string',
        description: 'Accessibility label for the fullscreen maximize button if controls are shown',
        required: true,
        href: 'videoControlsExample',
      },
      {
        name: 'accessibilityMinimizeLabel',
        type: 'string',
        description: 'Accessibility label for the fullscreen minimize button if controls are shown',
        required: true,
        href: 'videoControlsExample',
      },
      {
        name: 'accessibilityMuteLabel',
        type: 'string',
        description: 'Accessibility label for the mute button if controls are shown',
        required: true,
        href: 'videoControlsExample',
      },
      {
        name: 'accessibilityPauseLabel',
        type: 'string',
        description: 'Accessibility label for the pause button if controls are shown',
        required: true,
        href: 'videoControlsExample',
      },
      {
        name: 'accessibilityPlayLabel',
        type: 'string',
        description: 'Accessibility label for the play button if controls are shown',
        required: true,
        href: 'videoControlsExample',
      },
      {
        name: 'accessibilityUnmuteLabel',
        type: 'string',
        description: 'Accessibility label for the unmute button if controls are shown',
        required: true,
        href: 'videoControlsExample',
      },
      {
        name: 'aspectRatio',
        type: 'number',
        description: `Proportional relationship between width and height of the video, calculated as width / height.`,
        required: true,
        href: 'basicExample',
      },
      {
        name: 'captions',
        type: 'string',
        description: 'The URL of the captions track for the video (.vtt file)',
        required: true,
        href: 'basicExample',
      },
      {
        name: 'children',
        type: 'React.Node',
        description: `This \`children\` prop is not same as children inside the native html \`video\` element.
          Instead it serves to add overlays on top of the html video element, while still being under the video controls.`,
      },
      {
        name: 'crossOrigin',
        type: "'use-credentials' | 'anonymous'",
        description:
          'Designate CORS behavior for the video element. When not passed in, CORS checks are disabled.',
      },
      {
        name: 'controls',
        type: 'boolean',
        description: 'Show the video player controls',
        href: 'videoControlsExample',
      },
      {
        name: 'loop',
        type: 'boolean',
        description: 'The video will start playing over again when finished',
        href: 'nativeVideoAttributesExample',
      },
      {
        name: 'objectFit',
        type: "'fill' | 'contain' | 'cover' | 'none' | 'scale-down'",
        description:
          'Sets how the content of the replaced <video> element should be resized to fit its container',
      },
      {
        name: 'onDurationChange',
        type: '({ event: SyntheticEvent<HTMLVideoElement>, duration: number }) => void',
        description:
          'Sent when the metadata has loaded or changed, indicating a change in duration',
      },
      {
        name: 'onEnded',
        type: '({ event: SyntheticEvent<HTMLVideoElement> }) => void',
        description: 'Sent when playback of the video completes',
      },
      {
        name: 'onFullscreenChange',
        type: '({ event: Event, fullscreen: boolean }) => void',
        description: 'Sent when the video full screen status changes',
      },
      {
        name: 'onLoadedChange',
        type: '({ event: SyntheticEvent<HTMLVideoElement>, loaded: number }) => void',
        description: 'Sent when progress happens on downloading the media',
      },
      {
        name: 'onPlay',
        type: '({ event: SyntheticEvent<HTMLDivElement> }) => void',
        description: 'Sent when playback of the media starts after having been paused',
        href: 'videoUpdatesExample',
      },
      {
        name: 'onPlayheadDown',
        type: '({ event: SyntheticMouseEvent<HTMLDivElement> }) => void',
        description: 'Sent when mouse down event occurs on playhead',
      },
      {
        name: 'onPlayheadUp',
        type: '({ event: SyntheticMouseEvent<HTMLDivElement> }) => void',
        description: 'Sent when mouse up event occurs on playhead',
      },
      {
        name: 'onPause',
        type: '({ event: SyntheticEvent<HTMLDivElement> }) => void',
        description: 'Sent when playback is paused',
        href: 'videoUpdatesExample',
      },
      {
        name: 'onReady',
        type: '({ event: SyntheticEvent<HTMLVideoElement> }) => void',
        description: 'Sent when video is loaded and ready to play.',
      },
      {
        name: 'onSeek',
        type: '({ event: SyntheticEvent<HTMLVideoElement> }) => void',
        description: 'Sent when a seek operation completes from the playhead',
      },
      {
        name: 'onTimeChange',
        type: '({ event: SyntheticEvent<HTMLVideoElement>, time: number }) => void',
        description:
          "Sent when the time indicated by the element's currentTime attribute has changed",
      },
      {
        name: 'onVolumeChange',
        type: '({ event: SyntheticEvent<HTMLDivElement>, volume: number }) => void',
        description: 'Sent when the audio volume changes',
        href: 'videoUpdatesExample',
      },
      {
        name: 'playbackRate',
        type: 'number',
        description: 'Specifies the speed at which the video plays: 1 for normal',
        required: true,
        defaultValue: 1,
        href: 'videoUpdatesExample',
      },
      {
        name: 'playing',
        type: 'boolean',
        description: 'Specifies whether the video should play or not',
        required: true,
        defaultValue: false,
        href: 'nativeVideoAttributesExample',
      },
      {
        name: 'playsInline',
        type: 'boolean',
        description: `Serves as a hint to the user agent that the video should to be displayed "inline" in
          the document by default, constrained to the element's playback area, instead of being displayed
          fullscreen or in an independent resizable window. This attribute is mainly relevant to
          iOS Safari browsers`,
      },
      {
        name: 'poster',
        type: 'string',
        description: 'The image to show while the video is downloading',
        href: 'basicExample',
      },
      {
        name: 'preload',
        type: `"auto" | "metadata" | "none"`,
        description: 'Specifies how, if any, the video should be loaded when the page loads',
        required: true,
        defaultValue: 'auto',
      },
      {
        name: 'src',
        type: 'string | Array<{| type: "video/m3u8" | "video/mp4" | "video/ogg, src: string |}>',
        description: `The URL of the video file to play. This can also be supplied as a list of video types to respective
          video source urls in fallback order for support on various browsers.`,
        required: true,
        href: 'basicExample',
      },
      {
        name: 'volume',
        type: 'number',
        description: 'Specifies the volume of the video audio: 0 for muted, 1 for max',
        required: true,
        defaultValue: 0,
        href: 'nativeVideoAttributesExample',
      },
    ]}
  />,
);

card(
  <Example
    id="basicExample"
    name="Video media basics"
    description={`
    The source url you pass into \`Video\` will be used to download and play the video file. While it is
    downloading the metadata, you may show a thumbnail image by using the \`poster\` prop.
  `}
    defaultCode={`
<Video
  aspectRatio={853 / 480}
  captions=""
  poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
  src="http://media.w3.org/2010/05/bunny/movie.mp4"
/>
`}
  />,
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
  aspectRatio={426 / 240}
  captions=""
  playing
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
  />,
);

card(
  <Example
    id="nativeVideoAttributesExample"
    name="Native video attributes"
    description={`
    \`Video\` supports the native HTML video attributes such as \`autoPlay\`, \`loop\`, \`muted\`, and more.
    Simply pass these through as props on the \`Video\` component.
  `}
    defaultCode={`
<Video
  aspectRatio={1920 / 1080}
  captions=""
  loop
  playing
  src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
/>
`}
  />,
);

card(
  <Example
    id="videoControlsExample"
    name="Video controls"
    description={`
    \`Video\` components can show a control bar to users in order to allow them access to certain features
    such as play/pause, timestamps, mute, and fullscreen. Pass in the \`controls\` prop to make them appear.
  `}
    defaultCode={`
<Video
  accessibilityMaximizeLabel="Maximize"
  accessibilityMinimizeLabel="Minimize"
  accessibilityMuteLabel="Mute"
  accessibilityPauseLabel="Pause"
  accessibilityPlayLabel="Play"
  accessibilityUnmuteLabel="Unmute"
  aspectRatio={853 / 480}
  captions=""
  controls
  src="http://media.w3.org/2010/05/bunny/movie.mp4"
/>
`}
  />,
);

card(
  <Example
    name="Video with children"
    description={`
    \`Video\` component can show components in the \`chilren\` prop on top of the html video element, while under the controls.
    The children of \`Video\` are not same as the children of the html \`video\` element; they're "outside" the html \`video\` element.
  `}
    defaultCode={`
<Video
  accessibilityMaximizeLabel="Maximize"
  accessibilityMinimizeLabel="Minimize"
  accessibilityMuteLabel="Mute"
  accessibilityPauseLabel="Pause"
  accessibilityPlayLabel="Play"
  accessibilityUnmuteLabel="Unmute"
  aspectRatio={853 / 480}
  captions=""
  controls
  playing
  src="http://media.w3.org/2010/05/bunny/movie.mp4"
>
  <Box width="100%" height="100%"
    display="flex"
    justifyContent="center"
    alignItems="center"
    dangerouslySetInlineStyle={{__style:{backgroundColor:'rgba(0, 0, 0, 0.3)'}}}>
      <IconButton
        accessibilityLabel="Love"
        bgColor="white"
        icon="trash-can"
        size="lg" />
  </Box>
</Video>
`}
  />,
);

card(
  <Example
    id="videoUpdatesExample"
    name="Video updates"
    description={`
    \`Video\` is robust enough to handle any updates, such as changing the source, volume, or speed.`}
    defaultCode={`
function Example() {
  const [input, setInput] = React.useState("http://media.w3.org/2010/05/bunny/movie.mp4");
  const [playbackRate, setPlaybackRate] = React.useState(1);
  const [playing, setPlaying] = React.useState(false);
  const [src, setSrc] = React.useState("http://media.w3.org/2010/05/bunny/movie.mp4");
  const [volume, setVolume] = React.useState(1);

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
              onChange={({ value }) => setInput(value)}
              value={input}
            />
          </Box>
          <Box paddingX={1}>
            <Button
              text="Submit"
              color="red"
              onClick={() => setSrc(input)}
            />
          </Box>
        </Box>
      </Box>
      <Box paddingY={2}>
        <Button
          text={volume === 0 ? "Unmute" : "Mute"}
          onClick={() => setVolume(volume === 0 ? 1 : 0)}
        />
      </Box>
      <Box display="flex" paddingY={2} marginLeft={-1} marginRight={-1}>
        <Box paddingX={1} column={6}>
          <Button
            text="Playback x0.5"
            onClick={() => setPlaybackRate(playbackRate / 2)}
          />
        </Box>
        <Box paddingX={1} column={6}>
          <Button
            text="Playback x2"
            onClick={() => setPlaybackRate(playbackRate * 2)}
          />
        </Box>
      </Box>
      <Video
        accessibilityMaximizeLabel="Maximize"
        accessibilityMinimizeLabel="Minimize"
        accessibilityMuteLabel="Mute"
        accessibilityPauseLabel="Pause"
        accessibilityPlayLabel="Play"
        accessibilityUnmuteLabel="Unmute"
        aspectRatio={853 / 480}
        captions=""
        controls
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onVolumeChange={({ volume }) => setVolume(volume)}
        playbackRate={playbackRate}
        playing={playing}
        src={src}
        volume={volume}
      />
    </Box>
  );
}
`}
  />,
);

export default cards;
