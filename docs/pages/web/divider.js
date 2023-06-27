// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';

export default function DividerPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
        defaultCode={`
function Example() {
  const Block = ({ title, text }) => (
    <Flex direction="column" gap={{ column: 2, row: 0 }}>
      <Heading accessibilityLevel="none" size="400">{title}</Heading>
      <Text size="200">{text}</Text>
    </Flex>
  );

  return (
    <Flex>
      <Box paddingX={4}>
        <Block title="Discover ideas" text="Use the search bar to discover ideas, people and trends. Explore suggested topics or search for topics of your own." />
      </Box>
      <Divider />
      <Box paddingX={4}>
        <Block title="Create Pins" text="Upload an image from your computer or mobile device to create a Pin. You can also create Pins from images you find online." />
      </Box>
    </Flex>
  );
}
`}
      />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            type="do"
            title="When to use"
            description="Dividers should be used to bring clarity and structure to a layout. Primarily, Dividers help to separate groups of related elements or break up dense content."
          />
          <MainSection.Card
            type="don't"
            title="When not to use"
            description="Dividers shouldn't be used if elements can be separated using white space."
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
    <Flex direction="column" gap={{ column: 2, row: 0 }}>
      <Heading accessibilityLevel="none" size="400">{title}</Heading>
      <Text size="200">{text}</Text>
    </Flex>
  );

  return (
    <Flex direction="column" gap={{ column: 10, row: 0 }}>
      <Block title="Discover ideas" text="Use the search bar to discover ideas, people and trends. Explore suggested topics or search for topics of your own." />
      <Block title="Create Pins" text="Upload an image from your computer or mobile device to create a Pin. You can also create Pins from images you find online." />
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
    <Flex direction="column" gap={{ column: 2, row: 0 }}>
      <Heading accessibilityLevel="none" size="400">{title}</Heading>
      <Text size="200">{text}</Text>
    </Flex>
  );

  return (
    <Flex direction="column" gap={{ column: 10, row: 0 }}>
      <Divider />
      <Block title="Discover ideas" text="Use the search bar to discover ideas, people and trends. Explore suggested topics or search for topics of your own." />
      <Divider />
      <Block title="Create Pins" text="Upload an image from your computer or mobile device to create a Pin. You can also create Pins from images you find online." />
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
    <Flex direction="column" gap={{ column: 2, row: 0 }}>
      <Heading accessibilityLevel="none" size="400">{title}</Heading>
      {
        text.map((item, idx) => <Text key={idx} size="200" underline><Link href="#" target="blank">{item}</Link></Text> )
      }
    </Flex>
  );

  return (
    <Flex direction="column" gap={{ column: 10, row: 0 }} width={300}>
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
    <Flex direction="column" gap={{ column: 2, row: 0 }}>
      <Heading accessibilityLevel="none" size="400">{title}</Heading>
      {
        text.map((item, idx) => <Text key={idx} size="200" underline><Link href="#" target="blank">{item}</Link></Text> )
      }
    </Flex>
  );

  return (
    <Flex direction="column" gap={{ column: 10, row: 0 }} width={300}>
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
    <Flex gap={{ row: 2, column: 0 }} alignItems="center">
      <Box maxWidth={60}>
        <Mask rounding={4}>
          <img alt="example image" src={url} style={{ maxWidth: '100%', display: 'block' }} />
        </Mask>
      </Box>
      <Flex.Item flex="grow">
        <Text weight="bold" size="200">
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
    <Flex direction="column" gap={{ column: 10, row: 0 }} width={300}>
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
            description="Inset Divider in a way that causes it to be free-floating or separated from content."
            defaultCode={`
function Example() {
  const Block = ({ title, url, locked }) => (
    <Flex gap={{ row: 2, column: 0 }} alignItems="center">
      <Box maxWidth={60}>
        <Mask rounding={4}>
          <img alt="example image" src={url} style={{ maxWidth: '100%', display: 'block' }} />
        </Mask>
      </Box>
      <Flex.Item flex="grow">
        <Text weight="bold" size="200">
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
    <Flex direction="column" gap={{ column: 10, row: 0 }} width={300}>
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
        <Flex direction="column" width={150}>
          {['Public profile', 'Account settings', 'Home feed tuner', 'Claim', 'Permissions'].map(
            (item, idx) => (
              <Tabs
                activeTabIndex={idx}
                onChange={() => {}}
                tabs={[{ text: item, href: '#Best-practices' }]}
              />
            ),
          )}
        </Flex>
      </Box>
      <Divider />
      <Box marginStart={12}>
        <Flex direction="column" gap={{ column: 4, row: 0 }}>
          <Heading accessibilityLevel="none" size="md">
            Public profile
          </Heading>
          <Avatar size="lg" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" name="Keerthi" />
          <TextField id="first" onChange={() => {}} label="First name" value="Kate" />
          <TextField id="last" onChange={() => {}} label="Last name" value="Dommeti" />
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
        <Heading accessibilityLevel="none" size="400">Our mission</Heading>
      </Box>
      <Divider />
      <Box paddingX={4}>
        <Text size="200">Pinterest's mission is to bring everyone the inspiration to create a life they love.</Text>
      </Box>
    </Flex>
  );
}
`}
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection
        name={generatedDocGen?.displayName}
        description="Divider is not focusable and is treated as decorative. Screen readers on tab navigation don't announce Dividers but do announce them on left/right quick navigation."
      />
      <MainSection name="Localization">
        <MainSection.Subsection description="If you are aligning Divider to content, ensure that it switches sides according to the content's start-end alignment." />
      </MainSection>
      <MainSection name="Variants">
        <MainSection.Subsection
          title="Orientation"
          columns={2}
          description="You can use this component as a vertical divider between two elements. Placing it within a Flex layout with a direction of `row` will shift Divider to a vertical orientation."
        >
          <MainSection.Card
            cardSize="md"
            title="Horizontal"
            defaultCode={`
function Example() {
  const Block = ({ title, text }) => (
    <Flex direction="column" gap={{ column: 2, row: 0 }}>
      <Heading accessibilityLevel="none" size="400">{title}</Heading>
      <Text size="200">{text}</Text>
    </Flex>
  );

  return (
    <Flex direction="column" gap={{ column: 10, row: 0 }}>
      <Block title="Discover ideas" text="Use the search bar to discover ideas, people and trends. Explore suggested topics or search for topics of your own." />
      <Divider />
      <Block title="Create Pins" text="Upload an image from your computer or mobile device to create a Pin. You can also create Pins from images you find online." />
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
    <Flex direction="column" gap={{ column: 2, row: 0 }}>
      <Heading accessibilityLevel="none" size="400">{title}</Heading>
      <Text size="200">{text}</Text>
    </Flex>
  );

  return (
    <Flex>
      <Box paddingX={4}>
        <Block title="Discover ideas" text="Use the search bar to discover ideas, people and trends. Explore suggested topics or search for topics of your own." />
      </Box>
      <Divider />
      <Box paddingX={4}>
        <Block title="Create Pins" text="Upload an image from your computer or mobile device to create a Pin. You can also create Pins from images you find online." />
      </Box>
    </Flex>
  );
}
`}
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('Divider') },
  };
}
