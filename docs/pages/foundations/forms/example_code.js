// @flow strict
import { type Node as ReactNode } from 'react';
import MainSection from '../../../docs-components/MainSection';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';
import SandpackExample from '../../../docs-components/SandpackExample';
import LayoutsExample from '../../../examples/layouts/layoutsExample';

export default function DocsPage(): ReactNode {
  return (
    <Page title="Example code" hideSideNav>
      <PageHeader
        name="Example code"
        description="Easy-to-copy code for RTL-friendly form layout on desktop and mobile web."
        type="guidelines"
      />
      <MainSection
        name="One-column form layout"
        description="A responsive &amp; RTL-friendly form layout for default screen densities."
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
