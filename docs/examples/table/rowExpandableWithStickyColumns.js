// @flow strict
import { type Node, useState } from 'react';
import { Avatar, Box, Link, Table, Text, WashAnimated } from 'gestalt';

export default function Example(): Node {
  const [textShown, setTextShown] = useState(false);
  const showTextOnExpand = () => <Text>Row expanded</Text>;

  return (
    <Box width="70%" margin="auto" padding={4}>
      <Table accessibilityLabel="Table.RowExpandable with Sticky Columns" stickyColumns={3}>
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
                <WashAnimated
                  image={<Avatar name="tony avatar" src="https://i.ibb.co/8948ym5/avenge.png" />}
                >
                  <Text align="center" weight="bold">
                    <Link href="https://pinterest.com">
                      <Box paddingX={3} paddingY={2}>
                        Tony&apos;s Info
                      </Box>
                    </Link>
                  </Text>
                  {textShown && showTextOnExpand()}
                </WashAnimated>
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
              <Table accessibilityLabel="none">
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
                  <Table.Row>
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
                <WashAnimated
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
                        Black Panther&apos;s Info
                      </Box>
                    </Link>
                  </Text>
                </WashAnimated>
              </Box>
            }
          >
            <Table.Cell>
              <Text>T&apos;Challa</Text>
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
    </Box>
  );
}
