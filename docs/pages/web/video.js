// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';

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
    controls
    onPlayError={() => {}}
    onPlay={() => {}}
    src="https://v.pinimg.com/videos/mc/expMp4/c8/37/71/c83771d856bc1ee12e2d2f81083df9d4_t1.mp4"
  />
</Box>
`}
      />
      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          title="Captions"
          description={`Captions are intended for deaf and hard-of-hearing audiences. Captions are usually in the same language as the audio. Please, read the [differences between captions and subtitles](https://web.archive.org/web/20160117160743/http://screenfont.ca/learn/).

Read more about [adding captions to video](https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/Adding_captions_and_subtitles_to_HTML5_video#html5_and_video_captions).

The following example uses an excerpt from the [Sintel open movie](https://www.sintel.org), created by the [Blender Foundation](https://www.blender.org/foundation/).
  `}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function Example () {
  const [playing, setPlaying] = React.useState(false);

  return (
    <Box width={1000}>
      <Video
        accessibilityMaximizeLabel="Maximize"
        accessibilityMinimizeLabel="Minimize"
        accessibilityMuteLabel="Mute"
        accessibilityPauseLabel="Pause"
        accessibilityPlayLabel="Play"
        accessibilityProgressBarLabel="Progress bar"
        accessibilityUnmuteLabel="Unmute"
        accessibilityHideCaptionsLabel="Hide captions"
        accessibilityShowCaptionsLabel="Show captions"
        aspectRatio={1024 / 435}
        captions="https://iandevlin.github.io/mdn/video-player-with-captions/subtitles/vtt/sintel-en.vtt"
        controls
        onPlayError={({ error }) => error && setPlaying(false)}
        onPlay={({ event }) => setPlaying(true)}
        onControlsPlay={() => setPlaying(true)}
        onControlsPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        playing={playing}
        loop
        src="https://iandevlin.github.io/mdn/video-player-with-captions/video/sintel-short.mp4"  />
    </Box>
  )
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Labels"
          description={`Video requires several accessibility labels for each video control: \`accessibilityMaximizeLabel\`, \`accessibilityMinimizeLabel\`, \`accessibilityMuteLabel\`, \`accessibilityPauseLabel\`, \`accessibilityPlayLabel\`, \`accessibilityProgressBarLabel\` and \`accessibilityUnmuteLabel\`.

If the video contain captions, it also requires \`accessibilityHideCaptionsLabel\` and \`accessibilityShowCaptionsLabel\`.
`}
        />
      </AccessibilitySection>

      <MainSection name="Variants">
        <MainSection.Subsection
          title="Autoplay and error detection"
          description={`Autoplay or automatically starting the playback of the video requires the \`autoplay\` prop. While autoplay of media serves a useful purpose, it should be used carefully and only when needed. In order to give users control over this, browsers often provide various forms of autoplay blocking.

Autoplay blocking is not applied to video elements when the source media doesn't have an audio track or is muted.

Gestalt Video provides a comprehensive API to handle gracefully autoplay blocking and prevent UI and/or client errors. The example below shows how to correctly handle autoplay error detection.

If \`autoplay\` is set, use \`onPlay\` to detect when the video starts playing and display the pause control accordingly. In case \`autoplay\` gets blocked, \`onPlay\` would never get triggered and controls will still display the play control.

\`onPlayError\` is another error-handling callback. In this case, \`onPlayError\` detects if the HTMLMediaElement.play() method fails. HTMLMediaElement.play() returns a Promise and \`onPlayError\` catches the error if the Promise is rejected. Display the pause control if any error is detected.

If \`autoplay\` is set, don't set the initial \`playing\` state to true as both will attempt to autoplay the video. We recommend setting \`autoplay\`, using \`onPlay\` to detect when the video is played and setting \`playing\` to true. If the initial \`playing\` state is set to true, don't set \`autoplay\`. If both \`autoplay\` and the initial \`playing\` state are set to true, \`autoplay\` has preference.

For more information about autoplay, check the [MDN Web Docs: video](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-autoplay), [MDN Web Docs: HTMLMediaElement.autoplay](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/autoplay), and the [MDN Web Docs: Autoplay guide for media and Web Audio APIs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/autoplay).
  `}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function Example () {
  const [playing, setPlaying] = React.useState(false);

  return (
    <Box width={300}>
      <Video
        autoplay
        accessibilityMaximizeLabel="Maximize"
        accessibilityMinimizeLabel="Minimize"
        accessibilityMuteLabel="Mute"
        accessibilityPauseLabel="Pause"
        accessibilityPlayLabel="Play"
        accessibilityProgressBarLabel="Progress bar"
        accessibilityUnmuteLabel="Unmute"
        aspectRatio={540 / 960}
        controls
        onPlayError={({ error }) => error && setPlaying(false)}
        onPlay={({ event }) => setPlaying(true)}
        onControlsPlay={() => setPlaying(true)}
        onControlsPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        playing={playing}
        loop
        src="https://v.pinimg.com/videos/mc/expMp4/c8/37/71/c83771d856bc1ee12e2d2f81083df9d4_t1.mp4"  />
    </Box>
  )
}`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Video controls"
          description={`Video components can show a control bar to users in order to allow them access to certain features such as play/pause, timestamps, mute, and fullscreen. Pass in the \`controls\` prop to make them appear. The Video \`controls\` are custom; they aren't the [native video controls](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-controls).
  `}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function Example() {
  const [showControls, setShowControls] = React.useState(false);

  return (
    <Flex alignItems="center" gap={{ column: 2, row: 0 }} direction="column">
      <Flex alignItems="center" gap={{ row: 2, column: 0 }}>
        <Box paddingX={2}>
          <Label htmlFor="video">
            <Text>Show built-in Video controls</Text>
          </Label>
        </Box>
        <Switch
          onChange={() => setShowControls((value) => !value)}
          id="video"
          switched={showControls}
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
          controls={showControls}
          onPlayError={() => {}}
          onPlay={() => {}}
          poster="https://i.pinimg.com/videos/thumbnails/originals/c8/37/71/c83771d856bc1ee12e2d2f81083df9d4.0000000.jpg"
          src="https://v.pinimg.com/videos/mc/expMp4/c8/37/71/c83771d856bc1ee12e2d2f81083df9d4_t1.mp4"
        >
          {!showControls ? (
            <Box
              width="100%"
              height="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              dangerouslySetInlineStyle={{ __style: { backgroundColor: 'rgba(0, 0, 0, 0.3)' } }}
            >
              <IconButton accessibilityLabel="Play video" bgColor="white" icon="play" size="lg" />
            </Box>
          ) : null}
        </Video>
      </Box>
    </Flex>
  );
}
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="With children"
          description={`Video component can show components in the \`children\` prop on top of the html video element, while under the controls.
    The children of Video aren't same as the children of the html video element; they're "outside" the html video element.
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
    controls
    src="https://v.pinimg.com/videos/mc/expMp4/c8/37/71/c83771d856bc1ee12e2d2f81083df9d4_t1.mp4"
  >
    <Box width="100%" height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      dangerouslySetInlineStyle={{__style:{backgroundColor:'rgba(0, 0, 0, 0.3)'}}}>
        <IconButton
          accessibilityLabel="Delete video"
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
    <Flex width="100%" gap={{ column: 2, row: 0 }} direction="column">
      <Flex width="100%" gap={{ row: 2, column: 0 }} alignItems="center">
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
      <Flex gap={{ column: 0, row: 2 }}>
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
          controls
          onControlsPlay={() => setPlaying(true)}
          onControlsPause={() => setPlaying(false)}
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
        <MainSection.Subsection
          title="Multiple video sources"
          description={`Not all browsers support the same video encoding types. If you have multiple video file sources, you can pass them as a list to Video in the order you want the HTML video tag to use as fallbacks.
  `}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function Example () {
  const [playing, setPlaying] = React.useState(false);

  return (
    <Box width={500}>
      <Video
        accessibilityMaximizeLabel="Maximize"
        accessibilityMinimizeLabel="Minimize"
        accessibilityMuteLabel="Mute"
        accessibilityPauseLabel="Pause"
        accessibilityPlayLabel="Play"
        accessibilityProgressBarLabel="Progress bar"
        accessibilityUnmuteLabel="Unmute"
        aspectRatio={426 / 240}
        controls
        playing={playing}
        onControlsPlay={() => setPlaying(true)}
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
    </Box>
  )
}
`}
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getStaticProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  const generatedDocGen = await docGen('Video');

  generatedDocGen.props.ref = {
    required: false,
    defaultValue: null,
    flowType: {
      name: 'Ref',
      raw: 'Ref<typeof Video>',
    },
    description: 'Ref on the Gestalt Video component.',
  };

  return {
    props: { generatedDocGen },
  };
}
