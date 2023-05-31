// @flow strict
import { type Node } from 'react';
import { Table, Box, Label, Checkbox, Text } from 'gestalt';

function HeaderRow({ id }: {| id: string |}) {
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>
          <Box display="visuallyHidden">
            <Label htmlFor={id}>Not all checkboxes are checked</Label>
          </Box>
          <Checkbox id={id} onChange={() => {}} indeterminate size="sm" />
        </Table.HeaderCell>
        {['Status', 'Campaign'].map((title) => (
          <Table.HeaderCell key={title}>
            <Text color={title === 'Campaign' ? 'error' : 'link'} weight="bold">
              {title}
            </Text>
          </Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Header>
  );
}

// $FlowIgnore[unclear-type]
function BaseRow({ id, checked, disabled, text, campaign, bold, underline, italic, color }: any) {
  return (
    <Table.Row>
      <Table.Cell>
        <Checkbox
          id={`${id.replace(/ /g, '_').replace(/'/g, '')}_${text
            .replace(/ /g, '_')
            .replace(/'/g, '')}`}
          onChange={() => {}}
          disabled={disabled}
          size="sm"
          checked={checked}
        />
      </Table.Cell>
      <Table.Cell>
        <Label
          htmlFor={`${id.replace(/ /g, '_').replace(/'/g, '')}_${text
            .replace(/ /g, '_')
            .replace(/'/g, '')}`}
        >
          <Text
            weight={bold ? 'bold' : 'normal'}
            underline={underline ? true : undefined}
            italic={italic ? true : undefined}
          >
            {text}
          </Text>
        </Label>
      </Table.Cell>
      <Table.Cell>
        <Text color={color}>{campaign}</Text>
      </Table.Cell>
    </Table.Row>
  );
}

export default function Example(): Node {
  const tableID = 'Example of a Dont do for table style';

  return (
    <Table accessibilityLabel={tableID}>
      <HeaderRow id={tableID} />
      <Table.Body>
        <BaseRow id={tableID} checked text="The best ad" campaign="Engagement" color="red" />
        <BaseRow
          id={tableID}
          disabled
          bold
          text="This ad is great"
          campaign="Awareness"
          color="blue"
        />
        <BaseRow
          id={tableID}
          checked
          bold
          italic
          text="Mary's pincycle"
          campaign="Catalogs"
          color="red"
        />
        <BaseRow
          id={tableID}
          checked={false}
          underline
          text="BEST PURCHASE WINS"
          campaign="Awareness"
          color="purple"
        />
        <BaseRow
          id={tableID}
          checked={false}
          text="The third campaign"
          campaign="CONVERSIONS"
          color="green"
        />
      </Table.Body>
    </Table>
  );
}
