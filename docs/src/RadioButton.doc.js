// @flow
import * as React from 'react';
import { Box, Label, Text, RadioButton } from 'gestalt';
import { ns, card, md, Example, PropTable, Combination } from './cards';

ns(
  'RadioButton',
  `Use radio buttons when you have a few options that a user can choose from. Never use
radio buttons if the user can select more than one option from a list.
`
);

card(
  <PropTable
    props={[
      {
        name: 'checked',
        type: 'boolean',
        defaultValue: false,
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: false,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
      },
      {
        name: 'name',
        type: 'string',
        description: 'The name given for all radio buttons in a single group',
      },
      {
        name: 'onChange',
        type: '({ event: SyntheticInputEvent<>, checked: boolean }) => void',
        required: true,
      },
      {
        name: 'value',
        type: 'string',
      },
      {
        name: 'size',
        type: `"sm" | "md"`,
        description: `sm: 16px, md: 24px`,
        defaultValue: 'md',
      },
    ]}
  />,
  { heading: false }
);

card(
  'Example: Accessibility',
  md`
    Note that this component is only the styled radio button itself. Therefore, you must
    provide accessible labels in order to make your radio buttons usable. Please use
    \`padding\` rather than \`margin\` around your labels in order to make the clickable
    area larger.
  `,
  <Example
    defaultCode={`
<Box alignItems="center" display="flex" direction="row">
  <RadioButton id="usa" checked onChange={() => {}} value="usa" />
  <Box flex="grow">
    <Label htmlFor="usa">
      <Box paddingX={2}>
        <Text bold>U.S.A.</Text>
      </Box>
    </Label>
  </Box>
</Box>
`}
    scope={{ Box, RadioButton, Label, Text }}
  />,
  { stacked: true }
);

card(
  'Example: Group',
  md`
    Here is an example of an accessible group of radio buttons.
  `,
  <Example
    defaultCode={`
class RadioButtonExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { gender: undefined };
  }
  render() {
    return (
      <Box role="list" display="flex" direction="column">
        <Box alignItems="center" paddingY={1} display="flex" direction="row">
          <RadioButton
            checked={this.state.gender === 'male'}
            id="genderMale"
            name="gender"
            onChange={() => this.setState({ gender: 'male' })}
            value="male"
          />
          <Box flex="grow">
            <Label htmlFor="genderMale">
              <Box paddingX={2}>
                <Text>Male</Text>
              </Box>
            </Label>
          </Box>
        </Box>
        <Box alignItems="center" paddingY={1} display="flex" direction="row">
          <RadioButton
            checked={this.state.gender === 'female'}
            id="genderFemale"
            name="gender"
            onChange={() => this.setState({ gender: 'female' })}
            value="female"
          />
          <Box flex="grow">
            <Label htmlFor="genderFemale">
              <Box paddingX={2}>
                <Text>Female</Text>
              </Box>
            </Label>
          </Box>
        </Box>
        <Box alignItems="center" paddingY={1} display="flex" direction="row">
          <RadioButton
            checked={this.state.gender === 'other'}
            id="genderOther"
            name="gender"
            onChange={() => this.setState({ gender: 'other' })}
            value="other"
          />
          <Box flex="grow">
            <Label htmlFor="genderOther">
              <Box paddingX={2}>
                <Text>Other</Text>
              </Box>
            </Label>
          </Box>
        </Box>
      </Box>
    );
  }
}
`}
    scope={{ Box, RadioButton, Label, Text }}
  />,
  { stacked: true }
);

card(
  <Combination
    checked={[false, true]}
    disabled={[false, true]}
    size={['sm', 'md']}
  >
    {(props, i) => (
      <RadioButton
        id={`example-${i}`}
        onChange={() => {}}
        value=""
        {...props}
      />
    )}
  </Combination>,
  { heading: false }
);
