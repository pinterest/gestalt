// @flow strict
import { type Node } from 'react';
import { Box, Button, ButtonGroup, Callout, Divider, Flex, Icon, Upsell } from 'gestalt';

export default function Example(): Node {
  return (
    <Box paddingY={8} paddingX={8}>
      <Flex direction="column" gap={{ column: 4, row: 0 }}>
        <Flex alignItems="center" justifyContent="start">
          <Icon accessibilityLabel="" icon="pinterest" color="error" size={32} />
          <ButtonGroup>
            <Button color="transparent" iconEnd="arrow-down" text="Business" />
            <Button color="transparent" iconEnd="arrow-down" text="Create" />
            <Button color="transparent" iconEnd="arrow-down" text="Analytics" />
            <Button color="transparent" iconEnd="arrow-down" text="Ads" />
          </ButtonGroup>
        </Flex>

        <Divider />

        <Box marginTop={4}>
          <Flex gap={{ column: 2, row: 0 }} direction="column">
            <Upsell
              imageData={{
                component: <Icon icon="send" accessibilityLabel="Send" color="default" size={32} />,
              }}
              message="Track ads conversion—sales, traffic and more—with the Pinterest tag"
              primaryAction={{
                accessibilityLabel: 'Claim ads credit now',
                label: 'Claim now',
              }}
              title="So close! Finish installing your Pinterest tag, get $10 in ads credit"
            />
            <Callout
              dismissButton={{
                accessibilityLabel: 'Dismiss this banner',
                onDismiss: () => {},
              }}
              iconAccessibilityLabel="Info"
              message="It may take up to 10 minutes to automatically detect a newly installed tag. If you'd like to manually verify your tag, please click the Verify Tag button."
              primaryAction={{
                accessibilityLabel: 'Manually verify tag',
                label: 'Verify Tag',
              }}
              title="We have not yet detected your tag"
              type="info"
            />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
