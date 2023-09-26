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
import useTabularData from './useTabularData.js';

export default function TabularData({
  title,
  setShowTabularData,
  data,
}: {|
  title: string,
  setShowTabularData: () => void,
  data: $ReadOnlyArray<{|
    name: string | number,
    [string]: number,
  |}>,
|}): Node {
  const { accessibilityLabelDismissModal, tabularData } = useDefaultLabel('ChartGraph');

  const tabularDataTable = useTabularData({ data });

  return (
    <Layer>
      <Modal
        heading={
          <Flex direction="column">
            <Flex justifyContent="between">
              <Heading size="500" accessibilityLevel={1}>
                {title}
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
            <Text size="200" color="subtle">
              {tabularData}
            </Text>
          </Flex>
        }
        align="start"
        accessibilityModalLabel={tabularData}
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
                  Metric series
                </Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text size="200" weight="bold">
                  x-value
                </Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text size="200" weight="bold">
                  y-value
                </Text>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{tabularDataTable}</Table.Body>
        </Table>
      </Modal>
    </Layer>
  );
}
