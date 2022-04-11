// @flow strict
import { type Node } from 'react';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import Page from '../components/Page.js';
import PageHeader from '../components/PageHeader.js';
import docgen, { type DocGen } from '../components/docgen.js';
import deepCloneReplacingUndefined from '../utils/deepCloneReplacingUndefined.js';
import MainSection from '../components/MainSection.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Video">
      <PageHeader
        name="Video"
        description={generatedDocGen?.description}
        defaultCode={`
<Box width={300}>
  <Video
    accessibilityMaximizeLabel="Maximize"
    accessibilityMinimizeLabel="Minimize"
    accessibilityMuteLabel="Mute"
    accessibilityPauseLabel="Pause"
    accessibilityPlayLabel="Play"
    accessibilityProgressBarLabel="Progress bar"
    accessibilityUnmuteLabel="Unmute"
    aspectRatio={540 / 960}
    captions=""
    src="https://v.pinimg.com/videos/mc/expMp4/c8/37/71/c83771d856bc1ee12e2d2f81083df9d4_t1.mp4"
    controls
  />
</Box>
`}
      />
      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Variants">
        <MainSection.Subsection
          title="Native video attributes"
          description={`Video supports the native HTML video attributes such as \`src\`, \`poster\`, \`loop\`, \`muted\`, and more. Simply pass these through as props on the Video component.

The source url you pass into Video will be used to download and play the video file. While it is downloading the metadata, you may show a thumbnail image by using the \`poster\` prop.
  `}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Box width={300}>
  <Video
    accessibilityMaximizeLabel="Maximize"
    accessibilityMinimizeLabel="Minimize"
    accessibilityMuteLabel="Mute"
    accessibilityPauseLabel="Pause"
    accessibilityPlayLabel="Play"
    accessibilityProgressBarLabel="Progress bar"
    accessibilityUnmuteLabel="Unmute"
    aspectRatio={540 / 960}
    captions=""
    poster="https://i.pinimg.com/videos/thumbnails/originals/c8/37/71/c83771d856bc1ee12e2d2f81083df9d4.0000000.jpg"
    src="https://v.pinimg.com/videos/mc/expMp4/c8/37/71/c83771d856bc1ee12e2d2f81083df9d4_t1.mp4"
    controls
    muted
  />
</Box>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Multiple video sources"
          description={`Not all browsers support the same video encoding types. If you have multiple video file sources, you can pass them as a list to Video in the order you want the HTML video tag to use as fallbacks.
  `}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Box width={300}>
  <Video
    accessibilityMaximizeLabel="Maximize"
    accessibilityMinimizeLabel="Minimize"
    accessibilityMuteLabel="Mute"
    accessibilityPauseLabel="Pause"
    accessibilityPlayLabel="Play"
    accessibilityProgressBarLabel="Progress bar"
    accessibilityUnmuteLabel="Unmute"
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
    controls
  />
</Box>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Video controls"
          description={`Video components can show a control bar to users in order to allow them access to certain features such as play/pause, timestamps, mute, and fullscreen. Pass in the \`controls\` prop to make them appear.
  `}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function Example () {
  const [playing, setPlaying] = React.useState(true);

  return (
    <Box width={300}>
      <Video
        accessibilityMaximizeLabel="Maximize"
        accessibilityMinimizeLabel="Minimize"
        accessibilityMuteLabel="Mute"
        accessibilityPauseLabel="Pause"
        accessibilityPlayLabel="Play"
        accessibilityProgressBarLabel="Progress bar"
        accessibilityUnmuteLabel="Unmute"
        aspectRatio={540 / 960}
        captions=""
        controls
        onPlayError={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        playing={playing}
        src="https://v.pinimg.com/videos/mc/expMp4/c8/37/71/c83771d856bc1ee12e2d2f81083df9d4_t1.mp4"  />
    </Box>
  )
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Video with children"
          description={`Video component can show components in the \`children\` prop on top of the html video element, while under the controls.
    The children of Video are not same as the children of the html video element; they're "outside" the html video element.
  `}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Box width={300}>
  <Video
    accessibilityMaximizeLabel="Maximize"
    accessibilityMinimizeLabel="Minimize"
    accessibilityMuteLabel="Mute"
    accessibilityPauseLabel="Pause"
    accessibilityPlayLabel="Play"
    accessibilityProgressBarLabel="Progress bar"
    accessibilityUnmuteLabel="Unmute"
    aspectRatio={540 / 960}
    captions=""
    controls
    src="https://v.pinimg.com/videos/mc/expMp4/c8/37/71/c83771d856bc1ee12e2d2f81083df9d4_t1.mp4"
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
</Box>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Video updates"
          description="Video is robust enough to handle any updates, such as changing the source, volume, or speed."
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function Example() {
  const [input, setInput] = React.useState("https://v.pinimg.com/videos/mc/expMp4/ce/b4/cc/ceb4cc8c4889a86432a65884c147021f_t1.mp4");
  const [playbackRate, setPlaybackRate] = React.useState(1);
  const [playing, setPlaying] = React.useState(false);
  const [src, setSrc] = React.useState("https://v.pinimg.com/videos/mc/expMp4/c8/37/71/c83771d856bc1ee12e2d2f81083df9d4_t1.mp4");
  const [volume, setVolume] = React.useState(1);

  return (
    <Flex width="100%" gap={2} direction="column">
      <Flex width="100%" gap={2} alignItems="center">
        <Label htmlFor="video-source">
          <Text>Video source URL</Text>
        </Label>
        <Flex.Item flex="grow">
          <TextField
            id="video-source"
            onChange={({ value }) => setInput(value)}
            value={input}
          />
        </Flex.Item>
        <Button
          text="Submit"
          color="red"
          onClick={() => setSrc(input)}
        />
      </Flex>
      <Flex gap={2}>
        <Button
          text={volume === 0 ? "Unmute" : "Mute"}
          onClick={() => setVolume(volume === 0 ? 1 : 0)}
        />
        <Button
          text="Playback x0.5"
          onClick={() => setPlaybackRate((value) => value >= 1 ? value / 2 : 0.5)}
        />
        <Button
          text="Playback x2"
          onClick={() => setPlaybackRate((value) => value < 8 ? value * 2 : 16)}
        />
      </Flex>
      <Box width={300}>
        <Video
          accessibilityMaximizeLabel="Maximize"
          accessibilityMinimizeLabel="Minimize"
          accessibilityMuteLabel="Mute"
          accessibilityPauseLabel="Pause"
          accessibilityPlayLabel="Play"
          accessibilityProgressBarLabel="Progress bar"
          accessibilityUnmuteLabel="Unmute"
          aspectRatio={540 / 960}
          captions=""
          controls
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onVolumeChange={({ volume }) => setVolume(volume)}
          playbackRate={playbackRate}
          playing={playing}
          src={src}
          loop
          volume={volume}
        />
      </Box>
    </Flex>
  );
}
`}
          />
        </MainSection.Subsection>
      </MainSection>
    </Page>
  );
}

export async function getStaticProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  const generatedDocGen = await docgen({ componentName: 'Video' });

  return {
    props: { generatedDocGen: deepCloneReplacingUndefined(generatedDocGen) },
  };
}
