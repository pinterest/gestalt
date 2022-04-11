// @flow strict
import { type Node } from 'react';
import Example from '../components/Example.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import Page from '../components/Page.js';
import PageHeader from '../components/PageHeader.js';
import docgen, { type DocGen } from '../components/docgen.js';
import deepCloneReplacingUndefined from '../utils/deepCloneReplacingUndefined.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Video">
      <PageHeader name="Video" description={generatedDocGen?.description} />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      {/* <Example
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
  src="https://media.w3.org/2010/05/bunny/movie.mp4"
/>
`}
      /> */}
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
  src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
/>
`}
      />
      <Example
        id="videoControlsExample"
        name="Video controls"
        description={`
    \`Video\` components can show a control bar to users in order to allow them access to certain features
    such as play/pause, timestamps, mute, and fullscreen. Pass in the \`controls\` prop to make them appear.
  `}
        defaultCode={`
        function Example() {
  const [playing, setPlaying] = React.useState(true);

  return <Video
    accessibilityMaximizeLabel="Maximize"
    accessibilityMinimizeLabel="Minimize"
    accessibilityMuteLabel="Mute"
    accessibilityPauseLabel="Pause"
    accessibilityPlayLabel="Play"
    accessibilityProgressBarLabel="Progress bar"
    accessibilityUnmuteLabel="Unmute"
    aspectRatio={853 / 480}
    captions=""
    controls
    onPlayError={() => { console.log('hi'); setPlaying(false) }}
    onPlay={() => setPlaying(true)}
    onPause={() => setPlaying(false)}
    playing={playing}
    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
  />
}
`}
      />
      {/* <Example
        name="Video with children"
        description={`
    \`Video\` component can show components in the \`children\` prop on top of the html video element, while under the controls.
    The children of \`Video\` are not same as the children of the html \`video\` element; they're "outside" the html \`video\` element.
  `}
        defaultCode={`
<Video
  accessibilityMaximizeLabel="Maximize"
  accessibilityMinimizeLabel="Minimize"
  accessibilityMuteLabel="Mute"
  accessibilityPauseLabel="Pause"
  accessibilityPlayLabel="Play"
  accessibilityProgressBarLabel="Progress bar"
  accessibilityUnmuteLabel="Unmute"
  aspectRatio={853 / 480}
  captions=""
  controls
  src="https://media.w3.org/2010/05/bunny/movie.mp4"
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
      /> */}
      {/* <Example
        id="videoUpdatesExample"
        name="Video updates"
        description={`
    \`Video\` is robust enough to handle any updates, such as changing the source, volume, or speed.`}
        defaultCode={`
function Example() {
  const [input, setInput] = React.useState("https://media.w3.org/2010/05/bunny/movie.mp4");
  const [playbackRate, setPlaybackRate] = React.useState(1);
  const [playing, setPlaying] = React.useState(false);
  const [src, setSrc] = React.useState("https://media.w3.org/2010/05/bunny/movie.mp4");
  const [volume, setVolume] = React.useState(1);

  return (
    <Box>
      <Box paddingY={2}>
        <Box marginBottom={2}>
          <Label htmlFor="video-source">
            <Text>Video source URL</Text>
          </Label>
        </Box>
        <Box display="flex" marginStart={-1} marginEnd={-1}>
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
      <Box display="flex" paddingY={2} marginStart={-1} marginEnd={-1}>
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
        accessibilityProgressBarLabel="Progress bar"
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
      /> */}
    </Page>
  );
}

export async function getStaticProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  const generatedDocGen = await docgen({ componentName: 'Video' });

  return {
    props: { generatedDocGen: deepCloneReplacingUndefined(generatedDocGen) },
  };
}
