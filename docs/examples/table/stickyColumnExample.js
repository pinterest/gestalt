// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Image, Mask, Table, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Box width="60%">
        <Table accessibilityLabel="Sticky Column" maxHeight={200} stickyColumns={1}>
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
                      naturalHeight={50}
                      naturalWidth={50}
                      src="https://i.ibb.co/r3R04Y9/ironman.jpg"
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
                <Text>Shawarma</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Spiderman</Text>
              </Table.Cell>
              <Table.Cell>
                <Box width={200}>
                  <Text>May 29, 1970</Text>
                </Box>
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Box width={50}>
                  <Mask rounding="circle">
                    <Image
                      alt="Peter"
                      naturalHeight={50}
                      naturalWidth={50}
                      src="https://i.ibb.co/64NxM43/spiderman.png"
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
                <Text>Sandwiches</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Iron Man</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>December 28, 1995</Text>
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Box width={50}>
                  <Mask rounding="circle">
                    <Image
                      alt="T'Challa"
                      naturalHeight={50}
                      naturalWidth={50}
                      src="https://i.ibb.co/GpNtW5N/black-Panther.png"
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
                <Text>Beef suya</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Shuri</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>November 28, 1977</Text>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Box>
    </Box>
  );
}
