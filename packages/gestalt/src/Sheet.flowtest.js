// @flow strict
import React from 'react';
import Sheet from './Sheet.js';

const ValidWithNodeProps = (
  <Sheet
    accessibilityDismissButtonLabel="Dismiss"
    accessibilitySheetLabel="Sheet"
    closeOnOutsideClick
    footer={<footer />}
    heading="Sheet title"
    onDismiss={() => {}}
    ref={React.createRef()}
    size="sm"
  >
    <section />
  </Sheet>
);

const ValidWithRenderProps = (
  <Sheet
    accessibilityDismissButtonLabel="Dismiss"
    accessibilitySheetLabel="Sheet"
    closeOnOutsideClick
    footer={({ onDismissStart }) => <footer />}
    heading="Sheet title"
    onDismiss={() => {}}
    ref={React.createRef()}
    size="sm"
  >
    {({ onDismissStart }) => <section />}
  </Sheet>
);

const InvalidChildren = (
  <Sheet
    accessibilityDismissButtonLabel="Dismiss"
    accessibilitySheetLabel="Sheet"
    onDismiss={() => {}}
  >
    {/* $FlowExpectedError[prop-missing] */}
    {({ onDismiss }) => <section />}
  </Sheet>
);

// $FlowExpectedError[prop-missing]
const MissingProp = <Sheet />;

const NonExistingProp = (
  // $FlowExpectedError[prop-missing]
  <Sheet
    accessibilityDismissButtonLabel="Dismiss"
    accessibilitySheetLabel="Sheet"
    onDismiss={() => {}}
    nonExisting={33}
  >
    <section />
  </Sheet>
);

const InvalidTypeProp = (
  <Sheet
    accessibilityDismissButtonLabel="Dismiss"
    accessibilitySheetLabel="Sheet"
    onDismiss={() => {}}
    // $FlowExpectedError[incompatible-type]
    size="xxl"
  >
    <section />
  </Sheet>
);
