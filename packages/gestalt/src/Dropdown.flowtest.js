// @flow strict
import Dropdown from './Dropdown.js';

const Valid = (
  <Dropdown id="dropdown-1" onDismiss={() => {}}>
    <Dropdown.Item onSelect={() => {}} option={{ label: 'Item 1', value: 'Item 1' }} />
  </Dropdown>
);

// $FlowExpectedError[prop-missing]
const InvalidProps = <Dropdown nonexisting={33} />;
