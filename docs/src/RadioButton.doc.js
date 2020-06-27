// @flow strict
import * as React from 'react';
import { RadioButton } from 'gestalt';
import Example from './components/Example.js';
import PropTable from './components/PropTable.js';
import Combination from './components/Combination.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="RadioButton"
    description="Use radio buttons when you have a few options that a user can choose from. Never use
radio buttons if the user can select more than one option from a list.
"
  />
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
        name: 'label',
        type: 'string',
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
  />
);

card(
  <Example
    name="Example"
    defaultCode={`
<RadioButton
  id="usa"
  checked
  label="United States of America"
  onChange={() => {}}
  value="usa"
/>`}
  />
);

card(
  <Example
    description="
    Here is an example of an accessible group of radio buttons.
  "
    name="Example: Group"
    defaultCode={`
function RadioButtonExample() {
  const [gender, setGender] = React.useState(undefined);

  return (
    <Box
      role="list"
      display="flex"
      direction="column"
    >
      <Box paddingY={1}>
        <RadioButton
          checked={gender === 'male'}
          id="genderMale"
          label="Male"
          name="gender"
          onChange={() => setGender( 'male' )}
          value="male"
        />
      </Box>
      <Box paddingY={1}>
        <RadioButton
          checked={gender === 'female'}
          id="genderFemale"
          label="Female"
          name="gender"
          onChange={() => setGender( 'female' )}
          value="female"
        />
      </Box>
      <Box paddingY={1}>
        <RadioButton
          checked={gender === 'other'}
          id="genderOther"
          label="Other"
          name="gender"
          onChange={() => setGender( 'other' )}
          value="other"
        />
      </Box>
    </Box>
  );
}
`}
  />
);

card(
  <Combination
    checked={[false, true]}
    disabled={[false, true]}
    size={['sm', 'md']}
    heading={false}
  >
    {(props, i) => (
      <RadioButton
        id={`example-${i}`}
        onChange={() => {}}
        value=""
        {...props}
      />
    )}
  </Combination>
);

export default cards;
