// @flow strict
import { type Node } from 'react';
import PageHeader from '../../docs-components/PageHeader.js';
import Page from '../../docs-components/Page.js';
import MainSection from '../../docs-components/MainSection.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import LayoutsExample from '../../examples/layouts/layoutsExample.js';

export default function DocsPage(): Node {
  return (
    <Page title="Layouts guidelines">
      <PageHeader
        name="Layouts"
        description="A list of easy-to-copy layouts which have been battle tested."
        type="guidelines"
      />
      <MainSection name="Examples">
        <MainSection.Subsection
          title="Form layout"
          description={'Responsive &amp; RTL-friendly form layout.'}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={LayoutsExample} name="Layout example" previewHeight={400} />
            }
          />
        </MainSection.Subsection>
      </MainSection>
    </Page>
  );
}
