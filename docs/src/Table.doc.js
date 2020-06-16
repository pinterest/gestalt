// @flow strict
import * as React from 'react';
import { Table } from 'gestalt';
import Card from './components/Card.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';
import PropTable from './components/PropTable.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Table"
    description="The Table contains the following composable elements: Table, Table.Body, Table.Cell, Table.Footer, Table.Header, Table.HeaderCell, Table.Row, Table.SortableHeaderCell."
  />
);

card(
  <PropTable
    Component={Table}
    props={[
      {
        name: 'children',
        type: 'React.Node',
      },
      {
        name: 'borderSize',
        type: `"sm" | "none"`,
        description: 'Specify a border width for table: "sm" is 1px',
        defaultValue: 'none',
      },
      {
        name: 'maxHeight',
        type: `number | string`,
        description: `Use numbers for pixels: maxHeight={100} and strings for percentages: maxHeight="100%"`,
        href: 'stickyHeader',
      },
    ]}
  />
);

card(
  <Example
    name="Example: Basic Table"
    defaultCode={`
<Table>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>
        <Text weight="bold">Name</Text>
      </Table.HeaderCell>
      <Table.HeaderCell>
        <Text weight="bold">House</Text>
      </Table.HeaderCell>
      <Table.HeaderCell>
        <Text weight="bold">Birthday</Text>
      </Table.HeaderCell>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>
        <Text>Luna Lovegood</Text>
      </Table.Cell>
      <Table.Cell>
        <Text>Ravenclaw</Text>
      </Table.Cell>
      <Table.Cell>
        <Text>June 25, 1993</Text>
      </Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>
        <Text>Draco Malfoy</Text>
      </Table.Cell>
      <Table.Cell>
        <Text>Slytherin</Text>
      </Table.Cell>
      <Table.Cell>
        <Text>December 3, 1992</Text>
      </Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
`}
  />
);

card(<Card name="Table.Body" />);

card(
  <PropTable
    Component={Table.Body}
    props={[
      {
        name: 'children',
        type: 'React.Node',
      },
    ]}
  />
);

card(<Card name="Table.Cell" />);

card(
  <PropTable
    Component={Table.Cell}
    props={[
      {
        name: 'children',
        type: 'React.Node',
      },
      {
        name: 'colSpan',
        type: 'number',
        defaultValue: 1,
      },
      {
        name: 'rowSpan',
        type: 'number',
        defaultValue: 1,
      },
    ]}
  />
);

card(<Card name="Table.Footer" />);

card(
  <PropTable
    Component={Table.Footer}
    props={[
      {
        name: 'children',
        type: 'React.Node',
      },
    ]}
  />
);

card(<Card name="Table.Header" />);

card(
  <PropTable
    Component={Table.Header}
    props={[
      {
        name: 'children',
        type: 'React.Node',
      },
      {
        name: 'sticky',
        type: 'boolean',
        defaultValue: false,
        href: 'stickyHeader',
        description:
          'If true, the table header will be sticky and the table body will be scrollable',
      },
    ]}
  />
);

card(
  <Example
    id="stickyHeader"
    name="Example: Sticky header"
    defaultCode={`
<Table maxHeight={110}>
  <Table.Header sticky>
    <Table.Row>
      <Table.HeaderCell>
        <Text weight="bold">Name</Text>
      </Table.HeaderCell>
      <Table.HeaderCell>
        <Text weight="bold">House</Text>
      </Table.HeaderCell>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell><Text>Luna Lovegood</Text></Table.Cell>
      <Table.Cell><Text>Ravenclaw</Text></Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell><Text>Draco Malfoy</Text></Table.Cell>
      <Table.Cell><Text>Slytherin</Text></Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell><Text>Neville Longbottom</Text></Table.Cell>
      <Table.Cell><Text>Gryffindor</Text></Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
`}
  />
);

card(<Card name="Table.HeaderCell" />);

card(
  <PropTable
    Component={Table.HeaderCell}
    props={[
      {
        name: 'children',
        type: 'React.Node',
      },
      {
        name: 'scope',
        defaultValue: 'col',
        type: '"col" | "row" | "colgroup" | "rowgroup"',
      },
      {
        name: 'colSpan',
        type: 'number',
        defaultValue: 1,
      },
      {
        name: 'rowSpan',
        type: 'number',
        defaultValue: 1,
      },
    ]}
  />
);

card(<Card name="Table.Row" />);

card(
  <PropTable
    Component={Table.Row}
    props={[
      {
        name: 'children',
        type: 'React.Node',
      },
    ]}
  />
);

card(
  <Card
    name="Table.SortableHeaderCell"
    description="Sortable header cells are clickable in an accessible way and have an icon to display whether the table is currently being sorted by that column."
  />
);

card(
  <PropTable
    Component={Table.SortableHeaderCell}
    props={[
      {
        name: 'children',
        type: 'React.Node',
      },
      {
        name: 'scope',
        defaultValue: 'col',
        type: '"col" | "row" | "colgroup" | "rowgroup"',
      },
      {
        name: 'colSpan',
        type: 'number',
        defaultValue: 1,
      },
      {
        name: 'rowSpan',
        type: 'number',
        defaultValue: 1,
      },
      {
        name: 'onSortChange',
        required: true,
        type:
          '({ event: SyntheticMouseEvent<HTMLTableCellElement> | SyntheticKeyboardEvent<HTMLTableCellElement> }) => void',
        href: 'sortableExample',
      },
      {
        name: 'sortOrder',
        required: true,
        type: '"asc" | "desc"',
        href: 'sortableExample',
      },
      {
        name: 'status',
        required: true,
        type: '"active" | "inactive"',
        href: 'sortableExample',
      },
    ]}
  />
);

card(
  <Example
    id="sortableExample"
    name="Example: Sortable header cells"
    defaultCode={`
    function SortableHeaderExample() {
      const [sortOrder, setSortOrder] = React.useState('desc');
      const [sortCol, setSortCol] = React.useState('name');
    
      const onSortChange = (col) => {
        if (sortCol !== col) {
          setSortCol(col);
          setSortOrder('desc');
        } else {
          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        }
      }
    
      return (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.SortableHeaderCell onSortChange={() => onSortChange('name')} sortOrder={sortOrder} status={sortCol === 'name' ? 'active' : 'inactive'}>
                <Text weight="bold">Name</Text>
              </Table.SortableHeaderCell>
              <Table.SortableHeaderCell onSortChange={() => onSortChange('id')} sortOrder={sortOrder} status={sortCol === 'id' ? 'active' : 'inactive'}>
                <Text weight="bold">Id</Text>
              </Table.SortableHeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
      );
    }
`}
  />
);

export default cards;
