// @flow strict
import { type Node } from 'react';
import { Table, Text, Status, Box } from 'gestalt';

function HeaderRow() {
  return (
    <Table.Header>
      <Table.Row>
        {['Status', 'Rate', 'Type'].map((title) => (
          <Table.HeaderCell key={title}>
            <Text align={title === 'Rate' ? 'end' : 'start'} weight="bold">
              {title}
            </Text>
          </Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Header>
  );
}

function BaseRow({ disabled, type, title, subtext, rate, category }: any) {
  return (
    <Table.Row>
      <Table.Cell>
        <Status type={type} title={title} subtext={subtext} />
      </Table.Cell>
      <Table.Cell>
        <Text align="end" color={disabled ? 'gray' : 'darkGray'}>
          {rate}
        </Text>
      </Table.Cell>
      <Table.Cell>
        <Text color={disabled ? 'gray' : 'darkGray'}>{category}</Text>
      </Table.Cell>
    </Table.Row>
  );
}

export default function Example(): Node {
  const tableID = "Another example of a 'do' for table alignment";

  return (
    <Table accessibilityLabel={tableID}>
      <HeaderRow />
      <Table.Body>
        <BaseRow
          type="inProgress"
          title="Active"
          subtext="Ends 11/20/2021"
          rate={100}
          category="CTR"
        />
        <BaseRow
          disabled
          type="halted"
          title="Paused"
          subtext="Ends 11/20/2021"
          rate="5,000"
          category="Engagement"
        />
        <BaseRow
          type="warning"
          title="Warning"
          subtext="Ends 11/20/2021"
          rate={2}
          category="Conversions"
        />
        <BaseRow
          checked={false}
          type="ok"
          title="Complete"
          subtext="Ends 11/20/2021"
          rate={50}
          category="CTR"
        />
      </Table.Body>
    </Table>
  );
}
