// @flow strict
import { createRef } from 'react';
import OverlayPanel from './OverlayPanel';

const ValidWithNodeProps = (
  <OverlayPanel
    ref={createRef()}
    accessibilityDismissButtonLabel="Dismiss"
    accessibilityLabel="OverlayPanel"
    closeOnOutsideClick
    footer={<footer />}
    heading="OverlayPanel title"
    onDismiss={() => {}}
    size="sm"
    subHeading={<nav />}
  >
    <section />
  </OverlayPanel>
);

const ValidWithRenderProps = (
  <OverlayPanel
    ref={createRef()}
    accessibilityDismissButtonLabel="Dismiss"
    accessibilityLabel="OverlayPanel"
    closeOnOutsideClick
    footer={
      <OverlayPanel.DismissingElement>
        {({ onDismissStart }) => <footer />}
      </OverlayPanel.DismissingElement>
    }
    heading="OverlayPanel title"
    onDismiss={() => {}}
    size="sm"
    subHeading={
      <OverlayPanel.DismissingElement>
        {({ onDismissStart }) => <nav />}
      </OverlayPanel.DismissingElement>
    }
  >
    <OverlayPanel.DismissingElement>
      {({ onDismissStart }) => <section />}
    </OverlayPanel.DismissingElement>
  </OverlayPanel>
);

const InvalidWithRenderProps = (
  <OverlayPanel
    accessibilityDismissButtonLabel="Dismiss"
    accessibilityLabel="OverlayPanel"
    footer={
      <OverlayPanel.DismissingElement>
        {
          // $FlowFixMe[prop-missing]
          ({ onDismiss }) => <footer />
        }
      </OverlayPanel.DismissingElement>
    }
    heading="OverlayPanel title"
    onDismiss={() => {}}
    subHeading={
      <OverlayPanel.DismissingElement>
        {
          // $FlowFixMe[prop-missing]
          ({ onDismiss }) => <nav />
        }
      </OverlayPanel.DismissingElement>
    }
  >
    <OverlayPanel.DismissingElement>
      {
        // $FlowFixMe[prop-missing]
        ({ onDismiss }) => <section />
      }
    </OverlayPanel.DismissingElement>
  </OverlayPanel>
);

// $FlowExpectedError[prop-missing]
const MissingProp = <OverlayPanel />;

const NonExistingProp = (
  // $FlowExpectedError[prop-missing]
  <OverlayPanel
    accessibilityDismissButtonLabel="Dismiss"
    accessibilityLabel="OverlayPanel"
    nonExisting={33}
    onDismiss={() => {}}
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
