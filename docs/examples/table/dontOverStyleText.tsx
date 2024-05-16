import { Box, Checkbox, Label, Table, Text } from 'gestalt';

function HeaderRow({ id }: { id: string }) {
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>
          <Box display="visuallyHidden">
            <Label htmlFor={id}>Not all checkboxes are checked</Label>
          </Box>
          <Checkbox id={id} indeterminate onChange={() => {}} size="sm" />
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

function BaseRow({ id, checked, disabled, text, campaign, bold, underline, italic, color }: any) {
  return (
    <Table.Row>
      <Table.Cell>
        <Checkbox
          checked={checked}
          disabled={disabled}
          id={`${id.replace(/ /g, '_').replace(/'/g, '')}_${text
            .replace(/ /g, '_')
            .replace(/'/g, '')}`}
          onChange={() => {}}
          size="sm"
        />
      </Table.Cell>
      <Table.Cell>
        <Label
          htmlFor={`${id.replace(/ /g, '_').replace(/'/g, '')}_${text
            .replace(/ /g, '_')
            .replace(/'/g, '')}`}
        >
          <Text
            italic={italic ? true : undefined}
            underline={underline ? true : undefined}
            weight={bold ? 'bold' : 'normal'}
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

export default function Example() {
  const tableID = 'Example of a Dont do for table style';

  return (
    <Table accessibilityLabel={tableID}>
      <HeaderRow id={tableID} />
      <Table.Body>
        <BaseRow campaign="Engagement" checked color="red" id={tableID} text="The best ad" />
        <BaseRow
          bold
          campaign="Awareness"
          color="blue"
          disabled
          id={tableID}
          text="This ad is great"
        />
        <BaseRow
          bold
          campaign="Catalogs"
          checked
          color="red"
          id={tableID}
          italic
          text="Mary's pincycle"
        />
        <BaseRow
          campaign="Awareness"
          checked={false}
          color="purple"
          id={tableID}
          text="BEST PURCHASE WINS"
          underline
        />
        <BaseRow
          campaign="CONVERSIONS"
          checked={false}
          color="green"
          id={tableID}
          text="The third campaign"
        />
      </Table.Body>
    </Table>
  );
}
