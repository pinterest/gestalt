// @flow strict
import { type Node as ReactNode } from 'react';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import SandpackExample from '../../docs-components/SandpackExample';
import LayoutsExample from '../../examples/layouts/layoutsExample';

export default function DocsPage(): ReactNode {
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
