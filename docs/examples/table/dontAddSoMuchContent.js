// @flow strict
import { type Node } from 'react';
import { Table, Text } from 'gestalt';

function HeaderRow() {
  return (
    <Table.Header>
      <Table.Row>
        {['Name', 'Total amounts for 2021 through 2022'].map((title) => (
          <Table.HeaderCell key={title}>
            <Text align={title.startsWith('Total') ? 'end' : 'start'} weight="bold">
              {title}
            </Text>
          </Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Header>
  );
}

// $FlowIgnore[unclear-type]
function BaseRow({ name, subtext, total, lineClamp }: any) {
  return (
    <Table.Row>
      <Table.Cell>
        <Text color="default">{name}</Text>
        <Text color="subtle" size="100" lineClamp={lineClamp}>
          {subtext}
        </Text>
      </Table.Cell>
      <Table.Cell>
        <Text align="end" lineClamp={lineClamp}>
          {total}
        </Text>
      </Table.Cell>
    </Table.Row>
  );
}

export default function Example(): Node {
  const tableID = "Example of a 'don't' do for table content";

  return (
    <Table accessibilityLabel={tableID}>
      <HeaderRow />
      <Table.Body>
        <BaseRow
          name="Video views for all Q3 campaigns and ad groups"
          subtext="David Brown, Carlota Ojeda, Olamide Olufemi, Rajesh Uttambai"
          total=""
        />
        <BaseRow
          name="Video views for all Q2 campaigns and ad groups"
          subtext="David Brown, Carlota Ojeda"
          total="5,000"
        />
        <BaseRow
          name="Video views for all Q2 ad groups"
          subtext="David Brown, Carlota Ojeda, Olamide Olufemi, Rajesh Uttambai"
          total="6,455,434"
          lineClamp={1}
        />
      </Table.Body>
    </Table>
  );
}
