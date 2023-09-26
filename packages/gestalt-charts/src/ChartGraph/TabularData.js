// @flow strict-local
import { type Node, useState } from 'react';
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

interface Indexable {
  index(): number;
}

export default function TabularData({
  title,
  setShowTabularData,
  data,
  tickFormatter,
  labelMap,
  modalZIndex,
}: {|
  title: string,
  setShowTabularData: () => void,
  data: $ReadOnlyArray<{|
    name: string | number,
    [string]: number,
  |}>,
  tickFormatter?: {|
    timeseries?: (number) => string | number,
    xAxisTop?: (number, number) => string | number,
    xAxisBottom?: (number, number) => string | number,
    yAxisRight?: (number, number) => string | number,
    yAxisLeft?: (number, number) => string | number,
  |},
  labelMap?: {| [string]: string |},
  modalZIndex?: Indexable,
|}): Node {
  const { accessibilityLabelDismissModal, tabularData } = useDefaultLabel('ChartGraph');

  const [sortOrder, setSortOrder] = useState('desc');
  const [sortCol, setSortCol] = useState<null | 'series' | 'x' | 'y'>(null);

  const tabularDataTable = useTabularData({
    data,
    filterId: sortCol,
    filterOrder: sortOrder,
    tickFormatter,
    labelMap,
  });

  const onSortChange = (value: 'series' | 'x' | 'y') => {
    if (sortCol !== value) {
      setSortCol(value);
      setSortOrder('desc');
    } else {
      setSortOrder((sortValue) => (sortValue === 'asc' ? 'desc' : 'asc'));
    }
  };

  return (
    <Layer zIndex={modalZIndex}>
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
              <Button color="gray" text="Cancel" onClick={() => setShowTabularData()} />
              <Button color="red" text="Download as .csv" iconEnd="download" />
            </ButtonGroup>
          </Flex>
        }
      >
        <Table accessibilityLabel="Main example table">
          <Table.Header>
            <Table.Row>
              <Table.SortableHeaderCell
                onSortChange={() => onSortChange('series')}
                sortOrder={sortOrder}
                status={sortCol === 'series' ? 'active' : 'inactive'}
              >
                <Text size="200" weight="bold">
                  Metric series
                </Text>
              </Table.SortableHeaderCell>
              <Table.SortableHeaderCell
                onSortChange={() => onSortChange('x')}
                sortOrder={sortOrder}
                status={sortCol === 'x' ? 'active' : 'inactive'}
              >
                <Text size="200" weight="bold">
                  x-value
                </Text>
              </Table.SortableHeaderCell>
              <Table.SortableHeaderCell
                onSortChange={() => onSortChange('y')}
                sortOrder={sortOrder}
                status={sortCol === 'y' ? 'active' : 'inactive'}
              >
                <Text size="200" weight="bold">
                  y-value
                </Text>
              </Table.SortableHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{tabularDataTable}</Table.Body>
        </Table>
      </Modal>
    </Layer>
  );
}
