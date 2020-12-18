// @flow strict
import React from 'react';
import { Upsell } from 'gestalt';

export default function TestBox() {
  return (
    <Upsell
        message="Insert a clever upsell message here"
        primaryAction={{ href: 'pinterest.com', label: 'Visit Pinterest' }}
        secondaryAction={{ href: 'pinterest.com/help', label: 'Learn more' }}
        title="A Title"
      />
  );
}
