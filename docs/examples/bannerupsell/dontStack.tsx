import { BannerUpsell, Box, Button, ButtonGroup, Divider, Flex, Icon } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
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
          <Flex direction="column" gap={{ column: 2, row: 0 }}>
            <BannerUpsell
              imageData={{
                component: <Icon accessibilityLabel="" color="default" icon="send" size={32} />,
              }}
              message="Track ads conversion—sales, traffic and more—with the Pinterest tag"
              primaryAction={{
                label: 'Claim now',
                accessibilityLabel: 'Claim ads credit now',
                role: 'button',
                onClick: () => {},
              }}
              title="So close! Finish installing your Pinterest tag, get $10 in ads credit"
            />
            <BannerUpsell
              dismissButton={{
                accessibilityLabel: 'Dismiss banner',
                onDismiss: () => {},
              }}
              imageData={{
                component: (
                  <Icon accessibilityLabel="" color="default" icon="pinterest" size={32} />
                ),
              }}
              message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
              primaryAction={{
                accessibilityLabel: 'Send ads invite',
                href: 'https://pinterest.com',
                label: 'Send invite',
                target: 'blank',
                role: 'link',
              }}
              title="Give $30, get $60 in ads credit"
            />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
