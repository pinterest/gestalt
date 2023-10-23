// @flow strict
import { type Node } from 'react';
import { Box, DefaultLabelProvider, Icon, Upsell } from 'gestalt';

export default function Example(): Node {
  return (
    <DefaultLabelProvider
      // $FlowExpectedError[incompatible-type] For demostration purposes
      labels={{
        Upsell: {
          accessibilityDismissButtonLabel: 'Dismiss banner',
        },
      }}
    >
      <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
        <Upsell
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
