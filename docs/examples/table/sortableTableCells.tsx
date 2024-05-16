import { ReactNode, useState } from 'react';
import { Box, Table, Text } from 'gestalt';

export default function SortableHeaderExample() {
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
{ /* @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'number | undefined'. */}
          <col span="1" style={{ width: '10%' }} />
{ /* @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'number | undefined'. */}
          <col span="1" style={{ width: '10%' }} />
{ /* @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'number | undefined'. */}
          <col span="1" style={{ width: '80%' }} />
        </colgroup>
        <Table.Header>
          <Table.Row>
            <Table.SortableHeaderCell
              onSortChange={() => onSortChange('id')}
// @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"desc" | "asc"'.
              sortOrder={sortOrder}
              status={sortCol === 'id' ? 'active' : 'inactive'}
            >
              <Text weight="bold">Id</Text>
            </Table.SortableHeaderCell>
            <Table.SortableHeaderCell
              onSortChange={() => onSortChange('name')}
// @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"desc" | "asc"'.
              sortOrder={sortOrder}
              status={sortCol === 'name' ? 'active' : 'inactive'}
            >
              <Text weight="bold">Name</Text>
            </Table.SortableHeaderCell>

            <Table.SortableHeaderCell
              align="end"
              onSortChange={() => onSortChange('cost')}
// @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"desc" | "asc"'.
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
