// @flow strict
import { type Node as ReactNode } from 'react';
import { Badge, Flex, Table, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <Table accessibilityLabel="Type examples">
        <Table.Header>
          <Table.Row>
            {['Type', 'Example'].map((header) => (
              <Table.HeaderCell key={header}>
                <Text weight="bold">{header}</Text>
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Text>Info</Text>
            </Table.Cell>
            <Table.Cell>
              <Flex direction="column" gap={2}>
                <Text size="300">
                  Ads & Campaigns <Badge text="New" type="info" />
                </Text>
                <Text size="300">
                  Ads & Campaigns{' '}
                  <Badge
                    text="New"
                    type="info"
                    tooltip={{
                      text: 'This is a new feature',
                      idealDirection: 'up',
                    }}
                  />
                </Text>
              </Flex>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Text>Success</Text>
            </Table.Cell>
            <Table.Cell>
              <Text size="300">
                Ads & Campaigns <Badge text="Completed" type="success" />
              </Text>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Text>Warning</Text>
            </Table.Cell>
            <Table.Cell>
              <Text size="300">
                Ads & Campaigns <Badge text="Needs attention" type="warning" />
              </Text>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Text>Error</Text>
            </Table.Cell>
            <Table.Cell>
              <Text size="300">
                Ads & Campaigns <Badge text="Failed" type="error" />
              </Text>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Text>Neutral</Text>
            </Table.Cell>
            <Table.Cell>
              <Text size="300">
                Ads & Campaigns <Badge text="Not started" type="neutral" />
              </Text>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Text>Recommendation</Text>
            </Table.Cell>
            <Table.Cell>
              <Text size="300">
                Ads & Campaigns <Badge text="Recommended for you" type="recommendation" />
              </Text>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Flex>
  );
}
