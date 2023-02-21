// @flow strict
import { type Node } from 'react';
import { HelpButton, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Text inline>
      See the total impact of your paid and organic content working together to increase page visits
      <HelpButton
        accessibilityLabel="Click to learn more about number of visits"
        accessibilityPopoverLabel="Expanded information about number of visits"
        text="Number of times people visited your website after seeing your content on Pinterest"
      />{' '}
      add-to-carts{' '}
      <HelpButton
        accessibilityLabel="Click to learn more about number of visits"
        accessibilityPopoverLabel="Expanded information about number of visits"
        text="Number of times people added your products to their carts after interacting with your Pins"
      />{' '}
      and checkouts
      <HelpButton
        accessibilityLabel="Click to learn more about number of visits"
        accessibilityPopoverLabel="Expanded information about number of visits"
        text="Number of checkouts stemming from your Pins and ads"
      />
      .
    </Text>
  );
}
