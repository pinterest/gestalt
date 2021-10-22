// @flow strict
import { type Node } from 'react';
import Page from '../components/Page.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import docgen, { type DocGen } from '../components/docgen.js';
import Example from '../components/Example.js';
import PageHeader from '../components/PageHeader.js';
import MainSection from '../components/MainSection.js';

export default function AvatarPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Avatar">
      <PageHeader name="Avatar" description={generatedDocGen?.description} />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to Use"
            description={`
          - To reflect a person, company or brand within the product.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When Not to Use"
            description={`
          - To represent a group of people, companies and/or brands. Use [AvatarGroup](/AvatarGroup) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <Example
        description={`
    There are 5 sizes available for Avatar. For certain designs you may need a [container-based size](#Container-Based-Sizes).
  `}
        name="Fixed Sizes"
        defaultCode={`
<Flex gap={4} wrap>
  <Avatar
    size="xs"
    src="https://i.ibb.co/ZfCZrY8/keerthi.jpg"
    name="Keerthi"
  />
  <Avatar
    size="sm"
    src="https://i.ibb.co/ZfCZrY8/keerthi.jpg"
    name="Keerthi"
  />
  <Avatar
    size="md"
    src="https://i.ibb.co/ZfCZrY8/keerthi.jpg"
    name="Keerthi"
  />
  <Avatar
    size="lg"
    src="https://i.ibb.co/ZfCZrY8/keerthi.jpg"
    name="Keerthi"
  />
  <Avatar
    size="xl"
    src="https://i.ibb.co/ZfCZrY8/keerthi.jpg"
    name="Keerthi"
  />
</Flex>
`}
      />

      <Example
        description={`
    Avatars without a \`size\` prop will be expand to fit to the width of their
    parent container. A common use case is to achieve column-based sizing.

    Resize the browser to see these Avatar change to match the width of the \`Column\` they
    have been placed in.
  `}
        name="Container-Based Sizes"
        defaultCode={`
<Flex>
  <Box width={40}>
    <Avatar name="Julia" />
  </Box>
  <Box column={2}>
    <Avatar name="Julia" />
  </Box>
  <Box column={4}>
    <Avatar name="Keerthi" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />
  </Box>
</Flex>
  `}
      />

      <Example
        description={`
    If there is no image source provided to the Avatar, the first character of
    the name provided will be used as a placeholder.
  `}
        name="Without an image"
        defaultCode={`
<Avatar
  name="Keerthi"
  size="lg"
/>
  `}
      />

      <Example
        description={`
    For users with verified accounts, use the \`verified\` prop to add a checkmark.
  `}
        name="Verified"
        defaultCode={`
<Avatar
  name="Shanice"
  size="lg"
  src="https://i.ibb.co/7tGKGvb/shanice.jpg"
  verified
/>
  `}
      />
    </Page>
  );
}

export async function getStaticProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen('Avatar') },
  };
}
