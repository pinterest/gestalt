// @flow strict
import { type Node } from 'react';
import { Box, Button, ButtonGroup, Divider, Icon, Upsell } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box>
        <Box alignItems="center" display="flex" marginBottom={4}>
          <Icon accessibilityLabel="" color="brandPrimary" icon="pinterest" size={32} />
          <ButtonGroup>
            <Button color="transparent" iconEnd="arrow-down" text="Business" />
            <Button color="transparent" iconEnd="arrow-down" text="Create" />
            <Button color="transparent" iconEnd="arrow-down" text="Analytics" />
            <Button color="transparent" iconEnd="arrow-down" text="Ads" />
          </ButtonGroup>
        </Box>

        <Divider />

        <Box marginTop={8}>
          <Upsell
            dismissButton={{
              accessibilityLabel: 'Dismiss banner',
              onDismiss: () => {},
            }}
            imageData={{
              component: <Icon icon="pinterest" accessibilityLabel="" color="default" size={32} />,
            }}
            message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
            primaryAction={{
              accessibilityLabel: 'Send ads invite',
              href: 'https://pinterest.com',
              label: 'Send invite',
              target: 'blank',
            }}
            title="Give $30, get $60 in ads credit"
          />
        </Box>
      </Box>
    </Box>
  );
}
