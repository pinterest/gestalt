import { BannerCallout, Box, Button, ButtonGroup, Divider, Flex, Icon } from 'gestalt';

export default function Example() {
  return (
    <Box paddingX={8} paddingY={8}>
      <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
        <Flex direction="column" gap={{ column: 4, row: 0 }}>
          <Flex alignItems="center" justifyContent="start">
            <Icon accessibilityLabel="" color="brandPrimary" icon="pinterest" size={32} />
            <ButtonGroup>
              <Button color="transparent" iconEnd="arrow-down" text="Business" />
              <Button color="transparent" iconEnd="arrow-down" text="Create" />
              <Button color="transparent" iconEnd="arrow-down" text="Analytics" />
              <Button color="transparent" iconEnd="arrow-down" text="Ads" />
            </ButtonGroup>
          </Flex>

          <Divider />

          <Box marginTop={4}>
            <BannerCallout
              dismissButton={{
                accessibilityLabel: 'Dismiss this banner',
                onDismiss: () => {},
              }}
              iconAccessibilityLabel="Info"
              message="It may take up to 10 minutes to automatically detect a newly installed tag. If you'd like to manually verify your tag, please click the Verify Tag button."
              primaryAction={{
                accessibilityLabel: 'Manually verify tag',
                label: 'Verify Tag',
                role: 'button',
              }}
              title="We have not yet detected your tag"
              type="info"
            />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
