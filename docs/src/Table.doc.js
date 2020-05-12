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
    description="The Table contains the following composable elements: Table, Table.Body, Table.Cell, Table.Header, Table.HeaderCell, Table.Row."
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

card(<Card name="Table.Header" />);

card(
  <PropTable
    Component={Table.Header}
    props={[
      {
        name: 'children',
        type: 'React.Node',
      },
    ]}
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

export default cards;
