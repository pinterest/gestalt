// @flow strict
import { type Node } from 'react';
import MainSection from '../../docs-components/MainSection.js';
import PageHeader from '../../docs-components/PageHeader.js';
import Page from '../../docs-components/Page.js';

export default function DocsPage(): Node {
  return (
    <Page title="Screen sizes guidelines">
      <PageHeader
        name="Screen sizes"
        description="There are a multitude of screen sizes that Pinterest operates on. Our design system is built to flex to any and all screen sizes across platforms, but for consistency and ease of handoff, we only design for a handful of screen sizes per platform. Our screen sizes are always at 1x."
        type="guidelines"
      />
      <MainSection name="Web (px)">
        <MainSection.Card
          cardSize="lg"
          showCode={false}
          defaultCode={`
      <Box width={'100%'}>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Text weight="bold">Device</Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text weight="bold">Size (px)</Text>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Text>Small phone</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>320 x 568</Text>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Text>Phone</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>360 x 780</Text>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Text>Tablet</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>768 x 1024</Text>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Text>Desktop Breakpoints (min-width)</Text>
                <Box paddingY={2} maxWidth={500}>
                  <Text italic>Components in Gestalt adjust to browser size at these breakpoints. When designing, please make sure your designs take these breakpoints into consideration.</Text>
                </Box>
              </Table.Cell>
              <Table.Cell>
                <Flex direction="column" gap={{ column: 2, row: 0 }}>
                  <Text>sm: 576px</Text>
                  <Text>md: 768px</Text>
                  <Text>lg: 1312px</Text>
                </Flex>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Box>
      `}
        />
      </MainSection>
      <MainSection name="iOS (pt)">
        <MainSection.Card
          cardSize="lg"
          showCode={false}
          defaultCode={`
      <Box width={'100%'}>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Text weight="bold">Device</Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text weight="bold">Size (pt)</Text>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Text>Small phone</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>320 x 568</Text>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Text>Phone</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>360 x 780</Text>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Text>Tablet</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>768 x 1024</Text>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Box>
      `}
        />
      </MainSection>
      <MainSection name="Android (dp)">
        <MainSection.Card
          cardSize="lg"
          showCode={false}
          defaultCode={`
      <Box width={'100%'}>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Text weight="bold">Device</Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text weight="bold">Size (dp)</Text>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Text>Small phone</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>320 x 480</Text>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Text>Phone</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>360 x 640</Text>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Text>Tablet</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>800 x 1280</Text>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Box>
      `}
        />
      </MainSection>
    </Page>
  );
}
