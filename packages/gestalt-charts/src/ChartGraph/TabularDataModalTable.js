// @flow strict-local
import { type Node } from 'react';
import { Table, Text, useDefaultLabel } from 'gestalt';
import {
  type FilterIdType,
  type FilterOrderType,
  type SortChangeType,
  type TransformedTabularDataType,
} from './useTabularData.js';

type Props = {
  title: string,
  isHorizontalLayout: boolean,
  transformedTabularData: TransformedTabularDataType,
  onSortChange: (SortChangeType) => void,
  sortOrder: FilterOrderType,
  sortCol: FilterIdType,
};

export default function TabularDataModal({
  title,
  isHorizontalLayout,
  transformedTabularData,
  onSortChange,
  sortOrder,
  sortCol,
}: Props): Node {
  const { tableSeriesText, tableXAxisText, tableYAxisText } = useDefaultLabel('ChartGraph');

  return (
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
  );
}
