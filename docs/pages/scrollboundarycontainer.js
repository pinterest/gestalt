// @flow strict
import type { Node } from 'react';
import PageHeader from '../components/PageHeader.js';
import MainSection from '../components/MainSection.js';
import Page from '../components/Page.js';
import docgen, { type DocGen } from '../components/docgen.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';

export default function ScrollBoundaryContainerPage({
  generatedDocGen,
}: {|
  generatedDocGen: DocGen,
|}): Node {
  return (
    <Page title="ScrollBoundaryContainer">
      <PageHeader name="ScrollBoundaryContainer" description={generatedDocGen?.description} />
      <GeneratedPropTable generatedDocGen={generatedDocGen} />
      <MainSection name="Variants">
        <MainSection.Subsection
          title="Height"
          description={`
When scrolling is desired, we must explicitly set a height. Unless a height is set, the content will push the parent container's height.

In ScrollBoundaryContainer, height is an optional prop with a default value of \`100%\`. If ScrollBoundaryContainer’s immediate parent is a component with a fixed height, do not pass a height to ScrollBoundaryContainer as seen in first example below. On the other hand, if there isn’t an immediate parent fixing the height, you must specify the ScrollBoundaryContainer height as seen in the  second example below.`}
        >
          <MainSection.Card
            title="Popover within ScrollBoundaryContainer"
            cardSize="lg"
            defaultCode={`
function Example() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef();

  React.useEffect(() => {
    setOpen(true)
  }, []);

  return (
    <ScrollBoundaryContainer height={200}>
      <Box padding={4} width={600}>
        <Flex gap={4}>
          <Box width={200}>
            <Text>
              You need to add your data source URL to Pinterest so we can access your data source file and create Pins for your products. Before you do this, make sure you have prepared your data source and that you have claimed your website. If there are any errors with your data source file, you can learn how to troubleshoot them below. After you click Create Pins, you'll land back at the main data source page while your feed is being processed. Wait for a confirmation email from Pinterest about the status of your data source submission.
            </Text>
          </Box>
          <Button
            ref={anchorRef}
            href="https://help.pinterest.com/en/business/article/data-source-ingestion"
            iconEnd="visit"
            onClick={() => setOpen(false)}
            role="link"
            target="blank"
            text="Help"
          />
          {open && (
            <Layer>
              <Popover
                anchor={anchorRef.current}
                color="blue"
                idealDirection="right"
                onDismiss={() => {}}
                positionRelativeToAnchor={false}
                showCaret
                size="xs"
              >
                <Box
                  padding={3}
                  display="flex"
                  alignItems="center"
                  direction="column"
                  column={12}
                >
                  <Text color="white" align="center">
                    Need help with something? Check out our Help Center.
                  </Text>
                </Box>
              </Popover>
            </Layer>
          )}
        </Flex>
      </Box>
    </ScrollBoundaryContainer>
)}`}
          />
        </MainSection.Subsection>
        <MainSection.Card
          title="Tooltips within ScrollBoundaryContainer"
          cardSize="lg"
          defaultCode={`
function ScrollBoundaryContainerExample() {
  const [content, setContent] = React.useState(null);
  const [claimed, setClaimed] = React.useState(null);
  const [device, setDevice] = React.useState(null);

  return (
    <ScrollBoundaryContainer
      overflow="scrollY"
      height={200}
    >
      <Flex
        width={300}
        direction="column"
        gap={4}
      >
        <Flex
          direction="column"
          gap={2}
        >
          <Flex
            alignItems="center"
            gap={1}
          >
            <Text
              weight="bold"
              size="lg"
            >
              Content type
            </Text>
            <Tooltip
              idealDirection="right"
              text="See stats about different types of content created by you and/or others on Pinterest. Filter to get more details on your organic (not an ad) and paid (promoted as an ad) content."
            >
              <Icon
                icon="info-circle"
                accessibilityLabel="Information"
                color="darkGray"
              />
            </Tooltip>
          </Flex>
          <Box
            display="flex"
            direction="column"
          >
          <Box paddingY={1}>
              <RadioButton
                checked={content === "all"}
                id="allcontent"
                label="All"
                name="content"
                onChange={() => setContent( "all" )}
                value="all"
              />
            </Box>
            <Box paddingY={1}>
              <RadioButton
                checked={content === "organic"}
                id="organic"
                label="Organic"
                name="content"
                onChange={() => setContent( "organic" )}
                value="organic"
              />
            </Box>
            <Box paddingY={1}>
              <RadioButton
                checked={content === "paid"}
                id="paid"
                label="Paid and earned"
                name="content"
                onChange={() => setContent( "paid" )}
                value="paid"
              />
            </Box>
          </Box>
        </Flex>
        <Flex
          direction="column"
          gap={2}
        >
          <Flex
            alignItems="center"
            gap={1}
          >
            <Text
              weight="bold"
              size="lg"
            >
              Claimed account
            </Text>
            <Tooltip
              idealDirection="right"
              text="See stats for Pins linked to your claimed accounts like websites, Etsy, Instagram or Youtube. The Other Pins category includes Pins you’ve published or saved that don’t link to any of your claimed accounts."
            >
              <Icon
                icon="info-circle"
                accessibilityLabel="Information"
                color="darkGray"
              />
            </Tooltip>
          </Flex>
          <Box
            display="flex"
            direction="column"
          >
          <Box paddingY={1}>
            <RadioButton
              checked={claimed === "all"}
              id="allclaimed"
              label="All Pins"
              name="claimed"
              onChange={() => setClaimed( "all" )}
              value="all"
            />
            </Box>
            <Box paddingY={1}>
              <RadioButton
                checked={claimed === "instagram"}
                id="instagram"
                label="Instagram"
                name="claimed"
                onChange={() => setClaimed( "instagram" )}
                value="instagram"
              />
            </Box>
            <Box paddingY={1}>
              <RadioButton
                checked={claimed === "other"}
                id="other"
                label="Other pins"
                name="claimed"
                onChange={() => setClaimed( "other" )}
                value="other"
              />
            </Box>
          </Box>
        </Flex>
        <Flex
          direction="column"
          gap={2}
        >
          <Flex
            alignItems="center"
            gap={1}
          >
            <Text
              weight="bold"
              size="lg"
            >
              Device
            </Text>
            <Tooltip
              idealDirection="right"
              text="See stats for the different devices your Pinterest traffic is coming from.">
              <Icon
                icon="info-circle"
                accessibilityLabel="Information"
                color="darkGray"
              />
            </Tooltip>
          </Flex>
          <Box
            display="flex"
            direction="column"
          >
          <Box paddingY={1}>
            <RadioButton
              checked={device === "all"}
              id="alldevices"
              label="All"
              name="device"
              onChange={() => setDevice( "all" )}
              value="all"
            />
            </Box>
            <Box paddingY={1}>
              <RadioButton
                checked={device === "mobile"}
                id="mobile"
                label="Mobile"
                name="device"
                onChange={() => setDevice( "mobile" )}
                value="mobile"
              />
            </Box>
            <Box paddingY={1}>
              <RadioButton
                checked={device === "desktop"}
                id="desktop"
                label="Desktop"
                name="device"
                onChange={() => setDevice( "desktop" )}
                value="desktop"
              />
            </Box>
             <Box paddingY={1}>
              <RadioButton
                checked={device === "tablet"}
                id="tablet"
                label="Tablet"
                name="device"
                onChange={() => setDevice( "tablet" )}
                value="tablet"
              />
            </Box>
          </Box>
        </Flex>
      </Flex>
    </ScrollBoundaryContainer>
)}`}
        />
        <MainSection.Subsection
          title="Built-in component"
          description={`
Modal and Sheet come with ScrollBoundaryContainer built-in, so any anchored components used in their children tree should work out-of-the-box. Passing an additional ScrollBoundaryContainer will break the existing styling on scroll.

The following example shows the internal ScrollBoundaryContainer in action. The main content of both Modal and Sheet is a form which includes Dropdown and ComboBox.`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function ScrollBoundaryContainerExample() {
  const [showModal, setShowModal] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const [parentComponent, setParentComponent] = React.useState('modal');
  const anchorDropdownRef = React.useRef(null);
  const handleSelect = ({ item }) => {
    setSelected(item);
  };

  const MODAL_Z_INDEX = new FixedZIndex(11)
  const ANCHORED_Z_INDEX = new CompositeZIndex([MODAL_Z_INDEX])
  const ParentComponent = parentComponent === 'modal' ? Modal : Sheet
  const props =
    parentComponent === 'modal'
      ? { accessibilityModalLabel: '' }
      : {
          accessibilityDismissButtonLabel: 'Dismiss Billing Information Sheet',
          accessibilitySheetLabel: '',
        };

  return (
    <React.Fragment>
      <Flex alignItems="center" gap={3}>
        <RadioButton
          checked={parentComponent === 'modal'}
          id="modal"
          label="Open Modal"
          name="parentComponent"
          onChange={() => setParentComponent('modal')}
          value="modal"
        />
        <RadioButton
          checked={parentComponent === 'sheet'}
          id="sheet"
          label="Open Sheet"
          name="parentComponent"
          onChange={() => setParentComponent('sheet')}
          value="sheet"
        />
        <Button
          text="Update Billing Address"
          onClick={() => setShowModal(true)}
        />
      </Flex>
      {showModal && (
        <Layer zIndex={MODAL_Z_INDEX}>
          <ParentComponent
            {...props}
            heading="Billing Information"
            footer={
              <Box
                flex="grow"
                paddingX={3}
                paddingY={3}
              >
                <Box
                  justifyContent="end"
                  marginStart={-1}
                  marginEnd={-1}
                  marginTop={-1}
                  marginBottom={-1}
                  display="flex"
                  wrap
                >
                  <Box
                    paddingX={1}
                    paddingY={1}
                  >
                    <Button
                      text="Cancel"
                      size="lg"
                      onClick={() => setShowModal(false)}
                    />
                  </Box>
                  <Box
                    paddingX={1}
                    paddingY={1}
                  >
                    <Button
                      text="Save"
                      color="red"
                      size="lg"
                      type="submit"
                      onClick={() => setShowModal(false)}
                    />
                  </Box>
                </Box>
              </Box>
            }
            onDismiss={() => setShowModal(false)}
            size="lg"
          >
            <Flex justifyContent="center">
              <Box
                direction="column"
                display="flex"
                marginStart={-3}
                marginEnd={-3}
                marginBottom={-3}
                marginTop={-3}
                maxWidth={800}
                width="100%"
                wrap
              >
                <Box
                  display="flex"
                  justifyContent="start"
                  padding={3}
                >
                  <Button
                    accessibilityControls="subtext-dropdown-example"
                    accessibilityHaspopup
                    accessibilityExpanded={open}
                    accessibilityLabel="Select Previous Address"
                    selected={open}
                    iconEnd="arrow-down"
                    text="Select Previous Address"
                    onClick={ () => setOpen((prevVal) => !prevVal) }
                    ref={anchorDropdownRef}
                  />
                  {open && (
                    <Dropdown
                      anchor={anchorDropdownRef.current}
                      id="subtext-dropdown-example"
                      onDismiss={() => {setOpen(false)}}
                      zIndex={ANCHORED_Z_INDEX}
                    >
                      <Dropdown.Item
                        handleSelect={handleSelect}
                        option={{
                          value: "Headquarters San Francisco",
                          label: "Headquarters San Francisco",
                          subtext: "321 Inspiration Street, Suite # 12" }}
                        selected={selected}
                      />
                      <Dropdown.Item
                        handleSelect={handleSelect}
                        option={{
                          value: "Headquarters Seattle",
                          label: "Headquarters Seattle",
                          subtext: "123 Creativity Street, Suite # 21" }}
                        selected={selected}
                      />
                    </Dropdown>
                  )}
                </Box>
                <Box
                  flex="grow"
                  paddingX={3}
                  paddingY={3}
                >
                  <Heading
                    accessibilityLevel={2}
                    size="sm"
                  >
                    Billing Address
                  </Heading>
                </Box>
                <Box
                  flex="grow"
                  paddingX={3}
                  paddingY={3}
                >
                  <TextField
                    id="Address_Name"
                    label="Address Name"
                    onChange={() => {}}
                  />
                </Box>
                <Box
                  flex="grow"
                  paddingX={3}
                  paddingY={3}
                >
                  <TextField
                    id="Business_Name"
                    label="Business Name"
                    onChange={() => {}}
                  />
                </Box>
                <Box
                  flex="grow"
                  paddingX={3}
                  paddingY={3}
                >
                  <TextField
                    id="Address_Line_1"
                    label="Address Line 1"
                    onChange={() => {}}
                  />
                </Box>
                <Box
                  flex="grow"
                  paddingX={3}
                  paddingY={3}
                >
                  <TextField
                    id="Address_Line_2"
                    label="Address Line 2"
                    onChange={() => {}}
                  />
                </Box>
                <Box
                  flex="grow"
                  paddingX={3}
                  paddingY={3}
                >
                  <Box
                    display="flex"
                    marginStart={-3}
                    marginEnd={-3}
                    marginBottom={-3}
                    marginTop={-3}
                    wrap
                  >
                    <Box
                      flex="grow"
                      paddingX={3}
                      paddingY={3}
                    >
                      <TextField
                        id="City"
                        label="City"
                        onChange={() => {}}
                      />
                    </Box>
                    <Box
                      flex="grow"
                      paddingX={3}
                      paddingY={3}
                    >
                      <TextField
                        id="State_Province_Region"
                        label="State/Province/Region"
                        onChange={() => {}}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                flex="grow"
                paddingX={3}
                paddingY={3}
              >
                <ComboBox
                  id="Country"
                  accessibilityClearButtonLabel="Clear countries"
                  options={[
                    {
                      value: "United States",
                      label: "United States" ,
                    },{
                      value: "Canada",
                      label: "Canada" ,
                    },{
                      value: "United Kingdom",
                      label: "United Kingdom" ,
                    },{
                      value: "Brazil",
                      label: "Brazil" ,
                    },{
                      value: "Japan",
                      label: "Japan" ,
                    }
                  ]}
                  onChange={() => {}}
                  onSelect={() => {}}
                  placeholder="Select a Country"
                  noResultText="No Results"
                  label="Country"
                  value="United States"
                />
              </Box>
            </Flex>
          </ParentComponent>
        </Layer>
      )}
    </React.Fragment>
  )
}`}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Related">
        <MainSection.Subsection
          description={`
      **[Box](/box)**
      Box's [\`overflow\` prop](/box#Overflow) specifies what should happen if the content is larger than the bounding box. Box should not be replaced with ScrollBoundaryContainer if the goal is simply to allow Box to scroll when content overflows. ScrollBoundaryContainer is only needed when anchored components, such as [Tooltip](/tooltip), [Popover](/popover), [ComboBox](/combobox)  or [Dropdown](/dropdown), are used within a container that could potentially scroll.

      **[Modal](/modal)** / **[Sheet](/sheet)**
      Modal and Sheet come with ScrollBoundaryContainer built-in, so any anchored components used in their children tree should work out-of-the-box. Passing an additional ScrollBoundaryContainer will break the existing styling on scroll.

      **[Tooltip](/tooltip)** / **[Popover](/popover)** / **[Dropdown](/dropdown)** / **[ComboBox](/combobox)**
      ScrollBoundaryContainer must be used around any of these components if they are used within a container that could possibly scroll. This is necessary to ensure the component remains attached to its anchor on scroll. If they are located within scrolling Modal or Sheet components, ScrollBoundaryContainer isn't needed as it's already built-in.
    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getStaticProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'ScrollBoundaryContainer' }) },
  };
}
