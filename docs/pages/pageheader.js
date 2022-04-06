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
<PageHeader
  title="Ads overview"
  items={[
    <Datapoint
      size="md"
      title="Impressions"
      value="$1.25M"
      trend={{ value: 30, accessibilityLabel: 'Trending up' }}
    />,
    <Datapoint
      size="md"
      title="Engagement"
      value="10%"
      trend={{ value: 5, accessibilityLabel: 'Trending up' }}
    />
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
  dropdownAccessibilityLabel="More options"
/>
    `}
      />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
- To inform a user about the overall content of a page
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
- As a header for an overlay surface like a Modal, Popover or Sheet
- As page navigation
- As a title for sections inside of a page—there should only be one page header on a page
- As a toolbar
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="lg"
            type="do"
            description="Use only one primary action style in PageHeader. This should also be the only primary action on the page."
            defaultCode={`
<PageHeader
  title="Audiences"
  primaryAction={{
    component: <Button color="red" size="lg" text="Create audience" />,
    dropdownItems: [
      <Dropdown.Item
        option={{ value: 'Create audience', label: 'Create audience' }}
        onSelect={() => {}}
      />,
    ],
  }}
  dropdownAccessibilityLabel="More options"
/>
`}
            shaded
          />
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description="Use more than one primary action style in PageHeader, or include a primary action when there’s already a primary action elsewhere on the page. If there's already a primary action elsewhere on the page, PageHeader can have 1 or 2 secondary actions."
            defaultCode={`
function Example() {
  const HeaderRow = ({ id }) => {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Box display="visuallyHidden"><Label htmlFor={id}>Not all checkboxes are checked</Label></Box>
            <Checkbox
              id={id}
    onChange={() => {}}
              indeterminate
              size="sm"
            />
          </Table.HeaderCell>
          {["Status", "Audience"].map((title, idx) => {
            return (
              <Table.HeaderCell key={idx}>
                <Text weight="bold">{title}</Text>
              </Table.HeaderCell>
            );
          })}
        </Table.Row>
      </Table.Header>
    )
  };

  const BaseRow = ({ id, checked, status, audience }) => {
    return (
      <Table.Row>
        <Table.Cell>
          <Checkbox
            id={id.replace(/ /g, "_").replace(/'/g, "") + "_" + status.replace(/ /g, "_").replace(/'/g, "")} onChange={() => {}}
            size="sm"
            checked={checked}
          />
        </Table.Cell>
        <Table.Cell>
          <Label htmlFor={id.replace(/ /g, "_").replace(/'/g, "") + "_" + status.replace(/ /g, "_").replace(/'/g, "")}>
            <Text>{status}</Text>
          </Label>
        </Table.Cell>
        <Table.Cell>
          <Text color="darkGray">{audience}</Text>
        </Table.Cell>
      </Table.Row>
    )
  };

  const tableID = "Audience table";

  return (
    <Box width="100%" color="white">
      <PageHeader
        borderStyle="sm"
        title="Audiences"
        primaryAction={{
          component: <Button color="red" size="lg" text="Create audience" />,
          dropdownItems: [
            <Dropdown.Item
              option={{ value: 'Create audience', label: 'Create audience' }}
              onSelect={() => {}}
            />,
          ],
        }}
        secondaryAction={{
          component: <Button color="red" size="lg" text="Export" />,
          dropdownItems: [
            <Dropdown.Item
              option={{ value: 'Export', label: 'Export' }}
              onSelect={() => {}}
            />,
          ],
        }}
        dropdownAccessibilityLabel="More options"
      />
      <Box padding={12}>
        <Flex gap={7} alignItems="end">
          <Flex.Item flex="grow">
            <Table accessibilityLabel="Audiences">
              <colgroup>
                <col span="1" style={{ width: "5%" }} />
                <col span="1" style={{ width: "10%" }} />
                <col span="1" style={{ width: "50%" }} />
              </colgroup>
              <HeaderRow id={tableID}/>
              <Table.Body>
                <BaseRow
                  id={tableID}
                  checked={true}
                  status="Active"
                  audience="East Coast"
                />
                <BaseRow
                  id={tableID}
                  disabled
                  status="Inactive"
                  audience="West Coast"
                />
              </Table.Body>
            </Table>
          </Flex.Item>
          <IconButton
            accessibilityLabel="Create new audience"
            bgColor="red"
            icon="add"
            onClick={() => {}}
            size="lg"
            tooltip={{text: "Create new audience", idealDirection: "up"}}
          />
        </Flex>
      </Box>
    </Box>
  )
}
`}
            shaded
          />
          <MainSection.Card
            cardSize="lg"
            type="do"
            description={`
Plan for most PageHeaders to be full width. A \`maxWidth\` should only be supplied when the content of the page is center aligned. The PageHeader’s padding should match the page’s overall padding.
        `}
            defaultCode={`
<Box width="100%" color="white">
  <PageHeader
    maxWidth="65%"
    borderStyle="sm"
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
    <Flex justifyContent="center">
      <Box color="white" width="60%" paddingY={6}>
        <Flex direction="column" gap={5}>
          <Heading size="400" accessibilityLevel={2}>
            Edit profile
          </Heading>
          <TextField label="Name" id="b-textfield1" onChange={() => {}} placeholder="Placeholder" />
          <Flex gap={2}>
            <Flex.Item flex="grow">
              <TextField label="Phone" id="b-textfield2" onChange={() => {}} placeholder="Placeholder" />
            </Flex.Item>
            <Flex.Item flex="grow">
              <TextField label="Email" id="b-textfield3" onChange={() => {}} placeholder="Placeholder" />
            </Flex.Item>
          </Flex>
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
        </Flex>
      </Box>
    </Flex>
</Box>
`}
            shaded
          />
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description={`Provide \`maxWidth\` for PageHeader content that is different from the page content`}
            defaultCode={`
<Box width="100%" color="white">
  <PageHeader
    maxWidth="65%"
    borderStyle="sm"
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
    <Flex justifyContent="center">
      <Box color="white" width="100%" padding={6}>
        <Flex direction="column" gap={5}>
          <Heading size="400" accessibilityLevel={2}>
            Edit profile
          </Heading>
          <TextField label="Name" id="c-textfield1" onChange={() => {}} placeholder="Placeholder" />
          <Flex gap={2}>
            <Flex.Item flex="grow">
              <TextField label="Phone" id="c-textfield2" onChange={() => {}} placeholder="Placeholder" />
            </Flex.Item>
            <Flex.Item flex="grow">
              <TextField label="Email" id="c-textfield3" onChange={() => {}} placeholder="Placeholder" />
            </Flex.Item>
          </Flex>
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
        </Flex>
      </Box>
    </Flex>
</Box>
`}
            shaded
          />
          <MainSection.Card
            cardSize="lg"
            type="do"
            description="Include an image when unique to the page content, such as a page dedicated to a developer’s apps"
            defaultCode={`
<PageHeader
  title="Pinterest app"
  subtext="Last updated 5 hours ago"
  primaryAction={{
    component: <IconButton
      accessibilityLabel="Refresh page"
      icon="refresh"
      iconColor="darkGray"
      onClick={() => {}}
      size="lg"
      tooltip={{text: "Refresh page", idealDirection: "up"}}
    />,
    dropdownItems: [
      <Dropdown.Item
        option={{ value: 'Refresh page', label: 'Refresh page' }}
        onSelect={() => {}}
      />,
    ],
  }}
  dropdownAccessibilityLabel="Additional options"
  thumbnail={
        <Image
          alt="square"
          fit="cover"
          naturalHeight={1}
          naturalWidth={1}
          src="https://i.ibb.co/LQc8ynn/image.png"
        />
      }

/>
`}
            shaded
          />
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description="Include a profile avatar image in PageHeader, as the user avatar should be provided in the main app header"
            defaultCode={`
<PageHeader
  title="My apps"
  subtext="5 total apps"
  primaryAction={{
    component: <IconButton
      accessibilityLabel="Refresh page"
      icon="refresh"
      iconColor="darkGray"
      onClick={() => {}}
      size="lg"
      tooltip={{text: "Refresh page", idealDirection: "up"}}
    />,
    dropdownItems: [
      <Dropdown.Item
        option={{ value: 'Refresh page', label: 'Refresh page' }}
        onSelect={() => {}}
      />,
    ],
  }}
  dropdownAccessibilityLabel="Additional options"
  thumbnail={
        <Image
          alt="square"
          fit="cover"
          naturalHeight={1}
          naturalWidth={1}
          src="https://i.ibb.co/ZfCZrY8/keerthi.jpg"
        />
      }

/>
`}
            shaded
          />
          <MainSection.Card
            cardSize="lg"
            type="do"
            description={`
Keep additional help buttons and links to a minimum, choosing one source of help per PageHeader`}
            defaultCode={`
<PageHeader
  title="Ads overview"
  helperIconButton={{
        accessibilityLabel: 'Read more information about Ads overview',
        onClick: () => {},
      }}
  items={[
    <Datapoint
      size="md"
      title="Impressions"
      value="$1.25M"
      trend={{ value: 30, accessibilityLabel: 'Trending up' }}
    />,
    <Datapoint
      size="md"
      title="Engagement"
      value="10%"
      trend={{ value: 5, accessibilityLabel: 'Trending up' }}
    />
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
  dropdownAccessibilityLabel="More options"
/>
        `}
            shaded
          />
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description={`
Overload PageHeader with a help IconButton, help Link and info icons. These may amount to visual noise once a user understands the page contents.`}
            defaultCode={`
<PageHeader
  title="Ads overview"
  helperIconButton={{
        accessibilityLabel: 'Read more information about Ads overview',
        onClick: () => {},
      }}
  subtext='5 active campaigns.'
  helperLink={{
    text: "Learn more.",
    accessibilityLabel: "Learn more Pinterest.com",
    href: "http://www.pinterest.com",
    onClick: () => {} }}
  items={[
    <Datapoint
      size="md"
      title="Impressions"
      value="$1.25M"
      tooltipText="The number of times your ads were seen."
      trend={{ value: 30, accessibilityLabel: 'Trending up' }}
    />,
    <Datapoint
      size="md"
      title="Engagement"
      value="10%"
      tooltipText="The number of times your ads were clicked."
      trend={{ value: 5, accessibilityLabel: 'Trending up' }}
    />
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
  dropdownAccessibilityLabel="More options"
/>
        `}
            shaded
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection
        name="Accessibility"
        description={`Be sure to follow any accessibility guidelines for the components used within PageHeader. The heading within PageHeader will be rendered as a level 1 heading, so ensure there are no other level 1 headings present on the page. For headings level 2-6, use [Headings](/heading). Learn more about <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/" target="blank" rel="noopener noreferrer nofollow">creating accessible headings</a>.`}
      >
        <MainSection.Card
          cardSize="lg"
          defaultCode={`
<Box width="100%" color="white">
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
</Box>
        `}
          shaded
        />
      </MainSection>

      <MainSection
        name="Localization"
        description={`Be sure to localize the \`badge\`, \`dropdownAccessibilityLabel\`, \`helperIconButton\`, \`helperLink\`, \`title\`, \`subtext\`, as well as any \`primaryAction\`, \`secondaryAction\` and \`item\` components used within PageHeader.

Be brief with text in all components to account for languages with longer words.`}
      >
        <MainSection.Card
          shaded
          cardSize="lg"
          defaultCode={`
<PageHeader
  title="Anzeigenübersicht"
  subtext='5 aktive Kampagnen.'
  helperLink={{
    text: "Mehr erfahren.",
    accessibilityLabel: "Erfahren Sie mehr auf Pinterest.com",
    href: "http://www.pinterest.com",
    onClick: () => {} }}
  items={[
    <Datapoint
      size="md"
      title="Impressionen"
      value="$1.25M"
      trend={{ value: 30, accessibilityLabel: 'Aufwärtstrend' }}
    />,
  ]}
  primaryAction={{
    component: <Button color="red" size="lg" text="Fördern" />,
    dropdownItems: [
      <Dropdown.Item option={{ value: 'Fördern', label: 'Fördern' }} onSelect={() => {}} />,
    ],
  }}
  secondaryAction={{
    component: <Button size="lg" text="Analysen anzeigen" />,
    dropdownItems: [
      <Dropdown.Link
        option={{ value: 'Analysen anzeigen', label: 'Analysen anzeigen' }}
        href="https://pinterest.com"
      />,
    ],
  }}
  dropdownAccessibilityLabel="Mehr Optionen"
/>
    `}
        />
      </MainSection>
      <MainSection name="Variants">
        <MainSection.Subsection
          description={`PageHeader's \`title\` is the main part of the component as it represents the page's main heading (it will always be a level 1 heading). It can be complemented with three additional elements: a thumbnail (left) and a badge and/or a helperIcon (right). Don't forget to localized its content.`}
          title="Title"
        >
          <MainSection.Card
            shaded
            cardSize="lg"
            defaultCode={`
<PageHeader
  title="Pinterest app"
  badge={{ text: 'New', tooltipText: 'New integration' }}
  helperIconButton={{
        accessibilityLabel: 'Read more information about the new Pinterest integration',
        onClick: () => {},
      }}
  thumbnail={
        <Image
          alt="square"
          fit="cover"
          naturalHeight={1}
          naturalWidth={1}
          src="https://i.ibb.co/LQc8ynn/image.png"
        />
      }

/>
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`PageHeader supports an optional \`primaryAction\`. It can be a [Button](/button), a [Link](/link) or an [IconButton](/iconbutton) with a [Tooltip](/tooltip) and optional [Dropdown](/dropdown). Any Buttons or IconButtons should be \`size="lg"\`.

If there's already a primary action elsewhere on the page, PageHeader can have 1 or 2 secondary actions. Use \`primaryAction\` as an additional secondary action.

Primary and secondary actions are consolidated into [Dropdown](https://gestalt.netlify.app/dropdown) below the [sm breakpoint](https://gestalt.netlify.app/screen_sizes#Web-(px)). \`primaryAction\` takes both the main component and its equivalent using Dropdown subcomponents.

For example, Button should be complemented with [Dropdown.Item](https://gestalt.pinterest.systems/dropdown#Dropdown.Item), Link should be complemented with [Dropdown.Link](https://gestalt.pinterest.systems/dropdown#Dropdown.Link), and an IconButton displaying a Dropdown should reuse the same Dropdown subcomponents. Don't forget to pass \`dropdownAccessibilityLabel\` for the IconButton consolidating all actions into [Dropdown](https://gestalt.netlify.app/dropdown) below the sm breakpoint.
`}
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
        title="Ads overview"
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
          description={`PageHeader also supports an optional \`secondaryAction\`. It will likely be a [Button](/button) or an [IconButton](/iconbutton) with a [Tooltip](/tooltip) and optional [Dropdown](/dropdown). Any Buttons or IconButtons should be \`size="lg"\`.

Primary and secondary actions are consolidated into [Dropdown](https://gestalt.netlify.app/dropdown) below the [sm breakpoint](https://gestalt.netlify.app/screen_sizes#Web-(px)). \`secondaryAction\` takes both the main component and its equivalent using Dropdown subcomponents.

For example, Button should be complemented with [Dropdown.Item](https://gestalt.pinterest.systems/dropdown#Dropdown.Item), Link should be complemented with [Dropdown.Link](https://gestalt.pinterest.systems/dropdown#Dropdown.Link), and an IconButton displaying a Dropdown should reused the same Dropdown subcomponents. Don't forget to pass \`dropdownAccessibilityLabel\` for the IconButton consolidating all actions into [Dropdown](https://gestalt.netlify.app/dropdown) below the sm breakpoint.
          `}
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
          description={`PageHeader supports an optional pair of components next to the CTA section. It's strongly recommended to limit this space to data display components, mostly [Datapoint](https://gestalt.pinterest.systems/datapoint). These complementary component section is hidden in small breakpoints.`}
          title="Complementary items"
        >
          <MainSection.Card
            shaded
            cardSize="lg"
            defaultCode={`
<PageHeader
  title="Ads overview"
  helperIconButton={{
        accessibilityLabel: 'Read more information about Ads overview',
        onClick: () => {},
      }}
  items={[
    <Datapoint
      size="md"
      title="Impressions"
      value="$1.25M"
      trend={{ value: 30, accessibilityLabel: 'Trending up' }}
    />,
    <Datapoint
      size="md"
      title="Engagement"
      value="10%"
      trend={{ value: 5, accessibilityLabel: 'Trending up' }}
    />
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
  dropdownAccessibilityLabel="More options"
/>
        `}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`\`subtext\` should be used to add metadata about the content on the page, not to describe the page itself. They can be complemented with a \`helperLink\`.`}
          title="Subtext"
        >
          <MainSection.Card
            shaded
            cardSize="lg"
            defaultCode={`
<PageHeader
  title="Create product group"
  subtext="2,131 catalog products."
  helperLink={{
    text: "Learn more about bulk product catalog uploads.",
    href: "http://www.pinterest.com",
    onClick: () => {} }}
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
        `}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={` A \`maxWidth\` should only be supplied when the content of the page is center aligned. The PageHeader’s padding should match the page’s overall padding.

PageHeader also supports a bottom border to show the division between PageHeader and the page content below.`}
          title="Max width & border"
        >
          <MainSection.Card
            shaded
            cardSize="lg"
            defaultCode={`
<Box width="100%" color="white">
  <PageHeader
    maxWidth="65%"
    borderStyle="sm"
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
    <Flex justifyContent="center">
      <Box color="white" width="60%" paddingY={6}>
        <Flex direction="column" gap={5}>
          <Heading size="400" accessibilityLevel={2}>
            Edit profile
          </Heading>
          <TextField label="Name" id="a-textfield1" onChange={() => {}} placeholder="Placeholder" />
          <Flex gap={2}>
            <Flex.Item flex="grow">
              <TextField label="Phone" id="a-textfield2" onChange={() => {}} placeholder="Placeholder" />
            </Flex.Item>
            <Flex.Item flex="grow">
              <TextField label="Email" id="a-textfield3" onChange={() => {}} placeholder="Placeholder" />
            </Flex.Item>
          </Flex>
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
        </Flex>
      </Box>
    </Flex>
</Box>
`}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection
        name="Responsive design"
        badge={{
          text: 'Beta',
          tooltipText:
            'This feature is on beta. We are still working on it! Have feedback? Reach out to us on Slack #gestalt-web!',
        }}
      >
        <MainSection.Subsection
          description="PageHeader is responsive to different [web desktop breakpoints](https://gestalt.netlify.app/screen_sizes#Web-(px)). Therefore, PageHeader’s behavior relies on the window size and requires PageHeader to be used on a full-window width to correctly respond to different breakpoints. Don’t use PageHeader right next to elements such as side-navigation bars that wouldn’t allow PageHeader to extend the full width of the window.
"
        />
      </MainSection>

      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
- Use sentences for titles capitalizing proper names and product names, including the word “Pin”
- Make sure page titles match the menu item that was used to navigate to the page
- Keep subtext short to account for localization and smaller screens
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
- Make page titles, subtext and action text lengthy so that it truncates quickly at smaller screen sizes`}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
      **[Heading](/heading)**
       Heading allows you to show headings on the page, therefore, it should be used to create level 2-6 headings on a page. If a level 1 heading is needed, use PageHeader. Use as a title for sections below PageHeader, or for when a page needs a title but doesn’t warrant a PageHeader.
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
