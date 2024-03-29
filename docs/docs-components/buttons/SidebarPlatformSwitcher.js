// @flow strict
import React, { type Node as ReactNode } from 'react';
import { useRouter } from 'next/router';
import { SegmentedControl } from 'gestalt';
import trackButtonClick from './trackButtonClick';
import AndroidLogo from '../../graphics/home-page/android-logo.svg';
import AppleLogo from '../../graphics/home-page/apple-logo.svg';
import { type ComponentPlatformFilteredBy } from '../navigationContext';

type Props = {
  onClick: (platform: 'web' | 'android' | 'ios') => void,
  componentPlatformFilteredBy: ComponentPlatformFilteredBy,
};

export default function SidebarPlatformSwitcher({
  onClick,
  componentPlatformFilteredBy,
}: Props): ReactNode {
  const PLATFORM_TO_INDEX_MAP = {
    web: 0,
    ios: 1,
    android: 2,
  };
  const router = useRouter();

  // Do not change the order of these items
  const items = [
    'Web',
    <AppleLogo key="apple" aria-label="ios platform" />,
    <AndroidLogo key="android" aria-label="android platform" />,
  ];

  // Updates both the cookie and the state that tracks the selected platform
  const onSelect = ({
    activeIndex,
  }: {
    activeIndex: number,
    event: SyntheticMouseEvent<HTMLButtonElement>,
  }) => {
    const selectedPlatform = Object.keys(PLATFORM_TO_INDEX_MAP).find(
      (key) => PLATFORM_TO_INDEX_MAP[key] === activeIndex,
    );
    trackButtonClick('Sidebar Platform ', selectedPlatform);
    router.push(`/${selectedPlatform || 'web'}/overview`);

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
