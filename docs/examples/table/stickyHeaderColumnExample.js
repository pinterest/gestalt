// @flow strict
import { type Node } from 'react';
import { Box, Table, Text, Mask, Image } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box width="60%">
        <Table
          accessibilityLabel="Sticky header and sticky columns"
          maxHeight={200}
          stickyColumns={3}
          borderStyle="none"
        >
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
                <Text>Flight, Super strength</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>New York</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>N/A</Text>
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
              <Table.Cell>
                <Text>Peter Parker</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Spiderman</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Iron Man</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Sandwiches</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Spidey senses, super strength, web shooters</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Brooklyn</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Friendly Neighborhood Spiderman</Text>
              </Table.Cell>
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
                <Text>Chaos magic, spells, reality warping</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Sokovia</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>N/A</Text>
              </Table.Cell>
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
                <Text>Enhanced strength, speed, reflexes + Vibranium suit</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Wakanda</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>King of the Dead</Text>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Box>
    </Box>
  );
}
