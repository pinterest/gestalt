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
      <PageHeader
        name="AvatarPair"
        description={generatedDocGen?.description}
        defaultCode={`
          <AvatarPair size="lg"
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
      <MainSection name="Variants">
        <MainSection.Subsection title="Fixed sizes">
          <MainSection.Card
            defaultCode={`
<Flex gap={4} direction="row">
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
  <AvatarPair size="lg"
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
</Flex>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
    The size of the avatars is defined by their container. In this case, the container is 100px wide & tall and each avatar becomes 75px.
  `}
          title="Container-based sizes"
        >
          <MainSection.Card
            defaultCode={`
<Box width={100}>
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
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Related">
        <MainSection.Subsection
          description={`
        **[Avatar](/avatar)**
        Avatar is the ideal component in cases where only one person or brand needs to be displayed.

        **[AvatarGroup](/avatargroup)**
        AvatarGroup is the ideal component in cases where multiple people/brands (typically more than two) need to be displayed in a horizontal, non-square format.
      `}
        />
      </MainSection>
    </Page>
  );
}

export async function getStaticProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen('AvatarPair') },
  };
}
