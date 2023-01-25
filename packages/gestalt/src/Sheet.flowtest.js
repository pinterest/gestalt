// @flow strict
import { createRef } from 'react';
import Sheet from './Sheet.js';

const ValidWithNodeProps = (
  <Sheet
    accessibilityDismissButtonLabel="Dismiss"
    accessibilitySheetLabel="Sheet"
    closeOnOutsideClick
    footer={<footer />}
    heading="Sheet title"
    onDismiss={() => {}}
    ref={createRef()}
    size="sm"
    subHeading={<nav />}
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
    ref={createRef()}
    size="sm"
    subHeading={({ onDismissStart }) => <nav />}
  >
    {({ onDismissStart }) => <section />}
  </Sheet>
);

const InvalidWithRenderProps = (
  <Sheet
    accessibilityDismissButtonLabel="Dismiss"
    accessibilitySheetLabel="Sheet"
    // $FlowExpectedError[prop-missing]
    footer={({ onDismiss }) => <footer />}
    heading="Sheet title"
    onDismiss={() => {}}
    // $FlowExpectedError[prop-missing]
    subHeading={({ onDismiss }) => <nav />}
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
