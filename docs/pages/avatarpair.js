// @flow strict
import { type Node } from 'react';
import Page from '../components/Page.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import docgen, { type DocGen } from '../components/docgen.js';
import Example from '../components/Example.js';
import PageHeader from '../components/PageHeader.js';
import MainSection from '../components/MainSection.js';

export default function AvatarPairPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="AvatarPair">
      <PageHeader name="AvatarPair" description={generatedDocGen?.description} />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to Use"
            description={`
          - To represent a group of people, companies and/or brands in a square format.
          - In cases where the space to represent user(s) can either be a single person/company or a group of people/companies.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When Not to Use"
            description={`
          - In cases where a square format is not required. Use [AvatarGroup](/avatargroup) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <Example
        name="Example: Basic"
        defaultCode={`
<AvatarPair size="md"
  collaborators={[
    {
      name: 'Keerthi',
      src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
    },
    {
      name: 'Shanice',
      src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
    },
  ]}
/>
`}
      />

      <Example
        description={`
    The size of the avatars is defined by their container. In this case the container is 64px wide & tall and each avatar is 48px.
  `}
        name="Example: Fit container width"
        defaultCode={`
<Box width={64}>
  <AvatarPair
    collaborators={[
      {
        name: 'Keerthi',
        src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
      },
      {
        name: 'Shanice',
        src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
      },
    ]}
  />
</Box>
`}
      />
    </Page>
  );
}

export async function getStaticProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen('AvatarPair') },
  };
}
