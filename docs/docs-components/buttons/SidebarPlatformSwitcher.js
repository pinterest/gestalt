// @flow strict
import React, { type Node } from 'react';
import { SegmentedControl } from 'gestalt';
import AppleLogo from '../../graphics/home-page/apple-logo.svg';
import AndroidLogo from '../../graphics/home-page/android-logo.svg';
import { type ComponentPlatformFilteredBy } from '../navigationContext.js';
import trackButtonClick from './trackButtonClick.js';

type Props = {|
  onClick: (platform: 'web' | 'android' | 'ios') => void,
  componentPlatformFilteredBy: ComponentPlatformFilteredBy,
|};

export default function SidebarPlatformSwitcher({
  onClick,
  componentPlatformFilteredBy,
}: Props): Node {
  const PLATFORM_TO_INDEX_MAP = {
    'web': 0,
    'ios': 1,
    'android': 2,
  };

  // Do not change the order of these items
  const items = [
    'Web',
    <AppleLogo aria-label="ios platform" key="apple" />,
    <AndroidLogo aria-label="android platform" key="android" />,
  ];

  const onSelect = ({ activeIndex }) => {
    const selectedPlatform = Object.keys(PLATFORM_TO_INDEX_MAP).find(
      (key) => PLATFORM_TO_INDEX_MAP[key] === activeIndex,
    );
    trackButtonClick('Sidebar Platform ', selectedPlatform);
    onClick(selectedPlatform || 'web');
  };
  return (
    <SegmentedControl
      items={items}
      onChange={onSelect}
      selectedItemIndex={PLATFORM_TO_INDEX_MAP[componentPlatformFilteredBy]}
    />
  );
}
