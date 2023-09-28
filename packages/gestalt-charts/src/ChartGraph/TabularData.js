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

type Props = {|
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
  isHorizontalLayout: boolean,
|};

export default function TabularData({
  title,
  setShowTabularData,
  data,
  tickFormatter,
  labelMap,
  modalZIndex,
  isHorizontalLayout,
}: Props): Node {
  const {
    accessibilityLabelDismissModal,
    tabularData,
    tableSeriesText,
    tableXAxisText,
    tableYAxisText,
    downloadCsvButtonText,
    cancelButtonText,
  } = useDefaultLabel('ChartGraph');

  const [sortOrder, setSortOrder] = useState('desc');
  const [sortCol, setSortCol] = useState<null | 'series' | 'x' | 'y'>(null);

  const sortedData = useTabularData({
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

  const csvData = `${tableSeriesText},${isHorizontalLayout ? tableXAxisText : tableYAxisText},${
    isHorizontalLayout ? tableYAxisText : tableXAxisText
  }\n${sortedData
    .map((x) => Object.values(x))
    .map((e) => e.join(','))
    .join('\n')}`;

  const encodedData = encodeURI(`data:text/csv;charset=utf-8,${csvData}`);

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
              <Button color="gray" text={cancelButtonText} onClick={() => setShowTabularData()} />
              <a href={encodedData} download={`${title.toLowerCase().replace(' ', '_')}.csv`}>
                <Button color="red" text={downloadCsvButtonText} iconEnd="download" />
              </a>
            </ButtonGroup>
          </Flex>
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
            {sortedData.map(({ series, xAxis, yAxis }) => (
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
