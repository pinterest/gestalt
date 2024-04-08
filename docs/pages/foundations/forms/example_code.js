// @flow strict
import { type Node as ReactNode } from 'react';
import MainSection from '../../../docs-components/MainSection';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';
import SandpackExample from '../../../docs-components/SandpackExample';
import LayoutsExample from '../../../examples/layouts/layoutsExample';

export default function DocsPage(): ReactNode {
  return (
    <Page hideSideNav title="Example code">
      <PageHeader
        description="Easy-to-copy code for RTL-friendly form layout on desktop and mobile web."
        name="Example code"
        type="guidelines"
      />
      <MainSection
        description="A responsive &amp; RTL-friendly form layout for default screen densities."
        name="One-column form layout"
      >
        <MainSection.Card
          cardSize="lg"
          sandpackExample={
            <SandpackExample code={LayoutsExample} name="Layout example" previewHeight={400} />
          }
        />
      </MainSection>
    </Page>
  );
}
