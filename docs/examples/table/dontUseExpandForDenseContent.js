// @flow strict
import { type Node, useState } from 'react';
import {
  Box,
  Button,
  Collage,
  Datapoint,
  Flex,
  Heading,
  IconButton,
  Image,
  Label,
  Mask,
  Module,
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
          <Heading size="400" accessibilityLevel={2}>
            Latest boards
          </Heading>
          <Flex gap={{ row: 6, column: 0 }} width="100%">
            <Flex.Item>
              <TapArea tapStyle="compress" onTap={() => {}}>
                <Mask rounding={4}>
                  <Collage
                    columns={3}
                    height={300}
                    width={300}
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
                      const image = images[index] || {};
                      return (
                        <Mask wash width={width} height={height}>
                          <Image
                            alt="collage image"
                            color={image.color}
                            fit="cover"
                            naturalHeight={image.naturalHeight}
                            naturalWidth={image.naturalWidth}
                            src={image.src}
                          />
                        </Mask>
                      );
                    }}
                  />
                </Mask>
                <Flex direction="column" gap={{ column: 2, row: 0 }}>
                  <Heading size="400" accessibilityLevel="none">
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
                onChange={() => {}}
                placeholder="Name"
                label="Name"
                value="December '21"
              />
              <TextArea
                id="notes"
                onChange={() => {}}
                placeholder="Notes on updates..."
                label="Notes"
                value=""
              />
              <Flex gap={{ column: 0, row: 4 }}>
                <NumberField
                  id="budget"
                  onChange={() => {}}
                  placeholder=""
                  label="Budget (USD)"
                  value={100000}
                />
                <TextField
                  id="scope"
                  onChange={() => {}}
                  placeholder=""
                  label="Scope"
                  value="Global"
                />
              </Flex>
              <Label htmlFor="status">
                <Text>Status</Text>
              </Label>
              <Switch onChange={() => {}} id="status" switched />
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
          <Module id="Analitycs Overview" title="Analitycs Overview">
            <Box width={300}>
              <Datapoint
                size="lg"
                tooltipText="The number of times your ads were seen, including earned impressions"
                title="Total impressions"
                value="1K"
                trend={{ value: 30, accessibilityLabel: 'Trending up' }}
              />
              <Datapoint
                size="lg"
                tooltipText="The number of times your ads were seen, including earned impressions"
                title="Saves"
                value="5"
                trend={{ value: 5, accessibilityLabel: 'Trending up' }}
              />
              <Datapoint
                size="lg"
                tooltipText="The number of times your ads were seen, including earned impressions"
                title="Outbound clicks"
                value="10"
                trend={{ value: 10, accessibilityLabel: 'Trending up' }}
              />
            </Box>
          </Module>
          <Flex direction="column" gap={{ column: 2, row: 0 }} maxWidth={800}>
            <Module
              id="Ads Overview"
              title="Ads Overview"
              iconButton={
                <IconButton
                  role="link"
                  href="https://analytics.pinterest.com/"
                  bgColor="lightGray"
                  icon="arrow-up-right"
                  iconColor="darkGray"
                  accessibilityLabel="Get help"
                  size="xs"
                  onClick={() => {}}
                  target="blank"
                />
              }
            >
              <Box width={300}>
                <Text size="200">Content</Text>
              </Box>
            </Module>
            <Module id="Top Pins" title="Top Pins">
              <Box width={300}>
                <Text size="200">Content</Text>
              </Box>
            </Module>
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

// $FlowIgnore[unclear-type]
function RowExpandable({ campaign, status, empty, budget, scope }: any) {
  return (
    <Table.RowExpandable
      accessibilityExpandLabel="Expand"
      accessibilityCollapseLabel="Collapse"
      id="row1"
      onExpand={() => {}}
      expandedContents={
        empty ? (
          <Text>No metrics available. This campaign hasn&apos;t started yet.</Text>
        ) : (
          <ExpandedContents />
        )
      }
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

export default function MainExample(): Node {
  const tableID = "Another example of a 'don't' do for table content";

  return (
    <Table accessibilityLabel={tableID}>
      <HeaderRow />
      <Table.Body>
        <RowExpandable campaign="December '21" status="Active" budget="$100,000" scope="Global" />
        <RowExpandable
          campaign="January '22"
          status="Draft"
          budget="$50,000"
          scope="Japan, Germany, Canada, Spain, Mexico, Thailand, Italy"
          empty
        />
        <RowExpandable
          campaign="February '22"
          status="Draft"
          budget="$50,000"
          scope="Japan, Germany, Canada"
          empty
        />
      </Table.Body>
    </Table>
  );
}
