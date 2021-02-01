// @flow strict
import React, { type Node } from 'react';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';
import PropTable from './components/PropTable.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="ScrollableContainer"
    fileName="ScrollableContainer"
    description="ScrollableContainer is used with anchored, hovering components such Flyout, Tooltip, Dropdown, or Typeahead. This is needed for proper positioning when the anchor component could scroll within the viewport."
  />,
);

card(
  <PropTable
    props={[
      {
        name: 'height',
        type: `number | string`,
        defaultValue: '100%',
        description: [
          `Use numbers for pixels: height={100} and strings for percentages: height="100%".`,
          `Overflow property only works for elements with a specified height, however, it is not required if the parent component sets height.`,
        ],
      },
      {
        name: 'overflow',
        type: `'scroll' | 'scrollX' | 'scrollY' | 'auto'`,
        defaultValue: 'auto',
      },
    ]}
  />,
);

card(
  <Example
    id="ScrollableContainer"
    name="With Flyout"
    defaultCode={`
function ScrollableContainerExample() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef();
  return (
    <ScrollableContainer height={150}>
      <Flex gap={4}>
        <Box width={200}>
          <Text>
            You need to add your data source URL to Pinterest so we can access your data source file and create Pins for your products. Before you do this, make sure you have prepared your data source and that you have claimed your website. If there are any errors with your data source file, you can learn how to troubleshoot them below.
          </Text>
        </Box>
        <Button
          ref={anchorRef}
          inline
          text="Help"
          onClick={() => setOpen(!open)}
        />
        {open && (
          <Layer>
            <Flyout
              anchor={anchorRef.current}
              idealDirection="down"
              onDismiss={() => setOpen(false)}
              positionRelativeToAnchor={false}
              size="md"
            >
              <Box padding={3} display="flex" alignItems="center" direction="column" column={12}>
                <Text align="center">
                  Need help with something? Check out our Help Center.
                </Text>
                <Box paddingX={2} marginTop={3}>
                  <Button
                    color="red"
                    role="link"
                    target="blank"
                    text="Visit the help center"
                    href="https://help.pinterest.com/en/business/article/data-source-ingestion"
                  />
                </Box>
              </Box>
            </Flyout>
          </Layer>
        )}
      </Flex>
    </ScrollableContainer>
  )
}`}
  />,
);

card(
  <Example
    id="ScrollableContainer"
    name="With Tooltip"
    defaultCode={`
function ScrollableContainerExample() {
    const [content, setContent] = React.useState(undefined);
    const [claimed, setClaimed] = React.useState(undefined);
    const [device, setDevice] = React.useState(undefined);

  return (
    <ScrollableContainer overflow="scrollY" height={150}>
      <Flex direction="column" gap={4}>
        <Flex direction="column" gap={2}>
          <Flex alignItems="center" gap={1}>
            <Text weight="bold" size="lg">Content type</Text>
            <Tooltip
              idealDirection="right"
              text="See stats about different types of content created by you and/or others on Pinterest. Filter to get more details on your organic (not an ad) and paid (promoted as an ad) content."
            >
              <Icon icon="info-circle" accessibilityLabel="Information" color="darkGray"/>
            </Tooltip>
          </Flex>
          <Box
            display="flex"
            direction="column"
          >
          <Box paddingY={1}>
              <RadioButton
                checked={content === "all"}
                id="all"
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
        <Flex direction="column" gap={2}>
          <Flex alignItems="center" gap={1}>
            <Text weight="bold" size="lg">Claimed account</Text>
            <Tooltip
              idealDirection="right"
              text="See stats for Pins linked to your claimed accounts like websites, Etsy, Instagram or Youtube. The Other Pins category includes Pins you’ve published or saved that don’t link to any of your claimed accounts."
            >
              <Icon icon="info-circle" accessibilityLabel="Information" color="darkGray"/>
            </Tooltip>
          </Flex>
          <Box
            display="flex"
            direction="column"
          >
          <Box paddingY={1}>
              <RadioButton
                checked={claimed === "all"}
                id="all"
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
        <Flex direction="column" gap={2}>
          <Flex alignItems="center" gap={1}>
            <Text weight="bold" size="lg">Device</Text>
            <Tooltip
              idealDirection="right"
              text="See stats for the different devices your Pinterest traffic is coming from.">
              <Icon icon="info-circle" accessibilityLabel="Information" color="darkGray"/>
            </Tooltip>
          </Flex>
          <Box
            display="flex"
            direction="column"
          >
          <Box paddingY={1}>
              <RadioButton
                checked={device === "all"}
                id="all"
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
    </ScrollableContainer>

  )
}`}
  />,
);

card(
  <Example
    id="ScrollableContainerModal"
    name="With Modal, DropDown, and Typeahed"
    defaultCode={`
function ScrollableContainerExample() {
  const [showModal, setShowModal] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const anchorDropdownRef = React.useRef(null);
  const handleSelect = ({ item }) => {
    setSelected(item);
  };

  const anchorWhiteRef = React.useRef();
  const anchorRedRef = React.useRef();
  const anchorBlueRef = React.useRef();
  return (
    <>
      <Box display="flex" justifyContent="center">
        <Button
          inline
          text="Update Billing Address"
          onClick={() => setShowModal(true)}
        />
      </Box>
      {showModal && (
        <Layer>
          <Modal
            accessibilityModalLabel="test"
            heading="Billing Information"
            size="lg"
            onDismiss={() => setShowModal(false)}
            footer={
              <Box flex="grow" paddingX={3} paddingY={3}>
                <Box
                  justifyContent="end"
                  marginStart={-1}
                  marginRight={-1}
                  marginTop={-1}
                  marginBottom={-1}
                  display="flex"
                  wrap
                >
                  <Box paddingX={1} paddingY={1}>
                    <Button
                      text="Cancel"
                      size="lg"
                      inline
                      onClick={() => setOpen(false)}
                    />
                  </Box>
                  <Box paddingX={1} paddingY={1}>
                    <Button
                      text="Save"
                      color="red"
                      size="lg"
                      type="submit"
                      onClick={() => setOpen(false)}
                    />
                  </Box>
                </Box>
              </Box>
            }
          >
            <ScrollableContainer height={400}>
              <Box display="flex" justifyContent="center">
                <Box
                  direction="column"
                  display="flex"
                  marginLeft={-3}
                  marginRight={-3}
                  marginBottom={-3}
                  marginTop={-3}
                  maxWidth={800}
                  width="100%"
                  wrap
                >
                  <Box display="flex" justifyContent="start" paddingX={3} paddingY={3}>
                    <Button
                      accessibilityControls="subtext-dropdown-example"
                      accessibilityHaspopup
                      accessibilityExpanded={open}
                      accessibilityLabel="Select Previous Address"
                      selected={open}
                      inline
                      iconEnd="arrow-down"
                      text="Select Previous Address"
                      onClick={ () => setOpen((prevVal) => !prevVal) }
                      ref={anchorDropdownRef}
                    />
                    {open && (
                      <Dropdown
                        id="subtext-dropdown-example"
                        anchor={anchorDropdownRef.current}
                        onDismiss={() => {setOpen(false)}}
                      >
                        <Dropdown.Item
                          handleSelect={handleSelect}
                          selected={selected}
                          option={{ value: "Headquarters San Francisco", label: "Headquarters San Francisco", subtext: "516 Natoma Street, Suite # 23" }}
                        />
                        <Dropdown.Item
                          handleSelect={handleSelect}
                          selected={selected}
                          option={{ value: "Headquarters Seattle", label: "Headquarters Seattle", subtext: "123 Main Street, Suite # 48" }}
                        />
                      </Dropdown>
                    )}
                  </Box>
                  <Box flex="grow" paddingX={3} paddingY={3}>
                    <Heading size="sm" accessibilityLevel={2}>
                      Billing Address
                    </Heading>
                  </Box>
                  <Box flex="grow" paddingX={3} paddingY={3}>
                    <TextField
                      label="Address Name"
                      id="Address_Name"
                      onChange={() => {}}
                    />
                  </Box>
                  <Box flex="grow" paddingX={3} paddingY={3}>
                    <TextField
                      label="Business Name"
                      id="Business_Name"
                      onChange={() => {}}
                    />
                  </Box>
                  <Box flex="grow" paddingX={3} paddingY={3}>
                    <TextField
                      label="Address Line 1"
                      id="Address_Line_1"
                      onChange={() => {}}
                    />
                  </Box>
                  <Box flex="grow" paddingX={3} paddingY={3}>
                    <TextField
                      label="Address Line 2"
                      id="Address_Line_2"
                      onChange={() => {}}
                    />
                  </Box>
                  <Box flex="grow" paddingX={3} paddingY={3}>
                    <Box
                      display="flex"
                      wrap
                      marginLeft={-3}
                      marginRight={-3}
                      marginBottom={-3}
                      marginTop={-3}
                    >
                      <Box flex="grow" paddingX={3} paddingY={3}>
                        <TextField
                          label="City"
                          id="City"
                          onChange={() => {}}
                        />
                      </Box>
                      <Box flex="grow" paddingX={3} paddingY={3}>
                        <TextField
                          label="State/Province/Region"
                          id="State_Province_Region"
                          onChange={() => {}}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box flex="grow" paddingX={3} paddingY={3}>
                    <Typeahead
                      autocomplete={false}
                      label="Country"
                      id="Country"
                      noResultText="No Results"
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
                      value="United States"
                      placeholder="Select a Country"
                      onChange={() => {}}
                      onSelect={() => {}}
                    />
                  </Box>
                </Box>
              </Box>
            </ScrollableContainer>
          </Modal>
        </Layer>
      )}
    </>
  )
}`}
  />,
);

export default cards;
