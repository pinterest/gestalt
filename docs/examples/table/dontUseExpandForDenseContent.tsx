import { useState } from 'react';
import {
  Accordion,
  Box,
  Button,
  Collage,
  Datapoint,
  Flex,
  Heading,
  IconButtonLink,
  Image,
  Label,
  Mask,
  NumberField,
  Switch,
  Table,
  Tabs,
  TapArea,
  Text,
  TextArea,
  TextField,
} from 'gestalt';

function ExpandedContents() {
  const [tabItem, setTabItem] = useState('campaign');

  return (
    <Flex direction="column" gap={{ column: 6, row: 0 }} width={800}>
      <Tabs
        activeTabIndex={tabItem === 'campaign' ? 0 : 1}
        bgColor="transparent"
        onChange={({ event }) => {
          setTabItem(tabItem !== 'analytics' ? 'analytics' : 'campaign');
          event.preventDefault();
        }}
        tabs={[
          { href: '', text: 'Campaign', indicator: tabItem === 'campaign' ? 'dot' : undefined },
          { href: '', text: 'Analytics', indicator: tabItem === 'analytics' ? 'dot' : undefined },
        ]}
      />
      {tabItem === 'campaign' ? (
        <Flex direction="column" gap={{ column: 6, row: 0 }} width="100%">
          <Heading accessibilityLevel={2} size="400">
            Latest boards
          </Heading>
          <Flex gap={{ row: 6, column: 0 }} width="100%">
            <Flex.Item>
              <TapArea onTap={() => {}} tapStyle="compress">
                <Mask rounding={4}>
                  <Collage
                    columns={3}
                    height={300}
                    renderImage={({ index, width, height }) => {
                      const images = [
                        {
                          color: 'rgb(111, 91, 77)',
                          naturalHeight: 751,
                          naturalWidth: 564,
                          src: 'https://i.ibb.co/Lx54BCT/stock1.jpg',
                        },
                        {
                          color: 'rgb(231, 186, 176)',
                          naturalHeight: 200,
                          naturalWidth: 98,
                          src: 'https://i.ibb.co/7bQQYkX/stock2.jpg',
                        },
                        {
                          color: '#000',
                          naturalHeight: 300,
                          naturalWidth: 200,
                          src: 'https://i.ibb.co/d0pQsJz/stock3.jpg',
                        },
                        {
                          color: '#000',
                          naturalHeight: 517,
                          naturalWidth: 564,
                          src: 'https://i.ibb.co/SB0pXgS/stock4.jpg',
                        },
                        {
                          color: '#000',
                          naturalHeight: 806,
                          naturalWidth: 564,
                          src: 'https://i.ibb.co/jVR29XV/stock5.jpg',
                        },
                        {
                          color: '#000',
                          naturalHeight: 200,
                          naturalWidth: 200,
                          src: 'https://i.ibb.co/FY2MKr5/stock6.jpg',
                        },
                      ];
                      const image = images[index];
                      return (
                        <Mask height={height} wash width={width}>
                          {image ? (
                            <Image
                              alt="collage image"
                              color={image.color}
                              fit="cover"
                              naturalHeight={image.naturalHeight}
                              naturalWidth={image.naturalWidth}
                              src={image.src}
                            />
                          ) : (
                            <Box color="secondary" height={height} width={width} />
                          )}
                        </Mask>
                      );
                    }}
                    width={300}
                  />
                </Mask>
                <Flex direction="column" gap={{ column: 2, row: 0 }}>
                  <Heading accessibilityLevel="none" size="400">
                    Uniform
                  </Heading>
                  <Flex gap={{ column: 0, row: 5 }}>
                    <Text size="200">123 Pins</Text>
                    <Text size="200">4 sections</Text>
                  </Flex>
                </Flex>
              </TapArea>
            </Flex.Item>
            <Flex direction="column" gap={{ column: 4, row: 0 }} width="100%">
              <TextField
                id="name"
                label="Name"
                onChange={() => {}}
                placeholder="Name"
                value="December '21"
              />
              <TextArea
                id="notes"
                label="Notes"
                onChange={() => {}}
                placeholder="Notes on updates..."
                value=""
              />
              <Flex gap={{ column: 0, row: 4 }}>
                <NumberField
                  id="budget"
                  label="Budget (USD)"
                  onChange={() => {}}
                  placeholder=""
                  value={100000}
                />
                <TextField
                  id="scope"
                  label="Scope"
                  onChange={() => {}}
                  placeholder=""
                  value="Global"
                />
              </Flex>
              <Label htmlFor="status">
                <Text>Status</Text>
              </Label>
              <Switch id="status" onChange={() => {}} switched />
            </Flex>
          </Flex>
          <Flex gap={{ column: 0, row: 3 }}>
            <Button text="Cancel" />
            <Flex.Item flex="grow">
              <Button text="Pause" />
            </Flex.Item>
            <Button color="red" text="Edit" />
          </Flex>
        </Flex>
      ) : (
        <Flex gap={{ column: 0, row: 3 }}>
          <Accordion id="Analitycs Overview" title="Analitycs Overview">
            <Box width={300}>
              <Datapoint
                size="lg"
                title="Total impressions"
                tooltipText="The number of times your ads were seen, including earned impressions"
                trend={{ value: 30, accessibilityLabel: 'Trending up' }}
                value="1K"
              />
              <Datapoint
                size="lg"
                title="Saves"
                tooltipText="The number of times your ads were seen, including earned impressions"
                trend={{ value: 5, accessibilityLabel: 'Trending up' }}
                value="5"
              />
              <Datapoint
                size="lg"
                title="Outbound clicks"
                tooltipText="The number of times your ads were seen, including earned impressions"
                trend={{ value: 10, accessibilityLabel: 'Trending up' }}
                value="10"
              />
            </Box>
          </Accordion>
          <Flex direction="column" gap={{ column: 2, row: 0 }} maxWidth={800}>
            <Accordion
              iconButton={
                <IconButtonLink
                  accessibilityLabel="Get help"
                  bgColor="lightGray"
                  href="https://analytics.pinterest.com/"
                  icon="arrow-up-right"
                  iconColor="darkGray"
                  onClick={() => {}}
                  size="xs"
                  target="blank"
                />
              }
              id="Ads Overview"
              title="Ads Overview"
            >
              <Box width={300}>
                <Text size="200">Content</Text>
              </Box>
            </Accordion>
            <Accordion id="Top Pins" title="Top Pins">
              <Box width={300}>
                <Text size="200">Content</Text>
              </Box>
            </Accordion>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

function HeaderRow() {
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>
          <Box display="visuallyHidden">
            <Text weight="bold">Open/Close row</Text>
          </Box>
        </Table.HeaderCell>
        {['Campaign', 'Status', 'Budget', 'Scope'].map((title) => (
          <Table.HeaderCell key={title}>
            <Text weight="bold">{title}</Text>
          </Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Header>
  );
}

function RowExpandable({ campaign, status, empty, budget, scope }: any) {
  return (
    <Table.RowExpandable
      accessibilityCollapseLabel="Collapse"
      accessibilityExpandLabel="Expand"
      expandedContents={
        empty ? (
          <Text>No metrics available. This campaign hasn&apos;t started yet.</Text>
        ) : (
          <ExpandedContents />
        )
      }
      id="row1"
      onExpand={() => {}}
    >
      <Table.Cell>
        <Text>{campaign}</Text>
      </Table.Cell>
      <Table.Cell>
        <Text>{status}</Text>
      </Table.Cell>
      <Table.Cell>
        <Text>{budget}</Text>
      </Table.Cell>
      <Table.Cell>
        <Text>{scope}</Text>
      </Table.Cell>
    </Table.RowExpandable>
  );
}

export default function MainExample() {
  const tableID = "Another example of a 'don't' do for table content";

  return (
    <Table accessibilityLabel={tableID}>
      <HeaderRow />
      <Table.Body>
        <RowExpandable budget="$100,000" campaign="December '21" scope="Global" status="Active" />
        <RowExpandable
          budget="$50,000"
          campaign="January '22"
          empty
          scope="Japan, Germany, Canada, Spain, Mexico, Thailand, Italy"
          status="Draft"
        />
        <RowExpandable
          budget="$50,000"
          campaign="February '22"
          empty
          scope="Japan, Germany, Canada"
          status="Draft"
        />
      </Table.Body>
    </Table>
  );
}
