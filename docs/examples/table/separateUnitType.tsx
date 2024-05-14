import { ComponentProps } from 'react';
import { Status, Table, Text } from 'gestalt';

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

function BaseRow({
  disabled,
  type,
  title,
  subtext,
  rate,
  category,
}: {
  disabled?: boolean;
  type: ComponentProps<typeof Status>['type'];
  title: string;
  subtext: string;
  rate: number | string;
  category: string;
}) {
  return (
    <Table.Row>
      <Table.Cell>
        <Status subtext={subtext} title={title} type={type} />
      </Table.Cell>
      <Table.Cell>
        <Text align="end" color={disabled ? 'subtle' : 'default'}>
          {rate}
        </Text>
      </Table.Cell>
      <Table.Cell>
        <Text color={disabled ? 'subtle' : 'default'}>{category}</Text>
      </Table.Cell>
    </Table.Row>
  );
}

export default function Example() {
  const tableID = "Another example of a 'do' for table alignment";

  return (
    <Table accessibilityLabel={tableID}>
      <HeaderRow />
      <Table.Body>
        <BaseRow
          category="CTR"
          rate={100}
          subtext="Ends 11/20/2021"
          title="Active"
          type="inProgress"
        />
        <BaseRow
          category="Engagement"
          disabled
          rate="5,000"
          subtext="Ends 11/20/2021"
          title="Paused"
          type="halted"
        />
        <BaseRow
          category="Conversions"
          rate={2}
          subtext="Ends 11/20/2021"
          title="Warning"
          type="warning"
        />
        <BaseRow category="CTR" rate={50} subtext="Ends 11/20/2021" title="Complete" type="ok" />
      </Table.Body>
    </Table>
  );
}
