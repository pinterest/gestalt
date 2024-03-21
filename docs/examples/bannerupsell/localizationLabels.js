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
      <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
        <BannerUpsell
          dismissButton={{ onDismiss: () => {} }}
          imageData={{
            component: <Icon accessibilityLabel="" color="default" icon="send" size={32} />,
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
