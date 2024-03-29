// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Table, Text } from 'gestalt';

export default function SortableHeaderExample(): ReactNode {
  const [sortOrder, setSortOrder] = useState('desc');
  const [sortCol, setSortCol] = useState('name');

  const onSortChange = (col: string) => {
    if (sortCol !== col) {
      setSortCol(col);
      setSortOrder('desc');
    } else {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }
  };

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center">
      <Table accessibilityLabel="Sortable header cells">
        <colgroup>
          <col span="1" style={{ width: '10%' }} />
          <col span="1" style={{ width: '10%' }} />
          <col span="1" style={{ width: '80%' }} />
        </colgroup>
        <Table.Header>
          <Table.Row>
            <Table.SortableHeaderCell
              onSortChange={() => onSortChange('id')}
              sortOrder={sortOrder}
              status={sortCol === 'id' ? 'active' : 'inactive'}
            >
              <Text weight="bold">Id</Text>
            </Table.SortableHeaderCell>
            <Table.SortableHeaderCell
              onSortChange={() => onSortChange('name')}
              sortOrder={sortOrder}
              status={sortCol === 'name' ? 'active' : 'inactive'}
            >
              <Text weight="bold">Name</Text>
            </Table.SortableHeaderCell>

            <Table.SortableHeaderCell
              align="end"
              onSortChange={() => onSortChange('cost')}
              sortOrder={sortOrder}
              status={sortCol === 'cost' ? 'active' : 'inactive'}
            >
              <Text weight="bold">Cost</Text>
            </Table.SortableHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Row>
          <Table.Cell>
            <Text>123</Text>
          </Table.Cell>
          <Table.Cell>
            <Text>Snax</Text>
          </Table.Cell>
          <Table.Cell>
            <Text align="end">$50</Text>
          </Table.Cell>
        </Table.Row>
      </Table>
    </Box>
  );
}
