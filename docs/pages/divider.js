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
        description="If you have two elements that need to be separated, put a Divider between them."
        defaultCode={`
function Example() {
  const Block = ({ title, text }) => (
    <Flex direction="column" gap={2}>
      <Heading accessibilityLevel="none" size="sm">{title}</Heading>
      <Text size="md">{text}</Text>
    </Flex>
  );

  return (
    <Flex>
      <Box paddingX={4}>
        <Block title="Discover ideas" text="Use the search bar to discover ideas, people and trends. Explore suggested topics or search for topics of your own." />
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
            type="do"
            description={`
Dividers can be a subtle way to separate content; however, white space can be used to accomplish the same goal. Use dividers sparingly to avoid creating unnecessary clutter. Dividers should be used mainly to separate groups of related content.
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use whitespace primarily to separate groups of related content."
            defaultCode={`
function Example() {
  const Block = ({ title, text }) => (
    <Flex direction="column" gap={2}>
      <Heading accessibilityLevel="none" size="sm">{title}</Heading>
      <Text size="md">{text}</Text>
    </Flex>
  );

  return (
    <Flex direction="column" gap={10}>
      <Block title="Discover ideas" text="Use the search bar to discover ideas, people and trends. Explore suggested topics or search for topics of your own." />
      <Block title="Create Pins" text="Upload an image from your computer or mobile device to create a Pin. You can also create Pins from images yu find online." />
    </Flex>
  );
}
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Overuse Dividers as this can cause them to lose their value and create unnecessary noise."
            defaultCode={`
function Example() {
  const Block = ({ title, text }) => (
    <Flex direction="column" gap={2}>
      <Heading accessibilityLevel="none" size="sm">{title}</Heading>
      <Text size="md">{text}</Text>
    </Flex>
  );

  return (
    <Flex direction="column" gap={10}>
      <Divider />
      <Block title="Discover ideas" text="Use the search bar to discover ideas, people and trends. Explore suggested topics or search for topics of your own." />
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
            description="Use the default Gestalt Divider - 1px gray line."
            defaultCode={`
function Example() {
  const Block = ({ title, text }) => (
    <Flex direction="column" gap={2}>
      <Heading accessibilityLevel="none" size="sm">{title}</Heading>
      {
        text.map((item, idx) => <Text key={idx} size="md" underline><Link href="#" target="blank">{item}</Link></Text> )
      }
    </Flex>
  );

  return (
    <Flex direction="column" gap={10} width={300}>
      <Block title="Get started" text={['Add a Pinterest widget', 'Upgrade the Pinterest App', 'Interact with Idea Pins']} />
      <Divider />
      <Block title="Manage Account" text={['Edit notification settings', 'Two-factor authentication', 'Log in and out of Pinterest']} />
    </Flex>
  );
}
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Create your own divider with a different color or stroke style."
            defaultCode={`
function Example() {
  const Block = ({ title, text }) => (
    <Flex direction="column" gap={2}>
      <Heading accessibilityLevel="none" size="sm">{title}</Heading>
      {
        text.map((item, idx) => <Text key={idx} size="md" underline><Link href="#" target="blank">{item}</Link></Text> )
      }
    </Flex>
  );

  return (
    <Flex direction="column" gap={10} width={300}>
      <Block title="Get started" text={['Add a Pinterest widget', 'Upgrade the Pinterest App', 'Interact with Idea Pins']} />
      <hr style={{  borderTop: '3px dashed blue' }}/>
      <Block title="Manage Account" text={['Edit notification settings', 'Two-factor authentication', 'Log in and out of Pinterest']} />
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
            description="Use horizontal Dividers from edge to edge."
            defaultCode={`
function Example() {
  const Block = ({ title, url, locked }) => (
    <Flex gap={2} alignItems="center">
      <Box maxWidth={60}>
        <Mask rounding={4}>
          <img alt="example image" src={url} style={{ maxWidth: '100%', display: 'block' }} />
        </Mask>
      </Box>
      <Flex.Item flex="grow">
        <Text weight="bold" size="md">
          {title}
        </Text>
      </Flex.Item>
      {locked ? (
        <Icon accessibilityLabel="" icon="lock" size={12} />
      ) : (
        <AvatarGroup
          accessibilityLabel="Collaborators."
          size="sm"
          collaborators={[
            {
              name: 'Keerthi',
              src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
            },
            {
              name: 'Alberto',
              src: 'https://i.ibb.co/NsK2w5y/Alberto.jpg',
            },
            {
              name: 'Shanice',
              src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
            },
          ]}
        />
      )}
    </Flex>
  );

  return (
    <Flex direction="column" gap={10} width={300}>
      <Block title="Home decor" url="https://i.ibb.co/121JJzC/stock7.jpg" locked/>
      <Divider />
      <Block title="Plants" url="https://i.ibb.co/FY2MKr5/stock6.jpg" />
    </Flex>
  );
}
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Inset the Divider in a way that causes it to be free-floating or separated from content."
            defaultCode={`
function Example() {
  const Block = ({ title, url, locked }) => (
    <Flex gap={2} alignItems="center">
      <Box maxWidth={60}>
        <Mask rounding={4}>
          <img alt="example image" src={url} style={{ maxWidth: '100%', display: 'block' }} />
        </Mask>
      </Box>
      <Flex.Item flex="grow">
        <Text weight="bold" size="md">
          {title}
        </Text>
      </Flex.Item>
      {locked ? (
        <Icon accessibilityLabel="" icon="lock" size={12} />
      ) : (
        <AvatarGroup
          accessibilityLabel="Collaborators."
          size="sm"
          collaborators={[
            {
              name: 'Keerthi',
              src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
            },
            {
              name: 'Alberto',
              src: 'https://i.ibb.co/NsK2w5y/Alberto.jpg',
            },
            {
              name: 'Shanice',
              src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
            },
          ]}
        />
      )}
    </Flex>
  );

  return (
    <Flex direction="column" gap={10} width={300}>
      <Block title="Home decor" url="https://i.ibb.co/121JJzC/stock7.jpg" locked/>
      <Flex width="100%" justifyContent="center">
        <Box width="50%">
          <Divider />
        </Box>
      </Flex>
      <Block title="Plants" url="https://i.ibb.co/FY2MKr5/stock6.jpg" />
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
  return (
    <Flex width="100%" height="100%">
      <Box paddingX={4}>
        <Flex direction="column" gap={2} width={120}>
        {["Public profile", "Account settings", "Home feed tuner", "Claim", "Permissions", "Notifications"].map((item, idx) => <Text underline={idx === 0}weight="bold" key={idx} size="md" wrap="none">{item}</Text>)}
        </Flex>
      </Box>
      <Divider />
      <Box marginStart={12}>
        <Flex direction="column" gap={4}>
          <Heading accessibilityLevel="none" size="md">Public profile</Heading>
          <Avatar
            size="lg"
            src="https://i.ibb.co/ZfCZrY8/keerthi.jpg"
            name="Keerthi"
          />
          <TextField
            id="first"
            onChange={() => {}}
            label="First name"
            value="Kate"
          />
          <TextField
            id="last"
            onChange={() => {}}
            label="Last name"
            value="Dommeti"
          />
        </Flex>
      </Box>
    </Flex>
  );
}
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use Dividers for decoration or to separate grouped content."
            defaultCode={`
function Example() {
  return (
    <Flex width="80%">
      <Box paddingX={4}>
        <Heading accessibilityLevel="none" size="sm">Our mission</Heading>
      </Box>
      <Divider />
      <Box paddingX={4}>
        <Text size="md">Pinterest's mission is to bring everyone the inspiration to create a life they love.</Text>
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
        <MainSection.Subsection description="If you are aligning the Divider to content, ensure that it switches sides according to the content's start-end alignment." />
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
      <Heading accessibilityLevel="none" size="sm">{title}</Heading>
      <Text size="md">{text}</Text>
    </Flex>
  );

  return (
    <Flex direction="column" gap={10}>
      <Block title="Discover ideas" text="Use the search bar to discover ideas, people and trends. Explore suggested topics or search for topics of your own." />
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
      <Heading accessibilityLevel="none" size="sm">{title}</Heading>
      <Text size="md">{text}</Text>
    </Flex>
  );

  return (
    <Flex>
      <Box paddingX={4}>
        <Block title="Discover ideas" text="Use the search bar to discover ideas, people and trends. Explore suggested topics or search for topics of your own." />
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
