import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { type DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import InternalDocumentationSection from '../../docs-components/InternalDocumentationSection';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import autoplayAndErrorDetectionExample from '../../examples/video/autoplayAndErrorDetectionExample';
import captionsExample from '../../examples/video/captionsExample';
import controlsExample from '../../examples/video/controlsExample';
import localizationLabels from '../../examples/video/localizationLabels';
import mainExample from '../../examples/video/mainExample';
import multipleSourcesExample from '../../examples/video/multipleSourcesExample';
import updatesExample from '../../examples/video/updatesExample';
import withChildrenExample from '../../examples/video/withChildrenExample';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
    <Page title="Video">
      <PageHeader description={generatedDocGen?.description} name="Video" pdocsLink>
        <SandpackExample
          code={mainExample}
          hideEditor
          layout="column"
          name="Main Example"
          previewHeight={600}
        />
      </PageHeader>
      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          description={`Captions are intended for deaf and hard-of-hearing audiences. Captions are usually in the same language as the audio. Please, read the [differences between captions and subtitles](https://web.archive.org/web/20160117160743/http://screenfont.ca/learn/).

Read more about [adding captions to video](https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/Adding_captions_and_subtitles_to_HTML5_video#html5_and_video_captions).

The following example uses an excerpt from the [Sintel open movie](https://www.sintel.org), created by the [Blender Foundation](https://www.blender.org/foundation/).
  `}
          title="Captions"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={captionsExample}
                layout="column"
                name="Captions Example"
                previewHeight={400}
              />
            }
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <LocalizationSection
        code={localizationLabels}
        name={generatedDocGen?.displayName}
        previewHeight={600}
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`Autoplay or automatically starting the playback of the video requires the \`autoplay\` prop. While autoplay of media serves a useful purpose, it should be used carefully and only when needed. In order to give users control over this, browsers often provide various forms of autoplay blocking.

Autoplay blocking is not applied to video elements when the source media doesn't have an audio track or is muted.

Gestalt Video provides a comprehensive API to handle gracefully autoplay blocking and prevent UI and/or client errors. The example below shows how to correctly handle autoplay error detection.

If \`autoplay\` is set, use \`onPlay\` to detect when the video starts playing and display the pause control accordingly. In case \`autoplay\` gets blocked, \`onPlay\` would never get triggered and controls will still display the play control.

\`onPlayError\` is another error-handling callback. In this case, \`onPlayError\` detects if the HTMLMediaElement.play() method fails. HTMLMediaElement.play() returns a Promise and \`onPlayError\` catches the error if the Promise is rejected. Display the pause control if any error is detected.

If \`autoplay\` is set, don't set the initial \`playing\` state to true as both will attempt to autoplay the video. We recommend setting \`autoplay\`, using \`onPlay\` to detect when the video is played and setting \`playing\` to true. If the initial \`playing\` state is set to true, don't set \`autoplay\`. If both \`autoplay\` and the initial \`playing\` state are set to true, \`autoplay\` has preference.

For more information about autoplay, check the [MDN Web Docs: video](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-autoplay), [MDN Web Docs: HTMLMediaElement.autoplay](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/autoplay), and the [MDN Web Docs: Autoplay guide for media and Web Audio APIs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/autoplay).
  `}
          title="Autoplay and error detection"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={autoplayAndErrorDetectionExample}
                name="Autoplay And Error Detection Example"
                previewHeight={600}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`Video components can show a control bar to users in order to allow them access to certain features such as play/pause, timestamps, mute, and fullscreen. Pass in the \`controls\` prop to make them appear. The Video \`controls\` are custom; they aren't the [native video controls](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-controls).
  `}
          title="Video controls"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={controlsExample} name="Controls Example" previewHeight={600} />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`Video component can show components in the \`children\` prop on top of the html video element, while under the controls.
    The children of Video aren't same as the children of the html video element; they're "outside" the html video element.
  `}
          title="With children"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={withChildrenExample}
                name="With Children Example"
                previewHeight={600}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="Video is robust enough to handle any updates, such as changing the source, volume, or speed."
          title="Video updates"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={updatesExample} name="Updates Example" previewHeight={700} />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`Not all browsers support the same video encoding types. If you have multiple video file sources, you can pass them as a list to Video in the order you want the HTML video tag to use as fallbacks.
  `}
          title="Multiple video sources"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={multipleSourcesExample}
                name="Multiple Sources Example"
                previewHeight={400}
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />

      <InternalDocumentationSection
        items={[
          {
            href: 'https://pdocs.pinadmin.com/docs/webapp/docs/gestalt-extensions#video',
            text: 'Video extension',
          },
        ]}
      />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: {
    generatedDocGen: DocGen;
  };
}> {
  const generatedDocGen = await docGen('Video');

  generatedDocGen.props.ref = {
    required: false,
    defaultValue: null,
    tsType: {
      name: 'Ref',
      raw: 'Ref<typeof Video>',
    },
    description: 'Ref on the Gestalt Video component.',
  };

  return {
    props: { generatedDocGen },
  };
}
