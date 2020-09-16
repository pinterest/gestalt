// @flow strict
import React from 'react';
import Sheet from './Sheet.js';

const Valid = (
  <Sheet
    accessibilityDismissButtonLabel="Dismiss"
    accessibilitySheetLabel="Sheet"
    closeOnOutsideClick
    footer={<footer />}
    heading="Sheet title"
    onDismiss={() => {}}
    size="sm"
  >
    <section />
  </Sheet>
);

// $FlowExpectedError[prop-missing]
const MissingProp = <Sheet />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Sheet nonexisting={33} />;

// $FlowExpectedError[prop-missing]
// $FlowExpectedError[incompatible-type]
const InvalidTypeProp = <Sheet size="xxl" />;
