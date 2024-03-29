// @flow strict
import { type Node as ReactNode } from 'react';
import { Table, Text } from 'gestalt';

function HeaderRow() {
  return (
    <Table.Header>
      <Table.Row>
        {['Name', 'Total'].map((title) => (
          <Table.HeaderCell key={title}>
            <Text align={title === 'Total' ? 'end' : 'start'} weight="bold">
              {title}
            </Text>
          </Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Header>
  );
}

function BaseRow({
  name,
  subtext,
  total,
  lineClamp,
}: {
  name: string,
  subtext: string,
  total: string,
  lineClamp?: number,
}) {
  return (
    <Table.Row>
      <Table.Cell>
        <Text color="default">{name}</Text>
        <Text color="subtle" lineClamp={lineClamp} size="100">
          {subtext}
        </Text>
      </Table.Cell>
      <Table.Cell>
        <Text align="end">{total}</Text>
      </Table.Cell>
    </Table.Row>
  );
}

export default function Example(): ReactNode {
  const tableID = "Example of a 'do' for table content";

  return (
    <Table accessibilityLabel={tableID}>
      <HeaderRow />
      <Table.Body>
        <BaseRow
          lineClamp={1}
          name="Video views for all Q3 campaigns and ad groups"
          subtext="David Brown, Carlota Ojeda, Olamide Olufemi, Rajesh Uttambai"
          total="--"
        />
        <BaseRow
          name="Video views for all Q2 campaigns and ad groups"
          subtext="David Brown, Carlota Ojeda"
          total="5,000"
        />
        <BaseRow
          lineClamp={1}
          name="Video views for all Q2 ad groups"
          subtext="David Brown, Carlota Ojeda, Olamide Olufemi, Rajesh Uttambai"
          total="6,455,434"
        />
      </Table.Body>
    </Table>
  );
}
