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
      <Box width="70%">
        <Table accessibilityLabel="Sortable header cells with sticky columns" stickyColumns={2}>
          <Table.Header>
            <Table.Row>
              <Table.SortableHeaderCell
                onSortChange={() => onSortChange('name')}
// @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"desc" | "asc"'.
                sortOrder={sortOrder}
                status={sortCol === 'name' ? 'active' : 'inactive'}
              >
                <Text weight="bold">Name</Text>
              </Table.SortableHeaderCell>
              <Table.SortableHeaderCell
                onSortChange={() => onSortChange('id')}
// @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"desc" | "asc"'.
                sortOrder={sortOrder}
                status={sortCol === 'id' ? 'active' : 'inactive'}
              >
                <Text weight="bold">Nickname</Text>
              </Table.SortableHeaderCell>
              <Table.SortableHeaderCell
                onSortChange={() => onSortChange('food')}
// @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"desc" | "asc"'.
                sortOrder={sortOrder}
                status={sortCol === 'food' ? 'active' : 'inactive'}
              >
                <Text weight="bold">Favorite Food</Text>
              </Table.SortableHeaderCell>
              <Table.SortableHeaderCell
                onSortChange={() => onSortChange('friend')}
// @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"desc" | "asc"'.
                sortOrder={sortOrder}
                status={sortCol === 'friend' ? 'active' : 'inactive'}
              >
                <Text weight="bold">Best Friend</Text>
              </Table.SortableHeaderCell>
              <Table.SortableHeaderCell
                onSortChange={() => onSortChange('birth')}
// @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"desc" | "asc"'.
                sortOrder={sortOrder}
                status={sortCol === 'birth' ? 'active' : 'inactive'}
              >
                <Text weight="bold">Birthdate</Text>
              </Table.SortableHeaderCell>
              <Table.SortableHeaderCell
                onSortChange={() => onSortChange('desc')}
// @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"desc" | "asc"'.
                sortOrder={sortOrder}
                status={sortCol === 'desc' ? 'active' : 'inactive'}
              >
                <Text weight="bold">Description</Text>
              </Table.SortableHeaderCell>
              <Table.SortableHeaderCell
                onSortChange={() => onSortChange('color')}
// @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"desc" | "asc"'.
                sortOrder={sortOrder}
                status={sortCol === 'color' ? 'active' : 'inactive'}
              >
                <Text weight="bold">Favorite Color</Text>
              </Table.SortableHeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
      </Box>
    </Box>
  );
}
