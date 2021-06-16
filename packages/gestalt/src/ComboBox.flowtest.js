// @flow strict
import ComboBox from './ComboBox.js';

const Valid = (
  <ComboBox
    accessibilityClearButtonLabel="Clear options"
    accessibilityShowButtonLabel="Show popup"
    id="ComboBox"
    noResultText="No Result"
    options={[{ value: '1', subtext: 'subtext' }]}
  />
);

const InvalidProp = (
  <ComboBox
    accessibilityClearButtonLabel="Clear options"
    id="ComboBox"
    noResultText="No Result"
    // $FlowExpectedError[prop-missing]
    options={[{ value: '1', label: 'label' }]}
  />
);

// $FlowExpectedError[prop-missing]
const MissingProp = <ComboBox />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <ComboBox nonexisting={33} />;
