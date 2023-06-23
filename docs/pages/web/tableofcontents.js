// @flow strict
import { type Node } from 'react';
import { Box, TableOfContents } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import main from '../../examples/tableofcontents/main.js';

const toc = new Array<number>(8)
  .fill(0)
  .map((_, i) => ({ label: `Section${i + 1}`, id: i + 1, nested: i > 2 }));

function Example() {
  const { hash } = global.location || { hash: '1' };

  return (
    <TableOfContents title="Page contents">
      {toc.map(({ id, label, nested }) => (
        <TableOfContents.Item
          key={id}
          label={nested ? `Sub${label}` : label}
          href={`#${id}`}
          active={hash === `#${id}`}
          nested={nested}
        />
      ))}
    </TableOfContents>
  );
}

export default function TableOfContentsPage({
  generatedDocGen,
}: {|
  generatedDocGen: DocGen,
|}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <Box padding={8} width="360px">
          <Example />
        </Box>
        <SandpackExample code={main} hideEditor name="Main TableOfContents example" />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines" />

      <MainSection name="Best practices" />

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Localization" />

      <MainSection name="Subcomponents" />

      <MainSection name="Variants" />

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
      **[TableOfContents](/TableOfContents)**
      Details about why to use this over current component.
    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'TableOfContents' }) },
  };
}
