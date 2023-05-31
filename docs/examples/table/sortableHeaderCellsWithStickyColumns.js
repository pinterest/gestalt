// @flow strict
import { type Node, useState } from 'react';
import { Box, Table, Text } from 'gestalt';

export default function SortableHeaderExample(): Node {
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
    <Box height="100%" display="flex" justifyContent="center" alignItems="center">
      <Box width="70%">
        <Table accessibilityLabel="Sortable header cells with sticky columns" stickyColumns={2}>
          <Table.Header>
            <Table.Row>
              <Table.SortableHeaderCell
                onSortChange={() => onSortChange('name')}
                sortOrder={sortOrder}
                status={sortCol === 'name' ? 'active' : 'inactive'}
              >
                <Text weight="bold">Name</Text>
              </Table.SortableHeaderCell>
              <Table.SortableHeaderCell
                onSortChange={() => onSortChange('id')}
                sortOrder={sortOrder}
                status={sortCol === 'id' ? 'active' : 'inactive'}
              >
                <Text weight="bold">Nickname</Text>
              </Table.SortableHeaderCell>
              <Table.SortableHeaderCell
                onSortChange={() => onSortChange('food')}
                sortOrder={sortOrder}
                status={sortCol === 'food' ? 'active' : 'inactive'}
              >
                <Text weight="bold">Favorite Food</Text>
              </Table.SortableHeaderCell>
              <Table.SortableHeaderCell
                onSortChange={() => onSortChange('friend')}
                sortOrder={sortOrder}
                status={sortCol === 'friend' ? 'active' : 'inactive'}
              >
                <Text weight="bold">Best Friend</Text>
              </Table.SortableHeaderCell>
              <Table.SortableHeaderCell
                onSortChange={() => onSortChange('birth')}
                sortOrder={sortOrder}
                status={sortCol === 'birth' ? 'active' : 'inactive'}
              >
                <Text weight="bold">Birthdate</Text>
              </Table.SortableHeaderCell>
              <Table.SortableHeaderCell
                onSortChange={() => onSortChange('desc')}
                sortOrder={sortOrder}
                status={sortCol === 'desc' ? 'active' : 'inactive'}
              >
                <Text weight="bold">Description</Text>
              </Table.SortableHeaderCell>
              <Table.SortableHeaderCell
                onSortChange={() => onSortChange('color')}
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
