// @flow strict
import { type Node } from 'react';
import { HelpButton, Text, Flex } from 'gestalt';

export default function Example(): Node {
  const onHandleClick = () => {
    // eslint-disable-next-line no-console
    console.log('Handle click on link');
  };

  return (
    <Flex height="100%" justifyContent="center" alignItems="center" gap={1}>
      <Text>Gestalt is Pinterest`s design system.</Text>
      <HelpButton
        text="Is Pinterest's design system"
        accessibilityPopoverLabel="Gestalt meaning description"
        link={{
          href: 'https://gestalt.pinterest.systems/',
          text: 'Visit our portal',
          accessibilityLabel: 'Visit Gestalt portal',
          onClick: onHandleClick,
        }}
      />
    </Flex>
  );
}
