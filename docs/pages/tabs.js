// @flow strict
import { type Node } from 'react';
import Example from '../components/Example.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import MainSection from '../components/MainSection.js';
import Page from '../components/Page.js';
import PageHeader from '../components/PageHeader.js';
import docgen, { type DocGen } from '../components/docgen.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Tabs">
      <PageHeader
        name="Tabs"
        description={generatedDocGen?.description}
        defaultCode={`
    function DefaultExample() {
      const [activeIndex, setActiveIndex] = React.useState(0);

      return (
        <Tabs
          activeTabIndex={activeIndex}
          onChange={({ activeTabIndex }) => { setActiveIndex(activeTabIndex); }}
          tabs={[
            { href: "#", text: "Explore", indicator: "dot" },
            { href: "#", text: "Shop" },
            { href: "#", text: "Profiles" },
          ]}
          wrap
        />
      );
    }
    `}
        showSourceLink
      />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - To break up a large collection of content into logical, digestible views.
          - To switch between different, yet related views, such as Updates and Messages.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - When any UI or content above the Tabs is altered upon selection. Use [Link](/link) instead.
          - To break up content that is not related to each other or is not on the same hierarchical level.
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Place Tabs directly above the target content."
            defaultCode={`
function TabExample() {
  const [activeIndex, setActiveIndex] = React.useState(1);
  const [switched, setSwitched] = React.useState(true);

  const handleChange = ({ activeTabIndex, event }) => {
    event.preventDefault();
    setActiveIndex(activeTabIndex)
  };

  const tabs = [
    { href: "https://pinterest.com", text: "History" },
    { href: "https://pinterest.com", text: "Boards" },
    { href: "https://pinterest.com", text: "Topics" },
    { href: "https://pinterest.com", text: "Profiles" },
  ];

  return (
    <Flex width="100%" minWidth="100%" alignItems="center" direction="column" gap={4} flex="grow">
      <Flex gap={4} padding={2} direction="column">
        <Heading>Tune your home feed</Heading>
      </Flex>

      <Box paddingY={2}>
        <Tabs activeTabIndex={activeIndex} onChange={handleChange} tabs={tabs} />
      </Box>
      {activeIndex === 1 ? (
        <Flex.Item flex="grow" minWidth="100%">
          <Flex flex="grow" justifyContent="between">
            <Text>Board name</Text>
            <Text>Recommendations</Text>
          </Flex>
        </Flex.Item>
      ) : undefined}
      {activeIndex === 1 ? (
        <Flex.Item flex="grow" minWidth="100%">
          <Flex flex="grow" justifyContent="between">
            <Label htmlFor="interiorDesignBoard">
              <Text weight="bold">Interior Design - 19 Pins</Text>
            </Label>
            <Switch
              onChange={() => setSwitched(!switched)}
              id="interiorDesignBoard"
              switched={switched}
            />
          </Flex>
        </Flex.Item>
      ) : undefined}
    </Flex>
  );
}
  `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use Tabs as a way to filter content. Consider using [SegmentedControl](/segmentedcontrol) in this use-case."
            defaultCode={`
        function FilterExample() {
          const [activeIndex, setActiveIndex] = React.useState(0);

          const handleChange = ({ activeTabIndex, event }) => {
            event.preventDefault();
            setActiveIndex(activeTabIndex)
          };

          const tabs = [
            { href: "https://pinterest.com", text: "All Pins" },
            { href: "https://pinterest.com", text: "Your Pins" },
            { href: "https://pinterest.com", text: "Other Pins" },
          ];

          return (
            <Tabs
              activeTabIndex={activeIndex}
              onChange={handleChange}
              tabs={tabs}
            />
          );
        }
          `}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Keep Tab labels concise, ideally one to two words."
            defaultCode={`
        function ConciseExample() {
          const [activeIndex, setActiveIndex] = React.useState(0);

          const handleChange = ({ activeTabIndex, event }) => {
            event.preventDefault();
            setActiveIndex(activeTabIndex)
          };

          const tabs = [
            { href: "https://pinterest.com", text: "Explore" },
            { href: "https://pinterest.com", text: "Shop" },
            { href: "https://pinterest.com", text: "Profiles" },
          ];

          return (
            <Tabs
              activeTabIndex={activeIndex}
              onChange={handleChange}
              tabs={tabs}
            />
          );
        }
          `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Truncate labels in Tabs. If there is not enough horizontal space, allow the Tabs to scroll horizontally."
            defaultCode={`
        function TruncateExample() {
          const [activeIndex, setActiveIndex] = React.useState(0);

          const handleChange = ({ activeTabIndex, event }) => {
            event.preventDefault();
            setActiveIndex(activeTabIndex)
          };

          const tabs = [
            { href: "https://pinterest.com", text: "Boards for a..." },
            { href: "https://pinterest.com", text: "Pins for You" },
            { href: "https://pinterest.com", text: "Following" },
          ];

          return (
            <Tabs
              activeTabIndex={activeIndex}
              onChange={handleChange}
              tabs={tabs}
            />
          );
        }
          `}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Order Tabs by relevance — the first tab should be the most logical starting view. Ideally, sequence Tabs by association — tabs with similar content should be adjacent to each other."
            defaultCode={`
        function OrderExample() {
          const [activeIndex, setActiveIndex] = React.useState(0);

          const handleChange = ({ activeTabIndex, event }) => {
            event.preventDefault();
            setActiveIndex(activeTabIndex)
          };

          const tabs = [
            { href: "https://pinterest.com", text: "All" },
            { href: "https://pinterest.com", text: "Type treatments" },
            { href: "https://pinterest.com", text: "Font pairings" },
          ];

          return (
            <Tabs
              activeTabIndex={activeIndex}
              onChange={handleChange}
              tabs={tabs}
            />
          );
        }
          `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Disable or hide Tabs if a Tab's content is empty. There should always be at least 2 Tabs. We don't support applying a disabled state for the Tab as it can cause usability and accessibility issues."
            defaultCode={`
        function FilterExample() {
          const [activeIndex, setActiveIndex] = React.useState(0);

          const handleChange = ({ activeTabIndex, event }) => {
            event.preventDefault();
            setActiveIndex(activeTabIndex)
          };

          const tabs = [
            { href: "https://pinterest.com", text: "Saved" },
          ];

          return (
            <Tabs
              activeTabIndex={activeIndex}
              onChange={handleChange}
              tabs={tabs}
            />
          );
        }
          `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection
        name="Accessibility"
        description="Tabs are intended for page-level navigation between multiple URLs.
  Each tab must have an individual title that precisely describes the tab content. Provide a short, descriptive label for screen-readers using `accessibilityLabel`. It is helpful for users of assistive technologies so they have the necessary information to navigate the content efficiently."
      >
        <MainSection.Subsection
          title="Keyboard"
          description={`
      Tab key navigates the tabs.
      Enter/return key activates a tab (i.e., it navigates to the link \`href\`).`}
          columns={2}
        />
        <MainSection.Subsection
          title="Screen Reader"
          description={`
      The tab/link **must** announce a state of "current" if the \`href\` matches the current window URL.`}
        />
        <MainSection.Card />
      </MainSection>
      <MainSection
        name="Localization"
        description={`Be sure to localize \`text\` and \`accessibilityLabel\`.
    The Tab's title should be 3 words or less: long enough to be understood by users but short enough to prevent text wrapping. Aim for a single word when possible.`}
      />
      <Example
        name="Example"
        defaultCode={`
function TabExample() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [wrap, setWrap] = React.useState(false);

  const handleChange = ({ activeTabIndex, event }) => {
    event.preventDefault();
    setActiveIndex(activeTabIndex)
  };

  const tabs = [
    { href: "https://pinterest.com", text: "Boards for You", indicator: "dot" },
    { href: "https://pinterest.com", text: "Pins for You" },
    { href: "https://pinterest.com", text: "Following" },
    { href: "https://pinterest.com", text: "People to Follow" },
  ];

  return (
    <Flex alignItems="start" direction="column" gap={4}>
      <Flex gap={4} padding={2}>
        <Label htmlFor="wrap">
          <Text>Wrap</Text>
        </Label>
        <Switch
          id="wrap"
          onChange={() => setWrap(!wrap)}
          switched={wrap}
        />
      </Flex>

      <Box borderStyle="sm" maxWidth={500} overflow="auto" padding={1}>
        <Tabs
          activeTabIndex={activeIndex}
          onChange={handleChange}
          tabs={tabs}
          wrap={wrap}
        />
      </Box>
    </Flex>
  );
}
  `}
      />
      <Example
        name="Background color"
        defaultCode={`
function TabExample() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [wrap, setWrap] = React.useState(false);

  const handleChange = ({ activeTabIndex, event }) => {
    event.preventDefault();
    setActiveIndex(activeTabIndex)
  };

  const tabs = [
    { href: "https://pinterest.com", text: "Boards for You", indicator: "dot" },
    { href: "https://pinterest.com", text: "Pins for You" },
    { href: "https://pinterest.com", text: "Following" },
    { href: "https://pinterest.com", text: "People to Follow" },
  ];

  return (
    <Flex alignItems="start" direction="column" gap={4}>
      <Flex gap={4} padding={2}>
        <Label htmlFor="wrap">
          <Text>Wrap</Text>
        </Label>
        <Switch
          id="wrap"
          onChange={() => setWrap(!wrap)}
          switched={wrap}
        />
      </Flex>

      <Box borderStyle="sm" color="lightGray" maxWidth={500} overflow="auto" padding={1}>
        <Tabs
          activeTabIndex={activeIndex}
          bgColor="transparent"
          onChange={handleChange}
          tabs={tabs}
          wrap={wrap}
        />
      </Box>
    </Flex>
  );
}
  `}
      />
      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Link](/link)**
Link is used to navigate to different areas of the product or to external sites. Link is the preferred component in cases where you want to direct the user to unrelated content.

**[SegmentedControl](/segmentedcontrol)**
SegmentedControl is used to switch between views within a small area of content, such as a [Popover](/popover). SegmentedControl is preferred when changing state or selection within a view.
`}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Tabs' }) },
  };
}
