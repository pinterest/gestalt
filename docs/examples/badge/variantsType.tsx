import { Badge, Flex, Table, Text } from 'gestalt';

export default function Example() {
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
                <Badge text="New" type="info" />
                <Badge
                  text="New"
                  tooltip={{
                    text: 'Collages is a new feature',
                    idealDirection: 'up',
                  }}
                  type="info"
                />
              </Flex>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Text>Success</Text>
            </Table.Cell>
            <Table.Cell>
              <Flex direction="column" gap={2}>
                <Badge text="Completed" type="success" />

                <Badge
                  text="Completed"
                  tooltip={{
                    text: 'Your onboarding is almost completed',
                    idealDirection: 'up',
                  }}
                  type="success"
                />
              </Flex>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Text>Warning</Text>
            </Table.Cell>
            <Table.Cell>
              <Flex direction="column" gap={2}>
                <Badge text="Needs attention" type="warning" />

                <Badge
                  text="Needs attention"
                  tooltip={{
                    text: 'Your account needs attention',
                    idealDirection: 'up',
                  }}
                  type="warning"
                />
              </Flex>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Text>Error</Text>
            </Table.Cell>
            <Table.Cell>
              <Flex direction="column" gap={2}>
                <Badge text="Failed" type="error" />

                <Badge
                  text="Failed"
                  tooltip={{
                    text: 'Your uploading failed',
                    idealDirection: 'up',
                  }}
                  type="error"
                />
              </Flex>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Text>Neutral</Text>
            </Table.Cell>
            <Table.Cell>
              <Flex direction="column" gap={2}>
                <Badge text="Not started" type="neutral" />
                <Badge
                  text="Not started"
                  tooltip={{
                    text: 'Your campaign has not started',
                    idealDirection: 'up',
                  }}
                  type="neutral"
                />
              </Flex>
            </Table.Cell>
          </Table.Row>
          
          <Table.Row>
            <Table.Cell>
              <Text>Recommendation</Text>
            </Table.Cell>
            <Table.Cell>
              <Flex direction="column" gap={2}>
                <Badge text="Recommended for you" type="recommendation" />

                <Badge
                  text="Recommended for you"
                  tooltip={{
                    text: 'This business product is recommended for you',
                    idealDirection: 'up',
                  }}
                  type="recommendation"
                />
              </Flex>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Flex>
  );
}
