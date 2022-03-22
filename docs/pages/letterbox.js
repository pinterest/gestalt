// @flow strict
import { type Node } from 'react';
import Example from '../components/Example.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import Page from '../components/Page.js';
import PageHeader from '../components/PageHeader.js';
import docgen, { type DocGen } from '../components/docgen.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Letterbox">
      <PageHeader name="Letterbox" description={generatedDocGen?.description} showSourceLink />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <Example
        name="Tall content (564:806)"
        defaultCode={`
<Letterbox width={200} height={200} contentAspectRatio={564 / 806}>
  <Image
    alt="tall"
    src="https://i.ibb.co/jVR29XV/stock5.jpg"
    naturalWidth={564}
    naturalHeight={806}
  />
</Letterbox>
`}
      />
      <Example
        name="Wide content (564:517)"
        defaultCode={`
<Letterbox width={200} height={200} contentAspectRatio={564 / 517}>
  <Image
    alt="wide"
    src="https://i.ibb.co/SB0pXgS/stock4.jpg"
    naturalWidth={564}
    naturalHeight={517}
  />
</Letterbox>
`}
      />
      <Example
        name="Square content (1:1)"
        defaultCode={`
<Letterbox width={200} height={200} contentAspectRatio={1}>
  <Image
    alt="square"
    src="https://i.ibb.co/FY2MKr5/stock6.jpg"
    naturalWidth={1}
    naturalHeight={1}
  />
</Letterbox>
`}
      />
      <Example
        name="Square content (1:1) in a vertical frame"
        defaultCode={`
<Letterbox width={200} height={300} contentAspectRatio={1}>
  <Image
    alt="square"
    src="https://i.ibb.co/d0pQsJz/stock3.jpg"
    naturalWidth={1}
    naturalHeight={1}
  />
</Letterbox>
`}
      />
      <Example
        name="Square content (1:1) in a horizontal frame"
        defaultCode={`
<Letterbox width={300} height={200} contentAspectRatio={1}>
  <Image
    alt="square"
    src="https://i.ibb.co/d0pQsJz/stock3.jpg"
    naturalWidth={1}
    naturalHeight={1}
  />
</Letterbox>
`}
      />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Letterbox' }) },
  };
}
