// @flow strict
import { type Node } from 'react';
import { Status, Table, Text } from 'gestalt';

function HeaderRow() {
  return (
    <Table.Header>
      <Table.Row>
        {['Status', 'Rate'].map((title) => (
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

// $FlowIgnore[unclear-type]
function BaseRow({ disabled, type, title, subtext, rate }: any) {
  return (
    <Table.Row>
      <Table.Cell>
        <Status type={type} title={title} subtext={subtext} />
      </Table.Cell>
      <Table.Cell>
        <Text overflow="noWrap" align="end" color={disabled ? 'subtle' : 'default'}>
          {rate}
        </Text>
      </Table.Cell>
    </Table.Row>
  );
}

export default function Example(): Node {
  const tableID = "Another Example of a 'Dont' do for table alignment";

  return (
    <Table accessibilityLabel={tableID}>
      <HeaderRow />
      <Table.Body>
        <BaseRow type="inProgress" title="Active" subtext="Ends 11/20/2021" rate="100 CTR" />
        <BaseRow
          disabled
          type="halted"
          title="Paused"
          subtext="Ends 11/20/2021"
          rate="5,000 Engagement"
        />
        <BaseRow type="warning" title="Warning" subtext="Ends 11/20/2021" rate="2 Conversions" />
        <BaseRow type="ok" title="Complete" subtext="Ends 11/20/2021" rate="50 CTR" />
      </Table.Body>
    </Table>
  );
}
