// @flow strict
import type { Node } from 'react';
import PageHeader from '../components/PageHeader.js';
import MainSection from '../components/MainSection.js';
import Page from '../components/Page.js';

export default function DividerPage(): Node {
  return (
    <Page title="Divider">
      <PageHeader
        name="Divider"
        description="If you have two things that need to be separated, put a `Divider` between them."
        defaultCode={`
function Example() {
  const Block = ({ title, text }) => (
    <Flex direction="column" gap={2}>
      <Heading size="sm">{title}</Heading>
      <Text size="md">{text}</Text>
    </Flex>
  );

  return (
    <Flex>
      <Box paddingX={4}>
        <Block title="Discover ideas" text="Use the searh bar to discover ideas, people and trends. Explore suggested topics or search for topics of your own." />
      </Box>
      <Divider />
      <Box paddingX={4}>
        <Block title="Create Pins" text="Upload an image from your computer or mobile device to create a Pin. You can also create Pins from images yu find online." />
      </Box>
    </Flex>
  );
}
`}
      />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection>
          <MainSection.Card
            description={`
Dividers can be a subtle way to separate content, however, white space can be used to accomplish the same goal. Use dividers sparingly to avoid creating unnecessary clutter. Dividers should be used mainly to separate groups of related content.
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use whitespace primarily to separate groups of related content"
            defaultCode={`
function Example() {
  const Block = ({ title, text }) => (
    <Flex direction="column" gap={2}>
      <Heading size="sm">{title}</Heading>
      <Text size="md">{text}</Text>
    </Flex>
  );

  return (
    <Flex direction="column" gap={10}>
      <Block title="Discover ideas" text="Use the searh bar to discover ideas, people and trends. Explore suggested topics or search for topics of your own." />
      <Block title="Create Pins" text="Upload an image from your computer or mobile device to create a Pin. You can also create Pins from images yu find online." />
    </Flex>
  );
}
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Overuse Dividers as this can cause them to lose their value and create unnecessary noise"
            defaultCode={`
function Example() {
  const Block = ({ title, text }) => (
    <Flex direction="column" gap={2}>
      <Heading size="sm">{title}</Heading>
      <Text size="md">{text}</Text>
    </Flex>
  );

  return (
    <Flex direction="column" gap={10}>
      <Divider />
      <Block title="Discover ideas" text="Use the searh bar to discover ideas, people and trends. Explore suggested topics or search for topics of your own." />
      <Divider />
      <Block title="Create Pins" text="Upload an image from your computer or mobile device to create a Pin. You can also create Pins from images yu find online." />
      <Divider />
    </Flex>
  );
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use the default Gestalt Divider - 1px gray line"
            defaultCode={`
function Example() {
  const Block = ({ title, text }) => (
    <Flex direction="column" gap={2}>
      <Heading size="sm">{title}</Heading>
      <Text size="md">{text}</Text>
    </Flex>
  );

  return (
    <Flex direction="column" gap={10}>
      <Block title="Discover ideas" text="Use the searh bar to discover ideas, people and trends. Explore suggested topics or search for topics of your own." />
      <Divider />
      <Block title="Create Pins" text="Upload an image from your computer or mobile device to create a Pin. You can also create Pins from images yu find online." />
    </Flex>
  );
}
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Create your own divider with a different color or stroke style. "
            defaultCode={`
function Example() {
  const Block = ({ title, text }) => (
    <Flex direction="column" gap={2}>
      <Heading size="sm">{title}</Heading>
      <Text size="md">{text}</Text>
    </Flex>
  );

  return (
    <Flex direction="column" gap={10}>
      <Block title="Discover ideas" text="Use the searh bar to discover ideas, people and trends. Explore suggested topics or search for topics of your own." />
      <hr style={{  borderTop: '3px dashed blue' }}/>
      <Block title="Create Pins" text="Upload an image from your computer or mobile device to create a Pin. You can also create Pins from images yu find online." />
    </Flex>
  );
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use horizontal Dividers from edge to edge"
            defaultCode={`
function Example() {
  const Block = ({ title, text }) => (
    <Flex direction="column" gap={2}>
      <Heading size="sm">{title}</Heading>
      <Text size="md">{text}</Text>
    </Flex>
  );

  return (
    <Flex direction="column" gap={10}>
      <Block title="Discover ideas" text="Use the searh bar to discover ideas, people and trends. Explore suggested topics or search for topics of your own." />
      <Divider />
      <Block title="Create Pins" text="Upload an image from your computer or mobile device to create a Pin. You can also create Pins from images yu find online." />
    </Flex>
  );
}
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Inset the divider in a way that causes it to be free-floating or separated from content"
            defaultCode={`
function Example() {
  const Block = ({ title, text }) => (
    <Flex direction="column" gap={2}>
      <Heading size="sm">{title}</Heading>
      <Text size="md">{text}</Text>
    </Flex>
  );

  return (
    <Flex direction="column" gap={10}>
      <Block title="Discover ideas" text="Use the searh bar to discover ideas, people and trends. Explore suggested topics or search for topics of your own." />
      <Flex width="100%" justifyContent="center">
        <Box width="50%">
          <Divider />
        </Box>
      </Flex>
      <Block title="Create Pins" text="Upload an image from your computer or mobile device to create a Pin. You can also create Pins from images yu find online." />
    </Flex>
  );
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use Dividers to separate collections of content or create the appearance of containers."
            defaultCode={`
function Example() {
  const Block = ({ title, text }) => (
    <Flex direction="column" gap={2}>
      <Heading size="sm">{title}</Heading>
      <Text size="md">{text}</Text>
    </Flex>
  );

  return (
    <Flex>
      <Box paddingX={4}>
        <Block title="Discover ideas" text="Use the searh bar to discover ideas, people and trends. Explore suggested topics or search for topics of your own." />
      </Box>
      <Divider />
      <Box paddingX={4}>
        <Block title="Create Pins" text="Upload an image from your computer or mobile device to create a Pin. You can also create Pins from images yu find online." />
      </Box>
    </Flex>
  );
}
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use Dividers for decoration or to separate grouped content"
            defaultCode={`
function Example() {
  return (
    <Flex width="80%">
      <Box paddingX={4}>
        <Heading size="sm">Create Pins</Heading>
      </Box>
      <Divider />
      <Box paddingX={4}>
        <Text size="md">Upload an image from your computer or mobile device to create a Pin. You can also create Pins from images yu find online.</Text>
      </Box>
    </Flex>
  );
}
`}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Accessibility">
        <MainSection.Subsection description="The Divider is not focusable and is treated as decorative. Screen readers on tab navigation don't announce Dividers but do announce them on left/right quick navigation." />
      </MainSection>
      <MainSection name="Localization">
        <MainSection.Subsection description="If you are aligning the Divider to content, ensure that it switches sides according to the contents start-alignment" />
      </MainSection>
      <MainSection name="Variants">
        <MainSection.Subsection
          title="Orientation"
          columns={2}
          description="You can use this component for a visual divider between two elements. Placing it within a [Flex](/flex) layout with a direction of `row` will cause the Divider to become vertical."
        >
          <MainSection.Card
            cardSize="md"
            title="Horizontal"
            defaultCode={`
function Example() {
  const Block = ({ title, text }) => (
    <Flex direction="column" gap={2}>
      <Heading size="sm">{title}</Heading>
      <Text size="md">{text}</Text>
    </Flex>
  );

  return (
    <Flex direction="column" gap={10}>
      <Block title="Discover ideas" text="Use the searh bar to discover ideas, people and trends. Explore suggested topics or search for topics of your own." />
      <Divider />
      <Block title="Create Pins" text="Upload an image from your computer or mobile device to create a Pin. You can also create Pins from images yu find online." />
    </Flex>
  );
}
`}
          />
          <MainSection.Card
            cardSize="md"
            title="Vertical"
            defaultCode={`
function Example() {
  const Block = ({ title, text }) => (
    <Flex direction="column" gap={2}>
      <Heading size="sm">{title}</Heading>
      <Text size="md">{text}</Text>
    </Flex>
  );

  return (
    <Flex>
      <Box paddingX={4}>
        <Block title="Discover ideas" text="Use the searh bar to discover ideas, people and trends. Explore suggested topics or search for topics of your own." />
      </Box>
      <Divider />
      <Box paddingX={4}>
        <Block title="Create Pins" text="Upload an image from your computer or mobile device to create a Pin. You can also create Pins from images yu find online." />
      </Box>
    </Flex>
  );
}
`}
          />
        </MainSection.Subsection>
      </MainSection>
    </Page>
  );
}
