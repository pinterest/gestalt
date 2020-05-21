// @flow strict
import * as React from 'react';
import Example from './components/Example.js';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Divider"
    description="If you have two things that need to be separated, put a `Divider` between them."
  />
);

card(<PropTable props={[]} />);

card(
  <Example
    description="
    You can use this component for a visual divider between two elements.
  "
    name="Example"
    defaultCode={`
function CheckboxExample() {
  const [value, setValue] = React.useState();
  const date = new Date(date);
  return (
    <DatePicker
      accessibilityLabelIcon="test"
      accessibilityLabelNext="test"
      accessibilityLabelPrevious="test"
      id="test"
      onChange={({ value }) => setValue(value)}
      label='Select a date'
      helperText={'Select a date'}
      idealDirection='up'
      locale='es-EN'
      minDate={value}
      placeholder='Select a date'
      value={value}
    />
  )
}
`}
  />
);

export default cards;
