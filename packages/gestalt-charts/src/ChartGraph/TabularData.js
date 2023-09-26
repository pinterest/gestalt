// @flow strict-local
import { type Node } from 'react';
import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Layer,
  Modal,
  Table,
  Text,
  useDefaultLabel,
} from 'gestalt';

export default function TabularData({
  title,
  setShowTabularData,
}: {|
  title?: string,
  setShowTabularData: () => void,
|}): Node {
  const { accessibilityLabelDismissModal } = useDefaultLabel('ChartGraph');

  return (
    <Layer>
      <Modal
        heading={
          <Flex justifyContent="between">
            <Heading size="500" accessibilityLevel={1}>
              {title || 'ChartGraph tabular data'}
            </Heading>
            <IconButton
              accessibilityLabel={accessibilityLabelDismissModal}
              bgColor="white"
              icon="cancel"
              iconColor="darkGray"
              onClick={() => setShowTabularData()}
              size="sm"
            />
          </Flex>
        }
        align="start"
        accessibilityModalLabel="accessibilityLabel"
        onDismiss={() => setShowTabularData()}
        size="sm"
        footer={
          <Flex justifyContent="end">
            <ButtonGroup>
              <Button color="gray" text="Cancel" />
              <Button color="red" text="Download as .csv" iconEnd="download" />
            </ButtonGroup>
          </Flex>
        }
      >
        <Table accessibilityLabel="Main example table">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Text size="200" weight="bold">
                  Campaign
                </Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text size="200" weight="bold">
                  Status
                </Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text size="200" weight="bold">
                  Date
                </Text>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {[
              {
                id: 'row1',
                campaign: 'Winter',
                status: 'Draft',
                date: 'December 25, 2023',
              },
              {
                id: 'row2',
                campaign: 'Spring',
                status: 'Active',
                date: 'April 25, 2023',
              },
              {
                id: 'row3',
                campaign: 'Fall',
                status: 'Finished',
                date: 'October 25, 2022',
              },
            ].map(({ id, campaign, status, date }) => (
              <Table.Row key={id}>
                <Table.Cell>
                  <Text size="200">{campaign}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">{status}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">{date}</Text>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Modal>
    </Layer>
  );
}
