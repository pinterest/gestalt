// @flow strict
import { type Node } from 'react';
import Page from '../components/Page.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import docgen, { type DocGen } from '../components/docgen.js';
import DocsPageHeader from '../components/PageHeader.js'; // renaming to avoid confusion
import MainSection from '../components/MainSection.js';

export default function PageHeaderPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <DocsPageHeader
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
        shadedCodeExample
        defaultCode={`
function Example() {
  return (
    <Box width="100%">
      <PageHeader
        title="Product groups"
        subtext="S. E. All products USD."
        badge={{ text: 'Beta', tooltipText: 'This feature is on beta phase' }}
        helperIconButton={{
          accessibilityLabel: 'test',
          accessibilityControls: 'test',
          accessibilityExpanded: false,
          onClick: () => {},
        }}
        helperLink={{
          text: 'Learn more',
          accessibilityLabel: 'Learn more',
          href: '#',
          onClick: () => {},
        }}
        items={[
          <Datapoint
            size="md"
            title="Spend"
            value="$1.23M"
            trend={{ value: 29, accessibilityLabel: 'Trending up' }}
          />,
        ]}
        primaryAction={{
          component: <Button color="red" size="lg" text="Promote" />,
          dropdownItems: [
            <Dropdown.Item option={{ value: 'Promote', label: 'Promote' }} onSelect={() => {}} />,
          ],
        }}
        secondaryAction={{
          component: <Button size="lg" text="View analytics" />,
          dropdownItems: [
            <Dropdown.Link
              option={{ value: 'View analytics', label: 'View analytics' }}
              href="https://pinterest.com"
            />,
          ],
        }}
        thumbnail={
          <Image
            alt="square"
            fit="cover"
            naturalHeight={1}
            naturalWidth={1}
            src="https://i.ibb.co/d0pQsJz/stock3.jpg"
          />
        }
        dropdownAccessibilityLabel="More options"
      />
    </Box>
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
<Box width="100%">
  <PageHeader
    title="Product groups"
    subtext="S. E. All products USD"
    primaryAction={{
      component: <Button color="red" size="lg" text="Create group" />,
      dropdownItems: [
        <Dropdown.Item
          option={{ value: 'Create group', label: 'Create group' }}
          onSelect={() => {}}
        />,
      ],
    }}
    dropdownAccessibilityLabel="More options"
  />
</Box>
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
<Box width="100%">
  <PageHeader
    title="Settings"
    primaryAction={{ component:
      <Tooltip text="Additional options">
        <IconButton
          icon="ellipsis"
          iconColor="darkGray"
          size="lg"
          accessibilityLabel="Additional options"
        />
      </Tooltip>, dropdownItems:[
      <Dropdown.Item
        option={{ value: 'Item', label: 'Item' }}
        onSelect={() => {}}
      />,
    ]
    }}
    dropdownAccessibilityLabel="Additional options"
  />
</Box>
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
    primaryAction={{
      component: (
        <Tooltip text="Additional options" idealDirection="up">
          <IconButton
            icon="ellipsis"
            iconColor="darkGray"
            size="lg"
            accessibilityLabel="Additional options"
          />
        </Tooltip>
      ),
      dropdownItems: [
        <Dropdown.Item option={{ value: 'Item', label: 'Item' }} onSelect={() => {}} />,
      ],
    }}
    dropdownAccessibilityLabel="Additional options"
  />
  <Box display="flex" wrap width="80%" direction="column" marginStart={5}>
    <Box flex="grow" paddingX={3} paddingY={3}>
      <Heading size="400" accessibilityLevel={2}>
        Edit profile
      </Heading>
    </Box>

    <Box flex="grow" paddingX={3} paddingY={3}>
      <TextField label="Name" id="textfield1" onChange={() => {}} placeholder="Placeholder" />
    </Box>
    <Box flex="grow" paddingX={3} paddingY={3}>
      <Box display="flex" wrap marginStart={-3} marginEnd={-3} marginBottom={-3} marginTop={-3}>
        <Box flex="grow" paddingX={3} paddingY={3}>
          <TextField label="Phone" id="textfield2" onChange={() => {}} placeholder="Placeholder" />
        </Box>
        <Box flex="grow" paddingX={3} paddingY={3}>
          <TextField label="Email" id="textfield3" onChange={() => {}} placeholder="Placeholder" />
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
<Box width="100%">
  <PageHeader
    title="Product groups"
    subtext="S. E. All products USD"
    primaryAction={{
      component: <Button color="red" size="lg" text="Create product group" />,
      dropdownItems: [
        <Dropdown.Item
          option={{ value: 'Create product group', label: 'Create product group' }}
          onSelect={() => {}}
        />,
      ],
    }}
    secondaryAction={{
      component: <Button color="red" size="lg" text="Promote" />,
      dropdownItems: [
        <Dropdown.Item option={{ value: 'Promote', label: 'Promote' }} onSelect={() => {}} />,
      ],
    }}
    dropdownAccessibilityLabel="Additional options"
  />
</Box>
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
<Box width="100%">
  <PageHeader
    title="Product groups"
    subtext="Product groups are created in order to relate certain products together for tracking purposes"
    primaryAction={{
      component: <Button color="red" size="lg" text="Create product group" />,
      dropdownItems: [
        <Dropdown.Item
          option={{ value: 'Create product group', label: 'Create product group' }}
          onSelect={() => {}}
        />,
      ],
    }}
    secondaryAction={{
      component: <Button text="Promote" size="lg" />,
      dropdownItems: [
        <Dropdown.Item option={{ value: 'Promote', label: 'Promote' }} onSelect={() => {}} />,
      ],
    }}
    dropdownAccessibilityLabel="Additional options"
  />
</Box>
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
    primaryAction={{
      component: (
        <Tooltip text="Additional options" idealDirection="up">
          <IconButton
            icon="ellipsis"
            iconColor="darkGray"
            size="lg"
            accessibilityLabel="Additional options"
          />
        </Tooltip>
      ),
      dropdownItems: [
        <Dropdown.Item option={{ value: 'Item', label: 'Item' }} onSelect={() => {}} />,
      ],
    }}
    dropdownAccessibilityLabel="Additional options"
  />
  <Box display="flex" wrap width="80%" direction="column" marginStart={5}>
    <Box flex="grow" paddingX={3} paddingY={3}>
      <Heading size="400" accessibilityLevel={2}>
        Edit profile
      </Heading>
    </Box>

    <Box flex="grow" paddingX={3} paddingY={3}>
      <TextField label="Name" id="textfield4" onChange={() => {}} placeholder="Placeholder" />
    </Box>

    <Box flex="grow" paddingX={3} paddingY={3}>
      <Box display="flex" wrap marginStart={-3} marginEnd={-3} marginBottom={-3} marginTop={-3}>
        <Box flex="grow" paddingX={3} paddingY={3}>
          <TextField label="Phone" id="textfield5" onChange={() => {}} placeholder="Placeholder" />
        </Box>
        <Box flex="grow" paddingX={3} paddingY={3}>
          <TextField label="Email" id="textfield6" onChange={() => {}} placeholder="Placeholder" />
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
</Flex>
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
    primaryAction={{
      component: (
        <Tooltip text="Additional options" idealDirection="up">
          <IconButton
            icon="ellipsis"
            iconColor="darkGray"
            size="lg"
            accessibilityLabel="Additional options"
          />
        </Tooltip>
      ),
      dropdownItems: [
        <Dropdown.Item option={{ value: 'Item', label: 'Item' }} onSelect={() => {}} />,
      ],
    }}
    dropdownAccessibilityLabel="Additional options"
  />
  <Box display="flex" wrap width="80%" direction="column" marginStart={5}>
    <Box flex="grow" paddingX={3} paddingY={3}>
      <Heading size="400" accessibilityLevel={2}>
        Edit profile
      </Heading>
    </Box>

    <Box flex="grow" paddingX={3} paddingY={3}>
      <TextField label="Name" id="textfield7" onChange={() => {}} placeholder="Placeholder" />
    </Box>

    <Box flex="grow" paddingX={3} paddingY={3}>
      <Box display="flex" wrap marginStart={-3} marginEnd={-3} marginBottom={-3} marginTop={-3}>
        <Box flex="grow" paddingX={3} paddingY={3}>
          <TextField label="Phone" id="textfield8" onChange={() => {}} placeholder="Placeholder" />
        </Box>
        <Box flex="grow" paddingX={3} paddingY={3}>
          <TextField label="Email" id="textfield9" onChange={() => {}} placeholder="Placeholder" />
        </Box>
      </Box>
    </Box>
  </Box>
</Flex>
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
<Box width="100%">
  <PageHeader
    title="Langer Seitentitel, der in einigen Sprachen möglicherweise abgeschnitten wird"
    subtext="2.131 Produkte"
    primaryAction={{
      component: <Button color="red" size="lg" text="Schnell erstellen" />,
      dropdownItems: [
        <Dropdown.Item
          option={{ value: '', label: 'Schnell erstellenSchnell erstellen' }}
          onSelect={() => {}}
        />,
      ],
    }}
    dropdownAccessibilityLabel="Zusatzoptionen"
  />
</Box>
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
            function Example() {
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
        primaryAction={{
          component: <Button color="red" size="lg" text="Create group" />,
          dropdownItems: [
            <Dropdown.Item
              option={{ value: 'Create group', label: 'Create group' }}
              onSelect={() => {}}
            />,
          ],
        }}
        dropdownAccessibilityLabel="Additional options"
      />
      <Divider />
      <PageHeader
        title="Kitchen Reno Ideas"
        primaryAction={{
          component: (
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
                    badge={{ text: 'New' }}
                    option={{
                      value: 'Merge',
                      label: 'Merge',
                    }}
                  />
                </Dropdown>
              )}
            </React.Fragment>
          ),
          dropdownItems: [
            <Dropdown.Item
              option={{ value: 'Edit board', label: 'Edit board' }}
              onSelect={() => {}}
            />,
            <Dropdown.Item
              option={{ value: 'Share board', label: 'Share board' }}
              onSelect={() => {}}
            />,
            <Dropdown.Item
              option={{ value: 'Merge board', label: 'Merge board' }}
              onSelect={() => {}}
            />,
          ],
        }}
        dropdownAccessibilityLabel="Additional options"
      />
      <Divider />
      <PageHeader
        title="Product groups"
        primaryAction={{
          component: (
            <Text weight="bold">
              <Link href="www.pinterest.com">Switch to quick ad creation</Link>
            </Text>
          ),
          dropdownItems: [
            <Dropdown.Link
              key="Visit"
              href="www.pinterest.com"
              option={{
                value: 'Switch to quick ad creation',
                label: 'Switch to quick ad creation',
              }}
            />,
          ],
        }}
        dropdownAccessibilityLabel="Additional options"
      />
    </Flex>
  )
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
function Example() {
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
        primaryAction={{
          component: <Button color="red" size="lg" text="Create product group" />,
          dropdownItems: [
            <Dropdown.Item
              option={{ value: 'Create product group', label: 'Create product group' }}
              onSelect={() => {}}
            />,
          ],
        }}
        secondaryAction={{
          component: <Button text="Promote" size="lg" />,
          dropdownItems: [
            <Dropdown.Item option={{ value: 'Promote', label: 'Promote' }} onSelect={() => {}} />,
          ],
        }}
        dropdownAccessibilityLabel="Additional options"
      />
      <Divider />
      <PageHeader
        title="Custom reports"
        dropdownAccessibilityLabel="Additional options"
        primaryAction={{
          component: <Button color="red" size="lg" text="Create new report" />,
          dropdownItems: [
            <Dropdown.Item
              option={{ value: 'Create new report', label: 'Create new report' }}
              onSelect={() => {}}
            />,
          ],
        }}
        secondaryAction={{
          component: (
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
                    badge={{ text: 'New' }}
                    option={{
                      value: 'Delete',
                      label: 'Delete',
                    }}
                  />
                </Dropdown>
              )}
            </React.Fragment>
          ),
          dropdownItems: [
            <Dropdown.Item
              option={{ value: 'Create new report', label: 'Create new report' }}
              onSelect={() => {}}
            />,
            <Dropdown.Item
              option={{ value: 'Share report', label: 'Share report' }}
              onSelect={() => {}}
            />,
            <Dropdown.Link
              option={{ value: 'Visit help center', label: 'Visit help center' }}
              isExternal
              onSelect={() => {}}
            />,
            <Dropdown.Item
              option={{ value: 'Delete report', label: 'Delete report' }}
              onSelect={() => {}}
            />,
          ],
        }}
      />
    </Flex>
  )
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
<Box width="100%">
  <PageHeader
    title="Create product group"
    subtext="2,131 products"
    primaryAction={{
      component: <Button color="red" size="lg" text="Quick create" />,
      dropdownItems: [
        <Dropdown.Item
          option={{ value: 'Quick create', label: 'Quick create' }}
          onSelect={() => {}}
        />,
      ],
    }}
    dropdownAccessibilityLabel="Additional options"
  />
</Box>
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
  <Box color="white" marginBottom={4}>
    <PageHeader
      title="All boards"
      maxWidth="65%"
      primaryAction={{
        component: (
          <Tooltip text="Additional options" idealDirection="up">
            <IconButton
              icon="ellipsis"
              iconColor="darkGray"
              size="lg"
              accessibilityLabel="Additional options"
            />
          </Tooltip>
        ),
        dropdownItems: [
          <Dropdown.Item option={{ value: 'Item', label: 'Item' }} onSelect={() => {}} />,
        ],
      }}
      dropdownAccessibilityLabel="Additional options"
    />
  </Box>
  <Flex direction="column" alignItems="center" justifyContent="center" gap={1}>
    <Avatar size="lg" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" name="Keerthi" />
    <Heading size="500">Keerthi M.</Heading>
    <Text>@kreethiM</Text>
    <Text weight="bold">4 followers · 0 following </Text>
  </Flex>
</Box>
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

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  const docGen = await docgen({ componentName: 'PageHeader' });
  docGen.props.primaryAction.flowType.raw =
    '{| component: React.Element<typeof Button | typeof IconButton | typeof Link | typeof Text | typeof Tooltip>>, dropdownItems: $ReadOnlyArray<React.Element<typeof DropdownItem | typeof DropdownLink>>> |}';
  docGen.props.secondaryAction.flowType.raw =
    '{| component: React.Element<typeof Button | typeof IconButton | typeof Link | typeof Text | typeof Tooltip>>, dropdownItems: $ReadOnlyArray<React.Element<typeof DropdownItem | typeof DropdownLink>>> |}';
  return {
    props: { generatedDocGen: docGen },
  };
}
