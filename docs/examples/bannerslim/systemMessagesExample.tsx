import {ReactNode} from 'react';
import { BannerSlim, Box } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <BannerSlim
        helperLink={{
          text: 'Learn more',
          accessibilityLabel: 'Learn more about campaign budget optimization',
          href: 'http://www.pinterest.com',
          onClick: () => {},
        }}
        iconAccessibilityLabel="Information"
        message="This ad group is part of a campaign that is using campaign budget optimization. Changes to schedule or budget must be made at the campaign level."
        type="info"
      />
    </Box>
  );
}
