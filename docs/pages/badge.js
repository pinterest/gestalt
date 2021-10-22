// @flow strict
import { type Node } from 'react';
import Page from '../components/Page.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import docgen, { type DocGen } from '../components/docgen.js';
import Example from '../components/Example.js';
import PageHeader from '../components/PageHeader.js';
import MainSection from '../components/MainSection.js';

export default function BadgePage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Badge">
      <PageHeader
        name="Badge"
        description={generatedDocGen?.description}
        defaultCode={`
      <Text>Update your pronouns in your profile settings <Badge text="New" /></Text>
    `}
      />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to Use"
            description={`
          - Labeling and bringing awareness to a specific element or feature (e.g., something is new or required).
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When Not to Use"
            description={`
          - Providing feedback at the element level (e.g., displaying error messages). Use inline text instead.
          - Requiring interaction from users since Badges are always static and non-interactive.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <Example
        description="
    The `Badge` component is rendered inline within parent element."
        name="Example"
        defaultCode={`
<Text>Some text that uses Badge component as its child <Badge text="New" /></Text>
`}
      />

      <Example
        description="
    Larger text example rendered with a top positioned `Badge`."
        name="Example: positioning"
        defaultCode={`
  <Heading>Heading <Badge text="Beta" position="top"/></Heading>
`}
      />

      <Example
        description={`
    Components like [Module](/Module) and [Dropdown](/Dropdown) support Badges within the component.`}
        name="Example: within other components"
        defaultCode={`
function ModuleExample() {
  return (
    <Box column={12} maxWidth={800} padding={2}>
      <Module
        badgeText="Try it out!"
        id="ModuleExample - badge"
        title="Title"
        >
        <Text size="md">This is example content.</Text>
      </Module>
    </Box>
  );
}
`}
      />
    </Page>
  );
}

export async function getStaticProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen('Badge') },
  };
}
