// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import delayOffScreenImageLoading from '../../examples/image/delayOffScreenImageLoading.js';
import imagesForPresentationOnly from '../../examples/image/imagesForPresentationOnly.js';
import overlayContentOnImage from '../../examples/image/overlayContentOnImage.js';
import placeholderColorUsage from '../../examples/image/placeholderColorUsage.js';
import scalingImageToFitContainer from '../../examples/image/scalingImageToFitContainer.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description} />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection
        name="Dimensions"
        description={`
One thing that might be unusual is that the \`width\` and the \`height\` of the component are required, yet the image will scale to the size of its container.

This is so that the placeholder's size can be calculated before the image has rendered.

While the exact dimensions supplied aren't used (only the ratio between them is considered), you should always try to supply the exact dimensions of the source image requested.
  `}
      />

      <MainSection
        name="Placeholders"
        description={`
The color you pass into Image will be used to fill the placeholder that shows up as an image loads. The example shown contains an image with a transparent background which allows you to visualize the placeholder color. When Mask is used to create rounded corners on Image, the placeholder color may leak through on the corners. To prevent this, remove the placeholder color."
  `}
      >
        <MainSection.Card
          cardSize="lg"
          sandpackExample={
            <SandpackExample name="Placeholder Color Usage" code={placeholderColorUsage} />
          }
        />
      </MainSection>

      <MainSection
        description="You can overlay content on an Image by passing it children."
        name="Overlay"
      >
        <MainSection.Card
          cardSize="lg"
          sandpackExample={
            <SandpackExample name="Overlay Content On Image" code={overlayContentOnImage} />
          }
        />
      </MainSection>

      <MainSection
        name="Fit"
        description={`
In some cases, you may want to scale an image to fit into its container. To achieve that, you can set \`fit\` to either \`"cover"\` or \`"contain"\`, depending on the effect you wish to achieve.

\`"contain"\`: This makes it so that the image is "contained" within its container. This means that the image is resized appropriately such that the entire image can fit in the container, while maintaining its aspect ratio (think letterbox);

~~~jsx
<Image alt="..." color="#000" fit="contain" src="..." />
~~~

\`"cover"\`: This does the opposite of \`"contain"\` and tries to scale the image as large as possible so that the entire container is occupied, while maintaining the aspect ratio of the image.

~~~jsx
<Image alt="..." color="#000" fit="cover" src="..." />
~~~

Notes:
* When using \`"cover"\`/\`"contain"\`, \`naturalHeight\` and \`naturalWidth\` are ignored since the aspect ratio is handled by the browser.
* In order for \`"cover"\`/\`"contain"\` to work properly, the container must have some sort of implicit height.
  `}
      >
        <MainSection.Card
          cardSize="lg"
          sandpackExample={
            <SandpackExample
              name="Scaling Image To Fit Container"
              code={scalingImageToFitContainer}
              layout="column"
              previewHeight={800}
            />
          }
        />
      </MainSection>

      <MainSection
        name="Lazy"
        description="You can delay loading images that are off-screen with the loading attribute. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/loading) for more details."
      >
        <MainSection.Card
          cardSize="lg"
          sandpackExample={
            <SandpackExample
              name="Delay Off-Screen Image Loading"
              code={delayOffScreenImageLoading}
              previewHeight={440}
            />
          }
        />
      </MainSection>

      <MainSection
        name="Presentational Images with Role"
        description={`
Sometimes Images are purely presentational. For example, an Image used above an article title may be used to draw people's attention visually, but doesn't add any additional information or context about the article. In this case, the \`role\` should be set to "presentation" in order to inform screen readers and other assistive technology that this image does not need alternative text or any additional label.
    `}
      >
        <MainSection.Card
          cardSize="lg"
          sandpackExample={
            <SandpackExample name="Images For Presentation Only" code={imagesForPresentationOnly} />
          }
        />
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('Image') },
  };
}
