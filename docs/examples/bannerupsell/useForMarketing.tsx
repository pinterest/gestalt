import {ReactNode} from 'react';
import { BannerUpsell, Box, Icon } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <BannerUpsell
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
          role: 'link',
        }}
        secondaryAction={{
          accessibilityLabel: 'Learn more: Ads credit',
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
