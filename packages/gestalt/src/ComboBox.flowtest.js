// @flow strict
import ComboBox from './ComboBox.js';

const Valid = (
  <ComboBox
    accessibilityClearButtonLabel="Clear options"
    id="ComboBox"
    label="label"
    noResultText="No Result"
    options={[{ label: '1', value: '1', subtext: 'subtext' }]}
  />
);

const InvalidValue = (
  <ComboBox
    accessibilityClearButtonLabel="Clear options"
    id="ComboBox"
    label="label"
    noResultText="No Result"
    // $FlowExpectedError[incompatible-type]
    options={[{ label: '1', value: 1, subtext: 'subtext' }]}
  />
);

// $FlowExpectedError[prop-missing]
const MissingProp = <ComboBox />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <ComboBox nonexisting={33} />;
