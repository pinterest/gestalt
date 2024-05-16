import { ReactNode } from 'react';
import { BannerSlim, Box } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <BannerSlim
        helperLink={{
          text: 'Vision Board',
          accessibilityLabel: 'Vision Board',
          href: 'http://www.pinterest.com',
          onClick: () => {},
        }}
        iconAccessibilityLabel="Information"
        message="The Pin was added to your"
        type="success"
      />
    </Box>
  );
}
