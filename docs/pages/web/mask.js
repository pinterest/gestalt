// @flow strict
import { type Node } from 'react';
import { Mask } from 'gestalt';
import Combination from '../../components/Combination.js';
import Example from '../../components/Example.js';
import GeneratedPropTable from '../../components/GeneratedPropTable.js';
import Page from '../../components/Page.js';
import PageHeader from '../../components/PageHeader.js';
import docgen, { type DocGen } from '../../components/docgen.js';
import QualityChecklist from '../../components/QualityChecklist.js';
import AccessibilitySection from '../../components/AccessibilitySection.js';
import MainSection from '../../components/MainSection.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Mask">
      <PageHeader name="Mask" description={generatedDocGen?.description} />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Variants">
        <Example
          id="basicExample"
          name="Example"
          defaultCode={`
<Mask height={70} rounding="circle" width={70}>
  <div style={{ backgroundColor: '#0fa573', width: 70, height: 70 }} />
</Mask>
`}
        />
        <Example
          description="
    You can compose images with other content (like images or videos) to produce different shapes like rounded rectangles or circles.
  "
          name="Example: Masking other content"
          defaultCode={`
<Box maxWidth={300}>
  <Mask rounding="circle">
    <img
      alt="weakendclub.com"
      src="https://i.ibb.co/121JJzC/stock7.jpg"
      style={{ maxWidth: '100%', display: 'block' }}
    />
  </Mask>
</Box>
`}
        />
        <Example
          id="wash"
          description="
    If you expect the masked content to be nearly white, you can apply a wash to emphasize the edge of the mask.
  "
          name="Example: Adding a wash"
          defaultCode={`
<Box maxWidth={300}>
  <Mask rounding={2} wash>
    <img
      alt="subliming.tumblr.com"
      src="https://i.ibb.co/8BSrgzX/stock8.jpg"
      style={{ maxWidth: '100%', display: 'block' }}
    />
  </Mask>
</Box>
`}
        />
        <Combination
          id="roundingCombinations"
          name="Rounding Combinations"
          rounding={['circle', 0, 1, 2, 3, 4, 5, 6, 7, 8]}
        >
          {(props) => (
            <Mask height={70} width={70} {...props}>
              <div style={{ backgroundColor: '#e3780c', width: 70, height: 70 }} />
            </Mask>
          )}
        </Combination>
        <Example
          id="willChangeTransform"
          description="
  If you want to turn off the `willChange:transform` property for rendering reasons, you can set this to false. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change) for more details.
  "
          name="Example: willChangeTransform"
          defaultCode={`
<Box maxWidth={300}>
  <Mask rounding={2} willChangeTransform={false}>
    <img
      alt="subliming.tumblr.com"
      src="https://i.ibb.co/8BSrgzX/stock8.jpg"
      style={{ maxWidth: '100%', display: 'block' }}
    />
  </Mask>
</Box>
`}
        />
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Mask' }) },
  };
}
