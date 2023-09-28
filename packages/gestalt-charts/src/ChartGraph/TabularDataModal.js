// @flow strict-local
import { type Node, useState } from 'react';
import { Layer, Modal, Table, Text, useDefaultLabel } from 'gestalt';
import TabularDataModalFooter from './TabularDataModalFooter.js';
import TabularDataModalHeading from './TabularDataModalHeading.js';
import useTabularData from './useTabularData.js';

interface Indexable {
  index(): number;
}

type Props = {|
  title: string,
  toggleTabularDataModal: () => void,
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
  isHorizontalLayout: boolean,
|};

export default function TabularDataModal({
  title,
  toggleTabularDataModal,
  data,
  tickFormatter,
  labelMap,
  modalZIndex,
  isHorizontalLayout,
}: Props): Node {
  const { tabularData, tableSeriesText, tableXAxisText, tableYAxisText } =
    useDefaultLabel('ChartGraph');

  const [sortOrder, setSortOrder] = useState('desc');
  const [sortCol, setSortCol] = useState<null | 'series' | 'x' | 'y'>(null);

  const transformedTabularData = useTabularData({
    data,
    filterId: sortCol,
    filterOrder: sortOrder,
    tickFormatter,
    labelMap,
    isHorizontalLayout,
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
          <TabularDataModalHeading toggleTabularDataModal={toggleTabularDataModal} title={title} />
        }
        align="start"
        accessibilityModalLabel={tabularData}
        onDismiss={toggleTabularDataModal}
        size="sm"
        footer={
          <TabularDataModalFooter
            title={title}
            toggleTabularDataModal={toggleTabularDataModal}
            transformedTabularData={transformedTabularData}
            isHorizontalLayout={isHorizontalLayout}
          />
        }
      >
        <Table accessibilityLabel={title}>
          <Table.Header>
            <Table.Row>
              <Table.SortableHeaderCell
                onSortChange={() => onSortChange('series')}
                sortOrder={sortOrder}
                status={sortCol === 'series' ? 'active' : 'inactive'}
              >
                <Text size="200" weight="bold">
                  {tableSeriesText}
                </Text>
              </Table.SortableHeaderCell>
              <Table.SortableHeaderCell
                onSortChange={() => onSortChange('x')}
                sortOrder={sortOrder}
                status={sortCol === 'x' ? 'active' : 'inactive'}
              >
                <Text size="200" weight="bold">
                  {isHorizontalLayout ? tableXAxisText : tableYAxisText}
                </Text>
              </Table.SortableHeaderCell>
              <Table.SortableHeaderCell
                onSortChange={() => onSortChange('y')}
                sortOrder={sortOrder}
                status={sortCol === 'y' ? 'active' : 'inactive'}
              >
                <Text size="200" weight="bold">
                  {isHorizontalLayout ? tableYAxisText : tableXAxisText}
                </Text>
              </Table.SortableHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {transformedTabularData.map(({ series, xAxis, yAxis }) => (
              <Table.Row key={`id-${series}-${xAxis}-${yAxis}`}>
                <Table.Cell>
                  <Text>{series}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">{xAxis}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">{yAxis}</Text>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Modal>
    </Layer>
  );
}
