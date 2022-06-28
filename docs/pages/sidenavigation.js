// @flow strict
import { type Node } from 'react';
import { Box } from 'gestalt';
import MainSection from '../components/MainSection.js';
import PageHeader from '../components/PageHeader.js';
import Page from '../components/Page.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import docgen, { type DocGen } from '../components/docgen.js';
import CombinationNew from '../components/CombinationNew.js';

export default function SideNavigationPage({
  generatedDocGen,
}: {|
  generatedDocGen: DocGen,
|}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
        defaultCode={`
          <SideNavigation>
            <SideNavigation.Section label="Work">
              <SideNavigation.MainItem href="#" text="Work" icon="ads-stats" badge={{ text: "New", type: "info"}} counter="200" />
              <SideNavigation.MainItem href="#" text="Work" icon={{ __path: 'M23 5v14a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4v-5.5h10.258l-1.94 1.939a1.5 1.5 0 0 0 2.121 2.122L17 12l-5.561-5.561a1.501 1.501 0 0 0-2.121 2.122l1.94 1.939H1V5a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4'}} badge={{ text: "New", type: "info"}}/>
            </SideNavigation.Section>
            <SideNavigation.Section label="Work">
              <SideNavigation.MainItem href="#" text="Work" icon="ads-stats" badge={{ text: "New", type: "info"}} counter="200" />
              <SideNavigation.MainItem href="#" text="Work" icon={{ __path: 'M23 5v14a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4v-5.5h10.258l-1.94 1.939a1.5 1.5 0 0 0 2.121 2.122L17 12l-5.561-5.561a1.501 1.501 0 0 0-2.121 2.122l1.94 1.939H1V5a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4'}} badge={{ text: "New", type: "info"}}/>
            </SideNavigation.Section>
          </SideNavigation>
        `}
      />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection
        name="Accessibility"
        description={`\`Accessibility\` guidelines go here. Can also include SubSections and Cards for detailed examples (see Box). Using backticks instead of quotes allows you to use [Markdown](https://www.markdownguide.org/)`}
      />
      <MainSection name="Variants">
        <MainSection.Subsection
          description={`Description of this \`variant\`. Using backticks instead of quotes allows you to use [Markdown](https://www.markdownguide.org/)`}
          title="Variant name (sentence case)"
        >
          <MainSection.Card
            cardSize="md"
            title="Example title (optional)"
            defaultCode={`
Code for this example goes here
`}
          />
        </MainSection.Subsection>
      </MainSection>
    </Page>
  );
}

export async function getStaticProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'SideNavigation' }) },
  };
}
