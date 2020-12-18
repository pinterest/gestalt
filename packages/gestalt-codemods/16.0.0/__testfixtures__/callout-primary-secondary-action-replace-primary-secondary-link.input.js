// @flow strict
import React from 'react';
import { Callout } from 'gestalt';

export default function TestBox() {
  return (
    <Callout
      message="Insert a clever info callout message here"
      iconAccessibilityLabel="info"
      primaryLink={{ href: 'pinterest.com', label: 'Visit Pinterest' }}
      secondaryLink={{ href: 'pinterest.com/help', label: 'Learn more' }}
      type="info"
      title="A Title"
    />
  );
}
