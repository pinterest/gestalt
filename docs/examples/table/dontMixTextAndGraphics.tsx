import {ReactNode} from 'react';
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

function BaseRow(
  {
    disabled,
    type,
    title,
    subtext,
    rate,
  }: any,
) {
  return (
    <Table.Row>
      <Table.Cell>
        <Status subtext={subtext} title={title} type={type} />
      </Table.Cell>
      <Table.Cell>
        <Text align="end" color={disabled ? 'subtle' : 'default'} overflow="noWrap">
          {rate}
        </Text>
      </Table.Cell>
    </Table.Row>
  );
}

export default function Example() {
  const tableID = "Another Example of a 'Dont' do for table alignment";

  return (
    <Table accessibilityLabel={tableID}>
      <HeaderRow />
      <Table.Body>
        <BaseRow rate="100 CTR" subtext="Ends 11/20/2021" title="Active" type="inProgress" />
        <BaseRow
          disabled
          rate="5,000 Engagement"
          subtext="Ends 11/20/2021"
          title="Paused"
          type="halted"
        />
        <BaseRow rate="2 Conversions" subtext="Ends 11/20/2021" title="Warning" type="warning" />
        <BaseRow rate="50 CTR" subtext="Ends 11/20/2021" title="Complete" type="ok" />
      </Table.Body>
    </Table>
  );
}
