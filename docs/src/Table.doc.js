// @flow strict
import type { Node } from 'react';
import { Table } from 'gestalt';
import Card from './components/Card.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';
import PropTable from './components/PropTable.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Table"
    description="The Table contains the following composable elements: Table, Table.Body, Table.Cell, Table.Footer, Table.Header, Table.HeaderCell, Table.Row, Table.SortableHeaderCell."
  />,
);

card(
  <PropTable
    Component={Table}
    props={[
      {
        name: 'children',
        type: 'React.Node',
      },
      {
        name: 'borderStyle',
        type: `"sm" | "none"`,
        description: 'Specify a border width for table: "sm" is 1px',
        defaultValue: 'none',
      },
      {
        name: 'maxHeight',
        type: `number | string`,
        description: `Use numbers for pixels: maxHeight={100} and strings for percentages: maxHeight="100%"`,
        href: 'stickyHeader',
      },
      {
        name: 'stickyColumns',
        type: `number`,
        description: `Specify how many columns from the start of the Table should be sticky when scrolling horizontally. See the [sticky column](#stickyColumn) example for details.`,
      },
    ]}
  />,
);

card(
  <Example
    name="Example: Basic Table"
    defaultCode={`
<Table>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>
        <Text weight="bold">Name</Text>
      </Table.HeaderCell>
      <Table.HeaderCell>
        <Text weight="bold">House</Text>
      </Table.HeaderCell>
      <Table.HeaderCell>
        <Text weight="bold">Birthday</Text>
      </Table.HeaderCell>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>
        <Text>Luna Lovegood</Text>
      </Table.Cell>
      <Table.Cell>
        <Text>Ravenclaw</Text>
      </Table.Cell>
      <Table.Cell>
        <Text>June 25, 1993</Text>
      </Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>
        <Text>Draco Malfoy</Text>
      </Table.Cell>
      <Table.Cell>
        <Text>Slytherin</Text>
      </Table.Cell>
      <Table.Cell>
        <Text>December 3, 1992</Text>
      </Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>
        <Text>Hermione Granger</Text>
      </Table.Cell>
      <Table.Cell>
        <Text>Gryffindor</Text>
      </Table.Cell>
      <Table.Cell>
        <Text>September 19, 1979</Text>
      </Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>
        <Text>Neville Longbottom</Text>
      </Table.Cell>
      <Table.Cell>
        <Text>Gryffindor</Text>
      </Table.Cell>
      <Table.Cell>
        <Text>July 30, 1980</Text>
      </Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
`}
  />,
);

card(
  <PropTable
    Component={Table?.Body}
    name="Table.Body"
    id="Table.Body"
    props={[
      {
        name: 'children',
        type: 'React.Node',
      },
    ]}
  />,
);

card(
  <PropTable
    name="Table.Cell"
    id="Table.Cell"
    Component={Table?.Cell}
    props={[
      {
        name: 'children',
        type: 'React.Node',
      },
      {
        name: 'colSpan',
        type: 'number',
        defaultValue: 1,
      },
      {
        name: 'rowSpan',
        type: 'number',
        defaultValue: 1,
      },
    ]}
  />,
);

card(
  <PropTable
    name="Table.Footer"
    id="Table.Footer"
    Component={Table?.Footer}
    props={[
      {
        name: 'children',
        type: 'React.Node',
      },
    ]}
  />,
);

card(<Card name="Table.Header" />);

card(
  <PropTable
    name="Table.Header"
    id="Table.Header"
    Component={Table?.Header}
    props={[
      {
        name: 'children',
        type: 'React.Node',
      },
      {
        name: 'sticky',
        type: 'boolean',
        defaultValue: false,
        href: 'stickyHeader',
        description:
          'If true, the table header will be sticky and the table body will be scrollable',
      },
    ]}
  />,
);

card(
  <Example
    id="stickyHeader"
    name="Example: Sticky header"
    defaultCode={`
<Table maxHeight={200}>
  <Table.Header sticky>
    <Table.Row>
      <Table.HeaderCell>
        <Text weight="bold">Image</Text>
      </Table.HeaderCell>
      <Table.HeaderCell>
        <Text weight="bold">Name</Text>
      </Table.HeaderCell>
      <Table.HeaderCell>
        <Text weight="bold">House</Text>
      </Table.HeaderCell>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>
        <Box width={50}>
          <Mask rounding="circle">
            <Image
              alt="Luna"
              src="https://i.ibb.co/QY9qR7h/luna.png"
              naturalHeight={50}
              naturalWidth={50}
            />
          </Mask>
        </Box>
      </Table.Cell>
      <Table.Cell><Text>Luna Lovegood</Text></Table.Cell>
      <Table.Cell><Text>Ravenclaw</Text></Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>
        <Box width={50}>
          <Mask rounding="circle">
            <Image
              alt="Draco"
              src="https://i.ibb.co/Hzcfxjt/draco.png"
              naturalHeight={50}
              naturalWidth={50}
            />
          </Mask>
        </Box>
      </Table.Cell>
      <Table.Cell><Text>Draco Malfoy</Text></Table.Cell>
      <Table.Cell><Text>Slytherin</Text></Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>
        <Box width={50}>
          <Mask rounding="circle">
            <Image
              alt="Neville"
              src="https://i.ibb.co/JvY9DKK/neville.png"
              naturalHeight={50}
              naturalWidth={50}
            />
          </Mask>
        </Box>
      </Table.Cell>
      <Table.Cell><Text>Neville Longbottom</Text></Table.Cell>
      <Table.Cell><Text>Gryffindor</Text></Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
`}
  />,
);

card(
  <Example
    id="stickyColumn"
    name="Example: Sticky Column"
    description="Try scrolling horizontally to see the first column remain in place."
    defaultCode={`
<Box width="50%" overflow="auto">
  <Table maxHeight={200} stickyColumns={1}>

    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>
          <Text weight="bold">Image</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Name</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Super Name</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Favorite Food</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Best Friend</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Birthday</Text>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <Box width={50}>
            <Mask rounding="circle">
              <Image
                alt="Tony"
                src="https://i.ibb.co/r3R04Y9/ironman.jpg"
                naturalHeight={50}
                naturalWidth={50}
              />
            </Mask>
          </Box>
        </Table.Cell>
        <Table.Cell><Text>Tony Stark</Text></Table.Cell>
        <Table.Cell><Text>Iron Man</Text></Table.Cell>
        <Table.Cell><Text>Shawarma</Text></Table.Cell>
        <Table.Cell><Text>Spiderman</Text></Table.Cell>
        <Table.Cell>
          <Box width={200}><Text>May 29, 1970</Text></Box>
        </Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>
          <Box width={50}>
            <Mask rounding="circle">
              <Image
                alt="Peter"
                src="https://i.ibb.co/64NxM43/spiderman.png"
                naturalHeight={50}
                naturalWidth={50}
              />
            </Mask>
          </Box>
        </Table.Cell>
        <Table.Cell><Text>Peter Parker</Text></Table.Cell>
        <Table.Cell><Text>Spiderman</Text></Table.Cell>
        <Table.Cell><Text>Sandwiches</Text></Table.Cell>
        <Table.Cell><Text>Iron Man</Text></Table.Cell>
        <Table.Cell><Text>December 28, 1995</Text></Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>
          <Box width={50}>
            <Mask rounding="circle">
              <Image
                alt="T'Challa"
                src="https://i.ibb.co/GpNtW5N/black-Panther.png"
                naturalHeight={50}
                naturalWidth={50}
              />
            </Mask>
          </Box>
        </Table.Cell>
        <Table.Cell><Text>T'Challa</Text></Table.Cell>
        <Table.Cell><Text>Black Panther</Text></Table.Cell>
        <Table.Cell><Text>Beef suya</Text></Table.Cell>
        <Table.Cell><Text>Shuri</Text></Table.Cell>
        <Table.Cell><Text>November 28, 1977</Text></Table.Cell>
      </Table.Row>

    </Table.Body>
  </Table>
</Box>

`}
  />,
);

card(
  <Example
    id="stickyColumn2"
    name="Example: Multiple sticky columns"
    description="Try scrolling horizontally to see the first 3 columns remain in place."
    defaultCode={`
<Box width="60%" overflow="auto">
  <Table maxHeight={200} stickyColumns={3} borderStyle="none">

    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>
          <Text weight="bold">Image</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Name</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Super Name</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Best Friend</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Favorite Food</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Super Powers</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Home</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Aliases</Text>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <Box width={50}>
            <Mask rounding="circle">
              <Image
                alt="Tony"
                src="https://i.ibb.co/r3R04Y9/ironman.jpg"
                naturalHeight={50}
                naturalWidth={50}
              />
            </Mask>
          </Box>
        </Table.Cell>
        <Table.Cell><Text>Tony Stark</Text></Table.Cell>
        <Table.Cell><Text>Iron Man</Text></Table.Cell>
        <Table.Cell><Text>Spiderman</Text></Table.Cell>
        <Table.Cell><Text>Shawarma</Text></Table.Cell>
        <Table.Cell><Text>Flight, Super strength</Text></Table.Cell>
        <Table.Cell><Text>New York</Text></Table.Cell>
        <Table.Cell><Text>N/A</Text></Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>
          <Box width={50}>
            <Mask rounding="circle">
              <Image
                alt="Peter"
                src="https://i.ibb.co/64NxM43/spiderman.png"
                naturalHeight={50}
                naturalWidth={50}
              />
            </Mask>
          </Box>
        </Table.Cell>
        <Table.Cell><Text>Peter Parker</Text></Table.Cell>
        <Table.Cell><Text>Spiderman</Text></Table.Cell>
        <Table.Cell><Text>Iron Man</Text></Table.Cell>
        <Table.Cell><Text>Sandwiches</Text></Table.Cell>
        <Table.Cell><Text>Spidey senses, super strength, web shooters</Text></Table.Cell>
        <Table.Cell><Text>Brooklyn</Text></Table.Cell>
        <Table.Cell><Text>Friendly Neighborhood Spiderman</Text></Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>
          <Box width={50}>
            <Mask rounding="circle">
              <Image
                alt="Wanda"
                src="https://i.ibb.co/hV6Vpbf/scarlet.png"
                naturalHeight={50}
                naturalWidth={50}
              />
            </Mask>
          </Box>
        </Table.Cell>
        <Table.Cell><Text>Wanda Maximoff</Text></Table.Cell>
        <Table.Cell><Text>Scarlet Witch</Text></Table.Cell>
        <Table.Cell><Text>Vision</Text></Table.Cell>
        <Table.Cell><Text>Chicken paprikash</Text></Table.Cell>
        <Table.Cell><Text>Chaos magic, spells, reality warping</Text></Table.Cell>
        <Table.Cell><Text>Sokovia</Text></Table.Cell>
        <Table.Cell><Text>N/A</Text></Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>
          <Box width={50}>
            <Mask rounding="circle">
              <Image
                alt="Black Panther"
                src="https://i.ibb.co/GpNtW5N/black-Panther.png"
                naturalHeight={50}
                naturalWidth={50}
              />
            </Mask>
          </Box>
        </Table.Cell>
        <Table.Cell><Text>T'Challa</Text></Table.Cell>
        <Table.Cell><Text>Black Panther</Text></Table.Cell>
        <Table.Cell><Text>Shuri</Text></Table.Cell>
        <Table.Cell><Text>Beef suya</Text></Table.Cell>
        <Table.Cell><Text>Enhanced strength, speed, reflexes + Vibranium suit</Text></Table.Cell>
        <Table.Cell><Text>Wakanda</Text></Table.Cell>
        <Table.Cell><Text>King of the Dead</Text></Table.Cell>
      </Table.Row>

    </Table.Body>
  </Table>
</Box>

`}
  />,
);

card(
  <Example
    id="stickyColumn3"
    name="Example: Sticky header and sticky columns"
    description="Try scrolling horizontally and vertically to see the columns and header remain in place."
    defaultCode={`
<Box width="60%" overflow="auto">
  <Table maxHeight={200} stickyColumns={3} borderStyle="none">

    <Table.Header sticky>
      <Table.Row>
        <Table.HeaderCell>
          <Text weight="bold">Image</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Name</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Super Name</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Best Friend</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Favorite Food</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Super Powers</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Home</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Aliases</Text>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>

      <Table.Row>
        <Table.Cell>
          <Box width={50}>
            <Mask rounding="circle">
              <Image
                alt="Tony"
                src="https://i.ibb.co/r3R04Y9/ironman.jpg"
                naturalHeight={50}
                naturalWidth={50}
              />
            </Mask>
          </Box>
        </Table.Cell>
        <Table.Cell><Text>Tony Stark</Text></Table.Cell>
        <Table.Cell><Text>Iron Man</Text></Table.Cell>
        <Table.Cell><Text>Spiderman</Text></Table.Cell>
        <Table.Cell><Text>Shawarma</Text></Table.Cell>
        <Table.Cell><Text>Flight, Super strength</Text></Table.Cell>
        <Table.Cell><Text>New York</Text></Table.Cell>
        <Table.Cell><Text>N/A</Text></Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>
          <Box width={50}>
            <Mask rounding="circle">
              <Image
                alt="Peter"
                src="https://i.ibb.co/64NxM43/spiderman.png"
                naturalHeight={50}
                naturalWidth={50}
              />
            </Mask>
          </Box>
        </Table.Cell>
        <Table.Cell><Text>Peter Parker</Text></Table.Cell>
        <Table.Cell><Text>Spiderman</Text></Table.Cell>
        <Table.Cell><Text>Iron Man</Text></Table.Cell>
        <Table.Cell><Text>Sandwiches</Text></Table.Cell>
        <Table.Cell><Text>Spidey senses, super strength, web shooters</Text></Table.Cell>
        <Table.Cell><Text>Brooklyn</Text></Table.Cell>
        <Table.Cell><Text>Friendly Neighborhood Spiderman</Text></Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>
          <Box width={50}>
            <Mask rounding="circle">
              <Image
                alt="Wanda"
                src="https://i.ibb.co/hV6Vpbf/scarlet.png"
                naturalHeight={50}
                naturalWidth={50}
              />
            </Mask>
          </Box>
        </Table.Cell>
        <Table.Cell><Text>Wanda Maximoff</Text></Table.Cell>
        <Table.Cell><Text>Scarlet Witch</Text></Table.Cell>
        <Table.Cell><Text>Vision</Text></Table.Cell>
        <Table.Cell><Text>Chicken paprikash</Text></Table.Cell>
        <Table.Cell><Text>Chaos magic, spells, reality warping</Text></Table.Cell>
        <Table.Cell><Text>Sokovia</Text></Table.Cell>
        <Table.Cell><Text>N/A</Text></Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>
          <Box width={50}>
            <Mask rounding="circle">
              <Image
                alt="Black Panther"
                src="https://i.ibb.co/GpNtW5N/black-Panther.png"
                naturalHeight={50}
                naturalWidth={50}
              />
            </Mask>
          </Box>
        </Table.Cell>
        <Table.Cell><Text>T'Challa</Text></Table.Cell>
        <Table.Cell><Text>Black Panther</Text></Table.Cell>
        <Table.Cell><Text>Shuri</Text></Table.Cell>
        <Table.Cell><Text>Beef suya</Text></Table.Cell>
        <Table.Cell><Text>Enhanced strength, speed, reflexes + Vibranium suit</Text></Table.Cell>
        <Table.Cell><Text>Wakanda</Text></Table.Cell>
        <Table.Cell><Text>King of the Dead</Text></Table.Cell>
      </Table.Row>

    </Table.Body>
  </Table>
</Box>

`}
  />,
);

card(
  <PropTable
    name="Table.HeaderCell"
    id="Table.HeaderCell"
    Component={Table?.HeaderCell}
    props={[
      {
        name: 'children',
        type: 'React.Node',
      },
      {
        name: 'scope',
        defaultValue: 'col',
        type: '"col" | "row" | "colgroup" | "rowgroup"',
      },
      {
        name: 'colSpan',
        type: 'number',
        defaultValue: 1,
      },
      {
        name: 'rowSpan',
        type: 'number',
        defaultValue: 1,
      },
    ]}
  />,
);

card(
  <PropTable
    name="Table.Row"
    id="Table.Row"
    Component={Table?.Row}
    props={[
      {
        name: 'children',
        type: 'React.Node',
      },
    ]}
  />,
);

card(
  <Card
    name="Table.RowExpandable"
    description="Expandable row that is able to hold content that will displayed depending on the clickable expand/collapse button icon."
  />,
);

card(
  <PropTable
    name="Table.RowExpandable"
    id="Table.RowExpandable"
    Component={Table?.Row}
    props={[
      {
        name: 'accessibilityCollapseLabel',
        type: 'string',
        required: true,
        defaultValue: null,
        description: [
          'Supply a short, descriptive label for screen-readers as a text alternative to the Collapse button.',
          'Accessibility: It populates aria-label on the `<button>` element for the Collapse button.',
        ],
      },
      {
        name: 'accessibilityExpandLabel',
        type: 'string',
        required: true,
        defaultValue: null,
        description: [
          'Supply a short, descriptive label for screen-readers as a text alternative to the Expand button.',
          'Accessibility: It populates aria-label on the `<button>` element for the Expand button.',
        ],
      },
      {
        name: 'children',
        type: 'React.Node',
      },
      {
        name: 'expandedContents',
        type: 'React.Node',
        required: true,
      },
      {
        name: 'hoverStyle',
        type: '"none" | "gray"',
        defaultValue: 'gray',
      },
      {
        name: 'id',
        type: 'string',
        required: true,
      },
      {
        name: 'onExpand',
        type: `({ event: SyntheticMouseEvent<HTMLButtonElement> | SyntheticKeyboardEvent<HTMLButtonElement> | SyntheticMouseEvent<HTMLAnchorElement>
          | SyntheticKeyboardEvent<HTMLAnchorElement> expanded: boolean }) => void`,
        description: ['Callback fired when the expand button component is clicked'],
      },
    ]}
  />,
);

card(
  <Example
    name="Example: Table Row Expandable"
    defaultCode={`
    function RowExpandableExample() {
      const [textShown, setTextShown] = React.useState(false);
      const showTextOnExpand = () => {
        return <Text>Row expanded</Text>;
      };

      return(
        <Table>

          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Box display="visuallyHidden">
                  <Text weight="bold">Open/Close row</Text>
                </Box>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text weight="bold">Name</Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text weight="bold">House</Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text weight="bold">Birthday</Text>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>

            <Table.RowExpandable
              accessibilityExpandLabel="Expand"
              accessibilityCollapseLabel="Collapse"
              id="row1"
              onExpand={() => setTextShown(!textShown)}
              expandedContents={
                <Box maxWidth={236} padding={2} column={12}>
                  <Card
                    image={
                      <Avatar
                        name="luna avatar"
                        src="https://i.ibb.co/QY9qR7h/luna.png"
                      />
                    }
                  >
                    <Text align="center" weight="bold">
                      <Link href="https://pinterest.com">
                        <Box paddingX={3} paddingY={2}>
                          Luna's Info
                        </Box>
                      </Link>
                    </Text>
                    {textShown && showTextOnExpand()}
                  </Card>
                </Box>
              }
            >
              <Table.Cell>
                <Text>Luna Lovegood</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Ravenclaw</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>June 25, 1993</Text>
              </Table.Cell>
            </Table.RowExpandable>

            <Table.RowExpandable
              accessibilityExpandLabel="Expand"
              accessibilityCollapseLabel="Collapse"
              id="row2"
              expandedContents={
                <Table maxWidth={800} maxHeight={500}>
                  <Table.Header sticky>
                    <Table.Row>
                      <Table.HeaderCell>
                        <Text weight="bold">Image</Text>
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <Text weight="bold">Name</Text>
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <Text weight="bold">House</Text>
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row colSpan={10}>
                      <Table.Cell>
                        <Box width={50}>
                          <Mask rounding="circle">
                            <Image
                              alt="Luna"
                              src="https://i.ibb.co/QY9qR7h/luna.png"
                              naturalHeight={50}
                              naturalWidth={50}
                            />
                          </Mask>
                        </Box>
                      </Table.Cell>
                      <Table.Cell>
                        <Text>Luna Lovegood</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text>Ravenclaw</Text>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Box width={50}>
                          <Mask rounding="circle">
                            <Image
                              alt="Draco"
                              src="https://i.ibb.co/Hzcfxjt/draco.png"
                              naturalHeight={50}
                              naturalWidth={50}
                            />
                          </Mask>
                        </Box>
                      </Table.Cell>
                      <Table.Cell>
                        <Text>Draco Malfoy</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text>Slytherin</Text>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Box width={50}>
                          <Mask rounding="circle">
                            <Image
                              alt="Neville"
                              src="https://i.ibb.co/JvY9DKK/neville.png"
                              naturalHeight={50}
                              naturalWidth={50}
                            />
                          </Mask>
                        </Box>
                      </Table.Cell>
                      <Table.Cell>
                        <Text>Neville Longbottom</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text>Gryffindor</Text>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              }
            >
              <Table.Cell>
                <Text>Draco Malfoy</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Slytherin</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>December 3, 1992</Text>
              </Table.Cell>
            </Table.RowExpandable>

            <Table.RowExpandable
              accessibilityExpandLabel="Expand"
              accessibilityCollapseLabel="Collapse"
              id="row3"
              expandedContents={
                <Box maxWidth={236} padding={2} column={12}>
                  <Card
                    image={
                      <Avatar
                        name="luna avatar"
                        src="https://i.ibb.co/JvY9DKK/neville.png"
                      />
                    }
                  >
                    <Text align="center" weight="bold">
                      <Link href="https://pinterest.com">
                        <Box paddingX={3} paddingY={2}>
                          Neville's Info
                        </Box>
                      </Link>
                    </Text>
                  </Card>
                </Box>
              }
            >
              <Table.Cell>
                <Text>Neville Longbottom</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Gryffindor</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>July 30, 1980</Text>
              </Table.Cell>
            </Table.RowExpandable>

          </Table.Body>
        </Table>);
    }
    `}
  />,
);

card(
  <Example
    name="Example: Table Row Expandable with Sticky Columns"
    description="When specifying `stickyColumns` with expandable rows, include the column of arrows in your count. This example sets `stickyColumns` to 3."
    defaultCode={`
    function RowExpandableExample() {
      const [textShown, setTextShown] = React.useState(false);
      const showTextOnExpand = () => {
        return <Text>Row expanded</Text>;
      };

      return(
      <Box width="60%" overflow="auto">
        <Table stickyColumns={3}>

          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Box display="visuallyHidden">
                  <Text weight="bold">Open/Close row</Text>
                </Box>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text weight="bold">Name</Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text weight="bold">Super Name</Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text weight="bold">Best Friend</Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text weight="bold">Favorite Food</Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text weight="bold">Home</Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text weight="bold">Alias</Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Box width={200}>
                  <Text weight="bold">Super Powers</Text>
                </Box>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>

            <Table.RowExpandable
              accessibilityExpandLabel="Expand"
              accessibilityCollapseLabel="Collapse"
              id="row1"
              onExpand={() => setTextShown(!textShown)}
              expandedContents={
                <Box maxWidth={236} padding={2} column={12}>
                  <Card
                    image={
                      <Avatar
                        name="tony avatar"
                        src="https://i.ibb.co/8948ym5/avenge.png"
                      />
                    }
                  >
                    <Text align="center" weight="bold">
                      <Link href="https://pinterest.com">
                        <Box paddingX={3} paddingY={2}>
                          Tony's Info
                        </Box>
                      </Link>
                    </Text>
                    {textShown && showTextOnExpand()}
                  </Card>
                </Box>
              }
            >
              <Table.Cell>
                <Text>Tony Stark</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Iron Man</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Spiderman</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Shawarma</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>New York City</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>N/A</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Flight, Super strength</Text>
              </Table.Cell>
            </Table.RowExpandable>

            <Table.RowExpandable
              accessibilityExpandLabel="Expand"
              accessibilityCollapseLabel="Collapse"
              id="row2"
              expandedContents={
                <Table maxWidth={800} maxHeight={500}>
                  <Table.Header sticky>
                    <Table.Row>
                      <Table.HeaderCell>
                        <Text weight="bold">Name</Text>
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <Text weight="bold">Relationship</Text>
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row colSpan={10}>
                      <Table.Cell>
                        <Text>Vision</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text>Husband</Text>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Text>Wiccan</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text>Child</Text>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Text>Speed</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text>Child</Text>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              }
            >
              <Table.Cell>
                <Text>Wanda Maximoff</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Scarlet Witch</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Vision</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Chicken paprikash</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Sokovia</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Wanda Frank</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Chaos magic, spells, reality warping</Text>
              </Table.Cell>
            </Table.RowExpandable>

            <Table.RowExpandable
              accessibilityExpandLabel="Expand"
              accessibilityCollapseLabel="Collapse"
              id="row3"
              expandedContents={
                <Box maxWidth={236} padding={2} column={12}>
                  <Card
                    image={
                      <Avatar
                        name="Black panther avatar"
                        src="https://i.ibb.co/GpNtW5N/black-Panther.png"
                      />
                    }
                  >
                    <Text align="center" weight="bold">
                      <Link href="https://pinterest.com">
                        <Box paddingX={3} paddingY={2}>
                          Black Panther's Info
                        </Box>
                      </Link>
                    </Text>
                  </Card>
                </Box>
              }
            >
              <Table.Cell>
                <Text>T'Challa</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Black Panther</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Shuri</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Beef suya</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Wakana</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>King of the Dead</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Enhanced strength, speed, reflexes + Vibranium suit</Text>
              </Table.Cell>
            </Table.RowExpandable>

          </Table.Body>
        </Table>
      </Box> );
    }
    `}
  />,
);

card(
  <Card
    name="Table.SortableHeaderCell"
    description="Sortable header cells are clickable in an accessible way and have an icon to display whether the table is currently being sorted by that column."
  />,
);

card(
  <PropTable
    name="Table.SortableHeaderCell"
    id="Table.SortableHeaderCell"
    Component={Table?.SortableHeaderCell}
    props={[
      {
        name: 'children',
        type: 'React.Node',
      },
      {
        name: 'scope',
        defaultValue: 'col',
        type: '"col" | "row" | "colgroup" | "rowgroup"',
      },
      {
        name: 'colSpan',
        type: 'number',
        defaultValue: 1,
      },
      {
        name: 'rowSpan',
        type: 'number',
        defaultValue: 1,
      },
      {
        name: 'onSortChange',
        required: true,
        type:
          '({ event: SyntheticMouseEvent<HTMLTableCellElement> | SyntheticKeyboardEvent<HTMLTableCellElement> }) => void',
        href: 'sortableExample',
      },
      {
        name: 'sortOrder',
        required: true,
        type: '"asc" | "desc"',
        href: 'sortableExample',
      },
      {
        name: 'status',
        required: true,
        type: '"active" | "inactive"',
        href: 'sortableExample',
      },
    ]}
  />,
);

card(
  <Example
    id="sortableExample"
    name="Example: Sortable header cells"
    defaultCode={`
    function SortableHeaderExample() {
      const [sortOrder, setSortOrder] = React.useState('desc');
      const [sortCol, setSortCol] = React.useState('name');

      const onSortChange = (col) => {
        if (sortCol !== col) {
          setSortCol(col);
          setSortOrder('desc');
        } else {
          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        }
      }

      return (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.SortableHeaderCell onSortChange={() => onSortChange('name')} sortOrder={sortOrder} status={sortCol === 'name' ? 'active' : 'inactive'}>
                <Text weight="bold">Name</Text>
              </Table.SortableHeaderCell>
              <Table.SortableHeaderCell onSortChange={() => onSortChange('id')} sortOrder={sortOrder} status={sortCol === 'id' ? 'active' : 'inactive'}>
                <Text weight="bold">Id</Text>
              </Table.SortableHeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
      );
    }
`}
  />,
);

card(
  <Example
    id="sortableExample"
    name="Example: Sortable header cells with sticky column"
    defaultCode={`
    function SortableHeaderExample() {
      const [sortOrder, setSortOrder] = React.useState('desc');
      const [sortCol, setSortCol] = React.useState('name');

      const onSortChange = (col) => {
        if (sortCol !== col) {
          setSortCol(col);
          setSortOrder('desc');
        } else {
          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        }
      }

      return (
        <Box width="60%" overflow="auto">
          <Table stickyColumns={1}>
            <Table.Header>
              <Table.Row>
                <Table.SortableHeaderCell onSortChange={() => onSortChange('name')} sortOrder={sortOrder} status={sortCol === 'name' ? 'active' : 'inactive'}>
                  <Text weight="bold">Name</Text>
                </Table.SortableHeaderCell>
                <Table.SortableHeaderCell onSortChange={() => onSortChange('id')} sortOrder={sortOrder} status={sortCol === 'id' ? 'active' : 'inactive'}>
                  <Text weight="bold">Nickname</Text>
                </Table.SortableHeaderCell>
                <Table.SortableHeaderCell onSortChange={() => onSortChange('food')} sortOrder={sortOrder} status={sortCol === 'food' ? 'active' : 'inactive'}>
                  <Text weight="bold">Favorite Food</Text>
                </Table.SortableHeaderCell>
                <Table.SortableHeaderCell onSortChange={() => onSortChange('friend')} sortOrder={sortOrder} status={sortCol === 'friend' ? 'active' : 'inactive'}>
                  <Text weight="bold">Best Friend</Text>
                </Table.SortableHeaderCell>
                <Table.SortableHeaderCell onSortChange={() => onSortChange('birth')} sortOrder={sortOrder} status={sortCol === 'birth' ? 'active' : 'inactive'}>
                  <Text weight="bold">Birthdate</Text>
                </Table.SortableHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell><Text>Tony Stark</Text></Table.Cell>
                <Table.Cell><Text>Iron Man</Text></Table.Cell>
                <Table.Cell><Text>Shawarma</Text></Table.Cell>
                <Table.Cell><Text>Spiderman</Text></Table.Cell>
                <Table.Cell>
                  <Box width={200}><Text>May 29, 1970</Text></Box>
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell><Text>Peter Parker</Text></Table.Cell>
                <Table.Cell><Text>Spiderman</Text></Table.Cell>
                <Table.Cell><Text>Sandwiches</Text></Table.Cell>
                <Table.Cell><Text>Iron Man</Text></Table.Cell>
                <Table.Cell><Text>December 28, 1995</Text></Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell><Text>T'Challa</Text></Table.Cell>
                <Table.Cell><Text>Black Panther</Text></Table.Cell>
                <Table.Cell><Text>Beef suya</Text></Table.Cell>
                <Table.Cell><Text>Shuri</Text></Table.Cell>
                <Table.Cell><Text>November 28, 1977</Text></Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Box>
      );
    }
`}
  />,
);

export default cards;
