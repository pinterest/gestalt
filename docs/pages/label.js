// @flow strict
import type { Node } from 'react';
import PropTable from '../components/PropTable.js';
import Example from '../components/Example.js';
import PageHeader from '../components/PageHeader.js';
import CardPage from '../components/CardPage.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Label"
    description="Use the Label component to connect a label with a form component in an accessible way."
  />,
);

card(
  <PropTable
    props={[
      {
        name: 'children',
        type: 'React.Node',
      },
      {
        name: 'htmlFor',
        type: 'string',
        required: true,
        description: 'Id of the element this label is describing',
      },
    ]}
  />,
);

card(
  <Example
    description={`
    Whenever you are using a [SelectList](#/SelectList), [Switch](#/Switch), [TextField](#/TextField) or [TextArea](#/TextArea) component, you should use a \`Label\`.
  `}
    name="Example"
    defaultCode={`
function LabelExample() {
  const [switched, setSwitched] = React.useState(false);

  return (
    <Box>
      <Box paddingY={1}>
        <Label htmlFor="switchExample">
          <Text>Live example</Text>
        </Label>
      </Box>
      <Switch
        onChange={() => setSwitched(!switched)}
        id="switchExample"
        switched={switched}
      />
    </Box>
  );
}
`}
  />,
);

export default function LabelPage(): Node {
  return <CardPage cards={cards} page="Label" />;
}
