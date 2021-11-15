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
      <PageHeader
        name="Avatar"
        description={generatedDocGen?.description}
        defaultCode={`
      <Flex gap={4} wrap>
        <Avatar
          size="xs"
          src="https://i.ibb.co/ZfCZrY8/keerthi.jpg"
          name="Keerthi"
        />
        <Avatar
          size="sm"
          name="Keerthi"
        />
        <Avatar
          size="md"
          src="https://i.ibb.co/ZfCZrY8/keerthi.jpg"
          name="Keerthi"
          verified
        />
        <Avatar
          size="lg"
          name="Ayesha"
        />
        <Avatar
          size="xl"
          src="https://i.ibb.co/ZfCZrY8/keerthi.jpg"
          name="Keerthi"
        />
      </Flex>
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
          - To reflect a person, company or brand within the product.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When Not to Use"
            description={`
          - To represent a group of people, companies and/or brands. Use [AvatarGroup](/avatargroup) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best Practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use the default alternative if no image source is available. This will be the first character of the provided name."
            defaultCode={`
              <Avatar
                size="lg"
                name="Keerthi"
              />
            `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use alternative graphics or icons"
            defaultCode={`
              <Avatar
                size="lg"
                name="😀"
              />
            `}
          />
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use round Avatars in the appropriate size for your need. Learn more about [avatar sizing](/avatar#Fixed-Sizes)."
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
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Scale or change the shape of Avatar. Instead use the designated Avatar sizes and style."
            defaultCode={`
                <Mask rounding={3} width={150} height={150}>
                  <Image
                    alt="Keerthi Avatar"
                    color="#000"
                    fit="contain"
                    naturalHeight={1}
                    naturalWidth={1}
                    src="https://i.ibb.co/ZfCZrY8/keerthi.jpg"
                  />
                </Mask>
            `}
          />
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use Avatar to represent a person, organization or group ([Avatar Group](/avatargroup))."
            defaultCode={`
              <Flex direction="column" gap={2} alignItems="center">
                <Avatar
                  size="xl"
                  src="https://i.ibb.co/ZfCZrY8/keerthi.jpg"
                  name="Keerthi"
                />
                <Text weight="bold">Keerthi Singh</Text>
              </Flex>
            `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use Avatar to represent metaphorical ideas, like a Board. Instead, consider an icon or the appropriate interactive component."
            defaultCode={`
              <Flex direction="column" gap={2} alignItems="center">
                <Avatar
                  size="xl"
                  src="https://i.ibb.co/jVR29XV/stock5.jpg"
                  name="Artwork"
                />
                <Text weight="bold">Explore Typographic Art</Text>
              </Flex>
            `}
          />
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use the collaborator’s name nearby or in an alternative view if possible."
            defaultCode={`
              <Flex direction="column" gap={2} alignItems="center">
                <Avatar
                  size="xl"
                  src="https://i.ibb.co/7tGKGvb/shanice.jpg"
                  name="Shanice Byles"
                />
                <Text weight="bold">Shanice Byles</Text>
              </Flex>
            `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Place elements like washes, text or icons over Avatars."
            defaultCode={`
              <Box position="relative">
                <Mask wash>
                  <Avatar
                    size="xl"
                    src="https://i.ibb.co/jVR29XV/stock5.jpg"
                    name="Artwork"
                  />
                </Mask>
                <Box position="absolute" top="50%" left="50%">
                  <Text weight="bold">Explore Typographic Art</Text>
                </Box>
              </Box>
            `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection
        name="Accessibility"
        description={`
          The avatar should have a text equivalent. Use the \`accessibilityLabel\` prop to ensure there is a text description for the image. The VoiceOver description will default to the \`name\` prop if \`accessibilityLabel\` is not provided.

          Make sure that the alternative text properly describes the information and function of the avatar image(s). Depending on the situation, it may be helpful to state the collaborator or company name and/or their verification status.
        `}
      />
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
    Avatars without a \`size\` prop will expand to fit the width of their
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
