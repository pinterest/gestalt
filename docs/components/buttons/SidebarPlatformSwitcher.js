// @flow strict
import React, { type Node } from 'react';
import { SegmentedControl } from 'gestalt';
import AppleLogo from '../../graphics/home-page/apple-logo.svg';
import AndroidLogo from '../../graphics/home-page/android-logo.svg';

// type Props = {|
//   onClick: () => void,
//   sidebarOrganisedBy: SidebarOrganisedBy,
// |};

export default function SidebarPlatformSwitcher(): Node {
  const [itemIndex, setItemIndex] = React.useState(0);

  const items = ['Web', <AppleLogo key="apple" />, <AndroidLogo key="android" />];

  return (
    <SegmentedControl
      items={items}
      onChange={({ activeIndex }) => setItemIndex(activeIndex)}
      selectedItemIndex={itemIndex}
    />
  );
}
