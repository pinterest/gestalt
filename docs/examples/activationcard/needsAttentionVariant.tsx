import { ActivationCard, Box, Flex } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex>
        <ActivationCard
          dismissButton={{
            accessibilityLabel: 'Dismiss card',
            onDismiss: () => {},
          }}
          link={{
            accessibilityLabel: 'Learn more about tag health',
            href: 'https://pinterest.com',
            label: 'Learn more',
          }}
          message="Oops! Your tag must be healthy to continue."
          status="needsAttention"
          statusMessage="Needs attention"
          title="Tag is unhealthy"
        />
      </Flex>
    </Box>
  );
}
