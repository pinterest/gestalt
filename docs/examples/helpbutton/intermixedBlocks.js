// @flow strict
import { type Node } from 'react';
import { HelpButton, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Text>
      See the total impact of your paid and organic content working together to increase page visits{' '}
      <HelpButton
        text="Number of times people visited your website after seeing your content on Pinterest"
        accessibilityPopoverLabel="Number of times people visited your website after seeing your content on Pinterest"
      />
      add-to-carts
      <HelpButton
        text="Number of times people added your products to their carts after interacting with your Pins"
        accessibilityPopoverLabel="Number of times people added your products to their carts after interacting with your Pins"
      />
      and checkouts
      <HelpButton
        text="Number of checkouts stemming from your Pins and ads"
        accessibilityPopoverLabel="Number of checkouts stemming from your Pins and ads"
      />
      .
    </Text>
  );
}
