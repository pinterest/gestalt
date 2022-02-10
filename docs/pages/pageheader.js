// @flow strict
import { type Node } from 'react';
import Page from '../components/Page.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import docgen, { type DocGen } from '../components/docgen.js';
import DocsPageHeader from '../components/PageHeader.js'; // renaming to avoid confusion
import MainSection from '../components/MainSection.js';

export default function PageHeaderPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="PageHeader">
      <DocsPageHeader
        name="PageHeader"
        description={generatedDocGen?.description}
        shadedCodeExample
        defaultCode={`
      function IntroPageHeaderExample() {
        const [open, setOpen] = React.useState(false);
        const [selected, setSelected] = React.useState([]);
        const anchorRef = React.useRef(null);
        const handleSelect = ({ item }) => {
          if (selected.some((selectedItem) => selectedItem.value === item.value)) {
            setSelected((selected) =>
              selected.filter((selectedItem) => selectedItem.value != item.value),
            );
          } else {
            setSelected((selected) => [...selected, item]);
          }
        };

        return (
          <PageHeader
            title="Product groups"
            subtext="S. E. All products USD"
            secondaryAction={
              <React.Fragment>
                <Tooltip idealDirection="up" text="More options">
                  <IconButton
                    accessibilityControls="intro-ph-dropdown-example"
                    accessibilityHaspopup
                    accessibilityExpanded={open}
                    accessibilityLabel="More options"
                    icon="ellipsis"
                    iconColor="darkGray"
                    selected={open}
                    onClick={() => setOpen((prevVal) => !prevVal)}
                    ref={anchorRef}
                    size="lg"
                  />
                </Tooltip>
                {open && (
                  <Dropdown
                    id="intro-ph-dropdown-example"
                    anchor={anchorRef.current}
                    onDismiss={() => {
                      setOpen(false);
                    }}
                  >
                    <Dropdown.Item
                      handleSelect={handleSelect}
                      selected={selected}
                      option={{
                        value: 'Share Group',
                        label: 'Share Group',
                      }}
                    />
                    <Dropdown.Item
                      handleSelect={handleSelect}
                      selected={selected}
                      option={{ value: 'Help center', label: 'Help center' }}
                    />
                    <Dropdown.Item
                      handleSelect={handleSelect}
                      selected={selected}
                      badgeText="New"
                      option={{
                        value: 'Edit groups',
                        label: 'Edit groups',
                      }}
                    />
                  </Dropdown>
                )}
              </React.Fragment>
            }
            primaryAction={<Button color="red" size="lg" text="Create product group" />}
          />
        );
      }
    `}
      />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Best practices">
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="lg"
            type="do"
            description="Use only one primary style action in PageHeader ."
            defaultCode={`
<PageHeader
  title="Product groups"
  subtext="S. E. All products USD"
  primaryAction={<Button color="red" size="lg" text="Create group" />}
/>;
        `}
            shaded
          />
          <MainSection.Card
            cardSize="lg"
            type="do"
            description={`
        Ensure the title of PageHeader matches the title of the item that navigated the user to this page. For instance, if the user selects "Settings" from an overflow menu, the title of PageHeader should also say "Settings".
        `}
            defaultCode={`
<PageHeader
  title="Settings"
  primaryAction={
    <Tooltip text="Additional options">
      <IconButton icon="ellipsis" iconColor="darkGray" size="lg" accessibilityLabel="Additional options" />
    </Tooltip>
  }
/>;
        `}
            shaded
          />
          <MainSection.Card
            cardSize="lg"
            type="do"
            description={`
        Plan for most PageHeaders to be full width. A \`maxWidth\` should only be supplied when the content of the page is center aligned. Content should match PageHeader's 32px start/end padding.
        `}
            defaultCode={`
<Flex direction="column" flex="grow">
  <PageHeader
    title="Settings"
    primaryAction={
      <Tooltip text="Additional options" idealDirection="up">
        <IconButton icon="ellipsis" iconColor="darkGray" size="lg" accessibilityLabel="Additional options"/>
      </Tooltip>
    }
  />
  <Box
    display="flex"
    wrap
    width="80%"
    direction="column"
    marginStart={5}
  >
    <Box flex="grow" paddingX={3} paddingY={3}>
      <Heading size="400" accessibilityLevel={2}>Edit profile</Heading>
    </Box>

    <Box flex="grow" paddingX={3} paddingY={3}>
      <TextField
        label="Name"
        id="textfield1"
        onChange={() => {}}
        placeholder="Placeholder"
      />
    </Box>

    <Box flex="grow" paddingX={3} paddingY={3}>
      <Box display="flex" wrap marginStart={-3} marginEnd={-3} marginBottom={-3} marginTop={-3}>
        <Box flex="grow" paddingX={3} paddingY={3}>
          <TextField
            label="Phone"
            id="textfield2"
            onChange={() => {}}
            placeholder="Placeholder"
          />
        </Box>
        <Box flex="grow" paddingX={3} paddingY={3}>
          <TextField
            label="Email"
            id="textfield3"
            onChange={() => {}}
            placeholder="Placeholder"
          />
        </Box>
      </Box>
    </Box>

    <Box flex="grow" paddingX={3} paddingY={3}>
      <SelectList
        label="Location"
        id="selectlist"
        options={[
          {
            value: 'belgium',
            label: 'Belgium',
          },
          {
            value: 'france',
            label: 'France',
          },
          {
            value: 'usa',
            label: 'USA',
          },
        ]}
        placeholder="Placeholder"
        onChange={() => {}}
      />
    </Box>
  </Box>
</Flex>;
        `}
            shaded
          />
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description="Supply more than one primary style action."
            defaultCode={`
<PageHeader
  title="Product groups"
  subtext="S. E. All products USD"
  primaryAction={<Button color="red" size="lg" text="Create product group" />}
  secondaryAction={<Button color="red" size="lg" text="Promote" />}
/>;
        `}
            shaded
          />
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description={`
        Use subtext to add a description about the page. It should only be used for metadata.
        `}
            defaultCode={`
<PageHeader
  title="Product groups"
  subtext="Product groups are created in order to relate certain products together for tracking purposes"
  primaryAction={<Button color="red" size="lg" text="Create product group" />}
  secondaryAction={<Button text="Promote" size="lg" />}
/>;
        `}
            shaded
          />
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description={`
        Use \`maxWidth\` when the content of the page is not center aligned.
        `}
            defaultCode={`
<Flex gap={4} direction="column" flex="grow">
  <PageHeader
    title="Settings"
    maxWidth="50%"
    primaryAction={
      <Tooltip text="Additional options" idealDirection="up">
        <IconButton icon="ellipsis" iconColor="darkGray" size="lg" accessibilityLabel="Additional options"/>
      </Tooltip>
    }
  />
  <Box
    display="flex"
    wrap
    width="80%"
    direction="column"
    marginStart={5}
  >
    <Box flex="grow" paddingX={3} paddingY={3}>
      <Heading size="400" accessibilityLevel={2}>Edit profile</Heading>
    </Box>

    <Box flex="grow" paddingX={3} paddingY={3}>
      <TextField
        label="Name"
        id="textfield4"
        onChange={() => {}}
        placeholder="Placeholder"
      />
    </Box>

    <Box flex="grow" paddingX={3} paddingY={3}>
      <Box display="flex" wrap marginStart={-3} marginEnd={-3} marginBottom={-3} marginTop={-3}>
        <Box flex="grow" paddingX={3} paddingY={3}>
          <TextField
            label="Phone"
            id="textfield5"
            onChange={() => {}}
            placeholder="Placeholder"
          />
        </Box>
        <Box flex="grow" paddingX={3} paddingY={3}>
          <TextField
            label="Email"
            id="textfield6"
            onChange={() => {}}
            placeholder="Placeholder"
          />
        </Box>
      </Box>
    </Box>

    <Box flex="grow" paddingX={3} paddingY={3}>
      <SelectList
        label="Location"
        id="selectlist-location"
        options={[
          {
            value: 'belgium',
            label: 'Belgium',
          },
          {
            value: 'france',
            label: 'France',
          },
          {
            value: 'usa',
            label: 'USA',
          },
        ]}
        placeholder="Placeholder"
        onChange={() => {}}
      />
    </Box>
  </Box>
</Flex>;
        `}
            shaded
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection
        name="Accessibility"
        description={`Be sure to follow any accessibility guidelines for the components used within PageHeader. The heading within PageHeader will be rendered as a level 1 heading, so ensure there are no other level 1 headings present on the page. For headings level 2-6, use [Heading](/heading). Learn more about <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/" target="blank">creating accessible headings</a>.`}
      >
        <MainSection.Card
          cardSize="lg"
          defaultCode={`
<Flex direction="column" flex="grow">
  <PageHeader
    title="Settings"
    primaryAction={
      <Tooltip text="Additional options" idealDirection="up">
        <IconButton icon="ellipsis" iconColor="darkGray" size="lg" accessibilityLabel="Additional options"/>
      </Tooltip>
    }
  />
  <Box
    display="flex"
    wrap
    width="80%"
    direction="column"
    marginStart={5}
  >
    <Box flex="grow" paddingX={3} paddingY={3}>
      <Heading size="400" accessibilityLevel={2}>Edit profile</Heading>
    </Box>

    <Box flex="grow" paddingX={3} paddingY={3}>
      <TextField
        label="Name"
        id="textfield7"
        onChange={() => {}}
        placeholder="Placeholder"
      />
    </Box>

    <Box flex="grow" paddingX={3} paddingY={3}>
      <Box display="flex" wrap marginStart={-3} marginEnd={-3} marginBottom={-3} marginTop={-3}>
        <Box flex="grow" paddingX={3} paddingY={3}>
          <TextField
            label="Phone"
            id="textfield8"
            onChange={() => {}}
            placeholder="Placeholder"
          />
        </Box>
        <Box flex="grow" paddingX={3} paddingY={3}>
          <TextField
            label="Email"
            id="textfield9"
            onChange={() => {}}
            placeholder="Placeholder"
          />
        </Box>
      </Box>
    </Box>
  </Box>
</Flex>;
        `}
          shaded
        />
      </MainSection>

      <MainSection
        name="Localization"
        description={`Be sure to localize the \`title\`, \`subtext\` and actions within PageHeader.`}
      >
        <MainSection.Card
          shaded
          cardSize="lg"
          defaultCode={`
<PageHeader
  title="Langer Seitentitel, der in einigen Sprachen möglicherweise abgeschnitten wird"
  subtext="2.131 Produkte"
  primaryAction={<Button color="red" size="lg" text="Schnell erstellen" />}
/>;
  `}
        />
      </MainSection>

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`PageHeader supports an optional \`primaryAction\`. It can be a [Button](/button), a [Link](/link) or an [IconButton](/iconbutton) with a [Tooltip](/tooltip) and optional [Dropdown](/dropdown). Any Buttons or IconButtons should be \`size="lg"\`.`}
          title="Primary action"
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function PrimaryActionExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const anchorRef = React.useRef(null);
  const handleSelect = ({ item }) => {
    if (selected.some((selectedItem) => selectedItem.value === item.value)) {
      setSelected((selected) =>
        selected.filter((selectedItem) => selectedItem.value != item.value),
      );
    } else {
      setSelected((selected) => [...selected, item]);
    }
  };

  return (
    <Flex gap={8} direction="column" flex="grow">
      <PageHeader
        title="Product groups"
        subtext="S. E. All products USD"
        primaryAction={<Button color="red" size="lg" text="Create group" />}
      />
      <Divider />
      <PageHeader
        title="Kitchen Reno Ideas"
        primaryAction={
          <React.Fragment>
            <Tooltip idealDirection="up" text="Board options">
              <IconButton
                accessibilityControls="page-header-example"
                accessibilityHaspopup
                accessibilityExpanded={open}
                accessibilityLabel="Board options"
                icon="ellipsis"
                iconColor="darkGray"
                selected={open}
                onClick={() => setOpen((prevVal) => !prevVal)}
                ref={anchorRef}
                size="lg"
              />
            </Tooltip>
            {open && (
              <Dropdown
                id="page-header-example"
                anchor={anchorRef.current}
                onDismiss={() => {
                  setOpen(false);
                }}
              >
                <Dropdown.Item
                  handleSelect={handleSelect}
                  selected={selected}
                  option={{
                    value: 'Edit Board',
                    label: 'Edit Board',
                  }}
                />
                <Dropdown.Item
                  handleSelect={handleSelect}
                  selected={selected}
                  option={{ value: 'Share', label: 'Share' }}
                />
                <Dropdown.Item
                  handleSelect={handleSelect}
                  selected={selected}
                  badgeText="New"
                  option={{
                    value: 'Merge',
                    label: 'Merge',
                  }}
                />
              </Dropdown>
            )}
          </React.Fragment>
        }
      />
      <Divider />
      <PageHeader
        title="Create campaign"
        primaryAction={
          <Link href="www.pinterest.com">
            <Text weight="bold">Switch to quick ad creation</Text>
          </Link>
        }
      />
    </Flex>
  );
}
        `}
            shaded
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`PageHeader also supports an optional \`secondaryAction\`. It will likely be a [Button](/button) or an [IconButton](/iconbutton) with a [Tooltip](/tooltip) and optional [Dropdown](/dropdown). Any Buttons or IconButtons should be \`size="lg"\`.`}
          title="Secondary action"
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function SecondaryActionExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const anchorRef = React.useRef(null);
  const handleSelect = ({ item }) => {
    if (selected.some((selectedItem) => selectedItem.value === item.value)) {
      setSelected((selected) =>
        selected.filter((selectedItem) => selectedItem.value != item.value),
      );
    } else {
      setSelected((selected) => [...selected, item]);
    }
  };

  return (
    <Flex gap={8} direction="column" flex="grow">
      <PageHeader
        title="Product groups"
        subtext="S. E. All products USD"
        primaryAction={<Button color="red" size="lg" text="Create product group" />}
        secondaryAction={<Button text="Promote" size="lg"/>}
      />
      <Divider />
      <PageHeader
        title="Custom reports"
        primaryAction={<Button color="red" size="lg" text="Create new report" />}
        secondaryAction={
          <React.Fragment>
            <Tooltip idealDirection="up" text="Board options">
              <IconButton
                accessibilityControls="page-header-example"
                accessibilityHaspopup
                accessibilityExpanded={open}
                accessibilityLabel="Board options"
                icon="ellipsis"
                iconColor="darkGray"
                selected={open}
                onClick={() => setOpen((prevVal) => !prevVal)}
                ref={anchorRef}
                size="lg"
              />
            </Tooltip>
            {open && (
              <Dropdown
                id="page-header-example"
                anchor={anchorRef.current}
                onDismiss={() => {
                  setOpen(false);
                }}
              >
                <Dropdown.Item
                  handleSelect={handleSelect}
                  selected={selected}
                  option={{
                    value: 'Share Report',
                    label: 'Share Report',
                  }}
                />
                <Dropdown.Item
                  handleSelect={handleSelect}
                  selected={selected}
                  option={{ value: 'Help center', label: 'Help center' }}
                />
                <Dropdown.Item
                  handleSelect={handleSelect}
                  selected={selected}
                  badgeText="New"
                  option={{
                    value: 'Delete',
                    label: 'Delete',
                  }}
                />
              </Dropdown>
            )}
          </React.Fragment>
        }
      />
    </Flex>
  );
}
        `}
            shaded
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`\`subtext\` should be used to add metadata about the content on the page, not to describe the page itself.`}
          title="Subtext"
        >
          <MainSection.Card
            shaded
            cardSize="lg"
            defaultCode={`
<PageHeader
  title="Create product group"
  subtext="2,131 products"
  primaryAction={<Button color="red" size="lg" text="Quick create" />}
/>;
        `}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`\`maxWidth\` should be set when the content of the page is centered and/or has a maximum width itself.`}
          title="Max width"
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Box width="100%" color="lightGray" padding={2}>
  <Box color="white" marginBottom={4} >
    <PageHeader
      title="All boards"
      maxWidth="65%"
      primaryAction={
        <Tooltip text="Additional options" idealDirection="up">
          <IconButton icon="ellipsis" iconColor="darkGray" size="lg" accessibilityLabel="Additional options"/>
        </Tooltip>
      }
    />
  </Box>
  <Flex direction="column" alignItems="center" justifyContent="center" gap={1}>
    <Avatar size="lg" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" name="Keerthi" />
    <Heading size="500">Keerthi M.</Heading>
    <Text>@kreethiM</Text>
    <Text weight="bold">4 followers · 0 following </Text>
  </Flex>
</Box>;
      `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
      **[Heading](/heading)**
      Heading should be used to create level 2-6 headings on a page. If a level 1 heading is needed, use PageHeader.
    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getStaticProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'PageHeader' }) },
  };
}
