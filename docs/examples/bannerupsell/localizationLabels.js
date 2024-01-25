// @flow strict
import { type Node as ReactNode } from 'react';
import { BannerUpsell, Box, DefaultLabelProvider, Icon } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <DefaultLabelProvider
      // $FlowExpectedError[incompatible-type] For demostration purposes
      labels={{
        BannerUpsell: {
          accessibilityDismissButtonLabel: 'Dismiss banner',
        },
      }}
    >
      <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
        <BannerUpsell
          dismissButton={{ onDismiss: () => {} }}
          imageData={{
            component: <Icon icon="send" accessibilityLabel="" color="default" size={32} />,
          }}
          message="Verfolgen Sie die Anzeigenkonvertierung - Umsatz, Traffic und mehr - mit dem Pinterest Tag"
          primaryAction={{
            label: 'Beanspruche jetzt',
            accessibilityLabel: 'Beanspruche Guthaben jetzt',
            role: 'button',
            onClick: () => {},
          }}
          title="Fast fertig! Beenden Sie die Installation Ihres Pinterest-Tags und erhalten Sie ein Guthaben von 10 Euro"
        />
      </Box>
    </DefaultLabelProvider>
  );
}
