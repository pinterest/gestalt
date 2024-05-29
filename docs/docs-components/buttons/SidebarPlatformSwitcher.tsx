import React from 'react';
import { useRouter } from 'next/router';
import { SegmentedControl } from 'gestalt';
import trackButtonClick from './trackButtonClick';
import AndroidLogo from '../../graphics/home-page/android-logo.svg';
import AppleLogo from '../../graphics/home-page/apple-logo.svg';
import { ComponentPlatformFilteredBy } from '../navigationContext';

type Props = {
  onClick: (platform: 'web' | 'android' | 'ios') => void;
  componentPlatformFilteredBy: ComponentPlatformFilteredBy;
};

export default function SidebarPlatformSwitcher({ onClick, componentPlatformFilteredBy }: Props) {
  const PLATFORM_TO_INDEX_MAP = {
    web: 0,
    ios: 1,
    android: 2,
  } as const;
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
    activeIndex: number;
    event: React.MouseEvent<HTMLButtonElement>;
  }) => {
    const selectedPlatform = Object.keys(PLATFORM_TO_INDEX_MAP).find(
      (key) => PLATFORM_TO_INDEX_MAP[key] === activeIndex,
    );
    trackButtonClick('Sidebar Platform ', selectedPlatform);
    router.push(`/${selectedPlatform || 'web'}/overview`);

    // @ts-expect-error - TS2345 - Argument of type 'string' is not assignable to parameter of type '"android" | "ios" | "web"'.
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
