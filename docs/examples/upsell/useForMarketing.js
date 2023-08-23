// @flow strict
import { type Node } from 'react';
import { Box, Icon, Upsell } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Upsell
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
        imageData={{
          component: <Icon accessibilityLabel="" color="default" icon="pinterest" size={32} />,
        }}
        message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
        primaryAction={{
          accessibilityLabel: 'Send ads invite',
          href: 'https://pinterest.com',
          label: 'Send invite',
          target: 'blank',
        }}
        secondaryAction={{
          accessibilityLabel: 'Learn more: Ads credit',
          href: 'https://help.pinterest.com/en/business/article/verified-merchant-program',
          label: 'Learn more',
          target: 'blank',
        }}
        title="Give $30, get $60 in ads credit"
      />
    </Box>
  );
}
