// @flow strict
import SheetMobile from './SheetMobile.js';

const Valid = <SheetMobile heading="test" onDismiss={() => {}} />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <SheetMobile nonexisting={33} />;
