// @flow strict
import SheetMobile from './SheetMobile.js';

const Valid = <SheetMobile accessibilityLabel="" onDismiss={() => {}} />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <SheetMobile nonexisting={33} />;
