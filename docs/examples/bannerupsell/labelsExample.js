// @flow strict
import { type Node as ReactNode } from 'react';
import { BannerUpsell, Box, Icon } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <BannerUpsell
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
        imageData={{
          component: <Icon icon="pinterest" accessibilityLabel="" color="default" size={32} />,
        }}
        message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
        primaryAction={{
          href: 'https://pinterest.com',
          label: 'Send invite',
          accessibilityLabel: 'Invite friend to use ads',
          target: 'blank',
          role: 'link',
        }}
        secondaryAction={{
          accessibilityLabel: 'Learn more: Verified Merchant Program',
          href: 'https://help.pinterest.com/en/business/article/verified-merchant-program',
          label: 'Learn more',
          target: 'blank',
          role: 'link',
        }}
        title="Give $30, get $60 in ads credit"
      />
    </Box>
  );
}
