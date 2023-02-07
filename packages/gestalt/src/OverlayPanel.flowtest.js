// @flow strict
import { createRef } from 'react';
import OverlayPanel from './OverlayPanel.js';

const ValidWithNodeProps = (
  <OverlayPanel
    accessibilityDismissButtonLabel="Dismiss"
    accessibilityLabel="OverlayPanel"
    closeOnOutsideClick
    footer={<footer />}
    heading="OverlayPanel title"
    onDismiss={() => {}}
    ref={createRef()}
    size="sm"
    subHeading={<nav />}
  >
    <section />
  </OverlayPanel>
);

const ValidWithRenderProps = (
  <OverlayPanel
    accessibilityDismissButtonLabel="Dismiss"
    accessibilityLabel="OverlayPanel"
    closeOnOutsideClick
    footer={({ onDismissStart }) => <footer />}
    heading="OverlayPanel title"
    onDismiss={() => {}}
    ref={createRef()}
    size="sm"
    subHeading={({ onDismissStart }) => <nav />}
  >
    {({ onDismissStart }) => <section />}
  </OverlayPanel>
);

const InvalidWithRenderProps = (
  <OverlayPanel
    accessibilityDismissButtonLabel="Dismiss"
    accessibilityLabel="OverlayPanel"
    // $FlowExpectedError[prop-missing]
    footer={({ onDismiss }) => <footer />}
    heading="OverlayPanel title"
    onDismiss={() => {}}
    // $FlowExpectedError[prop-missing]
    subHeading={({ onDismiss }) => <nav />}
  >
    {/* $FlowExpectedError[prop-missing] */}
    {({ onDismiss }) => <section />}
  </OverlayPanel>
);

// $FlowExpectedError[prop-missing]
const MissingProp = <OverlayPanel />;

const NonExistingProp = (
  // $FlowExpectedError[prop-missing]
  <OverlayPanel
    accessibilityDismissButtonLabel="Dismiss"
    accessibilityLabel="OverlayPanel"
    onDismiss={() => {}}
    nonExisting={33}
  >
    <section />
  </OverlayPanel>
);

const InvalidTypeProp = (
  <OverlayPanel
    accessibilityDismissButtonLabel="Dismiss"
    accessibilityLabel="OverlayPanel"
    onDismiss={() => {}}
    // $FlowExpectedError[incompatible-type]
    size="xxl"
  >
    <section />
  </OverlayPanel>
);
