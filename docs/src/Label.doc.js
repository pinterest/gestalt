// @flow
import * as React from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Label"
    description="Use the Label component to connect a label with a form component in an accessible way."
  />
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
  />
);

card(
  <Example
    description={`
    Whenever you are using a [SelectList](#/SelectList), [Switch](#/Switch), [TextField](#/TextField) or [TextArea](#/TextArea) component, you should use a \`Label\`.
  `}
    name="Example"
    defaultCode={`
class LabelExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { switched: false };
  }

  render() {
    return (
      <Box>
        <Box paddingY={1}>
          <Label htmlFor="switchExample">
            <Text>Live example</Text>
          </Label>
        </Box>
        <Switch
          onChange={() => this.setState({ switched: !this.state.switched })}
          id="switchExample"
          switched={this.state.switched}
        />
      </Box>
    );
  }
}
`}
  />
);

export default cards;
