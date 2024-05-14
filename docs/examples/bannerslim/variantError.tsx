import { BannerSlim, Box, Flex } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={{ column: 5, row: 0 }} width="100%">
        <BannerSlim
          helperLink={{
            text: 'Go to account',
            accessibilityLabel: 'Go to your account',
            href: 'http://www.pinterest.com',
            onClick: () => {},
          }}
          iconAccessibilityLabel="Info"
          message="There are issues with your account."
          type="error"
        />
        <BannerSlim
          helperLink={{
            text: 'Go to account',
            accessibilityLabel: 'Go to your account',
            href: 'http://www.pinterest.com',
            onClick: () => {},
          }}
          iconAccessibilityLabel="Info"
          message="There are issues with your account."
          type="errorBare"
        />
      </Flex>
    </Box>
  );
}
