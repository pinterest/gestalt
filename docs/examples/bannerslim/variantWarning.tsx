import { BannerSlim, Box, Flex } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={{ column: 5, row: 0 }} width="100%">
        <BannerSlim
          helperLink={{
            text: 'Learn more.',
            accessibilityLabel: 'Learn more about deprecated features',
            href: 'http://www.pinterest.com',
            onClick: () => {},
          }}
          iconAccessibilityLabel="Info"
          message="This feature is being sunset and will not be available after May 1, 2024."
          type="warning"
        />
        <BannerSlim
          helperLink={{
            text: 'Learn more.',
            accessibilityLabel: 'Learn more about deprecated features',
            href: 'http://www.pinterest.com',
            onClick: () => {},
          }}
          iconAccessibilityLabel="Info"
          message="This feature is being sunset and will not be available after May 1, 2024."
          type="warningBare"
        />
      </Flex>
    </Box>
  );
}
